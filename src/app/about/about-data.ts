/**
 * Layer8 member roster for /about and /about/[domain].
 *
 * Sourced from the "Club Members (Responses)" form — every entry here consented
 * to being listed publicly. Role labels are normalised to
 * "<Unit> Head / Vice Head" / "<Group> Member". `getDomainMembers()` derives
 * each domain page's roster from `MEMBERS` (minus that domain's head/vice, and
 * minus alumni — alumni live on /legacy via `ALUMNI`).
 */

export type MemberGroup = "Club" | "Tech" | "Events" | "Media" | "Design";

export type Member = {
  slug: string;
  name: string;
  alias?: string;
  role: string;
  group: MemberGroup;
  year?: string;
  bio: string; // their tagline
  status: "current" | "alumni";
  github?: string;
  linkedin?: string;
  portfolio?: string;
  email: string; // may be "" when not provided
};

export const MEMBERS: Member[] = [
  {
    slug: "jyeshta-j",
    name: "Jyeshta J",
    alias: "jyeshta",
    role: "Events Member",
    group: "Events",
    year: "3rd year, CSE",
    bio: "See you Space Cowboy",
    status: "current",
    linkedin: "jyeshta-j-839500309",
    email: "jyeshtaj2006@gmail.com",
  },
  {
    slug: "ann-gracia-s",
    name: "Ann Gracia S",
    alias: "ann",
    role: "Events Member",
    group: "Events",
    year: "4th year, CSE",
    bio: "That's all it is, Miles. A leap of faith",
    status: "current",
    linkedin: "ann-gracia-s-567a54356",
    email: "ann.gracia07@gmail.com",
  },
  {
    slug: "srivaibhav-n",
    name: "Srivaibhav N",
    alias: "Redslayer112",
    role: "Tech Member",
    group: "Tech",
    year: "3rd year, CSE",
    bio: "",
    status: "current",
    email: "vaibhav.tolearn@gmail.com",
  },
  {
    slug: "achyuth-jois-m",
    name: "Achyuth Jois M",
    alias: "Shankar Nag",
    role: "Tech Member",
    group: "Tech",
    year: "2nd year, CSE",
    bio: "Seek God In Humans ;)",
    status: "current",
    github: "jois-code",
    linkedin: "achyuthjoism",
    portfolio: "https://jois-code.vercel.app",
    email: "achyuthjoism@gmail.com",
  },
  {
    slug: "chatresh-ramasai-gudi",
    name: "Chatresh Ramasai Gudi",
    alias: "Chatresh",
    role: "Tech Member",
    group: "Tech",
    year: "3rd year, CSE",
    bio: "Trust. Verify. Repeat.",
    status: "current",
    linkedin: "chatreshgudi",
    email: "chatreshrsg0202@gmail.com",
  },
  {
    slug: "aks-raj-singh",
    name: "Aks Raj Singh",
    role: "Media Member",
    group: "Media",
    year: "CSE",
    bio: "FERGIE TIME",
    status: "current",
    email: "aksvardhan2000@gmail.com",
  },
  {
    slug: "arnav-deva",
    name: "Arnav Deva",
    alias: "Cola",
    role: "Webmaster",
    group: "Tech",
    year: "2nd year, CSE (AIML)",
    bio: "Lore in progress ;)",
    status: "current",
    portfolio: "https://deva-arnav.vercel.app",
    email: "arnavdeva007@gmail.com",
  },
  {
    slug: "krishnaja-jinka",
    name: "Krishnaja Jinka",
    alias: "acrylicgecko",
    role: "Events Member",
    group: "Events",
    year: "2nd year, CSE",
    bio: "Always down for a new project, a spontaneous idea, or a mocha.",
    status: "current",
    email: "krish30.j@gmail.com",
  },
  {
    slug: "rithvik-deepak",
    name: "Rithvik Deepak",
    alias: "DPES",
    role: "Marketing Head (25-26)",
    group: "Media",
    year: "4th year, CSE (AIML)",
    bio: "Turning curiosity into impact, one challenge at a time.",
    status: "current",
    github: "rithvikd0605",
    linkedin: "rithvik-deepak-0992b136a",
    email: "rithvik0605@gmail.com",
  },
  {
    slug: "sriya-chandu",
    name: "Sriya Chandu",
    role: "Club Head",
    group: "Club",
    bio: "",
    status: "current",
    email: "",
  },
  {
    slug: "shreya-ajith",
    name: "Shreya Ajith",
    role: "Design Head",
    group: "Design",
    bio: "",
    status: "current",
    email: "",
  },
  {
    slug: "archita-agrawal",
    name: "Archita Agrawal",
    alias: "Archi",
    role: "Vice Club Head",
    group: "Club",
    year: "2nd year, CSE",
    bio: "Rage-baiting CTF players since 2025",
    status: "current",
    github: "architaagr",
    email: "architaagrawal2007@gmail.com",
  },
  {
    slug: "hiranmayi-b",
    name: "Hiranmayi B",
    alias: "Hiran",
    role: "Events Member",
    group: "Events",
    year: "2nd year, CSE (AIML)",
    bio: "",
    status: "current",
    linkedin: "hiranmayi-b-1426493bb",
    email: "baskarhiran@gmail.com",
  },
  {
    slug: "nandana-shyam",
    name: "Nandana Shyam",
    alias: "nandu",
    role: "Media Member",
    group: "Media",
    year: "2nd year, CSE (AIML)",
    bio: "kya tum mantally challenged ho my bwoy",
    status: "current",
    linkedin: "nandana-shyam-644248380",
    email: "nandanashyam@gmail.com",
  },
  {
    slug: "shreehari-b-deshpande",
    name: "Shreehari B Deshpande",
    role: "Tech Head (25-26)",
    group: "Tech",
    year: "4th year, CSE",
    bio: "I am exactly what I yearn to be.",
    status: "alumni",
    linkedin: "shreehari-b-deshpande",
    email: "shreehari.deshpande2005@gmail.com",
  },
  {
    slug: "heth-mehul-shah",
    name: "Heth Mehul Shah",
    alias: "H8",
    role: "Tech Head (25-26)",
    group: "Tech",
    year: "4th year, CSE",
    bio: "Put something good",
    status: "alumni",
    linkedin: "heth-shah-634848244",
    email: "hethshah12@gmail.com",
  },
  {
    slug: "saakshi-mohanty",
    name: "Saakshi Mohanty",
    alias: "Saki",
    role: "Events Vice Head",
    group: "Events",
    year: "CSE (AIML)",
    bio: "when life gets harder, i get harder",
    status: "current",
    linkedin: "saakshi-mohanty-417285252",
    email: "saakshi.mohanty@gmail.com",
  },
  {
    slug: "amogh-garg",
    name: "Amogh Garg",
    alias: "Tomato Tomahto",
    role: "Tech Vice Head",
    group: "Tech",
    year: "2nd year",
    bio: "Here by talent. Mostly luck. Let's not investigate further.",
    status: "current",
    github: "AmoghGarg007",
    linkedin: "amogh-garg-2k7",
    email: "amoghgarg2007@gmail.com",
  },
  {
    slug: "ianna-elizabeth-reni",
    name: "Ianna Elizabeth Reni",
    alias: "Eliza",
    role: "Tech Member",
    group: "Tech",
    year: "3rd year, CSE",
    bio: "Living in fiction",
    status: "current",
    email: "ianna.elizabeth.reni@gmail.com",
  },
  {
    slug: "himani-nune",
    name: "Himani Nune",
    role: "Events Member",
    group: "Events",
    year: "3rd year, CSE",
    bio: "Gimme food-",
    status: "current",
    linkedin: "himani-nune-41a03723b",
    email: "nune.himani@gmail.com",
  },
  {
    slug: "krithika-swaminathan",
    name: "Krithika Swaminathan",
    alias: "Valkyrie",
    role: "Media Vice Head",
    group: "Media",
    year: "2nd year, CSE",
    bio: "Somewhere between a plan and a plot twist",
    status: "current",
    linkedin: "krithika-swaminathan247",
    email: "krithikaswaminathan247@gmail.com",
  },
  {
    slug: "krisha-varma-k",
    name: "Krisha Varma K",
    role: "Events Member",
    group: "Events",
    year: "CSE",
    bio: "Debugging my life since forever.",
    status: "current",
    linkedin: "krisha-varma-konduru-4103aa426",
    email: "krishavarma27@gmail.com",
  },
  {
    slug: "rishil-abhijit-jalisatgi",
    name: "Rishil Abhijit Jalisatgi",
    role: "Tech Member",
    group: "Tech",
    year: "4th year, CSE",
    bio: "For those who come after.",
    status: "alumni",
    linkedin: "rishil-jalisatgi",
    email: "rishil.aj99@gmail.com",
  },
  {
    slug: "prajwal-m",
    name: "Prajwal M",
    alias: "PixelAlgorithm",
    role: "Tech Member",
    group: "Tech",
    year: "3rd year, CSE",
    bio: "Be the exploit !",
    status: "current",
    linkedin: "prajwal-m-",
    email: "studies.prajwalm@gmail.com",
  },
  {
    slug: "ankit-bembalgi",
    name: "Ankit Bembalgi",
    alias: "Ankit",
    role: "Tech Member",
    group: "Tech",
    year: "4th year, CSE (AIML)",
    bio: "",
    status: "current",
    portfolio: "https://ankitbembalgi.vercel.app",
    email: "ankitbembalgi@gmail.com",
  },
  {
    slug: "sohan-mr",
    name: "Sohan MR",
    role: "Media Head",
    group: "Media",
    year: "3rd year",
    bio: "Think like a hacker to stop one",
    status: "current",
    email: "sohan.rajannavar3646@gmail.com",
  },
  {
    slug: "riddhima-agarwal",
    name: "Riddhima Agarwal",
    alias: "Riddhi",
    role: "Design Vice Head",
    group: "Design",
    year: "2nd year, CSE",
    bio: "I m going to bed.",
    status: "current",
    email: "rriddhima.agarwal2004@gmail.com",
  },
  {
    slug: "p-mahema-sai",
    name: "P Mahema Sai",
    alias: "Mahe",
    role: "Events Member",
    group: "Events",
    year: "3rd year, CSE (AIML)",
    bio: "If the plot's good, I'm staying.",
    status: "current",
    linkedin: "mahema-sai",
    email: "mahemasai14@gmail.com",
  },
  {
    slug: "sai-sudeshna",
    name: "Sai Sudeshna",
    alias: "Sudeshna",
    role: "Media Member",
    group: "Media",
    year: "3rd year, CSE",
    bio: "With great password comes great security",
    status: "current",
    email: "saisudeshna@gmail.com",
  },
  {
    slug: "rithvik-a-m",
    name: "Rithvik A M",
    alias: "Rithrizz",
    role: "Tech Member",
    group: "Tech",
    year: "3rd year, ECE",
    bio: "Many interests. One direction: forward.",
    status: "alumni",
    linkedin: "amrithvik",
    email: "rithvikam2006@gmail.com",
  },
  {
    slug: "blason-raj",
    name: "Blason Raj",
    alias: "Blason",
    role: "Events Head",
    group: "Events",
    year: "3rd year, CSE",
    bio: "We are free",
    status: "current",
    github: "blason2108",
    linkedin: "blason-raj",
    email: "blasonrimmanuel311@gmail.com",
  },
  {
    slug: "isha-desai",
    name: "Isha Desai",
    role: "Media Member",
    group: "Media",
    year: "2nd year, CSE",
    bio: "Designing behind the firewall.",
    status: "current",
    email: "ishasd2308@gmail.com",
  },
  {
    slug: "shubhika-pradeep",
    name: "Shubhika Pradeep",
    alias: "Bee",
    role: "Tech Head",
    group: "Tech",
    year: "3rd year, CSE (AIML)",
    bio: "You know who I am",
    status: "current",
    portfolio: "https://sosportfolio.vercel.app",
    email: "shubhikaiyer@gmail.com",
  },
];

