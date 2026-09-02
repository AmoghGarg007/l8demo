# Layer8 — front page

Landing page for **Layer8**, the cybersecurity club at PES University, Electronic
City Campus. Next.js 16 (App Router) + Tailwind v4.

```bash
npm run dev     # http://localhost:3000
npm run build
npm run start
```

## What's here

- `src/app/page.tsx` — the whole landing page (header, hero + typed terminal,
  domains grid, weekly-CTF strip, footer). Client component for the mobile menu
  and the terminal typewriter.
- `src/app/globals.css` — the single theme (club colours: navy `#05070d` /
  `#0b1120`, white text, blue `#3b82f6` accent) plus every component style.
- `src/app/layout.tsx` — fonts: Space Grotesk (display) + JetBrains Mono (body).
- `src/app/icon.svg` — favicon (hexagonal figure-8).
- `public/brand/` — `l8-mark.png` (logo, inverted to white in CSS) and
  `pesu.png` (PES University lockup, footer).

## Header nav

Buttons are intentionally non-functional (`<button type="button">`), no routes
yet: Blogs · Weekly CTFs · Events · Resources · Projects · Core · Domains ·
Legacy/Alumni · Hall of Fame. The same `NAV` array in `page.tsx` also drives the
footer "pages" column.

## Deploy

Linked to the Vercel project `l8demo` (`.vercel/`). Ship with:

```bash
vercel deploy --prod
```
