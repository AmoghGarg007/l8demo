/**
 * Layer8 member roster for /about and /about/[domain].
 *
 * Sourced from the "Club Members (Responses)" form — every entry here is a
 * member who consented to being listed publicly. `getDomainMembers()` derives
 * each domain page's roster from `MEMBERS` (minus that domain's head/vice).
 */

export type MemberGroup = "Club" | "Tech" | "Events" | "Media" | "Design";

export type Member = {
  slug: string;
  name: string;
  alias?: string;
  role: string;
  group: MemberGroup;
  year?: string; // year & branch, as given
  bio: string; // their tagline
  status: "current" | "alumni";
  github?: string; // github.com/<github>
  linkedin?: string; // linkedin.com/in/<linkedin>
  portfolio?: string; // full url
  email: string;
};

export const MEMBERS: Member[] = [
  {
    slug: "jyeshta-j",
    name: "Jyeshta J",
    alias: "jyeshta",
    role: "EveOps Member",
    group: "Events",
    year: "2028, CSE",
    bio: "See you Space Cowboy",
    status: "current",
    linkedin: "jyeshta-j-839500309",
    email: "jyeshtaj2006@gmail.com",
  },
  {
    slug: "ann-gracia-s",
    name: "Ann Gracia S",
    alias: "ann",
    role: "Member",
    group: "Events",
    year: "2025 CSE",
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
    year: "2028, CSE",
    bio: "",
    status: "current",
    email: "vaibhav.tolearn@gmail.com",
  },
  {
    slug: "achyuth-jois-m",
    name: "Achyuth Jois M",
    alias: "Shankar Nag",
    role: "Technical Member",
    group: "Tech",
    year: "2029, CSE",
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
    year: "2024-28, CSE",
    bio: "FERGIE TIME",
    status: "current",
    email: "aksvardhan2000@gmail.com",
  },
  {
    slug: "arnav-deva",
    name: "Arnav Deva",
    alias: "Cola",
    role: "Webmaster 26-27",
    group: "Tech",
    year: "2nd year, CSE-AIML",
    bio: "Lore in progress ;)",
    status: "current",
    portfolio: "https://deva-arnav.vercel.app",
    email: "arnavdeva007@gmail.com",
  },
  {
    slug: "krishnaja-jinka",
    name: "Krishnaja Jinka",
    alias: "acrylicgecko",
    role: "Events & Ops Member",
    group: "Events",
    year: "2029, CSE",
    bio: "Always down for a new project, a spontaneous idea, or a mocha.",
    status: "current",
    email: "krish30.j@gmail.com",
  },
  {
    slug: "rithvik-deepak",
    name: "Rithvik Deepak",
    alias: "DPES",
    role: "Marketing Head 25-26",
    group: "Media",
    year: "4th year, CSE (AI&ML)",
    bio: "Turning curiosity into impact, one challenge at a time.",
    status: "current",
    github: "rithvikd0605",
    linkedin: "rithvik-deepak-0992b136a",
    email: "rithvik0605@gmail.com",
  },
  {
    slug: "archita-agrawal",
    name: "Archita Agrawal",
    alias: "Archi",
    role: "Vice Club Head 26-27",
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
    year: "2nd year, AIML",
    bio: "",
    status: "current",
    linkedin: "hiranmayi-b-1426493bb",
    email: "baskarhiran@gmail.com",
  },
  {
    slug: "nandana-shyam",
    name: "Nandana Shyam",
    alias: "nandu",
    role: "Social Media & Marketing Member",
    group: "Media",
    year: "2nd year, AIML",
    bio: "kya tum mantally challenged ho my bwoy",
    status: "current",
    linkedin: "nandana-shyam-644248380",
    email: "nandanashyam@gmail.com",
  },
  {
    slug: "shreehari-b-deshpande",
    name: "Shreehari B Deshpande",
    role: "Tech Head 25-26",
    group: "Tech",
    year: "2027, CSE",
    bio: "I am exactly what I yearn to be.",
    status: "alumni",
    linkedin: "shreehari-b-deshpande",
    email: "shreehari.deshpande2005@gmail.com",
  },
  {
    slug: "heth-mehul-shah",
    name: "Heth Mehul Shah",
    alias: "H8",
    role: "Tech Head 25-26",
    group: "Tech",
    year: "2023, CSE",
    bio: "Put something good",
    status: "alumni",
    linkedin: "heth-shah-634848244",
    email: "hethshah12@gmail.com",
  },
  {
    slug: "saakshi-mohanty",
    name: "Saakshi Mohanty",
    alias: "Saki",
    role: "Events & Ops Vice Head",
    group: "Events",
    year: "2nd year, CS-AIML",
    bio: "when life gets harder, i get harder",
    status: "current",
    linkedin: "saakshi-mohanty-417285252",
    email: "saakshi.mohanty@gmail.com",
  },
  {
    slug: "amogh-garg",
    name: "Amogh Garg",
    alias: "Tomato Tomahto",
    role: "Tech Vice Head 26-27",
    group: "Tech",
    year: "2029, BTech",
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
    role: "Events & Ops Member 26-27",
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
    role: "Media & Marketing Vice Head 25-26",
    group: "Media",
    year: "2029, CSE",
    bio: "Somewhere between a plan and a plot twist",
    status: "current",
    linkedin: "krithika-swaminathan247",
    email: "krithikaswaminathan247@gmail.com",
  },
  {
    slug: "krisha-varma-k",
    name: "Krisha Varma K",
    role: "Event Management Member 26-27",
    group: "Events",
    year: "2nd year, CSE",
    bio: "Debugging my life since forever.",
    status: "current",
    linkedin: "krisha-varma-konduru-4103aa426",
    email: "krishavarma27@gmail.com",
  },
  {
    slug: "rishil-abhijit-jalisatgi",
    name: "Rishil Abhijit Jalisatgi",
    role: "Technical Member 25-26",
    group: "Tech",
    year: "2027, CSE",
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
    year: "2028, CSE",
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
    year: "2024-28, AIML",
    bio: "",
    status: "current",
    portfolio: "https://ankitbembalgi.vercel.app",
    email: "ankitbembalgi@gmail.com",
  },
  {
    slug: "sohan-mr",
    name: "Sohan MR",
    role: "Media & Marketing Head",
    group: "Media",
    year: "2028, CSE",
    bio: "Think like a hacker to stop one",
    status: "current",
    email: "sohan.rajannavar3646@gmail.com",
  },
  {
    slug: "riddhima-agarwal",
    name: "Riddhima Agarwal",
    alias: "Riddhi",
    role: "Design Vice Head 26-27",
    group: "Design",
    year: "2nd year, CSE",
    bio: "I m going to bed.",
    status: "current",
    email: "rriddhima.agarwal2004@gmail.com",
  },
  {
    slug: "p-mahema-sai",
    name: "P Mahema Sai",
    alias: "Mahé",
    role: "Events Team Member",
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
    role: "Marketing Member",
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
    role: "Member",
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
    role: "Head of Events 2026-27",
    group: "Events",
    year: "2028, CSE",
    bio: "We are free",
    status: "current",
    github: "blason2108",
    linkedin: "blason-raj",
    email: "blasonrimmanuel311@gmail.com",
  },
  {
    slug: "isha-desai",
    name: "Isha Desai",
    role: "Media & Marketing Member",
    group: "Media",
    year: "2029, CSE",
    bio: "Designing behind the firewall.",
    status: "current",
    email: "ishasd2308@gmail.com",
  },
  {
    slug: "shubhika-pradeep",
    name: "Shubhika Pradeep",
    alias: "Bee",
    role: "Tech Head 26-27",
    group: "Tech",
    year: "2028, CSE (AI&ML)",
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
    tagline: "Brand, posters, slides and the site. Makes the rest of it look deliberate.",
    headSlug: "",
    viceSlug: "riddhima-agarwal",
  },
];

export function getMember(slug: string): Member | undefined {
  return MEMBERS.find((m) => m.slug === slug);
}

export function getDomain(slug: string): Domain | undefined {
  return DOMAINS.find((d) => d.slug === slug);
}

/** A domain's roster: everyone in that group who isn't its head or vice-head. */
export function getDomainMembers(domainSlug: string): Member[] {
  const d = getDomain(domainSlug);
  if (!d) return [];
  const leads = new Set([d.headSlug, d.viceSlug]);
  return MEMBERS.filter(
    (m) => m.group === d.group && !leads.has(m.slug),
  ).sort((a, b) => {
    if (a.status !== b.status) return a.status === "current" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

/** The club-level leads shown on /about's "core" grid. */
export const CORE_SLUGS = [
  "archita-agrawal",
  "shubhika-pradeep",
  "blason-raj",
  "sohan-mr",
] as const;

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