export type Domain = {
  slug: string;
  name: string;
  group: MemberGroup;
  tagline: string;
  headSlug: string;
  viceSlug: string;
};

export const DOMAINS: Domain[] = [
  {
    slug: "tech",
    name: "Tech",
    group: "Tech",
    tagline:
      "CTF infrastructure, challenge development, tooling and running the weekly sessions.",
    headSlug: "shubhika-pradeep",
    viceSlug: "amogh-garg",
  },
  {
    slug: "events",
    name: "Events",
    group: "Events",
    tagline:
      "CTFs, workshops, talks and inter-college competitions — everything with a date on it.",
    headSlug: "blason-raj",
    viceSlug: "saakshi-mohanty",
  },
  {
    slug: "media",
    name: "Media",
    group: "Media",
    tagline:
      "Writeups, socials, recaps and marketing. If it went out with the club's name on it, Media shipped it.",
    headSlug: "sohan-mr",
    viceSlug: "krithika-swaminathan",
  },
  {
    slug: "design",
    name: "Design",
    group: "Design",
    tagline:
      "Brand, posters, slides and the site. Makes the rest of it look deliberate.",
    headSlug: "shreya-ajith",
    viceSlug: "riddhima-agarwal",
  },
];

export function getMember(slug: string): Member | undefined {
  return MEMBERS.find((m) => m.slug === slug);
}

