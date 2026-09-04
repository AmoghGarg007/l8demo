"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { InteractiveTerminal } from "../_components/interactive-terminal";
import { Header, Footer } from "../_components/site-chrome";

/* ------------------------------------------------------------------ */
/*  data                                                                */
/* ------------------------------------------------------------------ */

const PATH = [
  {
    num: "01",
    title: "Live in the shell",
    copy: "OverTheWire Bandit, levels 0–20. Teaches ssh, file handling, pipes and grep by making you need them. Budget two evenings.",
    url: "overthewire.org/wargames/bandit",
  },
  {
    num: "02",
    title: "Break a web app",
    copy: "PortSwigger's Web Security Academy — the SQL injection and access control tracks. Free labs, graded, written by the people who build Burp.",
    url: "portswigger.net/web-security",
  },
  {
    num: "03",
    title: "Play a real CTF",
    copy: "picoCTF's practice gym. Beginner categories are solvable with step 01 and 02 alone — the rest is where you find out what you like.",
    url: "play.picoctf.org/practice",
  },
  {
    num: "04",
    title: "Turn up on Friday",
    copy: "Bring one unsolved challenge to the weekly session. Explaining where you got stuck is the fastest way through it, and it is how the team gets picked.",
    url: null,
  },
] as const;

type Resource = {
  kind: string;
  name: string;
  copy: string;
  tags: string[];
  meta: string[];
};

const RESOURCES: Resource[] = [
  // practice ranges
  {
    kind: "practice range",
    name: "picoCTF Gym",
    copy: "Carnegie Mellon's beginner CTF archive. Every past challenge, permanently playable, with hints that do not give the answer away.",
    tags: ["web", "pwn", "crypto", "forensics"],
    meta: ["beginner", "free"],
  },
  {
    kind: "practice range",
    name: "TryHackMe",
    copy: "Guided rooms with an in-browser attack box. Best for filling gaps in a specific topic rather than free-form hacking.",
    tags: ["web", "pwn", "crypto", "forensics", "osint"],
    meta: ["beginner", "free tier"],
  },
  {
    kind: "practice range",
    name: "Hack The Box",
    copy: "Full machines to root with no hand-holding. Start on retired boxes and read someone's writeup after you finish, never before.",
    tags: ["web", "pwn", "forensics"],
    meta: ["intermediate", "free tier"],
  },
  {
    kind: "course",
    name: "pwn.college",
    copy: "ASU's binary exploitation curriculum, lectures and graded challenges included. The most complete free path into memory corruption.",
    tags: ["pwn"],
    meta: ["advanced", "free"],
  },
  {
    kind: "practice range",
    name: "CryptoHack",
    copy: "Cryptography taught as puzzles in Python. Covers modular arithmetic through to real RSA and AES failures.",
    tags: ["crypto"],
    meta: ["intermediate", "free"],
  },
  {
    kind: "exercises",
    name: "Cryptopals",
    copy: "Eight sets of attacks you implement yourself. Slow, unglamorous, and the reason people stop trusting their own crypto code.",
    tags: ["crypto"],
    meta: ["advanced", "free"],
  },
  {
    kind: "course",
    name: "Web Security Academy",
    copy: "Labs and theory for every major web class — injection, SSRF, deserialisation, request smuggling. The reference we teach from.",
    tags: ["web"],
    meta: ["all levels", "free"],
  },
  {
    kind: "practice range",
    name: "Root-Me",
    copy: "Several hundred short challenges sorted by category. Useful when you want one problem in a single topic, not a whole machine.",
    tags: ["web", "pwn", "crypto", "forensics"],
    meta: ["all levels", "free"],
  },
  // reading
  {
    kind: "reference",
    name: "HackTricks",
    copy: "The wiki everyone opens mid-challenge. Enumeration checklists and escalation tricks per service and platform.",
    tags: ["web", "pwn", "crypto", "forensics", "osint"],
    meta: ["reference", "free"],
  },
  {
    kind: "reference",
    name: "PayloadsAllTheThings",
    copy: "Payload and bypass collection per vulnerability class. Read the methodology notes, not just the copy-paste strings.",
    tags: ["web", "tooling"],
    meta: ["reference", "free"],
  },
  {
    kind: "reference",
    name: "GTFOBins",
    copy: "Unix binaries that can be abused to break out of restricted shells or escalate privilege. Pairs with LOLBAS on the Windows side.",
    tags: ["pwn", "blue-team"],
    meta: ["reference", "free"],
  },
  {
    kind: "book",
    name: "CTF Field Guide",
    copy: "Trail of Bits' short guide to how competitions work and how to prepare for one. Read it before your first live event.",
    tags: ["web", "pwn", "crypto", "forensics"],
    meta: ["beginner", "free"],
  },
  {
    kind: "book",
    name: "Nightmare",
    copy: "Binary exploitation walked through one real CTF challenge at a time, from basic overflows to heap grooming.",
    tags: ["pwn"],
    meta: ["intermediate", "free"],
  },
  // tooling
  {
    kind: "tool",
    name: "Burp Suite Community",
    copy: "Intercepting proxy for anything HTTP. Learn Repeater and Decoder first — Intruder is rate-limited on the free build.",
    tags: ["tooling", "web"],
    meta: ["tooling", "free"],
  },
  {
    kind: "tool",
    name: "Ghidra",
    copy: "NSA's reverse engineering suite with a solid decompiler. Enough for almost every reversing challenge you will meet at student level.",
    tags: ["tooling", "pwn"],
    meta: ["tooling", "free"],
  },
  {
    kind: "tool",
    name: "pwntools",
    copy: "Python library for writing exploits — process and socket handling, packing, ROP and shellcode helpers in a few lines.",
    tags: ["tooling", "pwn"],
    meta: ["tooling", "free"],
  },
  {
    kind: "tool",
    name: "CyberChef",
    copy: "Chained encoding, decoding and analysis in the browser. The first thing to try on any blob of text you cannot identify.",
    tags: ["tooling", "crypto", "forensics"],
    meta: ["tooling", "free"],
  },
  {
    kind: "tool",
    name: "Wireshark",
    copy: "Packet capture and analysis. Most network forensics challenges are a display filter and a follow-stream away from solved.",
    tags: ["tooling", "forensics", "blue-team"],
    meta: ["tooling", "free"],
  },
  {
    kind: "tool",
    name: "Volatility 3",
    copy: "Memory forensics framework. Pulls processes, network connections and injected code out of a RAM image.",
    tags: ["tooling", "forensics"],
    meta: ["tooling", "free"],
  },
  // osint
  {
    kind: "reference",
    name: "OSINT Framework",
    copy: "A map of open-source intelligence sources by what you are starting from — a username, a domain, an image, a phone number.",
    tags: ["osint"],
    meta: ["reference", "free"],
  },
  {
    kind: "tool",
    name: "Sherlock",
    copy: "Checks a username across hundreds of sites. Run it against your own handles once and see how much of a footprint you left.",
    tags: ["osint", "tooling"],
    meta: ["tooling", "free"],
  },
  // blue team
  {
    kind: "practice range",
    name: "Blue Team Labs Online",
    copy: "Investigations from the defender's chair — log triage, phishing analysis, incident timelines. Rarer skill, easier hiring.",
    tags: ["blue-team"],
    meta: ["intermediate", "free tier"],
  },
  {
    kind: "reference",
    name: "MITRE ATT&CK",
    copy: "The shared vocabulary for attacker behaviour. Learn to name a technique and detection engineering starts making sense.",
    tags: ["blue-team"],
    meta: ["reference", "free"],
  },
  // ai security
  {
    kind: "reference",
    name: "OWASP Top 10 for LLM Apps",
    copy: "Prompt injection, insecure output handling, data leakage and the rest — the current baseline for reviewing anything with a model in it.",
    tags: ["ai", "web"],
    meta: ["reference", "free"],
  },
  {
    kind: "practice range",
    name: "Gandalf",
    copy: "Seven levels of prompt injection against increasingly defended system prompts. Twenty minutes, and the lesson sticks.",
    tags: ["ai"],
    meta: ["beginner", "free"],
  },
  {
    kind: "reference",
    name: "MITRE ATLAS",
    copy: "ATT&CK's counterpart for machine learning systems — real-world tactics against models, from evasion to model theft.",
    tags: ["ai", "blue-team"],
    meta: ["reference", "free"],
  },
];

