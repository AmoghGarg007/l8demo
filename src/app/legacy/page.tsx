import type { Metadata } from "next";
import Link from "next/link";
import { InteractiveTerminal } from "../_components/interactive-terminal";
import { Header, Footer } from "../_components/site-chrome";
import { ALUMNI } from "../about/about-data";

/**
 * Ported from anish20126-collab/layer8legacy. The club-history bits
 * (commit log, founding crew, headline numbers) are still placeholder
 * flavour; the alumni directory is real — everyone in MEMBERS whose
 * status is "alumni".
 */

export const metadata: Metadata = {
  title: "Legacy & Alumni · Layer8 — PES University, ECC",
  description:
    "Layer8's history and the alumni still on the network — the people who moved on but kept the door open.",
};

const alumniLink = (a: (typeof ALUMNI)[number]) =>
  a.portfolio ??
  (a.github ? `https://github.com/${a.github}` : undefined) ??
  (a.linkedin ? `https://www.linkedin.com/in/${a.linkedin}` : undefined);

const yearTag = (year?: string) => (year ?? "alum").split(",")[0].trim();

const LEGACY_SCRIPT = ALUMNI.length
  ? `$ ls alumni/
${ALUMNI.map((a) => a.slug).join("  ")}
$ cat alumni/${ALUMNI[0].slug}
${ALUMNI[0].name} · ${ALUMNI[0].role}`
  : `$ ls alumni/
(directory empty)`;

const LEGACY_FS = {
  dir: "alumni",
  entries: ALUMNI.map((a) => a.slug),
  files: Object.fromEntries(
    ALUMNI.flatMap((a) => {
      const body = `${a.name} · ${a.role} · ${a.year ?? "—"}`;
      return [
        [a.slug, body],
        [`alumni/${a.slug}`, body],
      ];
    }),
  ),
} as const;

const HISTORY_LOG = [
  ["a1f00c2", "2019 — root commit: layer8 registered, first CTF lab stood up"],
  ["d3e7b81", "2020 — patch: hosted first inter-college jeopardy CTF, 40 teams"],
  ["7bc41aa", "2021 — feat: layer8 lands a top-10 finish in a national pwn track"],
  ["92aa031", "2021 — infra: dedicated lab granted, vuln-box range goes always-on"],
  ["f10d5e6", "2022 — feat: weekly_ctfs shipped as a standing Friday fixture"],
  ["c4b8912", "2023 — feat: alumni onboarded as mentors for the induction batch"],
  ["0e2f77d", "2024 — release: layer8 hosts its first on-campus red-vs-blue CTF"],
  ["55a19b0", "2025 — feat: alumni network formalised as a standing resource"],
] as const;

const FOUNDERS = [
  {
    handle: "the_pwner",
    bio: "Wrote layer8's first binary exploitation writeups, still assigned as reading for new members.",
  },
  {
    handle: "the_forensics_lead",
    bio: "Built the club's first packet-capture challenge set. It's been rerun, with variations, every year since.",
  },
] as const;

const STATS = [
  ["7", "years running without a break"],
  ["150+", "weekly CTFs hosted"],
  ["300+", "members trained through the club"],
  [String(ALUMNI.length), "alumni on the network"],
] as const;

