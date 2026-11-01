import { useNavigate } from 'react-router-dom';
import './cssfiles/post.css';
import './cssfiles/commoncomponents.css'
import { formatTimeAgoOrDate } from './Functions';
import { User } from './CommonComponents';

import { postsData, commentData } from './mockdata/Communities';

function Post() {
  const navigate = useNavigate();

  const postData = postsData[0];

  return (
    <div id="postRoot">
      <button id="postBackButton" onClick={() => {
        navigate("../");
      }}>
        &lt; Back to Calgary Rap
      </button>
      <div id="postInfoRow">
        <p>{postData.name}</p>
        <div id="postInfoAndSave">
          <div id="postInfoCol">
            <span>By {postData.username}</span>
            <span>{formatTimeAgoOrDate(postData.time)}</span>
          </div>
          <button class="iconButton">
            <img width="25" height="25" src="https://img.icons8.com/ios/50/bookmark-ribbon--v1.png" alt="save post"/>
          </button>
        </div>
      </div>
      <div id="postText">
        <p>{postData.body}</p>
        <button class="postReplyButton">Reply</button>
      </div>
      <div id="postComments">
        <CommentListComponent comments={commentData} />
      </div>
      <div id="postReplyRow">
        <span>Replying to post</span>
        <input type="text" />
        <button class="iconButton">
          <img width="24" height="24" src="https://img.icons8.com/material-outlined/24/sent.png" alt="post comment"/>
        </button>
      </div>
    </div>
  )
}

function CommentListComponent({comments}) {
  return (
    <div class="postCommentList">
      {comments.map((comment) => (
        <CommentComponent comment={comment} />
      ))}
    </div>
  )
}

function CommentComponent({comment}) {
  return (
    <div class="postComment">
      <div class="postCommentContent">
        <User username={comment.username} />
        <span>&nbsp;· {comment.text}</span>
        <button class="postReplyButton">
          Reply
        </button>
      </div>
      <CommentListComponent comments={comment.comments} />
    </div>
  )
}

export default Post;