import BackButton from "./BackButton";
import { useState, useRef } from "react";
import "./cssfiles/search.css";
import "./cssfiles/commoncomponents.css";
import { TagList, UserInfo } from "./CommonComponents";
import { formatTimeAgoOrDate } from "./Functions";

import { searchCommunityPosts, searchEvents } from "./mockdata/Search";
import { defaultGenres } from "./mockdata/Genres";


function Search() {
  const [genres, updateGenres] = useState(defaultGenres);
  const postsTrackRef = useRef(null);
  const eventsTrackRef = useRef(null);

  return (
    <div id="searchRoot">
      <BackButton to="/" label="Back to home"/>
      {/* Search criteria */}
      <div id="searchHeaderRow">
        <h2>Search</h2>
        <div class="searchHeaderRowGroup">
          <input type="text" placeholder="Search by title &amp; content"/>
          <button class="iconButton">
            <img width="15" height="15" src="https://img.icons8.com/ios/50/search--v1.png" alt="search"/>
          </button>
        </div>
        <div class="searchHeaderRowGroup">
          <span>Filter by genre:</span>
          <TagList names={genres} editableCallback={updateGenres} />
        </div>
      </div>
      {/* Post results */}
      <div class="searchSection">
        <h2>Posts</h2>
        <div className="searchCarouselTrack" ref={postsTrackRef}>
          {searchCommunityPosts.map((post) => (
            <button key={`${post.id}`} type="button" className="searchCard postCard" >
              <div className="postCardHeader">
                <img src={post.avatar} alt={post.username} className="postCardAvatar"/>
                <span className="postCardTitle">{post.title}</span>
              </div>

              <div className="postCardMeta">
                <span>{post.commentsCount} comments</span>
                <span>{formatTimeAgoOrDate(post.time)}</span>
              </div>

              <div className="postCardTags">
                <TagList names={post.tags} />
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Event results */}
      <div class="searchSection">
        <h2>Events</h2>
        <div className="searchCarouselTrack" ref={eventsTrackRef}>
          {searchEvents.map((event) => (
            <button key={event.id} type="button" className="searchCard eventCard">
              <span className="eventCardTitle">{event.title}</span>
              <div className="eventCardBody">
                <img src={event.image} alt={event.title} className="eventCardImage"
                />
                <div className="eventCardDateTime">
                  <span>{event.day}</span>
                  <span>{event.time}</span>
                </div>
              </div>
              <span className="eventCardReason">{event.reason}</span>
            </button>
          ))}
        </div>
      </div>
      {/* User results */}
      <div class="searchSection">
        <h2>Users</h2>
        <div className="searchCarouselTrack" ref={eventsTrackRef}>
          {searchEvents.map((event) => (
            <div class="searchCard userCard">
              <UserInfo username={"test"} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default Search;