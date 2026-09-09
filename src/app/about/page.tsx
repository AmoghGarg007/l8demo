import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "../_components/site-chrome";
import { MEMBERS } from "./about-data";
import { AboutMembers } from "./about-members";

export const metadata: Metadata = {
  title: "About Us · Layer8 — PES University, ECC",
  description:
    "Layer8 is the student-driven cybersecurity community at PES University, Electronic City Campus — CTFs, workshops, blogs and competitions.",
};

/* ------------------------------------------------------------------ */
/*  content                                                            */
/* ------------------------------------------------------------------ */

const WHAT_WE_DO = [
  {
    label: "~/ctfs",
    title: "CTF contests",
    text: "A fresh challenge set on a regular cycle, spanning every domain of security — a few hours on the clock, hosted on our own platform.",
  },
  {
    label: "~/blogs",
    title: "Blogs & Tool of the Week",
    text: "A running series where members break down security tools and new developments, beginner to advanced.",
  },
  {
    label: "~/workshops",
    title: "Workshops & guest speakers",
    text: "Regular technical sessions and talks from people working in the field — concepts moving from slides into terminals.",
  },
];

const CURRENT_COUNT = MEMBERS.filter((m) => m.status === "current").length;
const CORE_COUNT = MEMBERS.filter((m) => m.core).length;

/* ------------------------------------------------------------------ */
/*  small pieces                                                       */
/* ------------------------------------------------------------------ */

function SectionHeading({
  kicker,
  title,
  index,
}: {
  kicker: string;
  title: string;
  index: string;
}) {
  return (
    <div className="mb-12 md:mb-14 flex items-start justify-between border-b border-border pb-6">
      <div>
        <p className="kicker">{kicker}</p>
        <h2 className="mt-3 font-display font-bold leading-none tracking-[-0.04em] text-[clamp(2.1rem,5vw,3.2rem)]">
          {title}
        </h2>
      </div>
      <span className="shrink-0 pl-4 text-fg-faint text-[0.7rem] tracking-[0.1em]">
        {index}
      </span>
    </div>
  );
}

const bigText =
  "max-w-xl font-display font-medium text-fg leading-[1.25] tracking-[-0.025em] text-[clamp(1.45rem,3vw,2.15rem)]";
const bodyCopy =
  "max-w-xl text-fg-dim font-mono text-[0.87rem] leading-[1.85] space-y-4";

