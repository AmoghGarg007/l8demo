"use client";

import { useState } from "react";
import {
  DOMAINS,
  MEMBERS,
  getDomain,
  getDomainMembers,
  getMember,
  type Member,
} from "./about-data";
import { MemberAvatar } from "./member-avatar";

/* ------------------------------------------------------------------ */
/*  social icons                                                      */
/* ------------------------------------------------------------------ */

type SocialKind = "github" | "linkedin" | "portfolio" | "email";
type SocialLink = { kind: SocialKind; href: string };

function socialLinks(m: Member): SocialLink[] {
  const links: SocialLink[] = [];
  if (m.github) links.push({ kind: "github", href: `https://github.com/${m.github}` });
  if (m.linkedin) {
    links.push({
      kind: "linkedin",
      href: `https://www.linkedin.com/in/${m.linkedin}`,
    });
  }
  if (m.portfolio) links.push({ kind: "portfolio", href: m.portfolio });
  if (links.length === 0 && m.email) {
    links.push({ kind: "email", href: `mailto:${m.email}` });
  }
  return links;
}

const ICON_PATHS: Record<SocialKind, React.ReactNode> = {
  github: (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  portfolio: (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path d="M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3M9 2h5v5M6.5 9.5L14 2" />
    </svg>
  ),
  email: (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      aria-hidden
    >
      <rect x="1.5" y="3" width="13" height="10" rx="1.2" />
      <path d="M2 4l6 5 6-5" />
    </svg>
  ),
};

function SocialRow({ links }: { links: SocialLink[] }) {
  if (links.length === 0) return null;
  return (
    <div className="flex items-center gap-2.5">
      {links.map((l) => (
        <a
          key={l.kind}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          aria-label={l.kind}
          className="text-fg-faint transition-colors hover:text-accent"
        >
          {ICON_PATHS[l.kind]}
        </a>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  cards                                                              */
/* ------------------------------------------------------------------ */

/** Big card — club head/vice and each domain's head + vice: photo left, info right. */
function LeadCard({ m, rank }: { m: Member; rank: string }) {
  const links = socialLinks(m);
  return (
    <article className="card flex gap-0 overflow-hidden p-0">
      <MemberAvatar
        member={m}
        className="h-32 w-32 shrink-0 text-3xl sm:h-40 sm:w-40"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-1.5 p-4">
        <div className="flex items-center justify-between gap-2 text-[0.58rem] tracking-[0.13em] uppercase">
          <span className="truncate text-accent">{m.role}</span>
          <span className="shrink-0 text-fg-faint">{rank}</span>
        </div>
        <h4 className="font-display font-bold text-[1.15rem] leading-tight text-fg">
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
          <p className="mt-0.5 line-clamp-2 text-[0.78rem] italic leading-snug text-fg-dim">
            &ldquo;{m.bio}&rdquo;
          </p>
        )}
        <div className="mt-auto pt-2">
          <SocialRow links={links} />
        </div>
      </div>
    </article>
  );
}

/** Small card — the rest of a domain's roster: photo on top, info below. */
function MiniCard({ m }: { m: Member }) {
  const links = socialLinks(m);
  return (
    <article className="card flex flex-col overflow-hidden p-0">
      <MemberAvatar member={m} className="aspect-square w-full text-3xl" />
      <div className="flex flex-1 flex-col gap-0.5 p-3.5">
        <h4 className="truncate font-display font-bold text-[0.88rem] leading-tight text-fg">
          {m.name}
        </h4>
        <span className="truncate text-[0.56rem] tracking-[0.1em] uppercase text-fg-faint">
          {m.alias ? `@${m.alias} · ` : ""}
          {m.role}
        </span>
        {m.bio && (
          <p className="mt-0.5 line-clamp-2 text-[0.7rem] italic leading-snug text-fg-dim">
            &ldquo;{m.bio}&rdquo;
          </p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="shrink-0 text-[0.55rem] tracking-[0.1em] uppercase text-fg-faint">
            {m.group}
          </span>
          <SocialRow links={links} />
        </div>
      </div>
    </article>
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
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
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
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
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
