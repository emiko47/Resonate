import { useEffect, useRef, useState } from "react";
import EventMap from "./EventMap";
import DiscardButton from "./DiscardButton";
import Icon from "./Icon";
import { emptyEvent, eventGenres } from "./mockdata/Events";
import { stringToColour } from "./Functions";

export default function CreateEvent({
  initial,
  onPublish,
  onSave,
  onDiscard,
}) {
  const [form, setForm] = useState(initial || emptyEvent);
  const [error, setError] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const lookup = useRef(0);
  const timer = useRef(null);
  const controller = useRef(null);
  useEffect(() => () => {
    clearTimeout(timer.current);
    controller.current?.abort();
    lookup.current += 1;
  }, []);
  function beginLookup() {
    clearTimeout(timer.current);
    controller.current?.abort();
    controller.current = new AbortController();
    return { id: ++lookup.current, signal: controller.current.signal };
  }
  function changeAddress(address) {
    const request = beginLookup();
    setForm((previous) => ({ ...previous, address, coordinates: null }));
    setLocationStatus("");
    if (address.trim().length < 3) return;
    setLocationStatus("Looking up address…");
    timer.current = setTimeout(async () => {
      try {
        const params = new URLSearchParams({ q: address, format: "jsonv2", limit: "1" });
        const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, { signal: request.signal });
        if (!response.ok) throw new Error("Address lookup failed");
        const results = await response.json();
        if (request.id !== lookup.current) return;
        const point = results[0] && [Number(results[0].lat), Number(results[0].lon)];
        if (!point || !point.every(Number.isFinite)) {
          setLocationStatus("Address not found. Try a more complete address or place a pin.");
          return;
        }
        setForm((previous) => ({ ...previous, coordinates: point }));
        setLocationStatus("Address located on the map.");
      } catch (err) {
        if (request.id === lookup.current && err.name !== "AbortError")
          setLocationStatus("Could not look up this address. Try again or place a pin.");
      }
    }, 1000);
  }
  async function pickLocation(point) {
    const request = beginLookup();
    setForm((previous) => ({ ...previous, coordinates: point, address: "" }));
    setLocationStatus("Looking up pin address…");
    try {
      const params = new URLSearchParams({ lat: point[0], lon: point[1], format: "jsonv2" });
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?${params}`, { signal: request.signal });
      if (!response.ok) throw new Error("Address lookup failed");
      const result = await response.json();
      if (request.id !== lookup.current) return;
      if (!result.display_name) throw new Error("Address not found");
      setForm((previous) => ({ ...previous, address: result.display_name.slice(0, 200) }));
      setLocationStatus("Address filled from the map pin.");
    } catch (err) {
      if (request.id === lookup.current && err.name !== "AbortError")
        setLocationStatus("Could not find an address for this pin. Enter one manually.");
    }
  }
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
              onChange={(e) => changeAddress(e.target.value)}
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
              onPick={pickLocation}
            />
          </div>
          <span className="event-muted">
            {form.coordinates
              ? `Pin set: ${form.coordinates.map((n) => n.toFixed(4)).join(", ")}`
              : "Click to place a pin at your venue."}
          </span>
          <span className="event-muted" role="status">{locationStatus}</span>
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
      <footer className="event-actions creation-actions">
        <div className="creation-primary-actions">
          <button className="event-primary" type="submit">
            <Icon name="plus" size={17} />
            Post Event
          </button>
          <button type="button" onClick={() => onSave(form)}>
            <Icon name="save" size={17} />
            Save for Later
          </button>
        </div>
        <DiscardButton
          className="event-discard discard-action"
          subject="event"
          onDiscard={onDiscard}
        />
      </footer>
    </form>
  );
}
