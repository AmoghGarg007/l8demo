import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "../../_components/site-chrome";
import {
  DOMAINS,
  getDomain,
  getDomainMembers,
  getMember,
  initials,
  type Member,
} from "../about-data";

export function generateStaticParams() {
  return DOMAINS.map((d) => ({ domain: d.slug }));
}
export const dynamicParams = false;

type Params = { params: Promise<{ domain: string }> };

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { domain } = await params;
  const d = getDomain(domain);
  return {
    title: `${d?.name ?? "Domain"} · Layer8 — PES University, ECC`,
    description:
      d?.tagline ??
      "A Layer8 domain — its head, vice-head and full roster of members.",
  };
}

/** small label next to a roster name — alumni, or a lead/webmaster role */
function rosterBadge(m: Member): string | null {
  if (m.status === "alumni") return "alumni";
  if (/head|vice|lead|webmaster/i.test(m.role)) return m.role;
  return null;
}

/* ------------------------------------------------------------------ */
/*  lead card — head is rendered bigger than the vice-head             */
/* ------------------------------------------------------------------ */

function LeadCard({ member, lead }: { member: Member; lead: boolean }) {
  const contacts = [
    member.github && {
      label: "github",
      href: `https://github.com/${member.github}`,
    },
    member.linkedin && {
      label: "linkedin",
      href: `https://www.linkedin.com/in/${member.linkedin}`,
    },
    member.portfolio && { label: "portfolio", href: member.portfolio },
    member.email && { label: "email", href: `mailto:${member.email}` },
  ].filter((c): c is { label: string; href: string } => Boolean(c));

  return (
    <div className="card p-6 flex flex-col h-full">
      <div className="flex items-start gap-4">
        <span
          className={`grid place-items-center shrink-0 border border-border bg-bg-3 font-display font-bold text-accent select-none ${
            lead ? "w-20 h-20 text-2xl" : "w-16 h-16 text-xl"
          }`}
          aria-hidden
        >
          {initials(member.name)}
        </span>
        <div className="min-w-0">
          <span className="tag">{lead ? "domain head" : "vice-head"}</span>
          <h3
            className={`mt-2 font-display font-bold leading-tight ${
              lead ? "text-2xl" : "text-xl"
            }`}
          >
            {member.name}
          </h3>
          <p className="mt-0.5 text-[0.7rem] tracking-[0.14em] uppercase text-fg-faint">
            {member.role}
          </p>
          {member.alias && (
            <p className="mt-0.5 font-mono text-xs text-fg-faint">
              @{member.alias}
            </p>
          )}
        </div>
      </div>

      {member.bio && <p className="mt-4 text-sm text-fg-dim">{member.bio}</p>}

      <div className="mt-auto pt-5 flex flex-wrap gap-2.5">
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
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  page                                                               */
/* ------------------------------------------------------------------ */

export default async function DomainPage({ params }: Params) {
  const { domain } = await params;
  const d = getDomain(domain);
  if (!d) notFound();

  const head = getMember(d.headSlug);
  const vice = getMember(d.viceSlug);
  const members = getDomainMembers(d.slug);

  return (
    <>
      <Header current="About Us" />

      <main className="flex-1">
        {/* hero */}
        <section className="wrap pt-12 pb-10 md:pt-16 md:pb-12">
          <p className="kicker mb-5">{`// layer8 / about / ${d.slug}`}</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="font-display font-bold leading-[0.95] text-[clamp(3rem,11vw,6.5rem)]">
              {d.name}
            </h1>
            <Link href="/about" className="link-ghost text-sm">
              &larr; back to About Us
            </Link>
          </div>
          <p className="mt-6 text-sm md:text-base text-fg-dim max-w-2xl">
            {d.tagline}
          </p>
          <p className="mt-4 font-mono text-xs text-fg-faint">
            {(() => {
              const n = members.length + (head ? 1 : 0) + (vice ? 1 : 0);
              return `${n} ${n === 1 ? "person" : "people"}`;
            })()}
            {head ? " · 1 head" : ""}
            {vice ? " · 1 vice-head" : ""}
          </p>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* leads */}
        <section className="wrap py-12 md:py-16">
          <span className="tag">who runs it</span>
          <h2 className="mt-3 font-display font-bold text-2xl md:text-3xl">
            Head &amp; vice-head
          </h2>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 items-stretch">
            {head && <LeadCard member={head} lead />}
            {vice && <LeadCard member={vice} lead={false} />}
          </div>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* roster */}
        <section className="wrap py-12 md:py-16">
          <span className="tag">roster</span>
          <h2 className="mt-3 font-display font-bold text-2xl md:text-3xl">
            {d.name} members
          </h2>
          <p
            className="mt-2 text-[0.72rem] tracking-[0.14em] uppercase text-fg-faint"
            role="status"
          >
            {members.length} {members.length === 1 ? "member" : "members"}
          </p>

          {members.length > 0 ? (
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((m) => {
                const badge = rosterBadge(m);
                return (
                  <div
                    key={m.slug}
                    className="card flex items-center gap-3 p-4"
                  >
                    <span
                      className="grid place-items-center w-11 h-11 shrink-0 border border-border bg-bg-3 font-display font-bold text-xs text-accent select-none"
                      aria-hidden
                    >
                      {initials(m.name)}
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-2">
                        <span className="block font-display font-bold text-sm text-fg leading-tight truncate">
                          {m.name}
                        </span>
                        {badge && (
                          <span className="tag shrink-0">{badge}</span>
                        )}
                      </span>
                      <span className="block text-[0.62rem] tracking-[0.14em] uppercase text-fg-faint">
                        {m.year ?? m.role}
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="mt-8 p-6 border border-dashed border-border text-sm text-fg-dim">
              Roster for this domain is being finalised — check back soon.
            </p>
          )}
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* cta */}
        <section className="wrap py-16 md:py-20">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl">
                Want to join {d.name}?
              </h2>
              <p className="mt-2 text-sm text-fg-dim max-w-2xl">
                Come to a weekly session, pick up a challenge or a task in this
                domain, and stick around.
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
