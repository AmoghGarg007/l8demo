import type { Metadata } from "next";
import Link from "next/link";
import { InteractiveTerminal } from "../_components/interactive-terminal";
import { Header, Footer } from "../_components/site-chrome";
import {
  HOF,
  MEDAL,
  PLACEMENT_LABEL,
  TOTAL_INDUCTEES,
  initials,
  type HofEvent,
  type HofTeam,
} from "./hof-data";

/**
 * Ported from PixelAlgorithm/l8halloffame. Upstream is a standalone Vite
 * app; here it's the podium records only, rebuilt in the site's own
 * terminal aesthetic. Data lives in ./hof-data.ts.
 */

export const metadata: Metadata = {
  title: "Hall of Fame · Layer8 — PES University, ECC",
  description:
    "The teams who topped Layer8's competitions — Escape Matrix, SUDO$RM and every podium since.",
};

const HOF_SCRIPT = `$ ls hall-of-fame/
${HOF.map((e) => e.slug).join("  ")}
$ cat hall-of-fame/${HOF[0].slug}
${HOF[0].event} (${HOF[0].year})
${HOF[0].teams
  .map((t) => `  ${MEDAL[t.placement]} ${t.team} — ${t.members.length} members`)
  .join("\n")}`;

const HOF_FS = {
  dir: "hall-of-fame",
  entries: HOF.map((e) => e.slug),
  files: Object.fromEntries(
    HOF.flatMap((e) => {
      const body = `${e.event} · ${e.year}\n${e.blurb}\n\n${e.teams
        .map(
          (t) =>
            `${MEDAL[t.placement]} ${t.team}${t.note ? ` (${t.note})` : ""}\n   ${t.members.join(", ")}`,
        )
        .join("\n")}`;
      return [
        [e.slug, body],
        [`${e.slug}.md`, body],
        [`hall-of-fame/${e.slug}`, body],
      ];
    }),
  ),
} as const;

const STATS: readonly [string, string][] = [
  [String(HOF.length), "competitions logged"],
  [String(HOF.reduce((n, e) => n + e.teams.length, 0)), "podium teams"],
  [String(TOTAL_INDUCTEES), "inductees on the wall"],
  ["100%", "archive integrity"],
];

function medalBorder(placement: HofTeam["placement"]): string {
  if (placement === "1st") return "border-accent/60";
  if (placement === "2nd") return "border-fg-dim/50";
  return "border-border";
}

function TeamCard({ team }: { team: HofTeam }) {
  return (
    <article className={`card p-5 md:p-6 border ${medalBorder(team.placement)}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="text-2xl leading-none">{MEDAL[team.placement]}</span>
          <div>
            <h4 className="font-display font-bold text-lg leading-tight">
              {team.team}
            </h4>
            <p className="text-[0.62rem] uppercase tracking-[0.14em] text-fg-faint">
              {PLACEMENT_LABEL[team.placement]}
            </p>
          </div>
        </div>
        <span className="shrink-0 font-mono text-[0.62rem] font-bold px-2 py-0.5 border border-border text-fg-dim">
          {team.placement}
        </span>
      </div>

      {team.note && (
        <p className="mt-3 font-mono text-[0.68rem] text-fg-faint">
          {"// "}
          {team.note}
        </p>
      )}

      <ul className="mt-4 border-t border-border divide-y divide-border">
        {team.members.map((name) => (
          <li key={name} className="flex items-center gap-3 py-2.5">
            <span
              aria-hidden
              className="shrink-0 grid place-items-center w-8 h-8 border border-border bg-bg-3 font-display font-bold text-[0.7rem] text-accent select-none"
            >
              {initials(name)}
            </span>
            <span className="text-[0.85rem] text-fg-dim">{name}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function EventBlock({ ev }: { ev: HofEvent }) {
  return (
    <section id={ev.slug} className="wrap py-12 md:py-16 scroll-mt-24">
      <span className="tag">{ev.slug.replace(/-/g, "_")}</span>
      <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2 className="font-display font-bold text-2xl md:text-3xl">
          {ev.event}
        </h2>
        <span className="font-mono text-xs text-fg-faint">{ev.year}</span>
      </div>
      <p className="mt-2 text-sm text-fg-dim max-w-2xl">{ev.blurb}</p>

      <div className="mt-7 grid gap-3 md:grid-cols-2 lg:grid-cols-3 items-start">
        {ev.teams.map((t) => (
          <TeamCard key={`${ev.slug}-${t.placement}`} team={t} />
        ))}
      </div>
    </section>
  );
}

export default function HallOfFamePage() {
  return (
    <>
      <Header current="Hall of Fame" />

      <main className="flex-1">
        {/* hero */}
        <section className="wrap pt-12 pb-10 md:pt-16 md:pb-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p className="kicker mb-5">
                {"// PES University — Electronic City Campus"}
              </p>
              <h1 className="font-display font-bold leading-[0.95] text-[clamp(3rem,11vw,6.5rem)]">
                Hall of Fame
              </h1>
              <p className="mt-6 text-sm md:text-base text-fg-dim max-w-xl">
                Every Layer8 competition ends on a podium. This is the archive
                of who stood on it — the teams that broke out fastest, scored
                highest and captured the last flag before anyone else.
              </p>
            </div>

            <InteractiveTerminal
              script={HOF_SCRIPT}
              barLabel="layer8@pesu — ~/hall-of-fame"
              fs={HOF_FS}
            />
          </div>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {HOF.map((ev) => (
          <div key={ev.slug}>
            <EventBlock ev={ev} />
            <div className="wrap">
              <div className="rule" />
            </div>
          </div>
        ))}

        {/* by the numbers */}
        <section className="wrap py-12 md:py-16">
          <span className="tag">by_the_numbers</span>
          <h2 className="mt-3 font-display font-bold text-2xl md:text-3xl">
            The wall, counted
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
                Want your team on this wall?
              </h2>
              <p className="mt-2 text-sm text-fg-dim max-w-2xl">
                Show up to the next Layer8 CTF. Podiums get logged here the week
                after results.
              </p>
            </div>
            <Link href="/weekly-ctfs" className="btn btn-solid">
              &gt; weekly_ctfs
            </Link>
          </div>
        </section>
      </main>

      <Footer current="Hall of Fame" />
    </>
  );
}
