import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function EventMap({
  events = [],
  selectedId,
  onSelect,
  onHighlight,
  coordinates,
  onPick,
}) {
  const element = useRef(null);
  const mapRef = useRef(null);
  const boundsKey = useRef("");
  const callbacks = useRef({ onSelect, onHighlight, onPick });
  callbacks.current = { onSelect, onHighlight, onPick };
  useEffect(() => {
    const map = L.map(element.current, { scrollWheelZoom: false }).setView(
      [51.045, -114.06],
      13,
    );
    mapRef.current = map;
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    map.on("click", (e) =>
      callbacks.current.onPick?.([e.latlng.lat, e.latlng.lng]),
    );
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(element.current);
    return () => {
      observer.disconnect();
      map.remove();
      mapRef.current = null;
    };
  }, []);
  useEffect(() => {
    const map = mapRef.current;
    const layer = L.layerGroup().addTo(map);
    const pins = onPick
      ? coordinates
        ? [{ id: "location", title: "Selected location", coordinates }]
        : []
      : events;
    pins.forEach((event) => {
      const marker = L.marker(event.coordinates, {
        title: event.title,
        keyboard: true,
        icon: L.divIcon({
          className: `event-map-pin ${selectedId === event.id ? "is-selected" : ""}`,
          html: '<span aria-hidden="true"></span>',
          iconSize: [24, 30],
          iconAnchor: [12, 30],
        }),
      }).addTo(layer);
      marker.bindTooltip(event.title);
      marker.on("click", () => callbacks.current.onSelect?.(event.id));
      marker.on("mouseover", () => callbacks.current.onHighlight?.(event.id));
      marker.on("mouseout", () => callbacks.current.onHighlight?.(null));
    });
    if (onPick && coordinates) map.panTo(coordinates);
    else if (
      pins.length &&
      boundsKey.current !== JSON.stringify(pins.map((e) => e.coordinates))
    ) {
      boundsKey.current = JSON.stringify(pins.map((e) => e.coordinates));
      map.fitBounds(L.latLngBounds(pins.map((e) => e.coordinates)), {
        padding: [35, 35],
        maxZoom: 14,
      });
    }
    return () => layer.remove();
  }, [events, coordinates, onPick, selectedId]);
  return (
    <div className="events-map">
      <div
        className="event-map-canvas"
        ref={element}
        aria-label={
          onPick
            ? "Click the Calgary map to choose an event location"
            : "Calgary event locations"
        }
      />
      {onPick && (
        <button
          className="event-map-pick-center"
          type="button"
          onClick={() => {
            const point = mapRef.current.getCenter();
            onPick([point.lat, point.lng]);
          }}
        >
          Use map centre
        </button>
      )}
    </div>
  );
}
