import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "../_components/site-chrome";
import {
  COMMUNITY_MEMBERS,
  CORE_MEMBERS,
  MEMBERS,
  type Member,
} from "./about-data";
import { MemberAvatar } from "./member-avatar";

export const metadata: Metadata = {
  title: "About Us · Layer8 — PES University, ECC",
  description:
    "Layer8 is the student-driven cybersecurity community at PES University, Electronic City Campus — CTFs, workshops, projects and research.",
};

/* ------------------------------------------------------------------ */
/*  content                                                            */
/* ------------------------------------------------------------------ */

const WHAT_WE_DO = [
  {
    label: "~/ctfs",
    title: "Capture the Flag",
    text: "Challenges designed to make you think, break things and learn something new along the way.",
  },
  {
    label: "~/workshops",
    title: "Workshops",
    text: "Technical sessions where concepts move from slides into terminals.",
  },
  {
    label: "~/projects",
    title: "Projects",
    text: "Build security tools, experiment with ideas and turn what you learn into something real.",
  },
  {
    label: "~/research",
    title: "Research",
    text: "Follow interesting vulnerabilities, techniques and problems wherever the rabbit hole leads.",
  },
];

const PHILOSOPHY = [
  {
    number: "01",
    label: "learn",
    title: "Learn by doing.",
    text: "Security makes more sense when you can see the failure yourself. We favour hands-on exploration over memorising attack names.",
  },
  {
    number: "02",
    label: "break",
    title: "Break things.",
    text: "Understanding how something breaks is often the fastest way to understand how it works.",
  },
  {
    number: "03",
    label: "share",
    title: "Share what you learn.",
    text: "A solved challenge is useful. A writeup that helps someone else solve the next one is better.",
  },
  {
    number: "04",
    label: "build",
    title: "Build, don't just consume.",
    text: "Tools, challenges, research and experiments turn concepts into actual skills.",
  },
];

const CURRENT_COUNT = MEMBERS.filter((m) => m.status === "current").length;

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
  "max-w-xl text-fg-dim font-mono text-[0.87rem] leading-[1.85] space-y-5";

function profileHref(m: Member): string | undefined {
  if (m.portfolio) return m.portfolio;
  if (m.github) return `https://github.com/${m.github}`;
  if (m.linkedin) return `https://www.linkedin.com/in/${m.linkedin}`;
  if (m.email) return `mailto:${m.email}`;
  return undefined;
}

function MemberCard({
  m,
  idx,
  core,
}: {
  m: Member;
  idx: number;
  core?: boolean;
}) {
  const href = profileHref(m);
  return (
    <article className="card flex gap-3.5 p-4">
      <MemberAvatar
        member={m}
        className={
          core ? "w-16 h-16 text-lg self-start" : "w-12 h-12 text-sm self-start"
        }
      />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center justify-between gap-2 text-[0.55rem] tracking-[0.12em] uppercase">
          <span className="truncate text-accent">{m.role}</span>
          <span className="shrink-0 text-fg-faint">
            {core ? "core" : String(idx).padStart(2, "0")}
          </span>
        </div>

        <h4 className="font-display font-bold text-[0.92rem] leading-tight text-fg">
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
          <p className="mt-0.5 line-clamp-2 text-[0.72rem] leading-snug text-fg-dim">
            &ldquo;{m.bio}&rdquo;
          </p>
        )}

        {href && (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="mt-auto pt-1.5 text-[0.66rem] text-accent hover:underline"
          >
            &gt; profile
          </a>
        )}
      </div>
    </article>
  );
}

