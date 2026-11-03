import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cssfiles/createpost.css";
import DiscardButton from "./DiscardButton";
import Icon from "./Icon";
function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <form
      id="createPostRoot"
      className="composition-page"
      onSubmit={(event) => {
        event.preventDefault();
        navigate("../communities/example/123");
      }}
    >
      <header className="composition-heading">
        <span className="eyebrow">COMMUNITY CONVERSATIONS</span>
        <h1>Create a post</h1>
        <p>
          A good conversation starts with a song. Share what's on your mind.
        </p>
      </header>
      <div className="composition-card">
        <div className="composition-community">
          <Icon name="users" size={18} />
          <span>
            Posting in <strong>Calgary Rap</strong>
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
        <div id="createPostActionsRow">
          <button id="createPostCreateButton" type="submit">
            <Icon name="plus" size={18} />
            Create Post
          </button>
          <DiscardButton
            dirty={Boolean(title || content)}
            subject="post"
            onDiscard={() => navigate("../communities/example")}
          />
        </div>
      </div>
    </form>
  );
}
export default CreatePost;
