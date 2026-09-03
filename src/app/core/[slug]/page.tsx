import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "../../_components/site-chrome";
import {
  GROUP_ACCENT,
  MEMBERS,
  counterpartOf,
  getMember,
  initials,
} from "../core";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return MEMBERS.map((m) => ({ slug: m.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const m = getMember(slug);
  if (!m) return {};
  return {
    title: `${m.name} · Layer8 Core`,
    description: `${m.name} — ${m.role} at Layer8, the cybersecurity club at PES University, Electronic City Campus.`,
  };
}

export default async function MemberPage({ params }: Params) {
  const { slug } = await params;
  const m = getMember(slug);
  if (!m) notFound();

  const accent = GROUP_ACCENT[m.group];
  const counterpart = counterpartOf(slug);
  const links = [
    { label: "github", href: `https://github.com/${m.github}` },
    { label: "linkedin", href: `https://www.linkedin.com/in/${m.linkedin}` },
    { label: "email", href: `mailto:${m.email}` },
  ];

  return (
    <>
      <Header current="Core" />

      <main className="flex-1">
        <section className="wrap max-w-[52rem] pt-12 pb-20 md:pt-16">
          <Link href="/core" className="text-xs text-accent">
            &lt; back_to_core
          </Link>

          <div className="mt-6 flex items-start gap-5">
            <span
              className="grid place-items-center w-20 h-20 shrink-0 border border-border bg-bg-3 font-display font-bold text-2xl select-none"
              style={{ color: accent }}
              aria-hidden
            >
              {initials(m.name)}
            </span>
            <div className="min-w-0">
              <span className="tag">{m.group}</span>
              <h1 className="mt-2 font-display font-bold leading-[1.1] text-[clamp(1.9rem,5vw,2.8rem)]">
                {m.name}
              </h1>
              <p className="mt-1 text-[0.72rem] tracking-[0.14em] uppercase text-fg-faint">
                {m.role}
              </p>
              <p className="mt-1 font-mono text-xs text-fg-faint">@{m.github}</p>
            </div>
          </div>

          <div
            className="mt-8 h-[2px] w-full"
            style={{
              background: `linear-gradient(90deg, ${accent}, transparent)`,
            }}
            aria-hidden
          />

          <p className="mt-8 text-sm md:text-base text-fg-dim max-w-2xl">
            {m.bio}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {links.map((l) => (
              <a
                key={l.label}
                className="btn"
                href={l.href}
                target={l.label === "email" ? undefined : "_blank"}
                rel={l.label === "email" ? undefined : "noreferrer"}
              >
                &gt; {l.label}
              </a>
            ))}
          </div>

          <p className="mt-4 text-xs text-fg-faint break-all">{m.email}</p>

          {counterpart && (
            <>
              <div className="rule my-10" />
              <p className="kicker mb-3">alongside</p>
              <Link
                href={`/core/${counterpart.slug}`}
                className="card flex items-center gap-3 sm:max-w-sm transition-colors hover:border-accent"
              >
                <span
                  className="grid place-items-center w-11 h-11 shrink-0 border border-border bg-bg-3 font-display font-bold text-sm select-none"
                  style={{ color: GROUP_ACCENT[counterpart.group] }}
                  aria-hidden
                >
                  {initials(counterpart.name)}
                </span>
                <span className="min-w-0">
                  <span className="block font-display font-bold text-fg leading-tight">
                    {counterpart.name}
                  </span>
                  <span className="block text-[0.7rem] tracking-[0.14em] uppercase text-fg-faint">
                    {counterpart.role}
                  </span>
                </span>
                <span className="ml-auto text-accent text-sm" aria-hidden>
                  &gt;
                </span>
              </Link>
            </>
          )}
        </section>
      </main>

      <Footer current="Core" />
    </>
  );
}
