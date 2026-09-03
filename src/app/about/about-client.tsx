"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Header, Footer } from "../_components/site-chrome";
import {
  MEMBERS,
  ROSTER,
  counterpartOf,
  getMember,
  initials,
  type Member,
} from "./about-data";

const CORE_TERM = `$ whoami
layer8 — cybersecurity club, pesu ecc
$ cat about/mission.txt
teach offense. build defense. capture flags.
$ ls core/
club/  tech/  events/  media/  design/
$ `;
const CORE_TYPE_LINE = "./whois --select";

const WHAT_WE_DO = [
  ["weekly ctfs", "A fresh set of flags every week — beginner-friendly, live scoreboard, writeups after."],
  ["offense + defense", "Web, crypto, reversing and pwn, plus blue-team fundamentals and incident write-ups."],
  ["made by members", "Challenges, tooling, competitions and this site — all built and run by students."],
] as const;

/* ------------------------------------------------------------------ */
/*  terminal                                                            */
/* ------------------------------------------------------------------ */

function AboutTerminal() {
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
        <span className="ml-2 text-xs text-fg-dim">layer8@pesu — ~/about</span>
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
/*  roster + detail                                                     */
/* ------------------------------------------------------------------ */

function RosterRow({
  member,
  active,
  onSelect,
}: {
  member: Member;
  active: boolean;
  onSelect: (slug: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(member.slug)}
      aria-pressed={active}
      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left border-l-2 transition-colors ${
        active
          ? "border-l-accent bg-bg-2"
          : "border-l-transparent hover:bg-bg-2/60"
      }`}
    >
      <span
        className={`text-xs ${active ? "text-accent" : "text-fg-faint"}`}
        aria-hidden
      >
        {active ? "▸" : "·"}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display font-bold text-sm text-fg leading-tight truncate">
          {member.name}
        </span>
        <span className="block text-[0.62rem] tracking-[0.14em] uppercase text-fg-faint">
          {member.role}
        </span>
      </span>
    </button>
  );
}

function Detail({
  member,
  onSelect,
}: {
  member: Member;
  onSelect: (slug: string) => void;
}) {
  const counterpart = counterpartOf(member.slug);
  const contacts = [
    { label: "github", href: `https://github.com/${member.github}` },
    { label: "linkedin", href: `https://www.linkedin.com/in/${member.linkedin}` },
    { label: "email", href: `mailto:${member.email}` },
  ];

  return (
    <div
      key={member.slug}
      style={{ animation: "route-in 0.22s ease-out" }}
      className="card p-6 md:p-7"
    >
      <div className="flex items-start gap-4">
        <span
          className="grid place-items-center w-16 h-16 shrink-0 border border-border bg-bg-3 font-display font-bold text-xl text-accent select-none"
          aria-hidden
        >
          {initials(member.name)}
        </span>
        <div className="min-w-0">
          <span className="tag">{member.group}</span>
          <h3 className="mt-2 font-display font-bold text-xl md:text-2xl leading-tight">
            {member.name}
          </h3>
          <p className="mt-0.5 text-[0.7rem] tracking-[0.14em] uppercase text-fg-faint">
            {member.role}
          </p>
          <p className="mt-0.5 font-mono text-xs text-fg-faint">
            @{member.github}
          </p>
        </div>
      </div>

      <div className="rule my-5" />

      <p className="text-sm text-fg-dim">{member.bio}</p>

      <div className="mt-6 flex flex-wrap gap-2.5">
        {contacts.map((c) => (
          <a
            key={c.label}
            className="btn"
            href={c.href}
            target={c.label === "email" ? undefined : "_blank"}
            rel={c.label === "email" ? undefined : "noreferrer"}
          >
            &gt; {c.label}
          </a>
        ))}
      </div>
      <p className="mt-3 text-xs text-fg-faint break-all">{member.email}</p>

      {counterpart && (
        <div className="mt-6 pt-5 border-t border-border">
          <p className="kicker mb-2">alongside</p>
          <button
            type="button"
            onClick={() => onSelect(counterpart.slug)}
            className="group flex w-full items-center gap-3 text-left"
          >
            <span
              className="grid place-items-center w-10 h-10 shrink-0 border border-border bg-bg-3 font-display font-bold text-xs text-accent select-none"
              aria-hidden
            >
              {initials(counterpart.name)}
            </span>
            <span className="min-w-0">
              <span className="block font-display font-bold text-sm text-fg leading-tight group-hover:text-accent transition-colors">
                {counterpart.name}
              </span>
              <span className="block text-[0.62rem] tracking-[0.14em] uppercase text-fg-faint">
                {counterpart.role}
              </span>
            </span>
            <span className="ml-auto text-accent text-sm" aria-hidden>
              &#8596;
            </span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  page                                                                */
/* ------------------------------------------------------------------ */

export default function AboutClient() {
  const [selected, setSelected] = useState<string>(MEMBERS[0].slug);
  const detailRef = useRef<HTMLDivElement>(null);

  const select = useCallback((slug: string) => {
    setSelected(slug);
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(min-width: 1024px)").matches
    ) {
      requestAnimationFrame(() =>
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  }, []);

  const member = getMember(selected) ?? MEMBERS[0];

  return (
    <>
      <Header current="About Us" />

      <main className="flex-1">
        {/* hero */}
        <section className="wrap pt-12 pb-10 md:pt-16 md:pb-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p className="kicker mb-5">
                {"// PES University — Electronic City Campus"}
              </p>
              <h1 className="font-display font-bold leading-[0.95] text-[clamp(3rem,11vw,6.5rem)]">
                About Us
              </h1>
              <p className="mt-6 text-sm md:text-base text-fg-dim max-w-xl">
                Layer8 is the student-run cybersecurity club at PES University,
                Electronic City Campus. The OSI model stops at seven — the layer
                we train is the one operating the keyboard.
              </p>
              <p className="mt-4 font-mono text-xs text-fg-faint">
                weekly · student-run · offense &amp; defense
              </p>
            </div>

            <AboutTerminal />
          </div>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* who we are */}
        <section className="wrap py-12 md:py-16">
          <span className="tag">who we are</span>
          <h2 className="mt-3 font-display font-bold text-2xl md:text-3xl">
            A room full of people who like breaking things
          </h2>
          <div className="mt-4 grid md:grid-cols-2 gap-x-10 gap-y-4 max-w-4xl text-sm text-fg-dim">
            <p>
              We meet every week to work through capture-the-flag challenges
              across web, cryptography, reverse engineering and binary
              exploitation, then compare notes on what worked. New members start
              from zero; nobody is expected to arrive knowing this stuff.
            </p>
            <p>
              Between sessions we play external CTFs as a team, write up what we
              solve, build tooling and challenge infrastructure, and run
              workshops for the wider campus. Everything with the Layer8 name on
              it was made by a student.
            </p>
          </div>

          <div className="mt-8 grid sm:grid-cols-3 gap-3">
            {WHAT_WE_DO.map(([title, copy]) => (
              <article key={title} className="card">
                <h3 className="font-display font-bold text-sm tracking-[0.1em] uppercase text-fg">
                  {title}
                </h3>
                <p className="mt-2 text-[13px] text-fg-dim">{copy}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="kicker">in association with</span>
            <span className="font-display font-bold text-sm text-fg">CCNCS</span>
            <span className="text-fg-faint text-sm">
              · PES University, Electronic City Campus
            </span>
          </div>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* core team */}
        <section className="wrap py-12 md:py-16">
          <span className="tag">core team</span>
          <h2 className="mt-3 font-display font-bold text-2xl md:text-3xl">
            Who keeps it running
          </h2>
          <p className="mt-2 text-sm text-fg-dim max-w-2xl">
            A club head and vice-head, and a head and vice-head for each of the
            four domains. Pick a name to read their profile and contact — it
            opens right here.
          </p>

          <div className="mt-8 grid lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] gap-8 lg:gap-10 items-start">
            {/* roster */}
            <nav aria-label="Core team" className="flex flex-col gap-6">
              {ROSTER.map((group) => (
                <div key={group.label}>
                  <span className="kicker">{group.label}</span>
                  {group.hint && (
                    <p className="mt-1 text-xs text-fg-dim">{group.hint}</p>
                  )}
                  <div className="mt-2.5 border border-border divide-y divide-border">
                    {group.members.map((m) => (
                      <RosterRow
                        key={m.slug}
                        member={m}
                        active={m.slug === selected}
                        onSelect={select}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            {/* detail */}
            <div ref={detailRef} className="scroll-mt-24 lg:sticky lg:top-24">
              <Detail member={member} onSelect={select} />
            </div>
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
                Want in?
              </h2>
              <p className="mt-2 text-sm text-fg-dim max-w-2xl">
                Come to a weekly session with a laptop. Take on a challenge or a
                writeup, and stick around — that is the whole application.
              </p>
            </div>
            <Link href="/#top" className="btn btn-solid">
              &gt; weekly_sessions
            </Link>
          </div>
        </section>
      </main>

      <Footer current="About Us" />
    </>
  );
}
