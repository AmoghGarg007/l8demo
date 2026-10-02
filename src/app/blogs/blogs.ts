/**
 * Blog post index for the /blogs route. Metadata lives here; the body of each
 * post is a Markdown file in src/content/blogs/<slug>.md, read at build time by
 * app/blogs/[slug]/page.tsx.
 */

export type BlogPost = {
  slug: string;
  title: string;
  author: string;
  date: string; // ISO yyyy-mm-dd
  readTime: string;
  category: string;
  tags: string[];
  excerpt: string;
};

export const POSTS: BlogPost[] = [
   {
  slug: "aiims-delhi-ransomware-attack",
  title: "The AIIMS Delhi Ransomware Attack",
  author: "Nandana Shyam",
  date: "2026-10-01",
  readTime: "4 min",
  category: "case-study",
  tags: ["ransomware", "healthcare", "incident-response"],
  excerpt:
    "A look at the 2022 AIIMS Delhi ransomware attack, how it disrupted critical hospital operations, and what it teaches us about availability, backups, and incident response.",
  }, 

  {
    slug: "cracking-the-board",
    title: "Our First Deep Dive: Cracking the Board",
    author: "Preksha Nehru",
    date: "2026-09-12",
    readTime: "4 min",
    category: "case-study",
    tags: ["ddos", "availability", "incident-response"],
    excerpt:
      "A case study on the June 2026 attack on CBSE's post-result services portal — what a DDoS actually does, why 'no breach' doesn't mean 'no attack,' and why availability is a security property too.",
  },
];

export const CATEGORIES: string[] = [
  "all",
  ...Array.from(new Set(POSTS.map((p) => p.category))),
];

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
