import Link from "next/link";
import { InteractiveTerminal } from "./_components/interactive-terminal";
import { Header, Footer } from "./_components/site-chrome";

/* ------------------------------------------------------------------ */
/*  data                                                               */
/* ------------------------------------------------------------------ */

const DOMAINS = [
  [
    "web",
    "Web exploitation",
    "Auth bypasses, SSRF, injection and request smuggling. The modern app attack surface.",
  ],
  [
    "pwn",
    "Binary exploitation",
    "Stack and heap corruption, ROP, format strings, exploit dev against real binaries.",
  ],
  [
    "rev",
    "Reverse engineering",
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
    "Network security",
    "Protocol abuse, pivoting, traffic analysis and defending the wire.",
  ],
] as const;

const OSI = [
  ["L7", "Application"],
  ["L6", "Presentation"],
  ["L5", "Session"],
  ["L4", "Transport"],
  ["L3", "Network"],
  ["L2", "Data link"],
  ["L1", "Physical"],
] as const;

const SESSION = [
  [
    "Solve",
    "Beginner-friendly challenges across every domain. Show up with a laptop and a browser.",
    "ln-pat-grid",
  ],
  [
    "Climb",
    "A live scoreboard keeps the week competitive, whether you are first or fiftieth.",
    "ln-pat-hatch",
  ],
  [
    "Learn",
    "Writeups go up afterwards, so nothing stays a mystery. Read them, then do it faster.",
    "ln-pat-dots",
  ],
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

function OsiStack() {
  return (
    <div className="ln-os" aria-label="The OSI model, with layer 8 unpatched">
      <div className="ln-os-8">
        <span className="ln-os-code">L8</span>
        <span className="ln-os-name">People</span>
        <span className="ln-os-status ln-os-status-hot">unpatched</span>
      </div>

      <div className="ln-os-body">
        <span aria-hidden className="ln-os-scan" />
        {OSI.map(([code, name]) => (
          <div key={code} className="ln-os-row">
            <span className="ln-os-code">{code}</span>
            <span className="ln-os-name">{name}</span>
            <span className="ln-os-status">patched</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="ln-hero">
      <span aria-hidden className="ln-glow" />

      <div className="wrap ln-hero-grid">
        <div>
          <h1 className="ln-h1 ln-rise">
            Layer 8 is
            <br />
            <em>unpatched.</em>
          </h1>

          <p
            className="ln-sub ln-rise"
            style={{ "--d": "0.12s" } as React.CSSProperties}
          >
            Layer8 is the cybersecurity club at PES University, ECC. We train
            the people on the keyboard: weekly CTFs, real exploits.
          </p>

          <div
            className="mt-9 flex flex-wrap gap-3 ln-rise"
            style={{ "--d": "0.24s" } as React.CSSProperties}
          >
            <Link href="/recruitments" className="btn btn-solid">
              &gt; join_layer8
            </Link>

            <Link href="/weekly-ctfs" className="btn">
              &gt; weekly_ctfs
            </Link>
          </div>
        </div>

        <div
          className="ln-rise"
          style={{ "--d": "0.2s" } as React.CSSProperties}
        >
          <OsiStack />
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <section className="wrap ln-section">
      <div className="ln-reveal">
        <span className="tag">domains</span>
        <h2 className="ln-h2 mt-4">Eight ways in.</h2>
      </div>

      <ul className="ln-index">
        {DOMAINS.map(([slug, name, description]) => (
          <li key={slug} className="ln-item ln-reveal">
            <span className="ln-item-slug">
              <span className="text-accent">~/</span>
              {slug}
            </span>
            <h3 className="ln-item-name">{name}</h3>
            <p className="ln-item-desc">{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function TerminalBand() {
  return (
    <section className="ln-term">
      <div className="wrap ln-term-grid">
        <div className="ln-reveal">
          <h2 className="ln-h2">Poke around.</h2>
          <p className="mt-4 max-w-xs text-sm text-fg-dim">
            Type <span className="text-fg">help</span>. Every domain has a
            readme.
          </p>
        </div>

        <div className="ln-reveal">
          <InteractiveTerminal fs={TERMINAL_FS} />
        </div>
      </div>
    </section>
  );
}

function Weekly() {
  return (
    <section className="wrap ln-section">
      <div className="ln-reveal">
        <span className="tag">weekly ctfs</span>
        <h2 className="ln-h2 mt-4">A new set of flags, every week.</h2>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/weekly-ctfs" className="btn btn-solid">
            &gt; view_schedule
          </Link>

          <Link href="/ctf-writeups" className="btn">
            &gt; past_writeups
          </Link>
        </div>
      </div>

      <div className="ln-stack">
        {SESSION.map(([verb, text, pat], i) => (
          <article
            key={verb}
            className="ln-card"
            style={{ "--i": i } as React.CSSProperties}
          >
            <div>
              <h3 className="ln-card-verb">{verb}</h3>
              <p className="ln-card-text">{text}</p>
            </div>
            <span aria-hidden className={`ln-card-art ${pat}`} />
          </article>
        ))}
      </div>
    </section>
  );
}

function Final() {
  return (
    <section className="ln-final">
      <span aria-hidden className="ln-final-8">
        8
      </span>

      <div className="wrap relative z-[1]">
        <h2 className="ln-final-h ln-reveal">
          Think you can
          <br />
          <em>break it?</em>
        </h2>

        <p className="mt-6 max-w-sm text-sm text-fg-dim ln-reveal">
          Apply with your PESU login. One form, five domains.
        </p>

        <div className="mt-9 flex flex-wrap gap-3 ln-reveal">
          <Link href="/recruitments" className="btn btn-solid">
            &gt; join_layer8
          </Link>

          <Link href="/about" className="btn">
            &gt; about_us
          </Link>
        </div>
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
        <Index />
        <TerminalBand />
        <Weekly />
        <Final />
      </main>

      <Footer />
    </>
  );
}