function GroupHeading({
  label,
  desc,
}: {
  label: string;
  desc: string;
}) {
  return (
    <div className="mb-6 flex items-center gap-4">
      <span className="shrink-0 font-mono text-[0.7rem] tracking-[0.12em] uppercase text-fg-faint">
        {label}
      </span>
      <span className="h-px flex-1 bg-border" />
      <span className="shrink-0 text-[0.62rem] tracking-[0.1em] uppercase text-fg-faint max-sm:hidden">
        {desc}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  page                                                               */
/* ------------------------------------------------------------------ */

export default function AboutPage() {
  return (
    <>
      <Header current="About Us" />

      <main className="flex-1">
        {/* hero */}
        <section className="wrap flex items-center min-h-[72vh] pt-24 pb-20">
          <div className="w-full">
            <p className="kicker">{"// about_layer8"}</p>
            <h1 className="my-5 md:my-8 font-display font-bold leading-[0.9] tracking-[-0.06em] text-[clamp(3.8rem,11vw,7.5rem)]">
              The human
              <br />
              layer<span className="text-accent">.</span>
            </h1>
            <p className="max-w-2xl text-fg text-[clamp(0.95rem,2vw,1.1rem)] leading-relaxed">
              The cybersecurity community at PES University, Electronic City
              Campus.
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

        {/* what we are */}
        <section className="wrap py-20">
          <SectionHeading
            kicker="// what_we_are"
            title="What we are."
            index="01"
          />

          <div className="grid md:grid-cols-2 gap-12 lg:gap-32 items-start">
            <p className={bigText}>
              Layer8 is a student-driven cybersecurity community built around
              learning by actually doing.
            </p>
            <div className={bodyCopy}>
              <p>
                We bring together students with different interests, experience
                levels and ways of approaching security.
              </p>
              <p>
                Through CTFs, workshops, projects, research and competitions,
                Layer8 gives students a place to explore cybersecurity outside
                the classroom.
              </p>
              <p>There is no prerequisite for curiosity.</p>
            </div>
          </div>

          <div className="mt-16 grid sm:grid-cols-2 gap-4">
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
                Some of us break web applications. Some reverse binaries. Some
                build tools. Some are still figuring out what a buffer overflow
                is.
              </p>
              <p>That&apos;s exactly how it should be.</p>
              <p>
                Layer8 is built around people teaching people, sharing what they
                discover and giving each other room to get better.
              </p>
            </div>
          </div>

          {/* members — core + community */}
          <div className="mt-16 md:mt-24" id="members">
            <div className="mb-7 flex items-end justify-between">
              <div>
                <p className="kicker">{"// members"}</p>
                <h3 className="mt-2.5 font-display font-bold text-[1.35rem]">
                  The people behind Layer8.
                </h3>
              </div>
              <span className="shrink-0 pl-4 text-fg-faint text-[0.65rem] tracking-[0.1em] uppercase max-sm:hidden">
                [ core + community ]
              </span>
            </div>

            <p className="mb-10 max-w-2xl text-fg-dim font-mono text-[0.87rem] leading-[1.85]">
              The people running the machine, the people building it, and
              everyone who keeps the layer alive.
            </p>

            {/* core */}
            <GroupHeading
              label="00 / core"
              desc="people keeping the machine running"
            />
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {CORE_MEMBERS.map((m, i) => (
                <MemberCard key={m.slug} m={m} idx={i + 1} core />
              ))}
            </div>

            {/* community */}
            <div className="mt-14">
              <GroupHeading label="01 / members" desc="the rest of the layer" />
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {COMMUNITY_MEMBERS.map((m, i) => (
                  <MemberCard
                    key={m.slug}
                    m={m}
                    idx={CORE_MEMBERS.length + i + 1}
                  />
                ))}
              </div>
            </div>

            {/* stats */}
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
              {[
                [`${CURRENT_COUNT}`, "current members"],
                [`${CORE_MEMBERS.length}`, "core roles"],
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

        {/* philosophy */}
        <section className="wrap py-20 md:pt-24" id="layer8-phil">
          <SectionHeading
            kicker="// layer8_phil"
            title="Layer8 philosophy."
            index="03"
          />

          <div className="mb-12 grid md:grid-cols-2 gap-12 lg:gap-32">
            <p className={bigText}>
              Curiosity first.
              <br />
              Credentials later.
            </p>
            <p className="max-w-xl text-fg-dim font-mono text-[0.87rem] leading-[1.85]">
              We believe cybersecurity is best learned through experimentation,
              failure and sharing what you discover.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {PHILOSOPHY.map((item) => (
              <article
                key={item.number}
                className="card flex flex-col min-h-[14.5rem]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-fg-faint text-[0.7rem]">
                    {item.number}
                  </span>
                  <span className="text-accent text-[0.68rem] tracking-[0.14em] uppercase">
                    / {item.label}
                  </span>
                </div>
                <h3 className="mt-10 font-display font-bold text-[1.2rem]">
                  {item.title}
                </h3>
                <p className="mt-3 text-fg-dim text-[0.82rem] leading-[1.75]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>

          <div className="term mt-8">
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

        {/* final cta */}
        <section className="wrap pt-28 pb-36">
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
            <Link href="/#top" className="btn btn-solid">
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
