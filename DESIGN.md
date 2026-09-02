# Layer8 — Design System

Shared reference for anyone building a Layer8 web page. Match these tokens and
rules and your page will sit next to the landing page without looking bolted on.

**Vibe:** security-lab / CTF terminal. One dark theme — navy, black & white with
a single electric-blue accent. Monospace is the workhorse; a geometric sans is
used only for display type. Subtle grid + scanline texture. Restrained motion.

There is **no light mode**. Don't add one.

---

## 1. Colour tokens

Define these once on `:root` and only ever reference the variables — never hard‑code
hex in components.

```css
:root {
  --bg:        #05070d;  /* page background (near‑black navy) */
  --bg-2:      #0b1120;  /* panels, cards, header, footer */
  --bg-3:      #111a2e;  /* inset surfaces, inputs */
  --fg:        #eef2f8;  /* primary text */
  --fg-dim:    #9fb0c8;  /* secondary text, body copy */
  --fg-faint:  #54637d;  /* disabled, tick marks, meta */
  --accent:    #3b82f6;  /* the only accent — links, CTAs, focus, highlights */
  --accent-2:  #f8fafc;  /* white, used as a secondary accent (glitch, chip) */
  --danger:    #f87171;  /* genuine errors only */
  --border:    #1b2740;  /* hairlines, card borders */
  --grid:      rgba(59, 130, 246, 0.06);  /* background grid lines */
  --glow:      rgba(37, 99, 235, 0.38);   /* blue glow for shadows/text-shadow */
  --scan:      rgba(0, 0, 0, 0.4);        /* scanline overlay tint */
  color-scheme: dark;
}
```

Usage rules:

- **Accent is blue, period.** No greens, purples, oranges. White (`--accent-2`)
  is the only secondary highlight.
- Body copy is `--fg-dim`, not `--fg`. Reserve full‑strength `--fg` for headings
  and emphasis.
- `--danger` is for error states, not decoration.
- Every border on the page is `--border` unless it's an accent border.

---

## 2. Typography

Two typefaces, loaded with `next/font` (self‑hosted, no layout shift):

```ts
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";

const display = Space_Grotesk({
  subsets: ["latin"], variable: "--font-display", weight: ["500", "700"],
});
const mono = JetBrains_Mono({
  subsets: ["latin"], variable: "--font-mono", weight: ["400", "500", "700"],
});
// apply `${display.variable} ${mono.variable}` to <html>
```

Not on Next? Load the same two from Google Fonts and set the variables yourself.

| Role | Family | How |
|---|---|---|
| Body / UI / code / labels | **JetBrains Mono** | `body { font-family: var(--font-mono), ui-monospace, Menlo, monospace }` |
| Display: headings, wordmark, big numbers | **Space Grotesk** | `.font-display { font-family: var(--font-display), var(--font-mono), sans-serif }` |

Base: `font-size: 15px; line-height: 1.65;` on `body`.

### Type treatments

**Kicker** — the small tracked label above headings. Often prefixed with `//`.

```css
.kicker {
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--fg-dim);
}
```
```html
<p class="kicker">// PES University — Electronic City Campus</p>
```

**Tag** — section eyebrow, boxed.

```css
.tag {
  display: inline-block;
  font-size: 0.68rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid color-mix(in srgb, var(--accent) 40%, var(--border));
  padding: 0.15rem 0.5rem;
}
```

**Headings** — always `.font-display` + `font-weight: 700`.

| Level | Size | Notes |
|---|---|---|
| Hero H1 | `clamp(3rem, 11vw, 6.5rem)` | `line-height: 0.95` |
| Section H2 | `1.5rem` → `1.875rem` at ≥768px | |
| Card H3 | `1.125rem` | |
| Stat / metric value | `1.25rem` → `1.5rem`, colour `--accent` | |

Body paragraphs: `0.875rem`–`1rem`, colour `--fg-dim`, `max-width: ~36rem`.

---

## 3. Layout

**Container** — one width, everywhere:

```css
.wrap {
  width: 100%;
  max-width: 1160px;
  margin-inline: auto;
  padding-inline: clamp(1.1rem, 4vw, 2.5rem);
  position: relative;
  z-index: 3;               /* stays above the background overlays — keep this */
}
```

