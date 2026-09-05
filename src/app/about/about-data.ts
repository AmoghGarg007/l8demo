/**
 * Domain heads/vice-heads (and each domain's full roster) for /about and
 * /about/[domain]. Names, bios and social handles are placeholders — swap
 * them for the real roster. Slugs are stable ids used to look members up.
 */

export type Member = {
  slug: string;
  name: string;
  role: string;
  group: "Club" | "Tech" | "Events" | "Media" | "Design";
  bio: string;
  github: string; // github.com/<github>
  linkedin: string; // linkedin.com/in/<linkedin>
  email: string;
};

export const MEMBERS: Member[] = [
  {
    slug: "marcus-antonius",
    name: "Marcus Antonius",
    role: "Club Head",
    group: "Club",
    bio: "Runs Layer8 end to end — the calendar, the department relationship, and whatever is on fire that week. Plays web and does most of the challenge review before a CTF ships.",
    github: "marcusantonius",
    linkedin: "marcus-antonius",
    email: "marcus.antonius@pesu.pes.edu",
  },
  {
    slug: "livia-drusilla",
    name: "Livia Drusilla",
    role: "Club Vice-Head",
    group: "Club",
    bio: "Second point of contact for everything, and the person who keeps the four domains talking to each other. Background in forensics and incident write-ups.",
    github: "liviadrusilla",
    linkedin: "livia-drusilla",
    email: "livia.drusilla@pesu.pes.edu",
  },
  {
    slug: "gaius-plinius",
    name: "Gaius Plinius",
    role: "Tech Head",
    group: "Tech",
    bio: "Owns the CTF infrastructure and the challenge pipeline. Writes pwn and reversing challenges and maintains the scoreboard deploy.",
    github: "gaiusplinius",
    linkedin: "gaius-plinius",
    email: "gaius.plinius@pesu.pes.edu",
  },
  {
    slug: "aulus-persius",
    name: "Aulus Persius",
    role: "Tech Vice-Head",
    group: "Tech",
    bio: "Runs the weekly sessions and onboards new members onto the tooling. Crypto is his lane; automating the boring parts is his hobby.",
    github: "aoluspersius",
    linkedin: "aulus-persius",
    email: "aulus.persius@pesu.pes.edu",
  },
  {
    slug: "fulvia-flacca",
    name: "Fulvia Flacca",
    role: "Events Head",
    group: "Events",
    bio: "Plans the calendar — CTFs, workshops, talks and inter-college events. If it has a date and a room booking, it went through her.",
    github: "fulviaflacca",
    linkedin: "fulvia-flacca",
    email: "fulvia.flacca@pesu.pes.edu",
  },
  {
    slug: "decimus-brutus",
    name: "Decimus Brutus",
    role: "Events Vice-Head",
    group: "Events",
    bio: "Logistics and sponsor coordination for the bigger events. Steps in as MC and keeps the run-of-show honest on the day.",
    github: "decimusbrutus",
    linkedin: "decimus-brutus",
    email: "decimus.brutus@pesu.pes.edu",
  },
  {
    slug: "julia-agrippina",
    name: "Julia Agrippina",
    role: "Media Head",
    group: "Media",
    bio: "Owns the club's public voice — writeups, socials, recaps and the newsletter. Edits every post before it goes out with the Layer8 name on it.",
    github: "juliaagrippina",
    linkedin: "julia-agrippina",
    email: "julia.agrippina@pesu.pes.edu",
  },
  {
    slug: "servius-tullius",
    name: "Servius Tullius",
    role: "Media Vice-Head",
    group: "Media",
    bio: "Runs the posting schedule and the photo/video coverage at events. Turns rough session notes into things people actually read.",
    github: "serviustullius",
    linkedin: "servius-tullius",
    email: "servius.tullius@pesu.pes.edu",
  },
  {
    slug: "claudia-pulchra",
    name: "Claudia Pulchra",
    role: "Design Head",
    group: "Design",
    bio: "Owns the brand — posters, slide decks, event identity and this site. Makes sure the rest of the club's output looks deliberate.",
    github: "claudiapulchra",
    linkedin: "claudia-pulchra",
    email: "claudia.pulchra@pesu.pes.edu",
  },
  {
    slug: "marcus-vitruvius",
    name: "Marcus Vitruvius",
    role: "Design Vice-Head",
    group: "Design",
    bio: "Production design and templates — keeps the asset library current so nobody rebuilds a poster from scratch. Front-end tinkerer on the side.",
    github: "marcusvitruvius",
    linkedin: "marcus-vitruvius",
    email: "marcus.vitruvius@pesu.pes.edu",
  },
];

export type Domain = {
  slug: string;
  name: string;
  tagline: string;
  headSlug: string;
  viceSlug: string;
};

export const DOMAINS: Domain[] = [
  {
    slug: "tech",
    name: "Tech",
    tagline:
      "CTF infrastructure, challenge development, tooling and running the weekly sessions.",
    headSlug: "gaius-plinius",
    viceSlug: "aulus-persius",
  },
  {
    slug: "events",
    name: "Events",
    tagline:
      "CTFs, workshops, talks and inter-college competitions — everything with a date on it.",
    headSlug: "fulvia-flacca",
    viceSlug: "decimus-brutus",
  },
  {
    slug: "media",
    name: "Media",
    tagline:
      "Writeups, socials, recaps and the newsletter. If it went out with the club's name on it, Media shipped it.",
    headSlug: "julia-agrippina",
    viceSlug: "servius-tullius",
  },
  {
    slug: "design",
    name: "Design",
    tagline:
      "Brand, posters, slides and the site. Makes the rest of it look deliberate.",
    headSlug: "claudia-pulchra",
    viceSlug: "marcus-vitruvius",
  },
];

export function getMember(slug: string): Member | undefined {
  return MEMBERS.find((m) => m.slug === slug);
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function getDomain(slug: string): Domain | undefined {
  return DOMAINS.find((d) => d.slug === slug);
}

/* ------------------------------------------------------------------ */
/*  full domain rosters (rank-and-file members, not core)             */
/* ------------------------------------------------------------------ */

export type DomainMember = {
  name: string;
  focus: string; // primary lane, e.g. "web", "pwn"
  year: string;
  role?: string; // special title alongside focus/year, e.g. "Webmaster"
};

/**
 * Members per domain, beyond the head/vice-head. Placeholder names — swap for
 * the real roster. Only `tech` is populated for now; the other domains render
 * a "roster being finalised" placeholder until members are added.
 */
export const DOMAIN_MEMBERS: Record<string, DomainMember[]> = {
  tech: [
    { name: "Marcus Livius", focus: "web", year: "3rd year", role: "Webmaster" },
    { name: "Quintus Ennius", focus: "web", year: "3rd year" },
    { name: "Lucius Cornelius", focus: "pwn", year: "3rd year" },
    { name: "Titus Lucretius", focus: "reversing", year: "2nd year" },
    { name: "Gaius Valerius", focus: "crypto", year: "2nd year" },
    { name: "Publius Ovidius", focus: "web", year: "2nd year" },
    { name: "Sextus Propertius", focus: "infra", year: "2nd year" },
    { name: "Aulus Gellius", focus: "forensics", year: "1st year" },
    { name: "Gnaeus Naevius", focus: "pwn", year: "1st year" },
    { name: "Marcus Terentius", focus: "web", year: "1st year" },
    { name: "Lucia Caecilia", focus: "crypto", year: "1st year" },
  ],
  events: [],
  media: [],
  design: [],
};

export function getDomainMembers(slug: string): DomainMember[] {
  return DOMAIN_MEMBERS[slug] ?? [];
}
