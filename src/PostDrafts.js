import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import BackButton from "./BackButton";
import DiscardButton from "./DiscardButton";
import Icon from "./Icon";
import { readPostDrafts, removePostDraft } from "./PostDraftStorage";
export default function PostDrafts() {
  const [params] = useSearchParams();
  const communityId = params.get("community") || "calgary-rap";
  const [drafts, setDrafts] = useState(readPostDrafts);
  const [error, setError] = useState("");
  return (
    <div className="composition-page post-drafts-page">
      <BackButton
        to={`/communities/${communityId}`}
        label="Back to community"
      />
      <header className="composition-heading">
        <span className="eyebrow">PICK UP WHERE YOU LEFT OFF</span>
        <h1>Post drafts</h1>
        <p>
          Your saved ideas, ready whenever you are. Drafts are kept in this
          browser.
        </p>
      </header>
      <section className="post-draft-list" aria-label="Saved post drafts">
        {drafts.length ? (
          drafts.map((draft) => (
            <article className="post-draft-card" key={draft.id}>
              <span className="post-draft-icon">
                <Icon name="edit" size={22} />
              </span>
              <div className="post-draft-copy">
                <h2>{draft.title || "Untitled post"}</h2>
                <p>{draft.content || "No content yet."}</p>
                <small>
                  {draft.communityName || "Community"} · Saved{" "}
                  {new Date(draft.updatedAt).toLocaleDateString("en-CA", {
                    month: "short",
                    day: "numeric",
                  })}
                </small>
              </div>
              <div className="post-draft-controls">
                <Link
                  className="draft-resume"
                  to={`/createpost?draft=${encodeURIComponent(draft.id)}&community=${encodeURIComponent(draft.communityId)}`}
                >
                  <Icon name="edit" size={15} />
                  Resume
                </Link>
                <DiscardButton
                  label="Delete"
                  subject="draft"
                  onDiscard={() => {
                    try {
                      removePostDraft(draft.id);
                      setDrafts(readPostDrafts());
                    } catch {
                      setError(
                        "Could not delete this draft. Please try again.",
                      );
                    }
                  }}
                />
              </div>
            </article>
          ))
        ) : (
          <div className="drafts-empty">
            <Icon name="edit" size={32} />
            <h2>A space for unfinished ideas.</h2>
            <p>
              Choose Save for Later while writing a post. You can resume it
              here.
            </p>
            <Link
              className="draft-resume"
              to={`/createpost?community=${encodeURIComponent(communityId)}`}
            >
              <Icon name="plus" size={16} />
              Create a post
            </Link>
          </div>
        )}
      </section>
      {error && (
        <p role="alert" className="event-error">
          {error}
        </p>
      )}
    </div>
  );
}