- Section vertical rhythm: `padding-block: 4rem` (`5rem` at ≥768px).
- Sticky header: `height: 4rem`, `backdrop-filter: blur(12px)`,
  `background: color-mix(in srgb, var(--bg) 82%, transparent)`, `border-bottom: 1px solid var(--border)`.
- Breakpoints follow Tailwind defaults: `sm 640 · md 768 · lg 1024`. The desktop
  nav appears at `lg`; below that it collapses to a `[ = ]` toggle.

**Divider** — gradient hairline:

```css
.rule {
  height: 1px;
  background: linear-gradient(90deg,
    var(--border),
    color-mix(in srgb, var(--accent) 45%, transparent),
    var(--border));
}
```

---

## 4. Background treatment

Put all three on `body`. Content sits above them via `z-index: 3` (see `.wrap`).

```css
body {
  background-color: var(--bg);
  background-image:
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 44px 44px;
  background-position: center top;
}

/* vignette */
body::before {
  content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 1;
  background: radial-gradient(120% 90% at 50% 0%,
    transparent 40%, color-mix(in srgb, var(--bg) 70%, black) 100%);
}

/* scanlines */
body::after {
  content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 2;
  background: repeating-linear-gradient(0deg,
    var(--scan) 0px, var(--scan) 1px, transparent 2px, transparent 4px);
  opacity: 0.35;
  mix-blend-mode: multiply;
}
```

---

## 5. Components

### Buttons

```css
.btn {
  display: inline-flex; align-items: center; gap: 0.55rem;
  padding: 0.7rem 1.15rem;
  font-size: 0.82rem; letter-spacing: 0.06em;
  text-transform: lowercase;
  border: 1px solid var(--border);
  background: var(--bg-2); color: var(--fg);
  cursor: pointer;
  transition: border-color .18s, color .18s, background .18s, box-shadow .18s, transform .18s;
}
.btn:hover {
  border-color: var(--accent); color: var(--accent);
  box-shadow: 0 0 0 1px var(--accent), 0 0 22px -6px var(--glow);
  transform: translateY(-1px);
}
.btn-solid { background: var(--accent); color: var(--bg); border-color: var(--accent); font-weight: 700; }
```

**Label convention:** lowercase, `>` prefix, `_` for spaces —
`> weekly_ctfs`, `> join_layer8`, `> view_schedule`.

### Cards & panels

```css
.card {
  background: var(--bg-2);
  border: 1px solid var(--border);
  padding: 1.35rem;
  transition: border-color .18s, transform .18s, box-shadow .18s;
}
.card:hover {
  border-color: color-mix(in srgb, var(--accent) 55%, var(--border));
  transform: translateY(-3px);
  box-shadow: 0 18px 40px -28px var(--glow);
}
.panel { background: var(--bg-2); border: 1px solid var(--border); }  /* no padding/hover */
```

### Nav links

```css
.navlink {
  position: relative; padding: 0.35rem 0;
  font-size: 0.78rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--fg-dim); background: transparent; border: 0; cursor: pointer;
  transition: color .16s;
}
.navlink::after {
  content: ""; position: absolute; left: 0; bottom: 0;
  width: 0; height: 2px; background: var(--accent);
  transition: width .18s ease;
}
.navlink:hover { color: var(--fg); }
.navlink:hover::after { width: 100%; }
```

### Terminal window (signature motif)

Use it whenever you'd otherwise show a plain code block or a "how it works" panel.

```css
.term {
  background: color-mix(in srgb, var(--bg-2) 88%, black);
  border: 1px solid var(--border);
  box-shadow: 0 30px 80px -40px var(--glow);
}
.term-bar { display: flex; align-items: center; gap: .5rem; padding: .6rem .9rem; border-bottom: 1px solid var(--border); }
.term-dot { width: 11px; height: 11px; border-radius: 999px; background: var(--fg-faint); }   /* ×3 */
.term-body {
  padding: 1.1rem 1.2rem 1.4rem;
  font-size: 0.78rem; line-height: 1.9;
  white-space: pre-wrap; overflow-wrap: anywhere;
}
@media (min-width: 40rem) { .term-body { font-size: 0.86rem; } }
.term-body .prompt { color: var(--accent); }   /* the "$" */
.term-body .muted  { color: var(--fg-dim); }
.cursor { display: inline-block; width: .6ch; background: var(--accent); animation: blink 1.05s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0; } }
```

