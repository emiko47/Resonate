export const eventGenres = [
  "Latin Rap",
  "Jazz",
  "Bedroom Pop",
  "Dream Pop",
  "Indie",
  "Electronic",
  "Folk",
];
export const sampleEvents = [
  {
    id: "sebastian-live",
    title: "Latin Rap Performance Night!",
    host: "Sebastian Ferrer",
    date: "2026-11-06",
    time: "22:00",
    location: "The King Eddy",
    address: "438 9 Avenue SE, Calgary",
    description:
      "Join Sebastian for an evening of Latin rap, new tracks, and familiar favourites. Meet other local listeners and celebrate the release of his debut album.",
    coordinates: [51.0446, -114.0533],
    genres: ["Latin Rap"],
    lineup: ["Sebastian Ferrer", "Luna Roja"],
    attending: ["Jason", "Tinu", "Rayan"],
    count: 34,
    match: 86,
  },
  {
    id: "jazz-in-the-park",
    title: "Jazz in the Park",
    host: "River Sessions",
    date: "2026-11-07",
    time: "14:00",
    location: "Prince’s Island Park",
    address: "698 Eau Claire Avenue SW, Calgary",
    description:
      "An afternoon of live jazz by the river. Bring a warm layer, meet the local quartet, and settle in for an intimate acoustic set.",
    coordinates: [51.0531, -114.069],
    genres: ["Jazz"],
    lineup: ["River Quartet"],
    attending: ["Jason", "Charli"],
    count: 21,
    match: 72,
  },
  {
    id: "bedroom-pop",
    title: "A Little Dream Pop",
    host: "Velvet Room",
    date: "2026-11-13",
    time: "19:30",
    location: "The Attic Bar & Stage",
    address: "1413 9 Avenue SE, Calgary",
    description:
      "A small room, dreamy guitars, and a lineup of independent bedroom-pop artists. Come discover your next favourite and talk music between sets.",
    coordinates: [51.0415, -114.0305],
    genres: ["Bedroom Pop", "Dream Pop"],
    lineup: ["Mira June", "Soft Static", "Window Seat"],
    attending: ["Charli", "Rayan", "Tinu"],
    count: 48,
    match: 94,
  },
  {
    id: "songwriter-workshop",
    title: "Songwriter Workshop",
    host: "Calgary Song Circle",
    date: "2026-11-19",
    time: "18:00",
    location: "Calgary Central Library",
    address: "800 3 Street SE, Calgary",
    description:
      "A casual workshop for developing lyrics and melodies. Bring an unfinished song or just listen. All experience levels welcome.",
    coordinates: [51.0454, -114.0557],
    genres: ["Indie", "Folk"],
    lineup: ["Calgary Song Circle"],
    attending: ["Tinu"],
    count: 12,
    match: 78,
  },
];
export const emptyEvent = () => ({
  title: "",
  description: "",
  location: "",
  address: "",
  date: "",
  time: "",
  genres: [],
  lineupText: "",
  ticketUrl: "",
  coordinates: null,
});
export const dateLabel = (
  date,
  options = { month: "long", day: "numeric", year: "numeric" },
) => new Date(`${date}T12:00:00`).toLocaleDateString("en-CA", options);
export const timeLabel = (time) =>
  new Date(`2000-01-01T${time}`).toLocaleTimeString("en-CA", {
    hour: "numeric",
    minute: "2-digit",
  });
export function readEventsStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : fallback;
  } catch {
    return fallback;
  }
}
