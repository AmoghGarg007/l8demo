"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Header, Footer } from "../_components/site-chrome";

/* ------------------------------------------------------------------ */
/*  data — placeholder names, swap for the real roster                  */
/* ------------------------------------------------------------------ */

type Member = { name: string; role: string };

const LEADERSHIP: Member[] = [
  { name: "Marcus Antonius", role: "Club Head" },
  { name: "Livia Drusilla", role: "Club Vice-Head" },
];

type Domain = {
  slug: string;
  name: string;
  tagline: string;
  head: Member;
  vice: Member;
};

const DOMAINS: Domain[] = [
  {
    slug: "tech",
    name: "Tech",
    tagline:
      "CTF infrastructure, challenge development, tooling and running the weekly sessions.",
    head: { name: "Gaius Plinius", role: "Tech Head" },
    vice: { name: "Aulus Persius", role: "Tech Vice-Head" },
  },
  {
    slug: "events",
    name: "Events",
    tagline:
      "CTFs, workshops, talks and inter-college competitions — everything with a date on it.",
    head: { name: "Fulvia Flacca", role: "Events Head" },
    vice: { name: "Decimus Brutus", role: "Events Vice-Head" },
  },
  {
    slug: "media",
    name: "Media",
    tagline:
      "Writeups, socials, recaps and the newsletter. If it went out with the club's name on it, Media shipped it.",
    head: { name: "Julia Agrippina", role: "Media Head" },
    vice: { name: "Servius Tullius", role: "Media Vice-Head" },
  },
  {
    slug: "design",
    name: "Design",
    tagline:
      "Brand, posters, slides and the site. Makes the rest of it look deliberate.",
    head: { name: "Claudia Pulchra", role: "Design Head" },
    vice: { name: "Marcus Vitruvius", role: "Design Vice-Head" },
  },
];

const CORE_TERM = `$ cat core/roster.txt
club_head        1
club_vice_head   1
domains          4   (tech events media design)
per_domain       head + vice

$ `;
const CORE_TYPE_LINE = "./standup --domain all";

/* ------------------------------------------------------------------ */
/*  bits                                                                */
/* ------------------------------------------------------------------ */

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Person({ name, role }: Member) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="grid place-items-center w-11 h-11 shrink-0 border border-border bg-bg-3 font-display font-bold text-sm text-accent select-none"
        aria-hidden
      >
        {initials(name)}
      </span>
      <div className="min-w-0">
        <div className="font-display font-bold text-fg leading-tight">{name}</div>
        <div className="text-[0.7rem] tracking-[0.14em] uppercase text-fg-faint">
          {role}
        </div>
      </div>
    </div>
  );
}

function CoreTerminal() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = reduce ? CORE_TYPE_LINE.length : 1;
    let i = 0;
    const id = window.setInterval(() => {
      i += step;
      setTyped(CORE_TYPE_LINE.slice(0, i));
      if (i >= CORE_TYPE_LINE.length) window.clearInterval(id);
    }, 55);
    return () => window.clearInterval(id);
  }, []);

  const rows = CORE_TERM.split("\n");

  return (
    <div className="term w-full" aria-hidden>
      <div className="term-bar">
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="ml-2 text-xs text-fg-dim">layer8@pesu — ~/core</span>
      </div>
      <div className="term-body font-mono">
        {rows.map((line, idx) => {
          if (line.startsWith("$")) {
            return (
              <div key={idx}>
                <span className="prompt">$</span>
                {line.slice(1)}
                {idx === rows.length - 1 && (
                  <>
                    {typed}
                    <span className="cursor">&nbsp;</span>
                  </>
                )}
              </div>
            );
          }
          return (
            <div key={idx}>
              <span className="muted">{line}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  page                                                                */
/* ------------------------------------------------------------------ */

export default function CoreClient() {
  return (
    <>
      <Header current="Core" />

      <main className="flex-1">
        {/* hero */}
        <section className="wrap pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p className="kicker mb-5">
                {"// PES University — Electronic City Campus"}
              </p>
              <h1 className="font-display font-bold leading-[0.95] text-[clamp(3rem,11vw,6.5rem)]">
                Core
              </h1>
              <p className="mt-6 text-sm md:text-base text-fg-dim max-w-xl">
                The people who keep Layer8 running — a club head and vice-head,
                and a head and vice-head for each of the four domains. They set
                the calendar, build the challenges, and answer for what ships.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="btn btn-solid" href="#leadership">
                  &gt; meet_the_team
                </a>
                <a className="btn" href="#domains">
                  &gt; the_domains
                </a>
              </div>
            </div>

            <CoreTerminal />
          </div>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* leadership */}
        <section id="leadership" className="wrap py-16 md:py-20">
          <span className="tag">leadership</span>
          <h2 className="mt-3 font-display font-bold text-2xl md:text-3xl">
            Club head &amp; vice-head
          </h2>
          <p className="mt-2 text-sm text-fg-dim max-w-2xl">
            One point of contact for the department, the sponsors and the other
            clubs. Everything else rolls up to here.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {LEADERSHIP.map((m) => (
              <article key={m.role} className="card">
                <Person name={m.name} role={m.role} />
              </article>
            ))}
          </div>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* domains */}
        <section id="domains" className="wrap py-16 md:py-20">
          <span className="tag">domains</span>
          <h2 className="mt-3 font-display font-bold text-2xl md:text-3xl">
            Four domains, a head and vice-head each
          </h2>
          <p className="mt-2 text-sm text-fg-dim max-w-2xl">
            Each domain owns its own calendar and output. The head runs it; the
            vice-head covers and steps up next cycle.
          </p>

          <div className="mt-8 grid md:grid-cols-2 gap-3">
            {DOMAINS.map((d) => (
              <article key={d.slug} className="card flex flex-col gap-4">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-xs text-accent">~/</span>
                    <h3 className="font-display font-bold text-lg text-fg">
                      {d.name}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-fg-dim">{d.tagline}</p>
                </div>
                <div className="mt-auto grid gap-3 pt-4 border-t border-border">
                  <Person name={d.head.name} role={d.head.role} />
                  <Person name={d.vice.name} role={d.vice.role} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* cta */}
        <section className="wrap py-16 md:py-20">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl">
                Want a seat next cycle?
              </h2>
              <p className="mt-2 text-sm text-fg-dim max-w-2xl">
                Core is picked from people already showing up and shipping. Come
                to the weekly sessions, take on a challenge or a writeup, and
                make yourself hard to ignore.
              </p>
            </div>
            <Link href="/#top" className="btn btn-solid">
              &gt; weekly_sessions
            </Link>
          </div>
        </section>
      </main>

      <Footer current="Core" />
    </>
  );
}
