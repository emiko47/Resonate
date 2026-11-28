import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import "./cssfiles/createpost.css";
import BackButton from "./BackButton";
import DiscardButton from "./DiscardButton";
import Icon from "./Icon";
import { communitiesData } from "./mockdata/Communities";
import {
  readPostDrafts,
  savePostDraft,
  removePostDraft,
} from "./PostDraftStorage";
function CreatePost() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const draftId = params.get("draft");
  const [initial] = useState(() =>
    readPostDrafts().find((draft) => draft.id === draftId),
  );
  const communityId =
    initial?.communityId || params.get("community") || "calgary-rap";
  const communityName =
    initial?.communityName ||
    communitiesData.find((c) => c.id === communityId)?.name ||
    "Calgary Rap";
  const [title, setTitle] = useState(initial?.title || "");
  const [content, setContent] = useState(initial?.content || "");
  const [error, setError] = useState("");
  const draftCount = readPostDrafts().length;
  const dirty = Boolean(title || content);
  function saveAndLeave(destination) {
    try {
      if (dirty)
        savePostDraft({
          id: initial?.id,
          title,
          content,
          communityId,
          communityName,
        });
      navigate(destination);
    } catch {
      setError(
        "Your draft could not be saved. Please keep this page open and try again.",
      );
    }
  }
  return (
    <form
      id="createPostRoot"
      className="composition-page"
      onSubmit={(event) => {
        event.preventDefault();
        if (!title.trim() || !content.trim()) {
          setError("Add a title and content before creating your post.");
          return;
        }
        try {
          if (initial?.id) removePostDraft(initial.id);
          navigate(`/communities/${communityId}/123`);
        } catch {
          setError("Could not update your saved draft. Please try again.");
        }
      }}
    >
      <BackButton
        label="Back to community"
        onClick={() => saveAndLeave(`/communities/${communityId}`)}
      />
      <header className="composition-heading">
        <div className="composition-heading-top">
          <span className="eyebrow">COMMUNITY CONVERSATIONS</span>
          <Link
            className="drafts-link"
            to={`/postdrafts?community=${encodeURIComponent(communityId)}`}
            onClick={(event) => {
              event.preventDefault();
              saveAndLeave(
                `/postdrafts?community=${encodeURIComponent(communityId)}`,
              );
            }}
          >
            <Icon name="edit" size={15} />
            Post drafts{draftCount ? ` (${draftCount})` : ""}
          </Link>
        </div>
        <h1>{initial ? "Continue your post" : "Create a post"}</h1>
        <p>
          A good conversation starts with a song. Share what's on your mind.
        </p>
      </header>
      <div className="composition-card">
        <div className="composition-community">
          <Icon name="users" size={18} />
          <span>
            Posting in <strong>{communityName}</strong>
          </span>
        </div>
        <div id="createPostTitleArea">
          <label htmlFor="post-title">Title</label>
          <input
            id="post-title"
            required
            maxLength={120}
            placeholder="Give your conversation a title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <span className="field-hint">{title.length}/120 characters</span>
        </div>
        <div id="createPostDescriptionBox">
          <label htmlFor="createPostDescriptionText">Content</label>
          <textarea
            id="createPostDescriptionText"
            required
            placeholder="Share a discovery, ask a question, or start a conversation…"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </div>
        {error && (
          <p role="alert" className="event-error">
            {error}
          </p>
        )}
        <p className="composition-save-hint">
          <Icon name="save" size={13} />
          Back also saves your unfinished post as a draft.
        </p>
        <div id="createPostActionsRow" className="creation-actions">
          <div className="creation-primary-actions">
            <button id="createPostCreateButton" type="submit">
              <Icon name="plus" size={18} />
              Create Post
            </button>
            <button
              className="creation-secondary"
              type="button"
              disabled={!dirty}
              onClick={() =>
                saveAndLeave(
                  `/postdrafts?community=${encodeURIComponent(communityId)}`,
                )
              }
            >
              <Icon name="save" size={17} />
              Save for Later
            </button>
          </div>
          <DiscardButton
            className="discard-action"
            subject="post"
            onDiscard={() => {
              try {
                if (initial?.id) removePostDraft(initial.id);
                navigate(`/communities/${communityId}`);
              } catch {
                setError(
                  "Could not discard the saved draft. Please try again.",
                );
              }
            }}
          />
        </div>
      </div>
    </form>
  );
}
export default CreatePost;