/* ------------------------------------------------------------------ */
/*  page                                                               */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <>
      <Header current="About Us" />

      <main className="flex-1">
        {/* hero */}
        <section className="wrap flex items-center min-h-[62vh] pt-24 pb-16">
          <div className="w-full">
            <p className="kicker">{"// about_layer8"}</p>
            <h1 className="my-5 md:my-7 font-display font-bold leading-[0.9] tracking-[-0.06em] text-[clamp(3.8rem,11vw,7.5rem)]">
              The human
              <br />
              layer<span className="text-accent">.</span>
            </h1>
            <p className="max-w-2xl text-fg text-[clamp(0.95rem,2vw,1.1rem)] leading-relaxed">
              The OSI model stops at seven layers, physical up to application.
              Layer 8 is the informal one on top — the human at the keyboard.
            </p>
            <p className="mt-3 max-w-2xl text-sm text-fg-dim leading-relaxed">
              User error, social engineering, every human-shaped mistake in
              security lives there. It&apos;s also the name of the cybersecurity
              community at PES University, Electronic City Campus.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5 text-[0.68rem] tracking-[0.12em] uppercase text-fg-faint">
              <span>security</span>
              <span className="text-accent">/</span>
              <span>community</span>
              <span className="text-accent">/</span>
              <span>curiosity</span>
            </div>
          </div>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* what we are */}
        <section className="wrap py-20">
          <SectionHeading
            kicker="// what_we_are"
            title="What we are."
            index="01"
          />

          <div className="grid md:grid-cols-2 gap-12 lg:gap-32 items-start">
            <p className={bigText}>
              A student-driven cybersecurity community built around learning by
              actually doing.
            </p>
            <div className={bodyCopy}>
              <p>
                Students at every experience level, coming at security from every
                direction — web, crypto, reversing, pwn and everything around
                them.
              </p>
              <p>
                CTFs, workshops, blogs and competitions: a place to explore
                cybersecurity outside the classroom. The only prerequisite is
                curiosity.
              </p>
            </div>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHAT_WE_DO.map((c) => (
              <article key={c.label} className="card">
                <span className="block text-accent text-[0.68rem] tracking-[0.14em] uppercase">
                  {c.label}
                </span>
                <h3 className="mt-4 mb-3 font-display font-bold text-[1.2rem]">
                  {c.title}
                </h3>
                <p className="text-fg-dim text-[0.82rem] leading-[1.75]">
                  {c.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* who we are */}
        <section className="wrap py-20 md:pt-24" id="who-we-are">
          <SectionHeading kicker="// who_we_are" title="Who we are." index="02" />

          <div className="grid md:grid-cols-2 gap-12 lg:gap-32 items-start">
            <p className={bigText}>
              Different backgrounds.
              <br />
              Different skill levels.
              <br />
              Same curiosity.
            </p>
            <div className={bodyCopy}>
              <p>
                Some break web applications, some reverse binaries, some are
                still figuring out what a buffer overflow is. That&apos;s exactly
                how it should be.
              </p>
              <p>
                Layer8 runs on people teaching people and sharing what they
                find.
              </p>
            </div>
          </div>

          {/* members */}
          <div className="mt-16 md:mt-24" id="members">
            <div className="mb-7 flex items-end justify-between">
              <div>
                <p className="kicker">{"// members"}</p>
                <h3 className="mt-2.5 font-display font-bold text-[1.35rem]">
                  The people behind Layer8.
                </h3>
              </div>
              <span className="shrink-0 pl-4 text-fg-faint text-[0.65rem] tracking-[0.1em] uppercase max-sm:hidden">
                [ club + domains ]
              </span>
            </div>

            <p className="mb-10 max-w-2xl text-fg-dim font-mono text-[0.87rem] leading-[1.85]">
              The people running the machine, the people building it, and
              everyone who keeps the layer alive.
            </p>

            <AboutMembers />

            {/* stats */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
              {[
                [`${CURRENT_COUNT}`, "current members"],
                [`${CORE_COUNT}`, "core roles"],
                ["08", "security domains"],
                ["∞", "rabbit holes"],
              ].map(([value, label]) => (
                <div key={label} className="flex flex-col p-6 bg-bg">
                  <strong className="text-accent font-display font-bold text-[1.6rem]">
                    {value}
                  </strong>
                  <span className="mt-1 text-fg-faint text-[0.62rem] tracking-[0.12em] uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* philosophy */}
        <section className="wrap py-20 md:pt-24" id="layer8-phil">
          <SectionHeading
            kicker="// layer8_phil"
            title="How we work."
            index="03"
          />

          <div className="grid md:grid-cols-2 gap-12 lg:gap-32 items-start">
            <p className={bigText}>
              Curiosity first.
              <br />
              Credentials later.
            </p>
            <div className={bodyCopy}>
              <p>
                Security makes more sense once you&apos;ve seen the failure
                yourself. We favour hands-on exploration over memorising attack
                names, and a solved challenge matters less than the writeup that
                helps the next person solve it.
              </p>
            </div>
          </div>

          <div className="term mt-12">
            <div className="term-bar">
              <span className="term-dot" />
              <span className="term-dot" />
              <span className="term-dot" />
              <span className="ml-auto text-xs text-fg-dim">layer8 — ~/phil</span>
            </div>
            <div className="term-body font-mono">
              <div>
                <span className="prompt">$</span> cat philosophy.txt
              </div>
              <div className="text-fg-dim pl-[1.1rem]">
                curiosity &gt; credentials
              </div>
              <div className="text-fg-dim pl-[1.1rem]">
                hands_on &gt; theory_only
              </div>
              <div className="text-fg-dim pl-[1.1rem]">share &gt; gatekeep</div>
              <div className="text-fg-dim pl-[1.1rem]">
                build &rarr; break &rarr; understand &rarr; repeat
              </div>
              <div>
                <span className="prompt">$</span>{" "}
                <span className="cursor">&nbsp;</span>
              </div>
            </div>
          </div>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* final cta */}
        <section className="wrap pt-24 pb-32">
          <p className="kicker">{"// find_your_layer"}</p>
          <h2 className="my-4 md:mb-6 font-display font-bold leading-[0.95] tracking-[-0.05em] text-[clamp(2.8rem,7vw,5.5rem)]">
            There is always
            <br />
            another layer<span className="text-accent">.</span>
          </h2>
          <p className="max-w-lg text-fg-dim text-[0.9rem] leading-[1.75]">
            Come learn, break things, build things and figure out what
            you&apos;re capable of.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/recruitments" className="btn btn-solid">
              &gt; join_layer8
            </Link>
            <Link href="/weekly-ctfs" className="btn">
              &gt; weekly_ctfs
            </Link>
          </div>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* in association with */}
        <section className="wrap py-10 md:py-12">
          <div className="flex flex-wrap items-center gap-5">
            <span className="kicker">in association with</span>
            <a
              href="https://research.pes.edu/centre/centre-for-computer-networks-and-cyber-security-cc/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-xl border border-border bg-bg-2 px-4 py-2.5 transition hover:-translate-y-0.5 hover:border-accent"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brand/ccncs-transparent.png"
                alt=""
                aria-hidden
                className="ccncs-mark"
              />
              <span className="font-display font-bold text-base tracking-tight text-fg">
                CCNCS
              </span>
            </a>
            <a href="mailto:ccncs@pes.edu" className="btn">
              &gt; ccncs@pes.edu
            </a>
          </div>
        </section>
      </main>

      <Footer current="About Us" />
    </>
  );
}
