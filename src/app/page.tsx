import Link from "next/link";
import { InteractiveTerminal } from "./_components/interactive-terminal";
import { Header, Footer } from "./_components/site-chrome";

/* ------------------------------------------------------------------ */
/*  data                                                               */
/* ------------------------------------------------------------------ */

const DOMAINS = [
  [
    "web",
    "Web Exploitation",
    "Auth bypasses, SSRF, injection and request smuggling. The modern app attack surface.",
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
    "Padding oracles, weak PRNGs, RSA math, and the classic: never roll your own.",
  ],
  [
    "forensics",
    "Forensics",
    "Disk and memory images, packet captures, log timelines, artifact recovery.",
  ],
  [
    "stego",
    "Steganography",
    "Data hidden in pixels, audio and metadata. Spot it, extract it, carve it out.",
  ],
  [
    "osint",
    "OSINT",
    "People, infrastructure and leaks: what the open internet already knows about a target.",
  ],
  [
    "network",
    "Network Security",
    "Protocol abuse, pivoting, traffic analysis and defending the wire.",
  ],
] as const;

const SESSION = [
  ["Solve", "Beginner-friendly challenges across every domain."],
  ["Climb", "A live scoreboard keeps the week competitive."],
  ["Learn", "Writeups go up afterwards, so nothing stays a mystery."],
] as const;

const TERMINAL_FS = {
  dir: "domains",
  entries: DOMAINS.map(([slug]) => slug),
  files: Object.fromEntries(
    DOMAINS.flatMap(([slug, , desc]) => [
      [slug, desc],
      [`${slug}/readme.md`, desc],
      [`domains/${slug}/readme.md`, desc],
    ]),
  ),
} as const;

/* ------------------------------------------------------------------ */
/*  sections                                                           */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section id="top" className="lp-hero">
      <span aria-hidden className="lp-eight">
        8
      </span>

      <div className="wrap relative z-[1]">
        <h1 className="lp-h1 lp-rise">
          We train the
          <br />
          <em>eighth layer.</em>
        </h1>

        <div className="lp-hero-row">
          <div className="lp-rise" style={{ "--d": "0.15s" } as React.CSSProperties}>
            <p className="lp-sub">
              Layer8 is the cybersecurity club at PES University, ECC.
              Weekly CTFs, real exploits, and people who like breaking
              things.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/recruitments" className="btn btn-solid">
                &gt; join_layer8
              </Link>

              <Link href="/weekly-ctfs" className="btn">
                &gt; weekly_ctfs
              </Link>
            </div>
          </div>

          <div className="lp-rise" style={{ "--d": "0.3s" } as React.CSSProperties}>
            <InteractiveTerminal fs={TERMINAL_FS} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const group = DOMAINS.map(([slug]) => (
    <span key={slug} className="lp-marquee-item">
      {slug}
    </span>
  ));

  return (
    <div className="lp-marquee" aria-label="Domains we cover">
      <div className="lp-marquee-track">
        <div className="lp-marquee-group">{group}</div>
        <div className="lp-marquee-group" aria-hidden>
          {group}
        </div>
      </div>
    </div>
  );
}

function Manifesto() {
  return (
    <section className="wrap lp-manifesto">
      <p className="lp-big lp-reveal">The OSI model stops at seven.</p>

      <p className="lp-big lp-big-dim lp-reveal">
        The most exploitable layer is the one operating the keyboard.{" "}
        <span className="text-accent">That is the one we train.</span>
      </p>

      <p className="lp-body lp-reveal">
        We run weekly CTFs, break and build across web, crypto, reversing
        and pwn, and turn curiosity into capability.
      </p>
    </section>
  );
}

function Domains() {
  return (
    <section className="wrap lp-section">
      <div className="lp-reveal">
        <span className="tag">domains</span>

        <h2 className="lp-h2 mt-4">Eight directions to break things in.</h2>

        <p className="mt-3 max-w-xl text-sm text-fg-dim">
          Pick a lane, go deep, and cross-train on the rest in weekly
          sessions.
        </p>
      </div>

      <div className="lp-bento">
        {DOMAINS.map(([slug, name, description]) => (
          <article key={slug} className={`lp-cell lp-cell-${slug} lp-reveal`}>
            <div className="text-xs text-fg-dim">
              <span className="text-accent">~/</span>
              {slug}
            </div>

            <div>
              <h3 className="lp-cell-name">{name}</h3>
              <p className="lp-cell-desc">{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function WeeklyCTFs() {
  return (
    <section className="wrap lp-section">
      <div className="lp-ctf">
        <div className="lp-reveal">
          <span className="tag">weekly ctfs</span>

          <h2 className="lp-h2 mt-4">Every week, a new set of flags.</h2>

          <p className="mt-4 max-w-md text-sm text-fg-dim">
            Bring a laptop and a browser. We handle the rest.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/weekly-ctfs" className="btn btn-solid">
              &gt; view_schedule
            </Link>

            <Link href="/ctf-writeups" className="btn">
              &gt; past_writeups
            </Link>
          </div>
        </div>

        <div className="lp-rows">
          {SESSION.map(([verb, text]) => (
            <div key={verb} className="lp-row lp-reveal">
              <span className="lp-row-verb">{verb}</span>
              <p className="text-sm text-fg-dim">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function JoinBand() {
  return (
    <section className="lp-final">
      <div className="wrap">
        <h2 className="lp-final-h">Think you can break it?</h2>

        <p className="lp-final-p">
          Apply with your PESU login. One form, five domains.
        </p>

        <Link href="/recruitments" className="lp-final-btn">
          &gt; join_layer8
        </Link>
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
        <Ticker />
        <Manifesto />
        <Domains />
        <WeeklyCTFs />
        <JoinBand />
      </main>

      <Footer />
    </>
  );
}