const FILTERS = [
  ["all", "all"],
  ["web", "web"],
  ["pwn", "pwn"],
  ["crypto", "crypto"],
  ["forensics", "forensics"],
  ["osint", "osint"],
  ["blue-team", "blue_team"],
  ["ai", "ai_security"],
  ["tooling", "tooling"],
] as const;

const RESOURCE_SCRIPT = `$ ls -1 resources/
practice/   tooling/   reading/   blue-team/   ai-security/
$ cat README
the most exploitable layer is the one operating the keyboard. patch it weekly.
$ ./join --club layer8 --campus ecc
see you at the next weekly session`;

/* ------------------------------------------------------------------ */
/*  page                                                                */
/* ------------------------------------------------------------------ */

export default function ResourcesClient() {
  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return RESOURCES.filter((r) => {
      const byTag = filter === "all" || r.tags.includes(filter);
      const byText =
        q === "" ||
        `${r.name} ${r.kind} ${r.copy} ${r.meta.join(" ")}`
          .toLowerCase()
          .includes(q);
      return byTag && byText;
    });
  }, [filter, query]);

  // "/" focuses search, Escape clears it
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = e.target as HTMLElement;
      const typing = /^(input|textarea|select)$/i.test(el.tagName);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === "Escape" && el === searchRef.current) {
        setQuery("");
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const countLabel =
    `${shown.length} ${shown.length === 1 ? "resource" : "resources"}` +
    (filter === "all" ? "" : ` in ${filter.replace("-", "_")}`) +
    (query.trim() ? ` matching "${query.trim()}"` : "");

  return (
    <>
      <Header current="Resources" />

      <main className="flex-1">
        {/* hero */}
        <section className="wrap pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p className="kicker mb-5">
                {"// PES University — Electronic City Campus"}
              </p>
              <h1 className="font-display font-bold leading-[0.95] text-[clamp(3rem,11vw,6.5rem)]">
                Resources
              </h1>
              <p className="mt-6 text-sm md:text-base text-fg-dim max-w-xl">
                Everything the club actually uses — practice ranges, tooling and
                reading. No paid course funnels, no listicles. Start at the top of
                the path if you have never opened a terminal on purpose.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="btn btn-solid" href="#path">
                  &gt; start_here
                </a>
                <a className="btn" href="#library">
                  &gt; browse_library
                </a>
              </div>
            </div>

            <InteractiveTerminal
              script={RESOURCE_SCRIPT}
              barLabel="layer8@pesu — ~/resources"
              hint="try: ls · cd .. · help"
            />
          </div>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* path */}
        <section id="path" className="wrap py-16 md:py-20">
          <span className="tag">start here</span>
          <h2 className="mt-3 font-display font-bold text-2xl md:text-3xl">
            Four weeks from zero to your first flag
          </h2>
          <p className="mt-2 text-sm text-fg-dim max-w-2xl">
            Work through these in order. Each step is a prerequisite for the next
            one, and each ends with something you can actually submit.
          </p>

          <ol className="mt-9 grid md:grid-cols-2 gap-px bg-border border border-border">
            {PATH.map((step) => (
              <li
                key={step.num}
                className="flex gap-4 items-start p-5 bg-bg-2"
              >
                <span className="font-display font-bold text-accent text-xl md:text-2xl min-w-[2.2rem]">
                  {step.num}
                </span>
                <div>
                  <h3 className="font-display font-bold text-lg">{step.title}</h3>
                  <p className="mt-2 mb-2 text-sm text-fg-dim max-w-[34rem]">
                    {step.copy}
                  </p>
                  {step.url ? (
                    <span className="text-xs text-fg-faint break-all">
                      {step.url}
                    </span>
                  ) : (
                    <Link href="/#top" className="text-xs text-accent">
                      weekly sessions &amp; schedule
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* library */}
        <section id="library" className="wrap py-16 md:py-20">
          <span className="tag">library</span>
          <h2 className="mt-3 font-display font-bold text-2xl md:text-3xl">
            The rest of the shelf
          </h2>
          <p className="mt-2 text-sm text-fg-dim max-w-2xl">
            Filter by category, or search by name, tool or topic. Everything
            listed is free unless the card says otherwise.
          </p>

          <div className="panel mt-8 p-4 md:p-5 grid gap-4">
            <label
              className="flex items-center gap-2.5 bg-bg-3 border border-border px-3 py-2.5 focus-within:border-accent transition-colors"
              htmlFor="resource-search"
            >
              <span className="text-accent text-sm" aria-hidden>
                $
              </span>
              <input
                id="resource-search"
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="search resources — press / to focus"
                autoComplete="off"
                spellCheck={false}
                className="flex-1 min-w-0 bg-transparent border-0 outline-none text-fg text-sm placeholder:text-fg-faint"
              />
            </label>

            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Filter by category"
            >
              {FILTERS.map(([value, label]) => {
                const active = filter === value;
                return (
                  <button
                    key={value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(value)}
                    className={`text-[0.72rem] tracking-[0.1em] lowercase border px-2.5 py-1 transition-colors ${
                      active
                        ? "bg-accent-2 border-accent-2 text-bg font-bold"
                        : "bg-transparent border-border text-fg-dim hover:text-fg"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <p
            className="mt-4 text-[0.72rem] tracking-[0.14em] uppercase text-fg-faint"
            role="status"
            aria-live="polite"
          >
            {countLabel}
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((r) => (
              <article key={r.name} className="card flex flex-col gap-2">
                <p className="text-[0.66rem] tracking-[0.18em] uppercase text-fg-faint">
                  {r.kind}
                </p>
                <h3 className="font-display font-bold text-lg text-fg">
                  {r.name}
                </h3>
                <p className="text-sm text-fg-dim">{r.copy}</p>
                <p className="mt-auto pt-3.5 flex flex-wrap gap-2 text-[0.68rem] tracking-[0.1em] text-fg-faint border-t border-border">
                  {r.meta.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </p>
              </article>
            ))}
          </div>

          {shown.length === 0 && (
            <p className="mt-6 p-5 border border-dashed border-border text-sm text-fg-dim">
              No match. Clear the filter, or tell us what is missing at{" "}
              <span className="text-fg-faint">layer8@pesu.pes.edu</span>.
            </p>
          )}
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* cta */}
        <section className="wrap py-16 md:py-20">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl">
                Found something better?
              </h2>
              <p className="mt-2 text-sm text-fg-dim max-w-2xl">
                The list is maintained by members. Send a link and one line on why
                it earned a slot.
              </p>
            </div>
            <button type="button" className="btn btn-solid">
              &gt; suggest_a_resource
            </button>
          </div>
        </section>
      </main>

      <Footer current="Resources" />
    </>
  );
}
