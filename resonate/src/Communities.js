import { useState } from 'react';
import './cssfiles/communities.css';
import { communitiesData, defaultGenres } from './mockdata/Communities';
import { TagList } from './CommonComponents';
import { formatTimeAgo } from './Functions';

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
      <div id="communitiesLeft">
        {/* Tab Headers */}
        <div>
          {data.map((tab, index) => (
            <button key={index} onClick={() => setActiveTab(index)}>
              {tab.label}
            </button>
          ))}
        </div>
        {/* Tab Panels */}
        <div>
          {data[activeTab].communityIds.map((id) => (
            <CommunityComponent id={id} />
          ))}
        </div>
      </div>

      {/* Filter pane */}
      <div id="communitiesRight">
        <div>
          <span>Filters</span>
        </div>
        <div>
          Keywords
        </div>
        <div>
          <span>Genres</span>
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
      <div class="communityPreviewCols">
        <div>
          <div class="communityPreviewTitleRow">
            <span class="communityPreviewTitle">{communityData.name}</span>
            <TagList names={communityData.tags} />
          </div>
          <p class="communityPreviewDescription">
            {communityData.description}
          </p>
        </div>
        <div class="communityPreviewStatsCol">
          <span>{formatTimeAgo(communityData.lastPost)}</span>
          <span>{communityData.numberPosts} posts</span>
        </div>
      </div>
    </button>
  );
}

export default Communities;
