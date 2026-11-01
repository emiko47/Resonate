import { useEffect, useState } from "react";
import EventMap from "./EventMap";
import { emptyEvent, eventGenres } from "./mockdata/Events";
import { stringToColour } from "./Functions";

export default function CreateEvent({
  initial,
  onPublish,
  onSave,
  onDiscard,
  onDraftChange,
}) {
  const [form, setForm] = useState(initial || emptyEvent);
  const [error, setError] = useState("");
  useEffect(() => {
    onDraftChange(form);
  }, [form, onDraftChange]);
  const update = (key, value) =>
    setForm((previous) => ({ ...previous, [key]: value }));
  const today = new Date().toLocaleDateString("en-CA");
  function submit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.location.trim())
      return setError("Enter a title, description, and venue name.");
    if (!form.coordinates)
      return setError("Choose the event location on the map.");
    if (!form.genres.length) return setError("Select at least one genre.");
    if (new Date(`${form.date}T${form.time}`) <= new Date())
      return setError("Choose a date and time in the future.");
    if (form.ticketUrl && !/^https?:\/\//i.test(form.ticketUrl))
      return setError("Use a complete http or https ticket link.");
    onPublish({
      ...form,
      title: form.title.trim(),
      description: form.description.trim(),
      lineup: form.lineupText
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
    });
  }
  return (
    <form className="event-form" onSubmit={submit}>
      <p className="event-muted">
        Share a performance with your local music community.
      </p>
      <label>
        Title <span className="event-muted">({form.title.length}/80)</span>
        <input
          required
          maxLength={80}
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="Give your event a name"
        />
      </label>
      <label>
        Description
        <textarea
          required
          maxLength={2000}
          rows={3}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="What can listeners look forward to?"
        />
      </label>
      <fieldset>
        <legend>
          Genres <span className="event-muted">· select at least one</span>
        </legend>
        <div className="event-genre-options">
          {eventGenres.map((genre) => (
            <button
              type="button"
              key={genre}
              aria-pressed={form.genres.includes(genre)}
              style={
                form.genres.includes(genre)
                  ? { backgroundColor: stringToColour(genre) }
                  : undefined
              }
              onClick={() =>
                update(
                  "genres",
                  form.genres.includes(genre)
                    ? form.genres.filter((g) => g !== genre)
                    : [...form.genres, genre],
                )
              }
            >
              {genre}
            </button>
          ))}
        </div>
      </fieldset>
      <div className="event-form-columns">
        <div className="event-form-fields">
          <label>
            Venue
            <input
              required
              maxLength={120}
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              placeholder="Venue name"
            />
          </label>
          <label>
            Address
            <input
              required
              maxLength={200}
              value={form.address}
              onChange={(e) => update("address", e.target.value)}
              placeholder="Street address, Calgary"
            />
          </label>
          <div className="event-form-columns">
            <label>
              Date
              <input
                required
                type="date"
                min={today}
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
              />
            </label>
            <label>
              Time (Calgary)
              <input
                required
                type="time"
                value={form.time}
                onChange={(e) => update("time", e.target.value)}
              />
            </label>
          </div>
        </div>
        <div>
          <span className="event-field-label">Choose location on map</span>
          <div className="event-picker-map">
            <EventMap
              coordinates={form.coordinates}
              onPick={(point) => update("coordinates", point)}
            />
          </div>
          <span className="event-muted">
            {form.coordinates
              ? `Pin set: ${form.coordinates.map((n) => n.toFixed(4)).join(", ")}`
              : "Click to place a pin at your venue."}
          </span>
        </div>
      </div>
      <label>
        Performing artists{" "}
        <span className="event-muted">· optional, separated by commas</span>
        <input
          maxLength={300}
          value={form.lineupText}
          onChange={(e) => update("lineupText", e.target.value)}
          placeholder="Artist one, Artist two"
        />
      </label>
      <label>
        External ticket link <span className="event-muted">· optional</span>
        <input
          type="url"
          maxLength={1000}
          value={form.ticketUrl}
          onChange={(e) => update("ticketUrl", e.target.value)}
          placeholder="https://"
        />
      </label>
      {error && (
        <p role="alert" className="event-error">
          {error}
        </p>
      )}
      <footer className="event-actions">
        <button className="event-primary" type="submit">
          Post Event
        </button>
        <button type="button" onClick={() => onSave(form)}>
          Save for Later
        </button>
        <button className="event-discard" type="button" onClick={onDiscard}>
          Discard
        </button>
      </footer>
    </form>
  );
}
