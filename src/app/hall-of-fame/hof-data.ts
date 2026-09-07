/**
 * Hall of Fame — competition podiums.
 *
 * Ported from PixelAlgorithm/l8halloffame (src/data/members.js). The
 * upstream repo is a standalone Vite app; here it's just the records,
 * re-shaped into the site's data model. SRNs from the source are kept
 * private — only name / team / placement is shown.
 */

export type Placement = "1st" | "2nd" | "3rd";

export type HofTeam = {
  placement: Placement;
  team: string;
  members: string[];
  note?: string;
};

export type HofEvent = {
  slug: string;
  event: string;
  year: string;
  blurb: string;
  teams: HofTeam[];
};

export const MEDAL: Record<Placement, string> = {
  "1st": "🥇",
  "2nd": "🥈",
  "3rd": "🥉",
};

export const PLACEMENT_LABEL: Record<Placement, string> = {
  "1st": "Champions",
  "2nd": "Runners-Up",
  "3rd": "2nd Runners-Up",
};

export const HOF: HofEvent[] = [
  {
    slug: "escape-matrix",
    event: "Escape Matrix",
    year: "2024",
    blurb:
      "A room-scale cybersecurity escape challenge — chained puzzle vectors, cipher locks and a live security matrix to break out of.",
    teams: [
      {
        placement: "1st",
        team: "The Final Clue",
        members: [
          "Krishnaja Jinka",
          "Hithesh H R",
          "Achyuth Sairam",
          "JyothiPriya P",
          "Pranavika V",
        ],
      },
      {
        placement: "2nd",
        team: "Dum Shit",
        members: [
          "Ashmita Chaki",
          "Bhuvigna Reddy A T",
          "Avrit Sharma",
          "Andey Hemanth",
          "Vinaayal G Dasika",
        ],
      },
      {
        placement: "3rd",
        team: "Blue Pill",
        members: [
          "Chennupati Niraj Kumar",
          "Huma Wahid",
          "Syed Ayaan",
          "Aaruni Choudhary",
          "Hamza Sahapurwaala",
          "Dhruv Jagadeesh Hemmige",
        ],
      },
    ],
  },
  {
    slug: "sudo-rm",
    event: "SUDO$RM",
    year: "2024 — 2025",
    blurb:
      "Jeopardy-style CTF run across campuses — web, pwn, forensics and privesc, scored live.",
    teams: [
      {
        placement: "1st",
        team: "Gnomes",
        note: "RR Campus · Semester 4",
        members: [
          "Aiman A Nawab",
          "Shreyas P Kulkarn",
          "Rizwan Shaikh",
          "Aditya Vats",
        ],
      },
      {
        placement: "2nd",
        team: "Hacksmiths",
        note: "ECC Campus · Semester 2",
        members: ["Sreehaas V", "Tarun Simha", "Shubam Joshi", "Rithvik R"],
      },
      {
        placement: "3rd",
        team: "JailBreakers",
        note: "ECC Campus · Semester 4",
        members: [
          "Satvik Das",
          "Adithya Singh",
          "Madhusudhan Karthikeyan",
          "Lakshya Jeet Singh",
        ],
      },
    ],
  },
];

export const TOTAL_INDUCTEES = HOF.reduce(
  (n, e) => n + e.teams.reduce((m, t) => m + t.members.length, 0),
  0,
);

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
