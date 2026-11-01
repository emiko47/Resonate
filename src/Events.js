import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import EventMap from "./EventMap";
import EventDialog from "./EventDialog";
import CreateEvent from "./CreateEvent";
import { stringToColour } from "./Functions";
import {
  sampleEvents,
  eventGenres,
  dateLabel,
  timeLabel,
  readEventsStorage,
} from "./mockdata/Events";
import "./cssfiles/events.css";

const storageKey = "resonate.events.v1";
const demoCreator = { displayname: "Sebastian Ferrer", verifiedArtist: true };
function Tags({ genres }) {
  return (
    <div className="tagBag event-tags">
      {genres.map((name) => (
        <span
          key={name}
          className="tag"
          style={{ backgroundColor: stringToColour(name) }}
        >
          {name}
        </span>
      ))}
    </div>
  );
}

function Events() {
  const [created, setCreated] = useState(() =>
    readEventsStorage(`${storageKey}.created`, []),
  );
  const [saved, setSaved] = useState(() =>
    readEventsStorage(`${storageKey}.saved`, []),
  );
  const [going, setGoing] = useState(() =>
    readEventsStorage(`${storageKey}.going`, []),
  );
  const [drafts, setDrafts] = useState(() =>
    readEventsStorage(`${storageKey}.drafts`, []),
  );
  const [tab, setTab] = useState("Discover");
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [highlight, setHighlight] = useState(null);
  const [editing, setEditing] = useState(null);
  const draftSnapshot = useRef({});
  const [notice, setNotice] = useState("");
  const [params, setParams] = useSearchParams();
  const events = [...sampleEvents, ...created].sort((a, b) =>
    `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`),
  );
  const selected = events.find((event) => event.id === params.get("event"));
  const visible = events.filter(
    (event) =>
      (tab !== "Saved Events" || saved.includes(event.id)) &&
      (!genre || event.genres.includes(genre)) &&
      `${event.title} ${event.description} ${event.host} ${event.location} ${event.lineup.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  useEffect(() => {
    try {
      for (const [key, value] of Object.entries({
        created,
        saved,
        going,
        drafts,
      }))
        localStorage.setItem(`${storageKey}.${key}`, JSON.stringify(value));
    } catch {
      setNotice(
        "Browser storage is unavailable. Changes will last for this visit only.",
      );
    }
  }, [created, saved, going, drafts]);
  const open = (id) => {
    const next = new URLSearchParams(params);
    next.set("event", id);
    setParams(next);
  };
  const close = () => {
    const next = new URLSearchParams(params);
    next.delete("event");
    setParams(next, { replace: true });
  };
  const toggle = (setter, id) =>
    setter((previous) =>
      previous.includes(id)
        ? previous.filter((x) => x !== id)
        : [...previous, id],
    );
  async function share(event) {
    const url = new URL(window.location.href);
    url.searchParams.set("event", event.id);
    try {
      await navigator.clipboard.writeText(url.toString());
      setNotice(
        "Event link copied. Locally created events are available only in this browser.",
      );
    } catch {
      setNotice(`Copy this event link: ${url}`);
    }
  }
  function publish(form) {
    const id = `local-${Date.now()}`;
    setCreated((previous) => [
      ...previous,
      {
        ...form,
        id,
        host: demoCreator.displayname,
        attending: [],
        count: 0,
        match: null,
      },
    ]);
    setDrafts((previous) => previous.filter((d) => d.id !== editing?.id));
    setEditing(null);
    setTab("Discover");
    setQuery("");
    setGenre("");
    setNotice("Your event has been posted in this browser.");
    open(id);
  }
  return (
    <div className="events-page">
      <section className="event-list-panel" aria-labelledby="events-heading">
        <header className="events-heading">
          <div>
            <p>Discover</p>
            <h2 id="events-heading">Events</h2>
          </div>
          <span className="event-muted">Calgary, AB</span>
        </header>
        <div className="events-tabs" role="tablist" aria-label="Event lists">
          {["Discover", "Saved Events", "Drafts"].map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={tab === name}
              onClick={() => setTab(name)}
            >
              {name}
              {name === "Drafts" && drafts.length > 0
                ? ` (${drafts.length})`
                : ""}
            </button>
          ))}
        </div>
        {tab !== "Drafts" && (
          <div className="events-filters">
            <label>
              Search events
              <input
                type="search"
                placeholder="Title, artist, venue…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </label>
            <label>
              Genre
              <select value={genre} onChange={(e) => setGenre(e.target.value)}>
                <option value="">All genres</option>
                {eventGenres.map((name) => (
                  <option key={name}>{name}</option>
                ))}
              </select>
            </label>
          </div>
        )}
        <div className="event-list" aria-label={tab}>
          {tab === "Drafts" ? (
            drafts.length ? (
              drafts.map((draft) => (
                <article className="event-draft event-card" key={draft.id}>
                  <div>
                    <h3>{draft.title || "Untitled event"}</h3>
                    <p className="event-muted">Draft · not published</p>
                  </div>
                  <div className="event-actions">
                    <button onClick={() => setEditing(draft)}>
                      Continue editing
                    </button>
                    <button
                      onClick={() =>
                        setDrafts((previous) =>
                          previous.filter((d) => d.id !== draft.id),
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <p className="event-empty">
                No drafts yet. Save an event for later to find it here.
              </p>
            )
          ) : visible.length ? (
            visible.map((event) => (
              <article
                key={event.id}
                className={`event-card ${highlight === event.id ? "is-highlighted" : ""}`}
                onMouseEnter={() => setHighlight(event.id)}
                onMouseLeave={() => setHighlight(null)}
              >
                <div className="event-card-date">
                  <span>{dateLabel(event.date, { month: "short" })}</span>
                  <strong>{dateLabel(event.date, { day: "numeric" })}</strong>
                  <span>{timeLabel(event.time)}</span>
                </div>
                <div className="event-card-content">
                  <button
                    className="event-title-button"
                    onClick={() => open(event.id)}
                  >
                    <h3>{event.title}</h3>
                  </button>
                  <p>by {event.host}</p>
                  <p>{event.location}</p>
                  <p className="event-description">{event.description}</p>
                  <Tags genres={event.genres} />
                  <div className="event-card-footer">
                    <button
                      className="event-text-button"
                      onClick={() => open(event.id)}
                    >
                      View details →
                    </button>
                    <div className="event-actions">
                      <button
                        aria-label={`Share ${event.title}`}
                        onClick={() => share(event)}
                      >
                        Share
                      </button>
                      <button
                        aria-label={`Save ${event.title}`}
                        aria-pressed={saved.includes(event.id)}
                        onClick={() => toggle(setSaved, event.id)}
                      >
                        {saved.includes(event.id) ? "Saved" : "Save"}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="event-empty">
              <p>
                {tab === "Saved Events"
                  ? "No saved events match your filters."
                  : "No events match your search."}
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setGenre("");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
        <footer className="events-list-footer">
          {demoCreator.verifiedArtist && (
            <button
              className="create-event-button event-primary"
              onClick={() => setEditing({})}
            >
              Create Event
            </button>
          )}
          <span className="event-muted">Artist account · prototype</span>
        </footer>
        <p className="event-notice" role="status">
          {notice}
        </p>
      </section>
      <section className="event-map-panel" aria-label="Event locations">
        <div className="event-map-heading">
          <strong>Events near you</strong>
          <span className="event-muted">Select a pin to view details</span>
        </div>
        <EventMap
          events={visible}
          selectedId={highlight}
          onSelect={open}
          onHighlight={setHighlight}
        />
        <p className="event-map-caption">
          {visible.length} {visible.length === 1 ? "event" : "events"} ·
          Calgary, AB
        </p>
      </section>
      {editing && (
        <EventDialog
          title={editing.id ? "Continue your event" : "Create Event"}
          onClose={() => {
            setDrafts((previous) => [
              ...previous.filter((d) => d.id !== editing.id),
              {
                ...draftSnapshot.current,
                id: editing.id || `draft-${Date.now()}`,
              },
            ]);
            setEditing(null);
          }}
        >
          <CreateEvent
            onDraftChange={(form) => {
              draftSnapshot.current = form;
            }}
            initial={editing.title !== undefined ? editing : undefined}
            onPublish={publish}
            onSave={(form) => {
              setDrafts((previous) => [
                ...previous.filter((d) => d.id !== editing.id),
                { ...form, id: editing.id || `draft-${Date.now()}` },
              ]);
              setEditing(null);
              setNotice("Draft saved. Find it in Drafts.");
            }}
            onDiscard={() => {
              setDrafts((previous) =>
                previous.filter((d) => d.id !== editing.id),
              );
              setEditing(null);
            }}
          />
        </EventDialog>
      )}
      {selected && !editing && (
        <EventDialog title={selected.title} onClose={close}>
          <div className="event-detail">
            <p className="event-muted">Hosted by {selected.host}</p>
            <Tags genres={selected.genres} />
            <div className="event-detail-facts">
              <div>
                <strong>{dateLabel(selected.date)}</strong>
                <span>{timeLabel(selected.time)} · Calgary time</span>
              </div>
              <div>
                <strong>{selected.location}</strong>
                <span>{selected.address}</span>
              </div>
            </div>
            <section>
              <h3>About this event</h3>
              <p>{selected.description}</p>
            </section>
            <section>
              <h3>Lineup</h3>
              {selected.lineup.length ? (
                selected.lineup.map((artist) => (
                  <div className="event-lineup-row" key={artist}>
                    <span>{artist}</span>
                    <span className="event-muted">Preview not provided</span>
                  </div>
                ))
              ) : (
                <p className="event-muted">Lineup to be announced.</p>
              )}
            </section>
            <section>
              <h3>Your community</h3>
              {selected.match !== null && (
                <>
                  <label className="event-match-label">
                    Taste compatibility <strong>{selected.match}%</strong>
                  </label>
                  <progress
                    max="100"
                    value={selected.match}
                    aria-label="Demo taste compatibility"
                  />
                  <p className="event-muted">
                    Sample match based on demo music tastes.
                  </p>
                </>
              )}
              <p>
                {selected.count + (going.includes(selected.id) ? 1 : 0)}{" "}
                attending
                {selected.attending.length > 0
                  ? ` · ${selected.attending.join(", ")}`
                  : ""}
                {going.includes(selected.id) ? " · You" : ""}
              </p>
            </section>
            <footer className="event-actions">
              <button
                className="event-primary"
                aria-pressed={going.includes(selected.id)}
                onClick={() => toggle(setGoing, selected.id)}
              >
                {going.includes(selected.id) ? "Going ✓" : "RSVP"}
              </button>
              <button
                aria-pressed={saved.includes(selected.id)}
                onClick={() => toggle(setSaved, selected.id)}
              >
                {saved.includes(selected.id) ? "Saved" : "Save Event"}
              </button>
              <button onClick={() => share(selected)}>Share</button>
              {selected.ticketUrl && (
                <a href={selected.ticketUrl} target="_blank" rel="noreferrer">
                  External Ticket Link ↗
                </a>
              )}
            </footer>
            <p className="event-muted">
              RSVP records your interest; tickets are handled by the venue.
            </p>
            <p role="status" className="event-notice">
              {notice}
            </p>
          </div>
        </EventDialog>
      )}
    </div>
  );
}
export default Events;
