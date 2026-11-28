import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cssfiles/createcommunity.css";
import DiscardButton from "./DiscardButton";
import Icon from "./Icon";
import { genres as suggestedGenres } from "./mockdata/Genres";
function CreateCommunity() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [genres, setGenres] = useState([]);
  const [customGenre, setCustomGenre] = useState("");
  const [error, setError] = useState("");
  const dirty = Boolean(name || description || genres.length || customGenre);
  const slug =
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "your-community";
  function toggleGenre(genre) {
    setGenres((previous) =>
      previous.includes(genre)
        ? previous.filter((item) => item !== genre)
        : [...previous, genre],
    );
  }
  function addGenre() {
    const value = customGenre.trim();
    if (
      value &&
      !genres.some((item) => item.toLowerCase() === value.toLowerCase())
    )
      setGenres((previous) => [...previous, value]);
    setCustomGenre("");
  }
  return (
    <form
      id="createCommunityRoot"
      className="composition-page"
      onSubmit={(event) => {
        event.preventDefault();
        if (!name.trim() || !description.trim()) {
          setError("Add a community name and description.");
          return;
        }
        if (!genres.length) {
          setError(
            "Choose at least one genre to help people discover your community.",
          );
          return;
        }
        navigate("/communities/example");
      }}
    >
      <DiscardButton
        label="Back to communities"
        icon="left"
        className="screen-back"
        dirty={dirty}
        subject="community"
        onDiscard={() => navigate("/communities")}
      />
      <header className="composition-heading">
        <span className="eyebrow">FIND YOUR SHARED SOUND</span>
        <h1>Create a community</h1>
        <p>
          Make a home for the music you love and the people who love it too.
        </p>
      </header>
      <div className="composition-card">
        <div className="composition-community">
          <Icon name="users" size={20} />
          <span>A new space for your music community</span>
        </div>
        <div className="community-field">
          <label htmlFor="community-name">Community name</label>
          <input
            id="community-name"
            aria-describedby="community-name-count"
            required
            maxLength={60}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="e.g. Calgary Shoegaze"
          />
          <small id="community-name-count" className="field-hint">
            {name.length}/60 characters
          </small>
        </div>
        <div className="community-url-preview">
          <Icon name="explore" size={16} />
          <span>
            Community address preview
            <br />
            <strong>resonate / communities / {slug}</strong>
          </span>
        </div>
        <fieldset className="community-genres">
          <legend>What genres bring you together?</legend>
          <p>Choose a few genres so the right listeners can find you.</p>
          <div className="community-genre-options">
            {[...new Set([...suggestedGenres, ...genres])].map((genre) => (
              <button
                key={genre}
                type="button"
                aria-pressed={genres.includes(genre)}
                onClick={() => toggleGenre(genre)}
              >
                {genres.includes(genre) && <Icon name="check" size={13} />}{" "}
                {genre}
              </button>
            ))}
          </div>
          <div className="community-custom-genre">
            <input
              aria-label="Add another genre"
              maxLength={30}
              value={customGenre}
              onChange={(event) => setCustomGenre(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  addGenre();
                }
              }}
              placeholder="Add another genre"
            />
            <button
              type="button"
              onClick={addGenre}
              disabled={!customGenre.trim()}
            >
              <Icon name="plus" size={16} />
              Add
            </button>
          </div>
        </fieldset>
        <div className="community-field">
          <label htmlFor="community-description">About your community</label>
          <textarea
            id="community-description"
            aria-describedby="community-description-count"
            required
            rows={5}
            maxLength={1000}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="What can people discover here? Tell them about your sound, your conversations, and what makes this space yours."
          />
          <small id="community-description-count" className="field-hint">
            {description.length}/1000 characters
          </small>
        </div>
        {error && (
          <p role="alert" className="event-error">
            {error}
          </p>
        )}
        <div className="creation-actions">
          <div className="creation-primary-actions">
            <button className="community-create-button" type="submit">
              <Icon name="plus" size={17} />
              Create Community
            </button>
          </div>
          <DiscardButton
            className="discard-action"
            subject="community"
            onDiscard={() => navigate("/communities")}
          />
        </div>
      </div>
    </form>
  );
}
export default CreateCommunity;
