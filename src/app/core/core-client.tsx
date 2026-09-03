"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Header, Footer } from "../_components/site-chrome";
import {
  DOMAINS,
  GROUP_ACCENT,
  LEADERSHIP,
  getMember,
  initials,
  type Member,
} from "./core";

const ROSTER_STATS: readonly (readonly [string, string])[] = [
  ["roster", "10"],
  ["domains", "04"],
  ["cadence", "weekly"],
  ["seats", "next cycle"],
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

function Monogram({
  name,
  accent,
  className = "w-11 h-11 text-sm",
}: {
  name: string;
  accent?: string;
  className?: string;
}) {
  return (
    <span
      className={`grid place-items-center shrink-0 border border-border bg-bg-3 font-display font-bold select-none ${className}`}
      style={accent ? { color: accent } : undefined}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}

/* club head / vice — richer card with inline contact */
function LeaderCard({ member }: { member: Member }) {
  const accent = GROUP_ACCENT[member.group];
  const contacts = [
    { label: "github", href: `https://github.com/${member.github}` },
    { label: "linkedin", href: `https://www.linkedin.com/in/${member.linkedin}` },
    { label: "email", href: `mailto:${member.email}` },
  ];
  return (
    <article className="card flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Monogram
          name={member.name}
          accent={accent}
          className="w-14 h-14 text-base"
        />
        <div className="min-w-0">
          <Link
            href={`/core/${member.slug}`}
            className="font-display font-bold text-lg text-fg hover:text-accent"
          >
            {member.name}
          </Link>
          <div className="text-[0.7rem] tracking-[0.14em] uppercase text-fg-faint">
            {member.role}
          </div>
          <div className="mt-0.5 font-mono text-xs text-fg-faint">
            @{member.github}
          </div>
        </div>
      </div>

      <p className="text-sm text-fg-dim">{member.bio}</p>

      <div className="mt-auto pt-4 border-t border-border flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
        {contacts.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.label === "email" ? undefined : "_blank"}
            rel={c.label === "email" ? undefined : "noreferrer"}
            className="link-ghost"
          >
            {c.label}
          </a>
        ))}
        <Link href={`/core/${member.slug}`} className="ml-auto text-accent">
          profile &gt;
        </Link>
      </div>
    </article>
  );
}

/* compact head/vice row inside a domain card */
function MemberRow({ member, accent }: { member: Member; accent: string }) {
  return (
    <Link
      href={`/core/${member.slug}`}
      className="flex items-center gap-3 -mx-2 px-2 py-1.5 transition-colors hover:bg-bg-3"
    >
      <Monogram name={member.name} accent={accent} className="w-9 h-9 text-xs" />
      <span className="min-w-0">
        <span className="block font-display font-bold text-sm text-fg leading-tight">
          {member.name}
        </span>
        <span className="block text-[0.68rem] tracking-[0.14em] uppercase text-fg-faint">
          {member.role}
        </span>
      </span>
      <span className="ml-auto text-sm" style={{ color: accent }} aria-hidden>
        &gt;
      </span>
    </Link>
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
        <section className="wrap pt-12 pb-10 md:pt-16 md:pb-12">
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
                and a head and vice-head for each of the four domains. Click any
                card for their profile and contact.
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

        {/* roster stats */}
        <section className="wrap pb-4">
          <div className="grid grid-cols-2 md:grid-cols-4 border border-border divide-x divide-border">
            {ROSTER_STATS.map(([k, v]) => (
              <div key={k} className="p-4 md:p-5 bg-bg-2">
                <div className="kicker">{k}</div>
                <div className="mt-1 font-display font-bold text-xl md:text-2xl text-accent">
                  {v}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="wrap">
          <div className="rule my-6" />
        </div>

        {/* leadership */}
        <section id="leadership" className="wrap py-14 md:py-18">
          <span className="tag">leadership</span>
          <h2 className="mt-3 font-display font-bold text-2xl md:text-3xl">
            Club head &amp; vice-head
          </h2>
          <p className="mt-2 text-sm text-fg-dim max-w-2xl">
            One point of contact for the department, the sponsors and the other
            clubs. Everything else rolls up to here.
          </p>

          <div className="mt-8 grid md:grid-cols-2 gap-3">
            {LEADERSHIP.map((m) => (
              <LeaderCard key={m.slug} member={m} />
            ))}
          </div>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* domains */}
        <section id="domains" className="wrap py-14 md:py-18">
          <span className="tag">domains</span>
          <h2 className="mt-3 font-display font-bold text-2xl md:text-3xl">
            Four domains, a head and vice-head each
          </h2>
          <p className="mt-2 text-sm text-fg-dim max-w-2xl">
            Each domain owns its own calendar and output. The head runs it; the
            vice-head covers and steps up next cycle.
          </p>

          <div className="mt-8 grid md:grid-cols-2 gap-3">
            {DOMAINS.map((d, i) => {
              const head = getMember(d.headSlug);
              const vice = getMember(d.viceSlug);
              const accent = GROUP_ACCENT[d.name as Member["group"]];
              return (
                <article
                  key={d.slug}
                  className="card relative flex flex-col gap-4 overflow-hidden"
                >
                  <span
                    className="absolute inset-x-0 top-0 h-[2px]"
                    style={{ background: accent }}
                    aria-hidden
                  />
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-display font-bold text-2xl md:text-3xl tabular-nums"
                      style={{ color: accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span
                          className="text-xs"
                          style={{ color: accent }}
                          aria-hidden
                        >
                          ~/
                        </span>
                        <h3 className="font-display font-bold text-lg text-fg">
                          {d.name}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-fg-dim">{d.tagline}</p>
                  <div className="mt-auto grid gap-2 pt-4 border-t border-border">
                    {[head, vice]
                      .filter((m): m is Member => Boolean(m))
                      .map((m) => (
                        <MemberRow key={m.slug} member={m} accent={accent} />
                      ))}
                  </div>
                </article>
              );
            })}
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
