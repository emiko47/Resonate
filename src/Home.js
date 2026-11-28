import React, { useRef } from "react";
import "./cssfiles/home.css";
import { TagList } from "./CommonComponents";
import { formatTimeAgo } from "./Functions";
import { Link, useNavigate } from "react-router-dom";
import Icon from "./Icon";

const communityPosts = [
  {
    id: 1,
    title: "My review of this album",
    username: "Rayan",
    avatar: "https://img.icons8.com/ios/50/user.png",
    commentsCount: 100,
    time: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
    tags: ["Pop", "Rap"],
  },
  {
    id: 2,
    title: "My review of this album",
    username: "Sam",
    avatar: "https://img.icons8.com/ios/50/user.png",
    commentsCount: 100,
    time: Date.now() - 2 * 60 * 60 * 1000,
    tags: ["Pop", "Rap"],
  },
  {
    id: 3,
    title: "My review of this album",
    username: "Jordan",
    avatar: "https://img.icons8.com/ios/50/user.png",
    commentsCount: 100,
    time: Date.now() - 2 * 60 * 60 * 1000,
    tags: ["Pop", "Rap"],
  },
];

const eventsNearYou = [
  {
    id: "sf",
    title: "Performance at Steven Ave",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea",
    day: "Saturday",
    time: "7 pm",
    reason: "Because you follow DJ",
  },
  {
    id: "dj",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea",
    title: "Performance at Steven Ave",
    day: "Saturday",
    time: "7 pm",
    reason: "Because you follow DJ",
  },
];

function Home() {
  const navigate = useNavigate();
  const postsTrackRef = useRef(null);
  const eventsTrackRef = useRef(null);

  return (
    <div id="homeRoot">
      <section className="home-hero" aria-label="Welcome to Resonate">
        <div>
          <span className="eyebrow">MADE FOR YOUR KIND OF MUSIC</span>
          <h1>
            Find your sound.
            <br />
            Find your people.
          </h1>
          <p>
            A home for niche sounds, local discoveries, and the people who get
            your music.
          </p>
          <button type="button" onClick={() => navigate("/exploremusic")}>
            <Icon name="explore" size={17} />
            Explore Music
            <Icon name="arrow" size={16} />
          </button>
        </div>
        <img className="hero-art" src="/assets/music-art.svg" alt="" />
        <img className="hero-wave" src="/assets/sound-wave.svg" alt="" />
      </section>
      <section className="homeSection">
        <div className="homeSectionHeader">
          <span className="homeSectionTitle">What&apos;s New</span>
          <Link to="/communities">
            Find your community <Icon name="arrow" size={15} />
          </Link>
        </div>
        <div className="homeCarouselTrack" ref={postsTrackRef}>
          {communityPosts.map((post) => (
            <button
              key={`${post.id}`}
              type="button"
              className="homeCard postCard"
              onClick={() => navigate("/communities/example/123")}
            >
              <div className="postCardHeader">
                <img
                  src={post.avatar}
                  alt={post.username}
                  className="postCardAvatar"
                />
                <span className="postCardTitle">{post.title}</span>
              </div>

              <div className="postCardMeta">
                <span>
                  <Icon name="chat" size={13} /> {post.commentsCount} comments
                </span>
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
          <Link to="/events">
            View all events <Icon name="arrow" size={15} />
          </Link>
        </div>

        <div className="homeCarouselTrack" ref={eventsTrackRef}>
          {eventsNearYou.map((event) => (
            <button
              key={event.id}
              type="button"
              className="homeCard eventCard"
              onClick={() => navigate("/events")}
            >
              <span className="eventCardTitle">{event.title}</span>
              <div className="eventCardBody">
                <img
                  src={event.image}
                  alt={event.title}
                  className="eventCardImage"
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
  );
}

export default Home;
