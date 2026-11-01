# Events contribution

Branch: `events-screen`, based on `origin/main` (`e3d19211`).

## Style references checked

- `main` and `home`: same commit; communities provide the finished card, tab, tag, and form styles. Home and Explore Music are placeholders.
- `events`: existing sample event list and Leaflet/OpenStreetMap integration; retained and extended.
- `mycollections`: moved app under `resonate/`; collections and explore screens are placeholders.
- `san`: app layout/routing work; home and explore screens are placeholders. Includes tracked dependencies, which are not imported into this contribution.
- `surrounds`: profile page and a bold active navigation item. Events uses the same active-item treatment through its own stylesheet.

## Included

- Search by title, description, host, venue, or lineup, combined with genre filtering.
- Map pins open details; hovering a pin highlights its associated card.
- Detail dialog with date, Calgary time, address, lineup, sample compatibility, attendance, RSVP, save, and share.
- Creation dialog with title limit, description, genre tags, venue/address, map location, date/time, lineup, and optional external ticket URL.
- Save for Later, resume/delete drafts, and recovery when closing creation with Escape or the close button.
- Browser-local persistence for posted events, drafts, saved events, and RSVPs.
- Native modal focus containment, Escape dismissal, focus restoration, and responsive layout.

## Prototype boundaries

There is no backend or authentication in this repository. The verified artist is a demo account; replace `demoCreator` with authenticated account data and enforce verification on the server when adding a backend. Published events and shared local-event links are limited to the current browser. Saved Events is self-contained pending the collections screen implementation.

Sample compatibility and attendance are marked as demo data. No audio assets were supplied, so lineup rows explicitly say previews are unavailable instead of simulating playback. Event records can be extended with licensed preview sources later. External ticket links are supplied by the event creator; RSVP does not purchase a ticket.

## Run

Use the existing project commands: `npm install`, `npm start`, `npm run build`, and `npm test -- --watchAll=false`. Open `/events`.

Focused tests in `src/Events.test.js` cover filtering, saved-event persistence, draft recovery/discard, map-location validation, publishing, and RSVP persistence.
