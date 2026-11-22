import { useState } from 'react';
import './cssfiles/exploremusic.css';

const initialSongs = [
  {
    id: 1,
    title: 'Middle Child',
    artist: 'J. Cole',
    image: 'https://img.icons8.com/dotty/80/apple-music.png',
  },
  {
    id: 2,
    title: 'Redbone',
    artist: 'Childish Gambino',
    image: 'https://img.icons8.com/dotty/80/apple-music.png',
  },
  {
    id: 3,
    title: 'Nights',
    artist: 'Frank Ocean',
    image: 'https://img.icons8.com/dotty/80/apple-music.png',
  },
  {
    id: 4,
    title: 'After Hours',
    artist: 'The Weeknd',
    image: 'https://img.icons8.com/dotty/80/apple-music.png',
  },
  {
    id: 5,
    title: 'Self Care',
    artist: 'Mac Miller',
    image: 'https://img.icons8.com/dotty/80/apple-music.png',
  },
  {
    id: 6,
    title: 'PRIDE.',
    artist: 'Kendrick Lamar',
    image: 'https://img.icons8.com/dotty/80/apple-music.png',
  },
];

const similarSongs = [
  {
    id: 7,
    title: 'No Role Modelz',
    artist: 'J. Cole',
    image: 'https://img.icons8.com/dotty/80/apple-music.png',
  },
  {
    id: 8,
    title: 'WUSYANAME',
    artist: 'Tyler, The Creator',
    image: 'https://img.icons8.com/dotty/80/apple-music.png',
  },
  {
    id: 9,
    title: '2009',
    artist: 'Mac Miller',
    image: 'https://img.icons8.com/dotty/80/apple-music.png',
  },
  {
    id: 10,
    title: 'Crew',
    artist: 'GoldLink',
    image: 'https://img.icons8.com/dotty/80/apple-music.png',
  },
  {
    id: 11,
    title: 'Come Through and Chill',
    artist: 'Miguel',
    image: 'https://img.icons8.com/dotty/80/apple-music.png',
  },
  {
    id: 12,
    title: 'The Box',
    artist: 'Roddy Ricch',
    image: 'https://img.icons8.com/dotty/80/apple-music.png',
  },
  {
    id: 13,
    title: 'Pink + White',
    artist: 'Frank Ocean',
    image: 'https://img.icons8.com/dotty/80/apple-music.png',
  },
  {
    id: 14,
    title: 'Location',
    artist: 'Khalid',
    image: 'https://img.icons8.com/dotty/80/apple-music.png',
  },
];

