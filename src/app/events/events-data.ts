/**
 * Events catalog, ported from ChatreshGudi/L8-Website-Events
 * (src/data/eventsData.js). The source's non-functional registration form was
 * dropped; LIVE/PENDING events link to the weekly sessions, ARCHIVED ones show
 * an archive note.
 */

export type EventStatus = "LIVE" | "PENDING" | "ARCHIVED";
export type EventCategory = "CTF" | "Workshop" | "Seminar";

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
    id: "ctf-2024",
    title: "Layer8 CTF 2024",
    status: "LIVE",
    category: "CTF",
    date: "2024.11.15",
    venue: "PES University, EC Campus - Auditorium & Online",
    desc: "Initializing global capture the flag sequence. Vulnerabilities identified in sector 7G. Operators required for immediate extraction and analysis.",
    prerequisites: "Basic networking, Linux CLI, Wireshark, Python",
    flags: "10 flags across Web, Crypto, Forensic and Pwn categories.",
    actionText: "join_ops",
    tags: ["ctf", "jeopardy", "pwn", "web", "crypto"],
  },
  {
    id: "workshop-crypto",
    title: "Advanced Cryptography Workshop",
    status: "PENDING",
    category: "Workshop",
    date: "2024.12.01",
    venue: "Lab 402, CS Block",
    desc: "Decoding modern encryption standards. Practical session on quantum-resistant algorithms, RSA attacks, and lattice-based cryptography.",
    prerequisites: "Basic Python, Linear Algebra & Modular Arithmetic",
    flags: "Certificate of completion upon decryption challenge success.",
    actionText: "register_now",
    tags: ["workshop", "crypto", "rsa", "lattice"],
  },
  {
    id: "web-sec-101",
    title: "Web Security 101: Exploiting OWASP Top 10",
    status: "PENDING",
    category: "Workshop",
    date: "2024.12.18",
    venue: "PESU EC Campus Seminar Hall",
    desc: "Hands-on exploitation of SQL Injections, Cross-Site Scripting (XSS), CSRF, and SSRF vulnerabilities in simulated targets.",
    prerequisites: "HTML, JavaScript, HTTP Basics, Burp Suite",
    flags: "Live target sandbox access provided during session.",
    actionText: "register_now",
    tags: ["workshop", "web", "owasp", "burp-suite"],
  },
  {
    id: "buffers",
    title: "Workshop: Intro to Buffer Overflows",
    status: "ARCHIVED",
    category: "Workshop",
    date: "2024.09.12",
    venue: "Lab 301, Mechanical Block",
    desc: "Memory manipulation techniques detailed, stack smashing protection bypasses, and shellcode injection in Linux x86.",
    prerequisites: "C Programming, Assembly (x86/x64) fundamentals",
    flags: "Logged archive session & binary challenges.",
    actionText: "view_logs",
    tags: ["workshop", "pwn", "assembly", "buffer-overflow"],
  },
  {
    id: "zerotrust",
    title: "Seminar: Zero Trust Architecture",
    status: "ARCHIVED",
    category: "Seminar",
    date: "2024.08.20",
    venue: "Virtual Keynote",
    desc: "Implementing identity-based perimeter defense and micro-segmentation strategies in enterprise cloud networks.",
    prerequisites: "Cloud Infrastructure Basics, IAM Fundamentals",
    flags: "Logged archive session & slides available.",
    actionText: "view_logs",
    tags: ["seminar", "cloud", "zero-trust", "architecture"],
  },
  {
    id: "network-forensics",
    title: "PCAP Analysis & Network Forensics Masterclass",
    status: "ARCHIVED",
    category: "Seminar",
    date: "2024.07.05",
    venue: "Online Interactive Stream",
    desc: "Analyzing packet captures for C2 traffic, data exfiltration, and malware beaconing using Wireshark and TShark.",
    prerequisites: "TCP/IP Model, Wireshark installation",
    flags: "Recorded telemetry and PCAP dump files archived.",
    actionText: "view_logs",
    tags: ["seminar", "forensics", "wireshark", "network"],
  },
];

export const EVENT_FILTERS = [
  "ALL",
  "LIVE",
  "WORKSHOPS",
  "CTF",
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
    case "SEMINARS":
      return ev.category === "Seminar";
    case "ARCHIVED":
      return ev.status === "ARCHIVED";
  }
}

/** Tailwind classes for a status badge — semantic, kept subtle. */
export function statusClasses(status: EventStatus): string {
  switch (status) {
    case "LIVE":
      return "text-[#4ade80] border-[#4ade80]/40";
    case "PENDING":
      return "text-[#fbbf24] border-[#fbbf24]/40";
    case "ARCHIVED":
      return "text-fg-faint border-border";
  }
}
