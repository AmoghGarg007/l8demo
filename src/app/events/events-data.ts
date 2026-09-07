/**
 * Events catalog, ported from ChatreshGudi/L8-Website-Events
 * (src/data/eventsData.js). The source's non-functional registration form was
 * dropped; PENDING events link to the weekly sessions, ARCHIVED ones show an
 * archive note.
 */

export type EventStatus = "LIVE" | "PENDING" | "ARCHIVED";
export type EventCategory = "CTF" | "Workshop" | "Seminar" | "Contest";

export type L8Event = {
  id: string;
  title: string;
  status: EventStatus;
  category: EventCategory;
  date: string;
  venue: string;
  desc: string;
  prerequisites: string;
  flags: string;
  actionText: string;
  tags: string[];
};

export const EVENTS: L8Event[] = [
  {
    id: "deeplinks",
    title: "Deeplinks Workshop",
    status: "PENDING",
    category: "Workshop",
    date: "2026.09.30",
    venue: "Seminar Hall, PES University",
    desc: "Layer8 workshop diving into deep link exploitation, URL scheme hijacking, and mobile/web inter-app communication vulnerabilities.",
    prerequisites: "Basic web knowledge, HTTP fundamentals",
    flags: "Hands-on exploitation challenges.",
    actionText: "register_now",
    tags: ["workshop", "deeplinks", "mobile", "web", "exploitation"],
  },
  {
    id: "sudo-rm",
    title: "sudo$rm CTF 2026",
    status: "ARCHIVED",
    category: "CTF",
    date: "2026.04.11",
    venue: "Seminar Hall 3 & 4, PES University",
    desc: "Layer8 Capture The Flag contest. Participants solved multi-domain challenges across web exploitation, cryptography, OSINT, and reverse engineering across 4 progressive waves.",
    prerequisites:
      "Web exploitation, Cryptography, OSINT, Linux CLI & Network Analysis",
    flags:
      "57 teams (209 participants) competed across 4 progressive waves on a custom CTF platform with live leaderboard.",
    actionText: "view_logs",
    tags: ["ctf", "jeopardy", "web", "crypto", "osint", "sudorm"],
  },
  {
    id: "escape-the-matrix",
    title: "Escape The Matrix",
    status: "ARCHIVED",
    category: "Contest",
    date: "2025.10.11",
    venue: "Ground Floor Classrooms 001 & 002, PES University",
    desc: "Layer8 X Maaya flagship cybersecurity escape room event. Participants analyzed hidden clues, solved interactive murder mysteries, and decoded cryptographic ciphers.",
    prerequisites:
      "Beginner friendly — cipher decoding, problem solving & critical thinking",
    flags:
      "₹8,000 prize pool. 24 registered teams (20 active participant teams).",
    actionText: "view_logs",
    tags: [
      "escape-room",
      "maaya",
      "ciphers",
      "crypto",
      "puzzle",
      "murder-mystery",
    ],
  },
];

export const EVENT_FILTERS = [
  "ALL",
  "LIVE",
  "CTF",
  "WORKSHOPS",
  "CONTESTS",
  "SEMINARS",
  "ARCHIVED",
] as const;

export function matchesFilter(
  ev: L8Event,
  filter: (typeof EVENT_FILTERS)[number],
): boolean {
  switch (filter) {
    case "ALL":
      return true;
    case "LIVE":
      return ev.status === "LIVE";
    case "WORKSHOPS":
      return ev.category === "Workshop";
    case "CTF":
      return ev.category === "CTF";
    case "CONTESTS":
      return ev.category === "Contest";
    case "SEMINARS":
      return ev.category === "Seminar";
    case "ARCHIVED":
      return ev.status === "ARCHIVED";
  }
}

/**
 * Tailwind classes for a status badge. Kept on the site's single-accent
 * palette (no green/amber) — LIVE is full accent, PENDING a dimmer accent,
 * ARCHIVED fades to the neutral faint/border pair.
 */
export function statusClasses(status: EventStatus): string {
  switch (status) {
    case "LIVE":
      return "text-accent border-accent/40";
    case "PENDING":
      return "text-accent/70 border-accent/25";
    case "ARCHIVED":
      return "text-fg-faint border-border";
  }
}
