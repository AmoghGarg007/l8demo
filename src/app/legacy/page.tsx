import type { Metadata } from "next";
import Link from "next/link";
import { InteractiveTerminal } from "../_components/interactive-terminal";
import { Header, Footer } from "../_components/site-chrome";
import { ALUMNI } from "../about/about-data";
import { MemberAvatar } from "../about/member-avatar";

/**
 * Ported from anish20126-collab/layer8legacy. The alumni directory is
 * real — everyone in MEMBERS whose status is "alumni".
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
                batch since has built on what came before, and every graduate
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
                      className="flex flex-wrap items-center gap-x-2"
                    >
                      <MemberAvatar member={a} className="w-7 h-7 text-[0.6rem]" />
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
