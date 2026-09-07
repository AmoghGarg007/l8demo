"use client";

import { useState } from "react";
import {
  DOMAINS,
  MEMBERS,
  getDomain,
  getDomainMembers,
  getMember,
  profileHref,
  type Member,
} from "./about-data";
import { MemberAvatar } from "./member-avatar";

/* ------------------------------------------------------------------ */
/*  cards                                                              */
/* ------------------------------------------------------------------ */

/** Big card — club head/vice and each domain's head + vice. */
function LeadCard({ m, rank }: { m: Member; rank: string }) {
  const href = profileHref(m);
  return (
    <article className="card flex gap-4 p-5">
      <MemberAvatar
        member={m}
        className="w-24 h-24 text-2xl self-start"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2 text-[0.58rem] tracking-[0.13em] uppercase">
          <span className="truncate text-accent">{m.role}</span>
          <span className="shrink-0 text-fg-faint">{rank}</span>
        </div>
        <h4 className="font-display font-bold text-[1.1rem] leading-tight text-fg">
          {m.name}
        </h4>
        <div className="flex flex-wrap items-center gap-x-1.5 text-[0.57rem] tracking-[0.08em] uppercase text-fg-faint">
          {m.alias && (
            <>
              <span>@{m.alias}</span>
              <span className="text-fg-faint/50">·</span>
            </>
          )}
          <span>{m.group}</span>
          <span className="text-fg-faint/50">·</span>
          <span>{m.year ?? "—"}</span>
        </div>
        {m.bio && (
          <p className="mt-0.5 line-clamp-2 text-[0.75rem] leading-snug text-fg-dim">
            &ldquo;{m.bio}&rdquo;
          </p>
        )}
        {href && (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="mt-auto pt-1.5 text-[0.68rem] text-accent hover:underline"
          >
            &gt; profile
          </a>
        )}
      </div>
    </article>
  );
}

/** Small card — the rest of a domain's roster. */
function MiniCard({ m }: { m: Member }) {
  const href = profileHref(m);
  const inner = (
    <>
      <MemberAvatar member={m} className="w-11 h-11 text-[0.7rem]" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <h4 className="truncate font-display font-bold text-[0.82rem] leading-tight text-fg">
          {m.name}
        </h4>
        <span className="truncate text-[0.54rem] tracking-[0.1em] uppercase text-fg-faint">
          {m.alias ? `@${m.alias} · ` : ""}
          {m.year ?? m.role}
        </span>
      </div>
    </>
  );
  const cls =
    "card flex items-center gap-3 p-3 min-w-0 transition-colors";
  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${cls} hover:border-accent`}
    >
      {inner}
    </a>
  ) : (
    <article className={cls}>{inner}</article>
  );
}

function RosterHeading({ label, count }: { label: string; count: number }) {
  return (
    <div className="mb-5 flex items-center gap-4">
      <span className="shrink-0 font-mono text-[0.7rem] tracking-[0.12em] uppercase text-fg-faint">
        {label}
      </span>
      <span className="h-px flex-1 bg-border" />
      <span className="shrink-0 text-[0.62rem] tracking-[0.1em] uppercase text-fg-faint">
        {count} {count === 1 ? "person" : "people"}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  section                                                            */
/* ------------------------------------------------------------------ */

export function AboutMembers() {
  const [activeSlug, setActiveSlug] = useState(DOMAINS[0].slug);

  // club head + vice — the two core "Club" people, head first
  const clubLeads = MEMBERS.filter((m) => m.group === "Club" && m.core).sort(
    (a, b) =>
      (a.role.toLowerCase().includes("vice") ? 1 : 0) -
      (b.role.toLowerCase().includes("vice") ? 1 : 0),
  );
  const clubOthers = MEMBERS.filter(
    (m) => m.group === "Club" && m.status === "current" && !m.core,
  );

  const domain = getDomain(activeSlug)!;
  const head = getMember(domain.headSlug);
  const vice = getMember(domain.viceSlug);
  const roster = getDomainMembers(domain.slug);

  return (
    <div>
      {/* club leadership */}
      <RosterHeading label="00 / club" count={clubLeads.length + clubOthers.length} />
      <div className="grid gap-4 sm:grid-cols-2">
        {clubLeads.map((m, i) => (
          <LeadCard key={m.slug} m={m} rank={i === 0 ? "head" : "vice"} />
        ))}
      </div>
      {clubOthers.length > 0 && (
        <div className="mt-3 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {clubOthers.map((m) => (
            <MiniCard key={m.slug} m={m} />
          ))}
        </div>
      )}

      {/* domain filter */}
      <div className="mt-14">
        <RosterHeading label="01 / domains" count={DOMAINS.length} />
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter members by domain"
        >
          {DOMAINS.map((d) => {
            const active = d.slug === activeSlug;
            return (
              <button
                key={d.slug}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveSlug(d.slug)}
                className={`font-mono text-[0.72rem] tracking-[0.08em] px-3.5 py-1.5 border transition-colors ${
                  active
                    ? "bg-accent border-accent text-bg font-bold"
                    : "bg-transparent border-border text-fg-dim hover:text-fg"
                }`}
              >
                {d.name}
              </button>
            );
          })}
        </div>

        {/* active domain — head + vice in a line, then the roster */}
        <div key={domain.slug} style={{ animation: "route-in 0.22s ease-out" }}>
          <p className="mt-6 max-w-2xl text-[0.8rem] leading-relaxed text-fg-dim">
            {domain.tagline}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 items-stretch">
            {head && <LeadCard m={head} rank="head" />}
            {vice && <LeadCard m={vice} rank="vice" />}
          </div>

          {roster.length > 0 && (
            <div className="mt-8">
              <RosterHeading
                label={`${domain.name.toLowerCase()} / members`}
                count={roster.length}
              />
              <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                {roster.map((m) => (
                  <MiniCard key={m.slug} m={m} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
