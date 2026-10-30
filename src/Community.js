import { useParams } from 'react-router-dom';
import './cssfiles/community.css';
import './cssfiles/commoncomponents.css';
import { formatTimeAgo } from './Functions';

import { postsData } from './mockdata/Communities';

function Community() {
  const {communityId} = useParams();
  console.log(communityId);

  const data = [0, 1];

  return (
    <div id="communityRoot">
      <div id="communityHeader">
        <span>Calgary Rap</span>
        <p>The community for local rappers in Calgary</p>
        <div>
          <input id="communityKeywords" type="text" placeholder="Search by title &amp; content"></input>
          <button class="iconButton">
            <img width="15" height="15" src="https://img.icons8.com/ios/50/search--v1.png" alt="search posts"/>
          </button>
        </div>
      </div>
      <div id="postsList">
        {data.map((id) => (
          <PostComponent id={id} />
        ))}
      </div>
      <div id="postPageNumbers">
        <button style={{marginRight: "8px"}}>
          &lt;
        </button>
        {[1,2,3,4].map((pageNum) => (
          <button>{pageNum}</button>
        ))}
        <span>...</span>
        {[44,45].map((pageNum) => (
          <button>{pageNum}</button>
        ))}
        <button style={{marginLeft: "8px"}}>
          &gt;
        </button>
      </div>
      <button id="createPostButton">Create Post</button>
    </div>
  );
}

function PostComponent({id}) {
  const postData = postsData[id];
  return (
    <button class="postPreview">
      <div class="postPreviewSummaryCol">
        <div class="postPreviewTitleRow">
          <span class="postPreviewTitle">{postData.name}</span>
          <span class="postPreviewUser">&nbsp;· {postData.username}</span>
        </div>
        <p class="postPreviewBody">
          {postData.body.substring(0, 150)}
        </p>
      </div>
      <div class="postPreviewStatsCol">
        <span>{formatTimeAgo(postData.time)}</span>
        <span>{postData.numberComments} comments</span>
      </div>
    </button>
  )
}

export { Community };