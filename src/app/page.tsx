import Link from "next/link";
import { InteractiveTerminal } from "./_components/interactive-terminal";
import { Header, Footer } from "./_components/site-chrome";

/* ------------------------------------------------------------------ */
/*  data                                                               */
/* ------------------------------------------------------------------ */

const STATS = [
  ["layer", "08"],
  ["campus", "PESU · ECC"],
  ["cadence", "weekly"],
  ["scope", "ctf / research"],
] as const;

const DOMAINS = [
  [
    "web",
    "Web Exploitation",
    "Auth bypasses, SSRF, injection, request smuggling — the modern app attack surface.",
  ],
  [
    "pwn",
    "Binary Exploitation",
    "Stack and heap corruption, ROP, format strings, exploit dev against real binaries.",
  ],
  [
    "rev",
    "Reverse Engineering",
    "Static and dynamic analysis, unpacking, patching, and reading assembly for sport.",
  ],
  [
    "crypto",
    "Cryptography",
    "Padding oracles, weak PRNGs, RSA math, and the classic 'never roll your own'.",
  ],
  [
    "forensics",
    "Forensics",
    "Disk and memory images, packet captures, log timelines, artifact recovery.",
  ],
  [
    "stego",
    "Steganography",
    "Data hidden in pixels, audio and metadata — spot it, extract it, carve it out.",
  ],
  [
    "osint",
    "OSINT",
    "People, infrastructure and leaks — what the open internet already knows about a target.",
  ],
  [
    "net",
    "Network Security",
    "Protocol abuse, pivoting, traffic analysis and defending the wire.",
  ],
] as const;

/* ------------------------------------------------------------------ */
/*  sections                                                           */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section
      id="top"
      className="wrap pt-14 pb-16 md:pt-20 md:pb-24"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="kicker mb-5">
            {"// PES University — Electronic City Campus"}
          </p>

          <h1 className="font-display text-[clamp(3rem,11vw,6.5rem)] font-bold leading-[0.95]">
            <span className="glitch" data-text="LAYER8">
              LAYER8
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-fg-dim md:text-lg">
            The OSI model stops at seven. The most exploitable layer is
            the one operating the keyboard — and that is the one we
            train.
          </p>

          <p className="mt-4 max-w-xl text-sm text-fg-dim">
            Layer8 is the cybersecurity club at PES University, ECC. We
            run weekly CTFs, break and build across web, crypto,
            reversing and pwn, and turn curiosity into capability.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/weekly-ctfs" className="btn btn-solid">
              &gt; weekly_ctfs
            </Link>

            <button type="button" className="btn">
              &gt; join_layer8
            </button>
          </div>
        </div>

        <InteractiveTerminal />
      </div>

      <div className="mt-16 grid grid-cols-2 divide-x divide-border border border-border md:grid-cols-4">
        {STATS.map(([key, value]) => (
          <div key={key} className="bg-bg-2 p-4 md:p-5">
            <div className="kicker">{key}</div>

            <div className="mt-1 font-display text-xl font-bold text-accent md:text-2xl">
              {value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHead({
  tag,
  title,
  sub,
}: {
  tag: string;
  title: string;
  sub: string;
}) {
  return (
    <div className="mb-8">
      <span className="tag">{tag}</span>

      <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">
        {title}
      </h2>

      <p className="mt-2 max-w-2xl text-sm text-fg-dim">
        {sub}
      </p>
    </div>
  );
}

function Domains() {
  return (
    <section className="wrap py-16 md:py-20">
      <SectionHead
        tag="domains"
        title="What we break, in eight directions"
        sub="Every member picks a lane and goes deep, then cross-trains on the rest during weekly sessions."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {DOMAINS.map(([slug, name, description]) => (
          <article key={slug} className="card">
            <div className="text-xs text-fg-dim">
              <span className="text-accent">~/</span>
              {slug}
            </div>

            <h3 className="mt-2 font-display text-lg font-bold">
              {name}
            </h3>

            <p className="mt-2 text-[13px] text-fg-dim">
              {description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function CTFStrip() {
  return (
    <section className="wrap py-16 md:py-20">
      <div className="panel relative overflow-hidden p-8 md:p-12">
        <div className="relative z-[1] grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <span className="tag">weekly ctfs</span>

            <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">
              Every week, a new set of flags.
            </h2>

            <p className="mt-2 max-w-xl text-sm text-fg-dim">
              Beginner-friendly challenges, a live scoreboard, and
              writeups afterwards. Show up with a laptop and a browser —
              we handle the rest.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="btn btn-solid justify-center"
            >
              &gt; view_schedule
            </button>

            <button
              type="button"
              className="btn justify-center"
            >
              &gt; past_writeups
            </button>
          </div>
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute -right-6 -bottom-10 select-none font-display text-[9rem] font-bold leading-none text-fg opacity-[0.04]"
        >
          CTF
        </span>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  page                                                               */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <>
      <Header />

      <main className="flex-1">
        <Hero />

        <div className="wrap">
          <div className="rule" />
        </div>

        <Domains />

        <div className="wrap">
          <div className="rule" />
        </div>

        <CTFStrip />
      </main>

      <Footer />
    </>
  );
}