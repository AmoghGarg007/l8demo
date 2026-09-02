"use client";

import { useEffect, useState } from "react";

/* ------------------------------------------------------------------ */
/*  data                                                                */
/* ------------------------------------------------------------------ */

const NAV = [
  "Blogs",
  "Weekly CTFs",
  "Events",
  "Resources",
  "Projects",
  "Core",
  "Domains",
  "Legacy/Alumni",
  "Hall of Fame",
] as const;

const STATS = [
  ["layer", "08"],
  ["campus", "PESU · ECC"],
  ["cadence", "weekly"],
  ["scope", "ctf / research"],
] as const;

const DOMAINS = [
  ["web", "Web Exploitation", "Auth bypasses, SSRF, injection, request smuggling — the modern app attack surface."],
  ["pwn", "Binary Exploitation", "Stack and heap corruption, ROP, format strings, exploit dev against real binaries."],
  ["rev", "Reverse Engineering", "Static and dynamic analysis, unpacking, patching, and reading assembly for sport."],
  ["crypto", "Cryptography", "Padding oracles, weak PRNGs, RSA math, and the classic 'never roll your own'."],
  ["forensics", "Forensics", "Disk and memory images, packet captures, log timelines, artifact recovery."],
  ["stego", "Steganography", "Data hidden in pixels, audio and metadata — spot it, extract it, carve it out."],
  ["osint", "OSINT", "People, infrastructure and leaks — what the open internet already knows about a target."],
  ["net", "Network Security", "Protocol abuse, pivoting, traffic analysis and defending the wire."],
] as const;

const TERMINAL_SCRIPT = `$ whoami
layer8@pesu-ecc
$ cat mission.txt
teach offense. build defense. capture flags.
$ ./recruit --status
[ open ]  domains: web pwn rev crypto forensics osint
$ _`;

