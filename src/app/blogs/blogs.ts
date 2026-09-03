/**
 * Blog post index for the /blogs route. Metadata lives here; the body of each
 * post is a Markdown file in src/content/blogs/<slug>.md, read at build time by
 * app/blogs/[slug]/page.tsx. Ported from the standalone blog site's
 * data/blogs.json — ordered newest first.
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
    slug: "stack-canaries",
    title: "stack canaries won't save you from this",
    author: "Lucius Aurelius",
    date: "2026-08-29",
    readTime: "6 min",
    category: "pwn",
    tags: ["pwn", "format string", "writeup"],
    excerpt:
      "A walkthrough of a format-string leak we used to defeat ASLR in last month's binary exploitation CTF, start to finish.",
  },
  {
    slug: "jwt-none-alg",
    title: "jwt none-alg still works in 2026",
    author: "Valeria Cassius",
    date: "2026-08-26",
    readTime: "4 min",
    category: "web",
    tags: ["web", "jwt", "authentication"],
    excerpt:
      "Yes, really. A short case study on an internal PESU Academy test build and what got patched afterward.",
  },
  {
    slug: "homebrew-rsa",
    title: "breaking a homebrew rsa padding scheme",
    author: "Quintus Marcellus",
    date: "2026-08-22",
    readTime: "8 min",
    category: "crypto",
    tags: ["crypto", "rsa", "padding oracle"],
    excerpt:
      "What happens when someone rolls their own padding for a 2048-bit key — and how we recovered the plaintext without factoring anything.",
  },
  {
    slug: "ghidra-scripting",
    title: "ghidra scripting for lazy people",
    author: "Octavia Severina",
    date: "2026-08-19",
    readTime: "5 min",
    category: "reversing",
    tags: ["reversing", "ghidra", "tooling"],
    excerpt:
      "A handful of Python scripts that auto-label structs and strip obfuscation junk before you even open the disassembly view.",
  },
  {
    slug: "security-internship",
    title: "what a security internship actually looks like",
    author: "Tiberius Maximus",
    date: "2026-08-14",
    readTime: "7 min",
    category: "career",
    tags: ["career", "internship", "pentesting"],
    excerpt:
      "Notes from a semester spent doing authorized testing on a live academic platform — scope, disclosure, and the parts nobody tells you about.",
  },
  {
    slug: "ssrf-image-upload",
    title: "ssrf through an image upload, again",
    author: "Cornelia Nerva",
    date: "2026-08-09",
    readTime: "5 min",
    category: "web",
    tags: ["web", "ssrf", "bug bounty"],
    excerpt:
      'Why "just validate the URL" never works, and the metadata-service trick that keeps landing in bug bounty reports.',
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
