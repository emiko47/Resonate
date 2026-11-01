import React, { useRef } from 'react';
import './cssfiles/home.css';
import { TagList } from './CommonComponents';
import { formatTimeAgo } from './Functions';

const communityPosts = [
  {
    id: 1,
    title: 'My review of this album',
    username: 'Rayan',
    avatar: 'https://img.icons8.com/ios/50/user.png',
    commentsCount: 100,
    time: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
    tags: ['Pop', 'Rap'],
  },
  {
    id: 2,
    title: 'My review of this album',
    username: 'Sam',
    avatar: 'https://img.icons8.com/ios/50/user.png',
    commentsCount: 100,
    time: Date.now() - 2 * 60 * 60 * 1000,
    tags: ['Pop', 'Rap'],
  },
  {
    id: 3,
    title: 'My review of this album',
    username: 'Jordan',
    avatar: 'https://img.icons8.com/ios/50/user.png',
    commentsCount: 100,
    time: Date.now() - 2 * 60 * 60 * 1000,
    tags: ['Pop', 'Rap'],
  },
];

const eventsNearYou = [
  {
    id: 'sf',
    title: 'Performance at Steven Ave',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
    day: 'Saturday',
    time: '7 pm',
    reason: 'Because you follow DJ',
  },
  {
    id: 'dj',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea',
    title: 'Performance at Steven Ave',
    day: 'Saturday',
    time: '7 pm',
    reason: 'Because you follow DJ',
  },
]

function Home() {
  const postsTrackRef = useRef(null);
  const eventsTrackRef = useRef(null);

  return(
    <div id="homeRoot">
      <section className="homeSection">
        <div className="homeSectionHeader">
          <span className="homeSectionTitle">What&apos;s New</span>
        </div>
        <div className="homeCarouselTrack" ref={postsTrackRef}>
          {communityPosts.map((post) => (
            <button key={`${post.id}`} type="button" className="homeCard postCard" >
              <div className="postCardHeader">
                <img src={post.avatar} alt={post.username} className="postCardAvatar"/>
                <span className="postCardTitle">{post.title}</span>
              </div>

              <div className="postCardMeta">
                <span>{post.commentsCount} comments</span>
                <span>{formatTimeAgo(post.time)}</span>
              </div>

              <div className="postCardTags">
                <TagList names={post.tags} />
              </div>
            </button>
          ))}
        </div>
      </section>
      
      <section className="homeSection">
        <div className="homeSectionHeader">
          <span className="homeSectionTitle">Events Near You</span>
        </div>

        <div className="homeCarouselTrack" ref={eventsTrackRef}>
          {eventsNearYou.map((event) => (
            <button key={event.id} type="button" className="homeCard eventCard">
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
      </section>
    </div>
  )
}

export default Home;
