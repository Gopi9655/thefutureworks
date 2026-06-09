import type { CSSProperties } from "react";

// 24×24 stroke icons drawn with currentColor. Decorative by default
// (aria-hidden) — give an icon-only control its own aria-label.
const ICONS: Record<string, string> = {
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowUpRight: "M7 17 17 7M8 7h9v9",
  arrowDown: "M12 5v14M6 13l6 6 6-6",
  search: "M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3",
  mapPin: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0ZM12 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  briefcase: "M3 8h18v12H3zM8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 13h18",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 7v5l3 2",
  check: "M5 12.5 10 17l9-10",
  checkCircle: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM8.5 12l2.5 2.5L16 9",
  star: "M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9z",
  quote: "M7 7h4v6c0 2-1.5 3.5-4 4M14 7h4v6c0 2-1.5 3.5-4 4",
  menu: "M4 7h16M4 12h16M4 17h16",
  x: "M6 6l12 12M18 6 6 18",
  chevronDown: "M6 9l6 6 6-6",
  chevronRight: "M9 6l6 6-6 6",
  building: "M4 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M15 9h3a2 2 0 0 1 2 2v10M8 7h3M8 11h3M8 15h3M3 21h18",
  users: "M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM20 19v-1.5a3.5 3.5 0 0 0-2.6-3.4M15 4.2a3.5 3.5 0 0 1 0 6.6",
  sparkles: "M12 3l1.8 4.7L18.5 9l-4.7 1.3L12 15l-1.8-4.7L5.5 9l4.7-1.3zM19 14l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z",
  shield: "M12 3l8 3v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z M9 12l2 2 4-4",
  cap: "M3 9l9-4 9 4-9 4-9-4ZM7 11v5c0 1 2.2 2.5 5 2.5s5-1.5 5-2.5v-5M21 9v5",
  phone: "M5 4h3l2 5-2.5 1.5a12 12 0 0 0 5 5L19 18l-1 3a16 16 0 0 1-13-13z",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  send: "M22 3 11 14M22 3l-7 18-4-7-7-4z",
  filter: "M3 5h18l-7 8v6l-4 2v-8z",
  heart: "M12 20S4 14.5 4 9a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 5.5-8 11-8 11z",
  plus: "M12 5v14M5 12h14",
  calendar: "M4 6h16v15H4zM4 10h16M8 3v4M16 3v4",
  trendingUp: "M3 16l5-5 4 3 6-7M16 7h4v4",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z",
  handshake: "M8 11l3-3 3 3 3-3 3 3-5 5-1.5-1.5L13 17l-2-2-3 3-4-4 4-4z",
  play: "M8 5l11 7-11 7z",
  external: "M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5",
  globe2: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3 12h18M12 3c2.5 2.4 4 5.6 4 9s-1.5 6.6-4 9c-2.5-2.4-4-5.6-4-9s1.5-6.6 4-9z",
  bolt: "M13 3 4 14h6l-1 7 9-11h-6z",
  layers: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5",
  award: "M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM9 14l-1.5 7L12 19l4.5 2L15 14",
  doc: "M6 3h8l4 4v14H6zM14 3v4h4M9 13h6M9 17h6",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM15 9l-2 4-4 2 2-4z",
  linkedin: "M5 9v10M5 5.5v.01M10 19v-5.5a2.5 2.5 0 0 1 5 0V19M10 19v-7",
  rocket: "M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5M9 13l-2 2M11 15l-2 2M14 4c3 0 6 3 6 6 0 3-7 9-7 9l-4-4s6-7 9-7z",
  chart: "M4 20V4M4 20h16M8 16v-5M12 16V8M16 16v-8",
};

const SOLID = new Set(["star", "play", "bolt", "quote"]);

export interface IconProps {
  name: keyof typeof ICONS | string;
  size?: number;
  stroke?: number;
  className?: string;
  style?: CSSProperties;
  /** Set a label only when the icon is the sole content of an interactive control. */
  label?: string;
}

export function Icon({ name, size = 20, stroke = 1.7, className = "", style, label }: IconProps) {
  const d = ICONS[name];
  if (!d) return null;
  const solid = SOLID.has(name);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill={solid ? "currentColor" : "none"}
      stroke={solid ? "none" : "currentColor"}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <path d={d} />
    </svg>
  );
}

export default Icon;
