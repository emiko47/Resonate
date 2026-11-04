import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Icon from "./Icon";
import { useDemoAuth } from "./DemoAuth";
import { formatTimeAgo, formatTimeAgoOrDate } from "./Functions";
import { postsData, commentData } from "./mockdata/Communities";
import "./cssfiles/post.css";

export function seedComments(comments, prefix = "sample") {
  return comments.map((comment, index) => ({
    ...comment,
    id: `${prefix}-${index + 1}`,
    createdAt: null,
    comments: seedComments(comment.comments || [], `${prefix}-${index + 1}`),
  }));
}
export function countComments(comments) {
  return comments.reduce(
    (total, comment) => total + 1 + countComments(comment.comments || []),
    0,
  );
}
function appendReply(comments, parentId, reply) {
  return comments.map((comment) =>
    comment.id === parentId
      ? { ...comment, comments: [...comment.comments, reply] }
      : {
          ...comment,
          comments: appendReply(comment.comments, parentId, reply),
        },
  );
}
function ReplyComposer({ target, onSubmit, onCancel, autoFocus = false }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  return (
    <form
      className="thread-composer"
      onSubmit={(event) => {
        event.preventDefault();
        if (!text.trim()) {
          setError("Write a reply before posting.");
          return;
        }
        onSubmit(text.trim());
        setText("");
        setError("");
      }}
    >
      <label>
        <span>
          <Icon name="chat" size={15} />
          Replying to {target}
        </span>
        <textarea
          autoFocus={autoFocus}
          rows={3}
          maxLength={2000}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={`Write a thoughtful reply to ${target}…`}
          aria-label={`Reply to ${target}`}
        />
      </label>
      {error && (
        <p className="thread-error" role="alert">
          {error}
        </p>
      )}
      <footer>
        <span>{text.length}/2000</span>
        <div>
          {onCancel && (
            <button
              type="button"
              className="thread-secondary"
              onClick={onCancel}
            >
              Cancel reply
            </button>
          )}
          <button type="submit" className="thread-submit">
            <Icon name="arrow" size={15} />
            Post reply
          </button>
        </div>
      </footer>
    </form>
  );
}
function Discussion({
  comment,
  parent,
  depth,
  collapsed,
  onToggle,
  replyingTo,
  onReply,
  onCancelReply,
  onSubmit,
}) {
  const hidden = collapsed.has(comment.id);
  const replies = countComments(comment.comments);
  const bodyId = `thread-body-${comment.id}`;
  return (
    <li className="discussion-item">
      <article
        className={`discussion-card ${hidden ? "discussion-collapsed" : ""}`}
        id={`comment-${comment.id}`}
        aria-label={`Discussion by ${comment.username}`}
      >
        <header className="discussion-heading">
          <span className="discussion-avatar" aria-hidden="true">
            {comment.username.slice(0, 1).toUpperCase()}
          </span>
          <div className="discussion-author">
            <strong>{comment.username}</strong>
            <span>
              {comment.createdAt
                ? formatTimeAgo(comment.createdAt)
                : "Sample discussion"}
              {parent && (
                <>
                  {" "}
                  ·{" "}
                  <a href={`#comment-${parent.id}`}>
                    Reply to {parent.username}
                  </a>
                </>
              )}
            </span>
          </div>
          <button
            type="button"
            className="discussion-toggle"
            aria-expanded={!hidden}
            aria-controls={bodyId}
            aria-label={`${hidden ? "Expand" : "Collapse"} discussion by ${comment.username}`}
            onClick={() => onToggle(comment.id)}
            title={hidden ? "Expand discussion" : "Collapse discussion"}
          >
            <Icon name={hidden ? "plus" : "minus"} size={17} />
          </button>
        </header>
        {hidden && (
          <p className="discussion-summary">
            Discussion collapsed
            {replies
              ? ` · ${replies} ${replies === 1 ? "reply" : "replies"} hidden`
              : ""}
          </p>
        )}
        <div id={bodyId} hidden={hidden}>
          <p className="discussion-text">{comment.text}</p>
          <button
            type="button"
            className="thread-reply-button"
            aria-label={`Reply to ${comment.username}`}
            onClick={() => onReply(comment.id)}
          >
            <Icon name="reply" size={15} />
            Reply
            {replies > 0 && (
              <span className="reply-count">
                {replies} {replies === 1 ? "reply" : "replies"}
              </span>
            )}
          </button>
          {replyingTo === comment.id && (
            <ReplyComposer
              target={comment.username}
              autoFocus
              onCancel={onCancelReply}
              onSubmit={(text) => onSubmit(comment.id, text)}
            />
          )}
        </div>
      </article>
      {comment.comments.length > 0 && (
        <ol
          hidden={hidden}
          className={`thread-replies ${depth >= 2 ? "thread-replies-deep" : ""}`}
          aria-label={`Replies to ${comment.username}`}
        >
          {comment.comments.map((child) => (
            <Discussion
              key={child.id}
              comment={child}
              parent={comment}
              depth={depth + 1}
              collapsed={collapsed}
              onToggle={onToggle}
              replyingTo={replyingTo}
              onReply={onReply}
              onCancelReply={onCancelReply}
              onSubmit={onSubmit}
            />
          ))}
        </ol>
      )}
    </li>
  );
}
export default function Post() {
  const { postId = "1", communityId = "calgary-rap" } = useParams();
  const { session } = useDemoAuth();
  const post =
    postsData.find((post) => String(post.id) === postId) || postsData[0];
  return (
    <PostDiscussion
      key={`${communityId}/${postId}`}
      post={post}
      communityId={communityId}
      storageKey={`resonate.discussions.v1.${encodeURIComponent(communityId)}.${encodeURIComponent(postId)}`}
      author={session?.displayname || "Guest listener"}
    />
  );
}
function PostDiscussion({ post, communityId, storageKey, author }) {
  const [comments, setComments] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey));
      if (Array.isArray(saved)) return saved;
    } catch {}
    return seedComments(commentData);
  });
  const [collapsed, setCollapsed] = useState(new Set());
  const [discussionOpen, setDiscussionOpen] = useState(true);
  const [postExpanded, setPostExpanded] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [showPostComposer, setShowPostComposer] = useState(false);
  const [sort, setSort] = useState("oldest");
  const [notice, setNotice] = useState("");
  const discussionHeading = useRef(null);
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(comments));
    } catch {
      setNotice(
        "Browser storage is unavailable. Replies will last for this visit only.",
      );
    }
  }, [comments, storageKey]);
  function toggle(id) {
    setCollapsed((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function reply(parentId, text) {
    const item = {
      id: `reply-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      username: author,
      text,
      createdAt: new Date().toISOString(),
      comments: [],
    };
    setComments((previous) =>
      parentId ? appendReply(previous, parentId, item) : [...previous, item],
    );
    setCollapsed((previous) => {
      const next = new Set(previous);
      next.delete(parentId);
      return next;
    });
    setReplyingTo(null);
    setShowPostComposer(false);
    setDiscussionOpen(true);
    setNotice(
      parentId
        ? "Your reply was added to the selected discussion."
        : "Your discussion was added to this post.",
    );
  }
  const sorted = sort === "newest" ? [...comments].reverse() : comments;
  const total = countComments(comments);
  return (
    <div id="postRoot">
      <Link className="post-back" to={`/communities/${communityId}`}>
        <Icon name="left" size={16} />
        Back to community
      </Link>
      <article className="post-article">
        <div className="post-overline">
          <span className="eyebrow">COMMUNITY CONVERSATIONS</span>
          <span className="post-community-tag">Calgary Rap</span>
        </div>
        <h1>{post.name}</h1>
        <div className="post-author-line">
          <span className="discussion-avatar">
            <Icon name="user" size={16} />
          </span>
          <strong>{post.username}</strong>
          <span>· {formatTimeAgoOrDate(post.time)}</span>
        </div>
        <div
          id="post-article-body"
          className={`post-article-body ${!postExpanded && post.body.length > 700 ? "is-preview" : ""}`}
        >
          {post.body.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        {post.body.length > 700 && (
          <button
            type="button"
            className="post-body-toggle"
            aria-expanded={postExpanded}
            aria-controls="post-article-body"
            onClick={() => setPostExpanded((value) => !value)}
          >
            {postExpanded ? "Show less" : "Read full post"}
            <Icon name={postExpanded ? "minus" : "plus"} size={13} />
          </button>
        )}
        <footer className="post-article-footer">
          <span>
            <Icon name="chat" size={17} />
            {total} {total === 1 ? "reply" : "replies"}
          </span>
          <button
            type="button"
            className="thread-submit"
            onClick={() => {
              setDiscussionOpen(true);
              setShowPostComposer(true);
              setReplyingTo(null);
            }}
          >
            <Icon name="plus" size={16} />
            Join the discussion
          </button>
        </footer>
      </article>
      <section
        className="post-discussions"
        aria-labelledby="discussion-heading"
      >
        <header className="discussion-section-header">
          <div>
            <h2 id="discussion-heading" ref={discussionHeading}>
              Discussions <span>{comments.length}</span>
            </h2>
            <p>
              Read each thread from top to bottom. Replies sit beneath the person
              they answer, in posting order.
            </p>
          </div>
          <div className="discussion-tools">
            <label>
              Order
              <select
                aria-label="Discussion order"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="oldest">Oldest first</option>
                <option value="newest">Newest first</option>
              </select>
            </label>
            <button
              type="button"
              className="thread-secondary"
              aria-expanded={discussionOpen}
              aria-controls="discussion-list"
              onClick={() => setDiscussionOpen((value) => !value)}
            >
              <Icon name={discussionOpen ? "minus" : "plus"} size={15} />
              {discussionOpen ? "Hide discussions" : "Show discussions"}
            </button>
          </div>
        </header>
        {showPostComposer && (
          <ReplyComposer
            target="post"
            autoFocus
            onCancel={() => setShowPostComposer(false)}
            onSubmit={(text) => reply(null, text)}
          />
        )}
        <div id="discussion-list" hidden={!discussionOpen}>
          <p className="discussion-storage-note">
            Replies are saved in this browser. Posting as{" "}
            <strong>{author}</strong>.
          </p>
          <ol className="thread-list" aria-label="Post discussions">
            {sorted.map((comment) => (
              <Discussion
                key={comment.id}
                comment={comment}
                depth={0}
                collapsed={collapsed}
                onToggle={toggle}
                replyingTo={replyingTo}
                onReply={(id) => {
                  setReplyingTo(id);
                  setShowPostComposer(false);
                }}
                onCancelReply={() => setReplyingTo(null)}
                onSubmit={reply}
              />
            ))}
          </ol>
        </div>
        {!discussionOpen && (
          <p className="discussion-hidden-note">
            {total} {total === 1 ? "reply is" : "replies are"} hidden. Expand
            discussions to continue reading.
          </p>
        )}
        <p className="thread-notice" role="status">
          {notice}
        </p>
      </section>
    </div>
  );
}
