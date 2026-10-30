import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './cssfiles/events.css';

// Will move to a localStorage file and NOT hardcode it probably once the USER auth is figured out. 
const sampleEvents = [
  { id: 'sf', title: "Latin Rap Concert - Sebastian Ferrer", date: 'October 30', time: '7:00 PM', location: 'The King Eddy', description: "Come join Sebasitian in his album debut", coordinates: [51.0451, -114.0583] },
  { id: 'jazz-in-the-park', title: 'Jazz in the Park', date: 'November 2', time: '2:00 PM', location: "Prince's Island Park", description: 'An afternoon of live jazz by the river.', coordinates: [51.0531, -114.069] },
  { id: 'vinyl-swap', title: 'Vinyl Swap', date: 'November 7', time: '5:30 PM', location: 'Marda Loop Community Association', description: 'Bring records to trade and discover something new.', coordinates: [51.0316, -114.0718] },
  { id: 'songwriter-workshop', title: 'Songwriter Workshop', date: 'November 12', time: '6:00 PM', location: 'Calgary Central Library', description: 'A casual workshop for developing lyrics and melodies.', coordinates: [51.0446, -114.0578] },
];


//Sources: https://leafletjs.com/examples/quick-start/index.html, https://react.dev/reference/react/useEffect
function Events() {
  const mapElement = useRef(null);

  useEffect(() => {
    const map = L.map(mapElement.current, { scrollWheelZoom: true }).setView([51.0447, -114.066], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    sampleEvents.forEach((event) => {
      L.marker(event.coordinates, {
        icon: L.divIcon({
          className: 'event-map-pin',
          html: '<span aria-hidden="true"></span>',
          iconSize: [24, 24],
          iconAnchor: [12, 24],
        }),
      }).addTo(map);
    });

    return () => map.remove();
  }, []);

  return (
    <div className='events-page'>
      <section className='event-list-panel' aria-labelledby='events-heading'>
        <div className='events-heading'>
          <p>Discover</p>
          <h2 id='events-heading'>Events</h2>
        </div>
        <div className='event-list'>
          {sampleEvents.map((event) => (
            <article className='event-card' key={event.id}>
              <div className='event-card-date'>
                <span>{event.date.split(' ')[0]}</span>
                <strong>{event.date.split(' ')[1]}</strong>
              </div>
              <div className='event-card-content'>
                <h3>{event.title}</h3>
                <p>{event.time} · {event.location}</p>
                <p className='event-description'>{event.description}</p>
              </div>
            </article>
          ))}
        </div>
        <button className='create-event-button' type='button'>Create Event</button>
      </section>
      <section className='event-map-panel' aria-label='Event locations map'>
        <div className='events-map' ref={mapElement} />
      </section>
    </div>
  );
}

export default Events;