---

## 6. Motion

- Standard transition: **150–180ms**, ease, on `color / border-color / transform / box-shadow`.
- Hover lift for interactive cards/buttons: `translateY(-1px … -3px)` + a `--glow` shadow.
- The wordmark uses a `.glitch` effect (two `data-text` pseudo‑elements offset
  `±2px` in `--accent` / `--accent-2`, ~3s clip‑path keyframes). Use sparingly —
  wordmark and hero only.
- **Always** wrap animation in a reduced‑motion guard:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important; transition: none !important; scroll-behavior: auto !important;
  }
}
```

---

## 7. Brand assets

Assets live in `public/brand/` of the landing‑page repo — copy them, don't
recreate.

### Layer8 wordmark

`[ L8 mark ]  LAYER8` — the mark image followed by "LAYER8" in `.font-display font-bold`.

- `l8-mark.png` is **black on transparent**. Render it white via CSS:

```css
.brandmark {
  height: 1.4em; width: auto; display: block;
  filter: invert(1) drop-shadow(0 0 9px var(--glow));
}
```

### PES University lockup

Only appears in the footer, under a `part of` kicker. The PES asset is
white‑on‑transparent, so it **must sit on its own dark chip** — never place it
directly on any surface.

```css
.pesu-chip {
  display: inline-flex; align-items: center;
  padding: 0.5rem 0.8rem;
  border: 1px solid color-mix(in srgb, var(--fg) 14%, transparent);
  border-radius: 0.6rem;
  background: #0a0e1a;
}
.pesu-chip img { height: 2.15rem; width: auto; display: block; }
```

### Favicon

`icon.png` — the L8 mark in white on a `#0a0e1a` rounded tile (256×256, ~2.6 KB).
Reuse it; don't ship a different favicon per page.

---

## 8. Voice & copy

- The name is the joke: **Layer 8 = the human layer** above OSI layer 7. Lean
  into it ("the most exploitable layer is the one operating the keyboard").
- Kickers: `//`‑prefixed, terse — `// PES University — Electronic City Campus`.
- CTAs: lowercase, `>`‑prefixed, `_`‑joined — `> weekly_ctfs`.
- Register: terse, a little playful, security‑literate. No corporate filler, no
  exclamation marks.
- Lowercase is deliberate for UI labels and buttons. Headlines are sentence case.

---

## 9. Tailwind v4 (optional)

The landing page maps tokens through `@theme inline` so utilities work directly:

```css
@theme inline {
  --color-bg: var(--bg);
  --color-bg-2: var(--bg-2);
  --color-bg-3: var(--bg-3);
  --color-fg: var(--fg);
  --color-fg-dim: var(--fg-dim);
  --color-accent: var(--accent);
  --color-border: var(--border);
  --font-mono: var(--font-mono), ui-monospace, "SFMono-Regular", Menlo, monospace;
  --font-display: var(--font-display), var(--font-mono), sans-serif;
}
```

Then: `bg-bg`, `bg-bg-2`, `text-fg`, `text-fg-dim`, `text-accent`,
`border-border`, `font-mono`. Display font stays the `.font-display` class.

Not using Tailwind? Everything above is plain CSS + variables — just include it.

---

## 10. Checklist before you ship a page

- [ ] Tokens from §1 defined on `:root`; no hard‑coded hex in components
- [ ] JetBrains Mono is the default body font; Space Grotesk only on display type
- [ ] `.wrap` (or an equivalent `max-width: 1160px`, `z-index: 3` container) around content
- [ ] Grid + vignette + scanline layers on `body`
- [ ] Buttons lowercase with `>` prefix; single blue accent only
- [ ] Every animation has a `prefers-reduced-motion` guard
- [ ] Layer8 wordmark + favicon reused from the shared assets, not redrawn
- [ ] Dark only — no light mode
```
