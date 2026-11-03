import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './cssfiles/mycollections.css';
import { TagList, UserInfo } from "./CommonComponents";
import { formatTimeAgoOrDate } from "./Functions";

import { postCollections, eventCollections, userCollections } from './mockdata/MyCollections';


function MyCollections() {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const data = [
    { id: 'posts', tabLabel: 'Saved Posts', createLabel: 'Post', emptyLabel: 'posts', collections: postCollections },
    { id: 'events', tabLabel: 'Saved Events', createLabel: 'Event', emptyLabel: 'events', collections: eventCollections },
    { id: 'users', tabLabel: 'Followed Users', createLabel: 'User', emptyLabel: 'users', collections: userCollections }
  ];

  return (
    <div id="mycollectionsRoot">
      {/* Item type tabs with lists */}
      <div>
        {/* Tab Headers */}
        <div id="mycollectionsTabs">
          {data.map((tab, index) => {
            const buttonStyle = {
              borderTopWidth: activeTab === index ? '2px' : '0px',
              borderBottomWidth: activeTab === index ? '0px' : '2px',
              borderLeftWidth: activeTab === index ? '2px' : '0px',
              borderRightWidth: activeTab === index ? '2px' : '0px',
              color: activeTab === index ? '#000000' : '#333'
            }
            return (
              <button class="mycollectionsTab" key={index} onClick={() => setActiveTab(index)} style={buttonStyle}>
                {tab.tabLabel}
              </button>
            );
          })}
        </div>
        {/* Tab Panels */}
        <div class="mycollectionsCollectionList">
          {data[activeTab].collections.map((collection) => {
            return (
              <div>
                <h2>{collection.name}</h2>
                <div className="mycollectionsCarouselTrack">
                  {(collection.items.length === 0 && <span class="mycollectionsNoItems">This collection is empty. Find some {data[activeTab].emptyLabel}!</span>) ||
                    collection.items.map((item) => {
                    switch (data[activeTab].id) {
                      case "posts":
                        return (
                          <button type="button" className="mycollectionsItemCard postCard" >
                            <div className="postCardHeader">
                              <img src={item.avatar} alt={item.username} className="postCardAvatar"/>
                              <span className="postCardTitle">{item.title}</span>
                            </div>

                            <div className="postCardMeta">
                              <span>{item.commentsCount} comments</span>
                              <span>{formatTimeAgoOrDate(item.time)}</span>
                            </div>

                            <div className="postCardTags">
                              <TagList names={item.tags} />
                            </div>
                          </button>
                        );

                      case "events":
                        return (
                          <button type="button" className="mycollectionsItemCard eventCard">
                            <span className="eventCardTitle">{item.title}</span>
                            <div className="eventCardBody">
                              <img src={item.image} alt={item.title} className="eventCardImage"
                              />
                              <div className="eventCardDateTime">
                                <span>{item.day}</span>
                                <span>{item.time}</span>
                              </div>
                            </div>
                            <span className="eventCardReason">{item.reason}</span>
                          </button>
                        );

                      case "users":
                        return (
                          <div class="mycollectionsItemCard userCard">
                            <UserInfo username={item.username} />
                          </div>
                        );
                    }
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <button id="createCommunityButton" type="button" onClick={() => {
          navigate("");
        }}>Create {data[activeTab].createLabel} Collection</button>
      </div>
    </div>
  );
}


function CommunityComponent({id}) {
  return <span>test</span>;
}


export default MyCollections;
