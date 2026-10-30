import { useState } from 'react';
import './cssfiles/communities.css';
import { TagList } from './CommonComponents';
import { formatTimeAgo } from './Functions';

import { communitiesData } from './mockdata/Communities';
import { defaultGenres } from './mockdata/Genres';

function Communities() {
  const [activeTab, setActiveTab] = useState(0);
  const [filterGenres, setFilterGenres] = useState(defaultGenres);

  const data = [
    { label: 'Discover', communityIds: [0, 1, 2, 3] },
    { label: 'My Communities', communityIds: [1, 3] }
  ];

  return (
    <div id="communitiesRoot">
      {/* Communities tabs with lists */}
      <div>
        {/* Tab Headers */}
        <div id="communitiesTabs">
          {data.map((tab, index) => {
            const buttonStyle = {
              borderTopWidth: activeTab === index ? '2px' : '0px',
              borderBottomWidth: activeTab === index ? '0px' : '2px',
              borderLeftWidth: activeTab === index ? '2px' : '0px',
              borderRightWidth: activeTab === index ? '2px' : '0px',
              color: activeTab === index ? '#000000' : '#333'
            }
            return (
              <button class="communityTab" key={index} onClick={() => setActiveTab(index)} style={buttonStyle}>
                {tab.label}
              </button>
            );
          })}
        </div>
        {/* Tab Panels */}
        <div class="communitiesList">
          {data[activeTab].communityIds.map((id) => (
            <CommunityComponent id={id} />
          ))}
        </div>
        <button id="createCommunityButton" type="button">Create Community</button>
      </div>

      {/* Filter pane */}
      <div id="communitiesFilterCol">
        <div>
          <span id="communitiesFilterTitle">Filters</span>
        </div>
        <div>
          <span class="communitiesFilterLabel">Search title &amp; description</span>
          <input id="communitiesKeywords" type="text"></input>
        </div>
        <div>
          <span class="communitiesFilterLabel">Genres</span>
          <TagList names={filterGenres} editableCallback={setFilterGenres} />
        </div>
      </div>
    </div>
  );
}

function CommunityComponent({id}) {
  const communityData = communitiesData[id];
  return (
    <button class="communityPreview">
      <div class="communityPreviewSummaryCol">
        <div class="communityPreviewTitleRow">
          <span class="communityPreviewTitle">{communityData.name}</span>
          <TagList names={communityData.tags} />
        </div>
        <p class="communityPreviewDescription">
          {communityData.description}
        </p>
      </div>
      <div class="communityPreviewStatsCol">
        <span>Last post {formatTimeAgo(communityData.lastPost)}</span>
        <span>{communityData.numberPosts} posts</span>
      </div>
    </button>
  );
}

export default Communities;
