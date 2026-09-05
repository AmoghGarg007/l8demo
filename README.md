# Layer8 — front page

Site for **Layer8**, the cybersecurity club at PES University, Electronic City
Campus. Next.js 16 (App Router, Turbopack) + Tailwind v4 + TypeScript.

```bash
npm run dev     # http://localhost:3000
npm run lint
npm run build
npm run start
```

## What's here

Every route is a server `page.tsx` (holds `export const metadata`) plus a
`"use client"` `*-client.tsx` that renders it, sharing `Header`/`Footer` from
`src/app/_components/site-chrome.tsx`. `NAV`/`ROUTES` there is what turns a nav
label into a real link — everything in `NAV` without a `ROUTES` entry still
renders as a plain (non-navigating) button.

| Route | What it is |
|---|---|
| `/` | Landing — hero with the interactive terminal, domains grid, weekly-CTF strip |
| `/blogs`, `/blogs/[slug]` | Writeups. Post metadata in `blogs/blogs.ts`, bodies are Markdown in `src/content/blogs/*.md` rendered by the dependency-free parser in `src/lib/markdown.ts` |
| `/events` | Searchable CTF/workshop/seminar catalog. Data in `events/events-data.ts` |
| `/domains` | The 8 security domains (web, pwn, rev, crypto, forensics, stego, osint, network) — card grid + dossier. Data in `domains/domains-data.ts` |
| `/resources` | Curated learning path + resource library |
| `/sandbox` | "Coming soon" — decrypt-style scramble text |
| `/about` | Who Layer8 is, the core team, and a domain-rosters grid → `/about/[domain]` |
| `/about/[domain]` | One domain's head/vice-head + full member roster. Data in `about/about-data.ts`; `generateStaticParams` covers all four domains |
| `/core` | Redirects to `/about` (keeps old links working) |

`src/app/_components/interactive-terminal.tsx` is the shared CLI (`help`,
`ls`, `cd <section>`, `pwd`, `whoami`, `cat mission.txt`, `clear`, arrow-key
history, tab-complete). Each page passes it a `script`/`hint`/`barLabel` so the
intro text stays page-accurate while the commands work everywhere.

`src/app/globals.css` is the single theme (see `DESIGN.md` for the full design
system: tokens, type scale, component classes, motion rules — read that before
adding a page). `src/app/template.tsx` replays a small enter animation and
resets scroll to top on every navigation.

## Deploy

Two independent repos/Vercel projects share this codebase — see the
`two-repos-two-vercel-projects` project memory for which is which. This repo
deploys via `.github/workflows/deploy.yml` on every push to `main` (Vercel's
native Git integration can't be used — Hobby plan can't link an org-owned
private repo to two projects). It runs `vercel build` + `vercel deploy
--prebuilt` with a `VERCEL_TOKEN` repo secret; `VERCEL_ORG_ID` /
`VERCEL_PROJECT_ID` in the workflow are not secrets. Don't push directly with
`vercel deploy --prod` — it bypasses the Actions build/lint step.