export default function LegacyPage() {
  return (
    <>
      <Header current="Legacy/Alumni" />

      <main className="flex-1">
        {/* hero */}
        <section className="wrap pt-12 pb-10 md:pt-16 md:pb-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p className="kicker mb-5">
                {"// PES University — Electronic City Campus"}
              </p>
              <h1 className="font-display font-bold leading-[0.95] text-[clamp(3rem,11vw,6.5rem)]">
                Legacy &amp; Alumni
              </h1>
              <p className="mt-6 text-sm md:text-base text-fg-dim max-w-xl">
                Layer8 didn&apos;t start as a club — it started as five people
                in a lab after hours, arguing about a buffer overflow. Every
                batch since has added a line to the log, and every graduate
                stays on the network. This is both.
              </p>
            </div>

            <InteractiveTerminal
              script={LEGACY_SCRIPT}
              barLabel="layer8@pesu — ~/legacy"
              fs={LEGACY_FS}
            />
          </div>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* history log */}
        <section className="wrap py-12 md:py-16">
          <span className="tag">history_log</span>
          <h2 className="mt-3 font-display font-bold text-2xl md:text-3xl">
            Commits since 2019
          </h2>

          <div className="term mt-7">
            <div className="term-bar">
              <span className="term-dot" />
              <span className="term-dot" />
              <span className="term-dot" />
              <span className="ml-2 text-xs text-fg-dim">
                layer8@history — ~
              </span>
            </div>
            <div className="term-body font-mono">
              <div>
                <span className="prompt">$</span> git log --oneline --reverse
                layer8
              </div>
              <div className="mt-3 space-y-1.5">
                {HISTORY_LOG.map(([hash, message]) => (
                  <div key={hash}>
                    <span className="prompt">{hash}</span>{" "}
                    <span className="text-fg-dim">{message}</span>
                  </div>
                ))}
                <div>
                  <span className="text-accent">HEAD</span>{" "}
                  <span className="text-fg-dim">2026 — WIP: this page</span>
                  <span className="cursor">&nbsp;</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* alumni directory */}
        <section className="wrap py-12 md:py-16">
          <span className="tag">alumni_directory</span>
          <h2 className="mt-3 font-display font-bold text-2xl md:text-3xl">
            Nodes still connected
          </h2>

          <div className="term mt-7">
            <div className="term-bar">
              <span className="term-dot" />
              <span className="term-dot" />
              <span className="term-dot" />
              <span className="ml-2 text-xs text-fg-dim">
                layer8@alumni — ~
              </span>
            </div>
            <div className="term-body font-mono">
              <div>
                <span className="prompt">$</span> layer8 --scan
                --target=alumni --status
              </div>
              <div className="mt-3 text-fg-dim">
                scanning network... {ALUMNI.length}{" "}
                {ALUMNI.length === 1 ? "node" : "nodes"} found
              </div>
              <div className="mt-3 space-y-1.5">
                {ALUMNI.map((a) => {
                  const href = alumniLink(a);
                  const name = href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      className="text-fg-dim hover:text-accent transition-colors"
                    >
                      {a.name}
                    </a>
                  ) : (
                    <span className="text-fg-dim">{a.name}</span>
                  );
                  return (
                    <div
                      key={a.slug}
                      className="flex flex-wrap items-baseline gap-x-2"
                    >
                      <span className="prompt">[{yearTag(a.year)}]</span>
                      {name}
                      <span className="text-fg-faint">::</span>
                      <span className="text-fg-dim">{a.role}</span>
                      <span className="ml-auto text-accent text-xs">[UP]</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 text-fg-dim">
                uptime: still reachable. no node has gone dark.
                <span className="cursor">&nbsp;</span>
              </div>
            </div>
          </div>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* founding crew */}
        <section className="wrap py-12 md:py-16">
          <span className="tag">founding_crew</span>
          <h2 className="mt-3 font-display font-bold text-2xl md:text-3xl">
            Who started it
          </h2>
          <p className="mt-2 text-sm text-fg-dim max-w-2xl">
            Two names, one lab, no funding. What they built is still running.
          </p>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {FOUNDERS.map((f) => (
              <article key={f.handle} className="card">
                <h3 className="font-display font-bold text-lg">{f.handle}</h3>
                <p className="mt-2 text-[13px] text-fg-dim">{f.bio}</p>
              </article>
            ))}
          </div>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* by the numbers */}
        <section className="wrap py-12 md:py-16">
          <span className="tag">by_the_numbers</span>
          <h2 className="mt-3 font-display font-bold text-2xl md:text-3xl">
            Seven years in
          </h2>

          <div className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
            {STATS.map(([value, label]) => (
              <div key={label} className="bg-bg-2 p-4 md:p-5">
                <div className="font-display font-bold text-xl md:text-2xl text-accent">
                  {value}
                </div>
                <p className="mt-1 text-xs text-fg-dim">{label}</p>
              </div>
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
                Know an alum we should list?
              </h2>
              <p className="mt-2 text-sm text-fg-dim max-w-2xl">
                The directory is maintained by members. Send a name, batch and
                current role and we&apos;ll add the node.
              </p>
            </div>
            <Link href="/#top" className="btn btn-solid">
              &gt; weekly_sessions
            </Link>
          </div>
        </section>
      </main>

      <Footer current="Legacy/Alumni" />
    </>
  );
}