function SongTile({ song, onFindSimilar, onShare }) {
  return (
    <div className="tile">
      <div className="streamingPlatforms">
        <img
          src="https://img.icons8.com/ios-filled/50/spotify.png"
          alt="Spotify"
          title="Spotify"
        />
        <img
          src="https://img.icons8.com/ios-filled/50/youtube-play.png"
          alt="YouTube"
          title="YouTube"
        />
        <img
          src="https://img.icons8.com/ios-filled/50/apple-music.png"
          alt="Apple Music"
          title="Apple Music"
        />
      </div>

      <img className="albumArt" src={song.image} alt="Album artwork" />

      <div className="songInfo">
        <p className="songTitle">{song.title}</p>
        <p className="artistName">{song.artist}</p>
      </div>

      <div className="helpButtons">
        <div className="helpButtonLeft">
          <button
            className="iconButton"
            type="button"
            aria-label={`Save ${song.title}`}
            title="Save song"
          >
            <img
              src="https://img.icons8.com/ios/50/bookmark-ribbon--v1.png"
              alt=""
            />
          </button>
        </div>

        <div className="helpButtonRight">
          <button
            className="iconButton"
            type="button"
            aria-label={`Review ${song.title}`}
            title="Review song"
          >
            <img
              src="https://img.icons8.com/windows/32/chat.png"
              alt=""
            />
          </button>

          <button
            className="iconButton"
            type="button"
            aria-label={`Share ${song.title}`}
            title="Share song"
            onClick={() => onShare(song)}
          >
            <img
              src="https://img.icons8.com/ios-glyphs/30/share--v1.png"
              alt=""
            />
          </button>

          <button
            className="iconButton"
            type="button"
            aria-label={`Find songs similar to ${song.title}`}
            title="Find similar songs"
            onClick={() => onFindSimilar(song)}
          >
            <img
              src="https://img.icons8.com/ios/50/search--v1.png"
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
}

function ExploreMusic() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchCategories, setSearchCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const openSimilarModal = (song) => {
    setSelectedSong(song);
    setIsModalOpen(true);
    setHasSearched(false);
    setSearchCategories([]);
    setSearchQuery('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setHasSearched(false);
  };

  const toggleCategory = (category) => {
    setSearchCategories((previousCategories) =>
      previousCategories.includes(category)
        ? previousCategories.filter((item) => item !== category)
        : [...previousCategories, category]
    );
  };

  const handleFind = (event) => {
    event.preventDefault();

    // Demonstration only: display the hardcoded results.
    setHasSearched(true);
  };

  const handleShare = (song) => {
    setToastMessage('Link copied successfully');

    // Hide the toast after 2.5 seconds.
    window.setTimeout(() => {
      setToastMessage('');
    }, 2500);
  };

  return (
    <div className="exploreMusic">
      <div className="topButtons">
        <button className="topButton" type="button" style={{ backgroundColor: "black", color: "white" }}>
          Songs
        </button>

        <button className="topButton" type="button">
          Artists
        </button>
      </div>

      <div className="tileContainer">
        {initialSongs.map((song) => (
          <SongTile
            key={song.id}
            song={song}
            onFindSimilar={openSimilarModal}
            onShare={handleShare}
          />
        ))}
      </div>

      {/* Find Similar Modal */}
      {isModalOpen && selectedSong && (
        <div
          className="modalOverlay"
          onClick={closeModal}
        >
          <div
            className={`similarModal ${
              hasSearched ? 'similarModalExpanded' : ''
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="similarModalTitle"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modalHeader">
              <div>
                <h2 id="similarModalTitle">Find Similar Music</h2>
                <p className="modalSubtitle">
                  Discover music similar to{' '}
                  <strong>{selectedSong.title}</strong> by{' '}
                  <strong>{selectedSong.artist}</strong>.
                </p>
              </div>

              <button
                className="closeModalButton"
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleFind}>
              <label className="searchLabel" htmlFor="similarSearch">
                What would you like to find?
              </label>

              <input
                id="similarSearch"
                className="similarSearchInput"
                type="text"
                placeholder="e.g. atmospheric production, deep lyrics..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />

              <p className="searchLabel">
                Choose the categories you want to explore:
              </p>

              <div className="categoryOptions">
                {[
                  'Artists',
                  'Instruments',
                  'Lyrical Content',
                  'Genre',
                  'Mood',
                  'Production Style',
                ].map((category) => (
                  <label className="categoryOption" key={category}>
                    <input
                      type="checkbox"
                      checked={searchCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>

              <button className="findButton" type="submit">
                Find
              </button>
            </form>

            {hasSearched && (
              <div className="similarResults">
                <div className="resultsHeader">
                  <h3>Similar Songs</h3>
                  <span>{similarSongs.length} results</span>
                </div>

                <p className="resultsDescription">
                  Showing example recommendations
                  {searchCategories.length > 0
                    ? ` based on ${searchCategories.join(', ')}`
                    : ''}
                  {searchQuery.trim()
                    ? ` for "${searchQuery.trim()}"`
                    : ''}
                  .
                </p>

                <div className="modalTileContainer">
                  {similarSongs.map((song) => (
                    <SongTile
                      key={song.id}
                      song={song}
                      onFindSimilar={openSimilarModal}
                      onShare={handleShare}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Share Toast */}
      {toastMessage && (
        <div className="shareToast" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default ExploreMusic;