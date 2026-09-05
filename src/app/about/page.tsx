import type { Metadata } from "next";
import Link from "next/link";
import { Header, Footer } from "../_components/site-chrome";
import { DOMAINS } from "./about-data";

export const metadata: Metadata = {
  title: "About Us · Layer8 — PES University, ECC",
  description:
    "Layer8 is the student-driven cybersecurity community at PES University, Electronic City Campus — CTFs, workshops, projects and research.",
};

/* ------------------------------------------------------------------ */
/*  content                                                            */
/* ------------------------------------------------------------------ */

const CORE_MEMBERS = [
  {
    number: "01",
    name: "Alex Johnson",
    role: "President",
    bio: "Offensive security, CTFs and making unnecessarily complicated security projects.",
  },
  {
    number: "02",
    name: "Rohan Sharma",
    role: "Vice President",
    bio: "Reverse engineering, binary exploitation and whatever rabbit hole comes next.",
  },
  {
    number: "03",
    name: "Sarah Thomas",
    role: "Technical Lead",
    bio: "Security tooling, research and breaking APIs for educational purposes.",
  },
  {
    number: "04",
    name: "Arjun Mehta",
    role: "CTF Lead",
    bio: "Challenges, competitions and making sure the flags are actually where they should be.",
  },
];

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
                We bring together students interested in cybersecurity, from
                people taking their first steps to those already deep into
                security research and competitive CTFs.
              </p>
              <p>
                Through CTFs, workshops, projects, research and competitions, we
                create an environment where members can explore security outside
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

          <div className="mt-10 pt-8 border-t border-border flex flex-wrap items-center gap-3">
            <span className="kicker">in association with</span>
            <a
              href="https://research.pes.edu/centre/centre-for-computer-networks-and-cyber-security-cc/"
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              &gt; ccncs
            </a>
            <a href="mailto:ccncs@pes.edu" className="btn">
              &gt; ccncs@pes.edu
            </a>
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
                Layer8 is made up of students with different interests, different
                levels of experience and different ways of approaching security.
              </p>
              <p>
                Some of us break web applications. Some reverse binaries. Some
                build tools. Some are still figuring out what a buffer overflow
                is.
              </p>
              <p>That&apos;s exactly how it should be.</p>
            </div>
          </div>

          {/* core */}
          <div className="mt-16 md:mt-24" id="core">
            <div className="mb-7 flex items-end justify-between">
              <div>
                <p className="kicker">{"// core"}</p>
                <h3 className="mt-2.5 font-display font-bold text-[1.35rem]">
                  People keeping the machine running.
                </h3>
              </div>
              <span className="shrink-0 pl-4 text-fg-faint text-[0.65rem] tracking-[0.1em] uppercase max-sm:hidden">
                [ core_team ]
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
              {CORE_MEMBERS.map((m) => (
                <article
                  key={m.number}
                  className="flex flex-col p-[1.4rem] bg-bg-2 min-h-[18rem]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-fg-faint text-[0.7rem]">
                      {m.number}
                    </span>
                    <span className="text-fg-faint text-[0.6rem] tracking-[0.08em] uppercase">
                      <span className="text-accent">&#9679;</span> active
                    </span>
                  </div>

                  <div className="mt-14">
                    <h4 className="font-display font-bold text-[1.15rem]">
                      {m.name}
                    </h4>
                    <span className="mt-1.5 block text-accent text-[0.65rem] tracking-[0.12em] uppercase">
                      {m.role}
                    </span>
                    <p className="mt-5 text-fg-dim text-[0.78rem] leading-[1.7]">
                      {m.bio}
                    </p>
                  </div>

                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto pt-6 text-fg text-[0.72rem] hover:text-accent transition-colors"
                  >
                    &gt; github
                  </a>
                </article>
              ))}
            </div>
          </div>

          {/* members */}
          <div className="mt-16 md:mt-20">
            <div className="mb-7 flex items-end justify-between">
              <div>
                <p className="kicker">{"// members"}</p>
                <h3 className="mt-2.5 font-display font-bold text-[1.35rem]">
                  The rest of the layer.
                </h3>
              </div>
              <span className="shrink-0 pl-4 text-fg-faint text-[0.65rem] tracking-[0.1em] uppercase max-sm:hidden">
                [ community ]
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-24 items-center">
              <div className={bodyCopy}>
                <p>
                  The core might keep things moving, but Layer8 is everyone who
                  shows up, asks questions, solves challenges and shares what they
                  learned afterwards.
                </p>
                <p>
                  You don&apos;t have to be an expert to contribute. You just
                  have to be willing to learn and help someone else learn too.
                </p>
              </div>

              <div className="term w-full">
                <div className="term-bar">
                  <span className="term-dot" />
                  <span className="term-dot" />
                  <span className="term-dot" />
                  <span className="ml-2 text-xs text-fg-dim">
                    layer8 — ~/members
                  </span>
                </div>
                <div className="term-body font-mono">
                  <div>
                    <span className="prompt">$</span> members --count
                  </div>
                  <div className="text-fg font-medium">100+</div>
                  <div className="mt-3">
                    <span className="prompt">$</span> experience --range
                  </div>
                  <div className="text-fg font-medium">beginner &rarr; expert</div>
                  <div className="mt-3">
                    <span className="prompt">$</span> status
                  </div>
                  <div className="text-fg font-medium">growing</div>
                </div>
              </div>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
              {[
                ["100+", "members"],
                ["08", "domains"],
                ["50+", "CTF challenges"],
                ["20+", "projects"],
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

          {/* domains — full roster per domain */}
          <div className="mt-16 md:mt-20" id="domains">
            <div className="mb-7 flex items-end justify-between">
              <div>
                <p className="kicker">{"// domains"}</p>
                <h3 className="mt-2.5 font-display font-bold text-[1.35rem]">
                  Where the work happens.
                </h3>
              </div>
              <span className="shrink-0 pl-4 text-fg-faint text-[0.65rem] tracking-[0.1em] uppercase max-sm:hidden">
                [ rosters ]
              </span>
            </div>

            <p className="mb-6 max-w-2xl text-fg-dim font-mono text-[0.87rem] leading-[1.85]">
              Each domain has a head and a vice-head, and a roster of members
              behind them. Open one for the full list.
            </p>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {DOMAINS.map((d) => (
                <Link
                  key={d.slug}
                  href={`/about/${d.slug}`}
                  className="card text-left flex flex-col transition-colors hover:border-accent"
                >
                  <span className="font-mono text-[0.7rem] text-fg-faint">
                    drwxr-xr-x
                  </span>
                  <span className="mt-2 block font-display font-bold text-lg text-fg">
                    {d.name}
                  </span>
                  <span className="mt-1 block text-xs text-fg-dim line-clamp-3">
                    {d.tagline}
                  </span>
                  <span className="mt-3 block font-mono text-xs text-accent">
                    {`$ cd ~/about/${d.slug}`}
                  </span>
                </Link>
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
            <Link href="/#top" className="btn">
              &gt; weekly_ctfs
            </Link>
          </div>
        </section>
      </main>

      <Footer current="About Us" />
    </>
  );
}