/* ------------------------------------------------------------------ */
/*  header                                                              */
/* ------------------------------------------------------------------ */

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-display font-bold tracking-tight select-none ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/l8-mark.png" alt="" aria-hidden className="brandmark" />
      <span>LAYER8</span>
    </span>
  );
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] border-b border-border">
      <div className="wrap">
        <div className="flex items-center justify-between gap-4 h-16">
          <a href="#top" className="text-lg noise-hover">
            <Wordmark />
          </a>

          <nav className="hidden lg:flex items-center gap-x-6 gap-y-2 flex-wrap justify-end">
            {NAV.map((item) => (
              <button key={item} type="button" className="navlink">
                {item}
              </button>
            ))}
          </nav>

          <button
            type="button"
            className="lg:hidden btn px-3 py-2"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "[ x ]" : "[ = ]"}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-bg-2">
          <div className="wrap py-3 grid grid-cols-2 gap-x-4 gap-y-1">
            {NAV.map((item) => (
              <button
                key={item}
                type="button"
                className="navlink text-left"
                onClick={() => setOpen(false)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  terminal typewriter                                                 */
/* ------------------------------------------------------------------ */

function Terminal() {
  const [text, setText] = useState("");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = reduce ? TERMINAL_SCRIPT.length : 1;
    let i = 0;
    const id = window.setInterval(() => {
      i += step;
      setText(TERMINAL_SCRIPT.slice(0, i));
      if (i >= TERMINAL_SCRIPT.length) window.clearInterval(id);
    }, 22);
    return () => window.clearInterval(id);
  }, []);

  const rendered = text.split("\n").map((line, idx) => {
    const isPrompt = line.startsWith("$ ");
    return (
      <div key={idx}>
        {isPrompt ? (
          <>
            <span className="prompt">$</span>
            {line.slice(1)}
          </>
        ) : line.startsWith("[") ? (
          <span className="muted">{line}</span>
        ) : (
          line
        )}
      </div>
    );
  });

  return (
    <div className="term w-full">
      <div className="term-bar">
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="ml-2 text-xs text-fg-dim">layer8 — ~/recruit</span>
      </div>
      <div className="term-body font-mono">
        {rendered}
        <span className="cursor">&nbsp;</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  sections                                                            */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section id="top" className="wrap pt-14 pb-16 md:pt-20 md:pb-24">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
        <div>
          <p className="kicker mb-5">{"// PES University — Electronic City Campus"}</p>
          <h1 className="font-display font-bold leading-[0.95] text-[clamp(3rem,11vw,6.5rem)]">
            <span className="glitch" data-text="LAYER8">
              LAYER8
            </span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-fg-dim max-w-xl">
            The OSI model stops at seven. The most exploitable layer is the one
            operating the keyboard — and that is the one we train.
          </p>
          <p className="mt-4 text-sm text-fg-dim max-w-xl">
            Layer8 is the cybersecurity club at PES University, ECC. We run weekly
            CTFs, break and build across web, crypto, reversing and pwn, and turn
            curiosity into capability.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" className="btn btn-solid">
              &gt; weekly_ctfs
            </button>
            <button type="button" className="btn">
              &gt; join_layer8
            </button>
          </div>
        </div>

        <Terminal />
      </div>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 border border-border divide-x divide-border">
        {STATS.map(([k, v]) => (
          <div key={k} className="p-4 md:p-5 bg-bg-2">
            <div className="kicker">{k}</div>
            <div className="mt-1 font-display font-bold text-xl md:text-2xl text-accent">
              {v}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHead({
  tag,
  title,
  sub,
}: {
  tag: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="mb-8">
      <span className="tag">{tag}</span>
      <h2 className="mt-3 font-display font-bold text-2xl md:text-3xl">{title}</h2>
      <p className="mt-2 text-sm text-fg-dim max-w-2xl">{sub}</p>
    </div>
  );
}

function Domains() {
  return (
    <section className="wrap py-16 md:py-20">
      <SectionHead
        tag="domains"
        title="What we break, in eight directions"
        sub="Every member picks a lane and goes deep, then cross-trains on the rest during weekly sessions."
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {DOMAINS.map(([slug, name, desc]) => (
          <article key={slug} className="card">
            <div className="text-xs text-fg-dim">
              <span className="text-accent">~/</span>
              {slug}
            </div>
            <h3 className="mt-2 font-display font-bold text-lg">{name}</h3>
            <p className="mt-2 text-[13px] text-fg-dim">{desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CTFStrip() {
  return (
    <section className="wrap py-16 md:py-20">
      <div className="panel p-8 md:p-12 relative overflow-hidden">
        <div className="relative z-[1] grid md:grid-cols-[1fr_auto] gap-8 items-center">
          <div>
            <span className="tag">weekly ctfs</span>
            <h2 className="mt-3 font-display font-bold text-2xl md:text-3xl">
              Every week, a new set of flags.
            </h2>
            <p className="mt-2 text-sm text-fg-dim max-w-xl">
              Beginner-friendly challenges, a live scoreboard, and writeups
              afterwards. Show up with a laptop and a browser — we handle the
              rest.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button type="button" className="btn btn-solid justify-center">
              &gt; view_schedule
            </button>
            <button type="button" className="btn justify-center">
              &gt; past_writeups
            </button>
          </div>
        </div>
        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 -bottom-10 font-display font-bold text-[9rem] leading-none text-fg opacity-[0.04] select-none"
        >
          CTF
        </span>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-bg-2">
      <div className="wrap py-14">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr] gap-10">
          <div>
            <Wordmark className="text-lg" />
            <p className="mt-3 text-sm text-fg-dim max-w-sm">
              Cybersecurity Club · PES University, Electronic City Campus,
              Bengaluru. Offense, defense, and a lot of capture the flag.
            </p>
            <div className="kicker mt-6 mb-2">part of</div>
            <a
              href="https://www.pes.edu"
              target="_blank"
              rel="noreferrer"
              className="pesu-chip"
              aria-label="PES University"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/pesu.png" alt="PES University" />
            </a>
          </div>

          <div>
            <div className="kicker mb-3">pages</div>
            <ul className="space-y-1.5 text-sm">
              {NAV.map((item) => (
                <li key={item}>
                  <button type="button" className="link-ghost">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="kicker mb-3">elsewhere</div>
            <ul className="space-y-1.5 text-sm">
              {["Instagram", "Discord", "GitHub", "LinkedIn", "Email"].map((s) => (
                <li key={s}>
                  <button type="button" className="link-ghost">
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rule my-8" />

        <div className="flex flex-col sm:flex-row justify-between gap-2 text-xs text-fg-dim">
          <span>© {new Date().getFullYear()} Layer8 · built in the 8th layer</span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  page                                                                */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <div className="wrap">
          <div className="rule" />
        </div>
        <Domains />
        <div className="wrap">
          <div className="rule" />
        </div>
        <CTFStrip />
      </main>
      <Footer />
    </>
  );
}