export function getDomain(slug: string): Domain | undefined {
  return DOMAINS.find((d) => d.slug === slug);
}

/**
 * A domain's roster: the *current* members in that group who aren't its head
 * or vice-head. Alumni are listed on /legacy instead (see ALUMNI).
 */
export function getDomainMembers(domainSlug: string): Member[] {
  const d = getDomain(domainSlug);
  if (!d) return [];
  const leads = new Set([d.headSlug, d.viceSlug]);
  return MEMBERS.filter(
    (m) => m.group === d.group && m.status === "current" && !leads.has(m.slug),
  ).sort((a, b) => a.name.localeCompare(b.name));
}

/** Everyone who's moved on — shown on /legacy, not the domain rosters. */
export const ALUMNI: Member[] = MEMBERS.filter(
  (m) => m.status === "alumni",
).sort((a, b) => a.name.localeCompare(b.name));

/**
 * The five heads shown on /about's "core" grid — club + one per domain.
 * `slug: null` leaves the seat visibly empty (that head hasn't filled the form).
 */
export const CORE_LEADS: { role: string; slug: string | null }[] = [
  { role: "Club Head", slug: "sriya-chandu" },
  { role: "Tech Head", slug: "shubhika-pradeep" },
  { role: "Events Head", slug: "blason-raj" },
  { role: "Media Head", slug: "sohan-mr" },
  { role: "Design Head", slug: "shreya-ajith" },
];

/** Slugs that have a photo at /members/<slug>.webp (from the form uploads). */
const PHOTO_SLUGS = new Set([
  "achyuth-jois-m",
  "aks-raj-singh",
  "amogh-garg",
  "ankit-bembalgi",
  "ann-gracia-s",
  "archita-agrawal",
  "arnav-deva",
  "blason-raj",
  "chatresh-ramasai-gudi",
  "himani-nune",
  "hiranmayi-b",
  "ianna-elizabeth-reni",
  "isha-desai",
  "jyeshta-j",
  "krisha-varma-k",
  "krishnaja-jinka",
  "krithika-swaminathan",
  "nandana-shyam",
  "p-mahema-sai",
  "prajwal-m",
  "riddhima-agarwal",
  "rishil-abhijit-jalisatgi",
  "rithvik-a-m",
  "rithvik-deepak",
  "saakshi-mohanty",
  "shreehari-b-deshpande",
  "sohan-mr",
  "srivaibhav-n",
  "shreya-ajith",
]);

export function photoUrl(slug: string): string | undefined {
  return PHOTO_SLUGS.has(slug) ? `/members/${slug}.webp` : undefined;
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
