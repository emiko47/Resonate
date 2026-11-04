export const postDraftKey = "resonate.post-drafts.v1";
export function readPostDrafts() {
  try {
    const saved = JSON.parse(localStorage.getItem(postDraftKey));
    return Array.isArray(saved)
      ? saved.filter(
          (d) =>
            typeof d.id === "string" &&
            typeof d.title === "string" &&
            typeof d.content === "string" &&
            typeof d.communityId === "string",
        )
      : [];
  } catch {
    return [];
  }
}
export function savePostDraft(draft) {
  const next = {
    ...draft,
    id:
      draft.id ||
      `post-draft-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(
    postDraftKey,
    JSON.stringify([
      next,
      ...readPostDrafts().filter((item) => item.id !== next.id),
    ]),
  );
  return next;
}
export function removePostDraft(id) {
  localStorage.setItem(
    postDraftKey,
    JSON.stringify(readPostDrafts().filter((item) => item.id !== id)),
  );
}
