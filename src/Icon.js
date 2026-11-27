import React from "react";
const paths = {
  minus: "M5 12h14",
  reply: "M9 5 3 11l6 6M3 11h10a7 7 0 0 1 7 7v3",
  home: "m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z",
  explore: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm4-16-3 7-7 3 3-7Z",
  users:
    "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m20 0v-2a4 4 0 0 0-3-3.87M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8m8-7.87a4 4 0 0 1 0 7.75",
  calendar:
    "M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2m3 10h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01",
  music:
    "M9 18V5l12-3v13M9 8l12-3M6 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6m12-3a3 3 0 1 0 0-6 3 3 0 0 0 0 6",
  bookmark: "M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1Z",
  chat: "M21 11.5a9 9 0 0 1-9 9 10 10 0 0 1-4-.9L2 22l1.9-6a10 10 0 0 1-.9-4 9 9 0 0 1 18-.5ZM8 12h.01M12 12h.01M16 12h.01",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9m-11 12a2 2 0 0 0 4 0",
  user: "M20 21v-2a6 6 0 0 0-6-6h-4a6 6 0 0 0-6 6v2M12 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8",
  search: "M21 21l-5-5M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15",
  plus: "M12 5v14M5 12h14",
  close: "m6 6 12 12M6 18 18 6",
  left: "m14 6-6 6 6 6",
  right: "m10 6 6 6-6 6",
  menu: "M4 6h16M4 12h16M4 18h16",
  share: "M12 16V3m-5 5 5-5 5 5M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8",
  pin: "M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Zm-8 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6",
  clock: "M12 8v5l3 2M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20",
  save: "M5 3h12l4 4v14H3V3Zm2 0v7h10V3M7 21v-7h10v7",
  trash: "M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7",
  check: "m5 12 4 4L19 6",
  edit: "m15 3 6 6M3 21l5-1L21 7l-4-4L4 16Z",
  warning: "m12 3 10 18H2Zm0 6v5m0 3h.01",
  headphones:
    "M3 14v-2a9 9 0 0 1 18 0v2M3 12h4v9H5a2 2 0 0 1-2-2Zm18 0h-4v9h2a2 2 0 0 0 2-2Z",
  arrow: "M5 12h14m-6-6 6 6-6 6",
  play: "m8 4 12 8-12 8Z",
};
export default function Icon({ name, size = 20, className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`app-icon ${className}`}
      {...props}
    >
      <path d={paths[name] || paths.music} />
    </svg>
  );
}
