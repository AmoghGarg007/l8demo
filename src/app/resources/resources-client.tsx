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
  url: string;
  copy: string;
  tags: string[];
  meta: string[];
};

const RESOURCES: Resource[] = [
  {
    kind: "practice range",
    name: "picoCTF Gym",
    url: "https://play.picoctf.org/practice",
    copy: "Carnegie Mellon's beginner CTF archive. Every past challenge stays playable, and the hints nudge you without handing over the answer.",
    tags: ["web", "pwn", "crypto", "forensics"],
    meta: ["beginner", "free"],
  },
  {
    kind: "practice range",
    name: "TryHackMe",
    url: "https://tryhackme.com",
    copy: "Guided rooms with an attack box in the browser. Best when you want to fill a gap in one topic rather than hack around freely.",
    tags: ["web", "pwn", "crypto", "forensics", "osint"],
    meta: ["beginner", "free tier"],
  },
  {
    kind: "practice range",
    name: "Hack The Box",
    url: "https://www.hackthebox.com",
    copy: "Full machines to root, with no hand holding. Start on retired boxes, and only read someone's writeup after you finish.",
    tags: ["web", "pwn", "forensics"],
    meta: ["intermediate", "free tier"],
  },
  {
    kind: "course",
    name: "pwn.college",
    url: "https://pwn.college",
    copy: "ASU's binary exploitation course, lectures and graded challenges included. It is the most complete free route into memory corruption.",
    tags: ["pwn"],
    meta: ["advanced", "free"],
  },
  {
    kind: "practice range",
    name: "CryptoHack",
    url: "https://cryptohack.org",
    copy: "Cryptography taught as puzzles you solve in Python. It runs from modular arithmetic up to real RSA and AES failures.",
    tags: ["crypto"],
    meta: ["intermediate", "free"],
  },
  {
    kind: "exercises",
    name: "Cryptopals",
    url: "https://cryptopals.com",
    copy: "Eight sets of attacks that you implement yourself. Slow, unglamorous, and the reason people stop trusting their own crypto code.",
    tags: ["crypto"],
    meta: ["advanced", "free"],
  },
  {
    kind: "course",
    name: "Web Security Academy",
    url: "https://portswigger.net/web-security",
    copy: "Labs and theory for every major web bug class, from injection to SSRF to request smuggling. This is what we teach from.",
    tags: ["web"],
    meta: ["all levels", "free"],
  },
  {
    kind: "practice range",
    name: "Root-Me",
    url: "https://www.root-me.org/?lang=en",
    copy: "A few hundred short challenges sorted by category. Handy when you want one problem in one topic instead of a whole machine.",
    tags: ["web", "pwn", "crypto", "forensics"],
    meta: ["all levels", "free"],
  },
  {
    kind: "practice range",
    name: "OverTheWire Wargames",
    url: "https://overthewire.org/wargames/",
    copy: "Bandit is only the first game. Natas covers web, Narnia and Behemoth cover exploitation, and Krypton covers ciphers, all over ssh.",
    tags: ["pwn", "crypto", "web", "forensics"],
    meta: ["beginner", "free"],
  },
  {
    kind: "practice range",
    name: "VulnHub",
    url: "https://www.vulnhub.com",
    copy: "Vulnerable VMs you download and run in VirtualBox. No subscription and no network limits, which helps when the campus wifi is having a day.",
    tags: ["web", "pwn", "forensics"],
    meta: ["intermediate", "free"],
  },
  {
    kind: "practice range",
    name: "Hacker101 CTF",
    url: "https://ctf.hacker101.com",
    copy: "HackerOne's web challenges, built around bugs that turn up in real bounty reports. Flags here also unlock private programme invites.",
    tags: ["web"],
    meta: ["beginner", "free"],
  },
  {
    kind: "practice range",
    name: "OWASP Juice Shop",
    url: "https://owasp.org/www-project-juice-shop/",
    copy: "A deliberately broken shop app you host yourself, with a scoreboard built in. It is our usual target for web workshops.",
    tags: ["web"],
    meta: ["beginner", "free"],
  },
  {
    kind: "practice range",
    name: "ROP Emporium",
    url: "https://ropemporium.com",
    copy: "Eight challenges about return oriented programming and nothing else. Do them the week after you first get past a stack canary.",
    tags: ["pwn"],
    meta: ["intermediate", "free"],
  },
  {
    kind: "practice range",
    name: "Exploit Education",
    url: "https://exploit.education",
    copy: "Phoenix and Nebula, which took over from Protostar. Graded overflows, format strings and privilege escalation on ready made VMs.",
    tags: ["pwn"],
    meta: ["intermediate", "free"],
  },
  {
    kind: "practice range",
    name: "pwnable.kr",
    url: "https://pwnable.kr",
    copy: "Small, sharp exploitation puzzles served over ssh. Each one hides a single trick, so they work well solved in pairs.",
    tags: ["pwn"],
    meta: ["intermediate", "free"],
  },
  {
    kind: "practice range",
    name: "Microcorruption",
    url: "https://microcorruption.com",
    copy: "Embedded exploitation against a fictional lock, all in the browser with a debugger attached. The gentlest way into assembly.",
    tags: ["pwn", "crypto"],
    meta: ["beginner", "free"],
  },
  {
    kind: "practice range",
    name: "crackmes.one",
    url: "https://crackmes.one",
    copy: "A steady stream of reversing binaries uploaded by other people and rated by difficulty. Pick a one star, open Ghidra, find the check.",
    tags: ["pwn"],
    meta: ["all levels", "free"],
  },
  {
    kind: "practice range",
    name: "flAWS",
    url: "http://flaws.cloud",
    copy: "Cloud misconfiguration taught as a hunt through one badly built AWS account. Six levels, and you do not need an account of your own.",
    tags: ["web"],
    meta: ["beginner", "free"],
  },
  {
    kind: "calendar",
    name: "CTFtime",
    url: "https://ctftime.org",
    copy: "Every live competition, how much it is worth, and the writeups afterwards. Check it on Monday and pick the weekend event we play together.",
    tags: ["web", "pwn", "crypto", "forensics", "osint"],
    meta: ["reference", "free"],
  },
  {
    kind: "reference",
    name: "HackTricks",
    url: "https://book.hacktricks.wiki/",
    copy: "The wiki everyone has open mid challenge. Enumeration checklists and escalation tricks for each service and platform.",
    tags: ["web", "pwn", "crypto", "forensics", "osint"],
    meta: ["reference", "free"],
  },
  {
    kind: "reference",
    name: "PayloadsAllTheThings",
    url: "https://github.com/swisskyrepo/PayloadsAllTheThings",
    copy: "A payload and bypass collection sorted by bug class. Read the methodology notes too, not just the strings you can paste.",
    tags: ["web", "tooling"],
    meta: ["reference", "free"],
  },
  {
    kind: "reference",
    name: "GTFOBins",
    url: "https://gtfobins.github.io",
    copy: "Unix binaries you can abuse to escape a restricted shell or escalate privileges. Use LOLBAS for the Windows side.",
    tags: ["pwn", "blue-team"],
    meta: ["reference", "free"],
  },
  {
    kind: "reference",
    name: "LOLBAS",
    url: "https://lolbas-project.github.io",
    copy: "The Windows half of the same idea. Signed Microsoft binaries that download, run or bypass things, and a good reading list for detection work.",
    tags: ["blue-team", "pwn"],
    meta: ["reference", "free"],
  },
  {
    kind: "book",
    name: "CTF Field Guide",
    url: "https://trailofbits.github.io/ctf/",
    copy: "Trail of Bits' short guide to how competitions work and how to prepare for one. Read it before your first live event.",
    tags: ["web", "pwn", "crypto", "forensics"],
    meta: ["beginner", "free"],
  },
  {
    kind: "book",
    name: "Nightmare",
    url: "https://guyinatuxedo.github.io/",
    copy: "Binary exploitation explained one real CTF challenge at a time, starting at simple overflows and ending in heap grooming.",
    tags: ["pwn"],
    meta: ["intermediate", "free"],
  },
  {
    kind: "methodology",
    name: "OWASP Testing Guide",
    url: "https://owasp.org/www-project-web-security-testing-guide/",
    copy: "How a real web assessment gets scoped and run, test by test. It turns scattered lab tricks into something you can repeat on a job.",
    tags: ["web"],
    meta: ["reference", "free"],
  },
  {
    kind: "reference",
    name: "Exploit-DB",
    url: "https://www.exploit-db.com",
    copy: "Archived public exploits with the papers behind them. Read the code before you run it, since plenty of what is posted needs fixing first.",
    tags: ["web", "pwn"],
    meta: ["reference", "free"],
  },
  {
    kind: "tool",
    name: "Burp Suite Community",
    url: "https://portswigger.net/burp/communitydownload",
    copy: "An intercepting proxy for anything over HTTP. Learn Repeater and Decoder first, because Intruder is rate limited on the free build.",
    tags: ["tooling", "web"],
    meta: ["tooling", "free"],
  },
  {
    kind: "tool",
    name: "Ghidra",
    url: "https://ghidra-sre.org",
    copy: "The NSA's reverse engineering suite, with a decompiler that holds up. It covers nearly every reversing challenge you will see as a student.",
    tags: ["tooling", "pwn"],
    meta: ["tooling", "free"],
  },
  {
    kind: "tool",
    name: "pwntools",
    url: "https://docs.pwntools.com",
    copy: "A Python library for writing exploits. Process and socket handling, packing, ROP and shellcode helpers in a few lines.",
    tags: ["tooling", "pwn"],
    meta: ["tooling", "free"],
  },
  {
    kind: "tool",
    name: "pwndbg",
    url: "https://github.com/pwndbg/pwndbg",
    copy: "A gdb plugin that makes the heap, the stack and the registers readable. Install it the same evening you install pwntools.",
    tags: ["tooling", "pwn"],
    meta: ["tooling", "free"],
  },
  {
    kind: "tool",
    name: "CyberChef",
    url: "https://gchq.github.io/CyberChef/",
    copy: "Encoding, decoding and analysis chained together in the browser. First thing to try on a blob of text you cannot identify.",
    tags: ["tooling", "crypto", "forensics"],
    meta: ["tooling", "free"],
  },
  {
    kind: "tool",
    name: "Wireshark",
    url: "https://www.wireshark.org",
    copy: "Packet capture and analysis. Most network forensics challenges are one display filter and a follow stream away from solved.",
    tags: ["tooling", "forensics", "blue-team"],
    meta: ["tooling", "free"],
  },
  {
    kind: "tool",
    name: "Volatility 3",
    url: "https://github.com/volatilityfoundation/volatility3",
    copy: "A memory forensics framework. It pulls processes, network connections and injected code out of a RAM image.",
    tags: ["tooling", "forensics"],
    meta: ["tooling", "free"],
  },
  {
    kind: "tool",
    name: "Nmap",
    url: "https://nmap.org",
    copy: "Host discovery, port scanning and service fingerprinting. Learn what the flags do before pasting a scan line from someone's writeup.",
    tags: ["tooling", "web", "pwn"],
    meta: ["tooling", "free"],
  },
  {
    kind: "tool",
    name: "ffuf",
    url: "https://github.com/ffuf/ffuf",
    copy: "A fast fuzzer for directories, subdomains, parameters and virtual hosts. Filter by response size early or you will drown in 200s.",
    tags: ["tooling", "web"],
    meta: ["tooling", "free"],
  },
  {
    kind: "wordlists",
    name: "SecLists",
    url: "https://github.com/danielmiessler/SecLists",
    copy: "The wordlist collection every fuzzer expects to find on disk. Paths, parameters, passwords, payloads. Clone it once and keep it.",
    tags: ["tooling", "web", "osint"],
    meta: ["tooling", "free"],
  },
  {
    kind: "tool",
    name: "sqlmap",
    url: "https://sqlmap.org",
    copy: "Automated SQL injection detection and exploitation. Use it after you have found the injection by hand, not instead of looking.",
    tags: ["tooling", "web"],
    meta: ["tooling", "free"],
  },
  {
    kind: "tool",
    name: "Hashcat",
    url: "https://hashcat.net/hashcat/",
    copy: "GPU password cracking with rule based mutation. Work out the hash mode first, since most failed cracks are just the wrong -m flag.",
    tags: ["tooling", "crypto"],
    meta: ["tooling", "free"],
  },
  {
    kind: "tool",
    name: "RsaCtfTool",
    url: "https://github.com/RsaCtfTool/RsaCtfTool",
    copy: "Throws the standard RSA attacks at a weak key, from small exponent to Wiener and Fermat. Then go and read why the one that worked worked.",
    tags: ["tooling", "crypto"],
    meta: ["tooling", "free"],
  },
  {
    kind: "tool",
    name: "binwalk",
    url: "https://github.com/ReFirmLabs/binwalk",
    copy: "Finds and extracts files hidden inside other files, firmware images included. The usual first move on an unexplained binary blob.",
    tags: ["tooling", "forensics"],
    meta: ["tooling", "free"],
  },
  {
    kind: "tool",
    name: "Aperi'Solve",
    url: "https://www.aperisolve.com",
    copy: "Runs a whole steganography toolchain over an uploaded image at once. Saves twenty minutes on every flag hidden in a picture.",
    tags: ["tooling", "forensics"],
    meta: ["tooling", "free"],
  },
  {
    kind: "tool",
    name: "Autopsy",
    url: "https://www.autopsy.com",
    copy: "Disk image forensics with timelines, deleted file recovery and keyword search. A GUI over The Sleuth Kit, and enough for most DFIR rooms.",
    tags: ["tooling", "forensics", "blue-team"],
    meta: ["tooling", "free"],
  },
  {
    kind: "tool",
    name: "revshells.com",
    url: "https://www.revshells.com",
    copy: "Builds a reverse shell one liner for whatever binary the target actually has, with the matching listener command next to it.",
    tags: ["tooling", "pwn", "web"],
    meta: ["tooling", "free"],
  },
  {
    kind: "reference",
    name: "OSINT Framework",
    url: "https://osintframework.com",
    copy: "A map of open source intelligence sources arranged by what you are starting from, whether that is a username, a domain, an image or a phone number.",
    tags: ["osint"],
    meta: ["reference", "free"],
  },
  {
    kind: "tool",
    name: "Sherlock",
    url: "https://github.com/sherlock-project/sherlock",
    copy: "Checks a username across hundreds of sites. Run it on your own handles once and see how much of a trail you have left.",
    tags: ["osint", "tooling"],
    meta: ["tooling", "free"],
  },
  {
    kind: "tool",
    name: "Shodan",
    url: "https://www.shodan.io",
    copy: "A search engine for exposed services and their banners. Useful for scoping recon, and sobering when you point it at your own network.",
    tags: ["osint", "tooling"],
    meta: ["reference", "free tier"],
  },
  {
    kind: "reference",
    name: "Bellingcat Toolkit",
    url: "https://bellingcat.gitbook.io/toolkit",
    copy: "The toolkit Bellingcat's researchers actually use. Geolocation, imagery, transport and archive sources, kept up to date.",
    tags: ["osint"],
    meta: ["reference", "free"],
  },
  {
    kind: "practice range",
    name: "Blue Team Labs Online",
    url: "https://blueteamlabs.online",
    copy: "Investigations from the defender's chair. Log triage, phishing analysis and incident timelines. Rarer skill, and easier hiring.",
    tags: ["blue-team"],
    meta: ["intermediate", "free tier"],
  },
  {
    kind: "practice range",
    name: "CyberDefenders",
    url: "https://cyberdefenders.org",
    copy: "Blue team CTFs built on real captures and memory images. The closest free thing to sitting a shift in a SOC.",
    tags: ["blue-team", "forensics"],
    meta: ["intermediate", "free tier"],
  },
  {
    kind: "practice range",
    name: "LetsDefend",
    url: "https://letsdefend.io",
    copy: "A simulated SOC queue with alerts to close and evidence to attach. It teaches the workflow, not only the analysis.",
    tags: ["blue-team"],
    meta: ["beginner", "free tier"],
  },
  {
    kind: "datasets",
    name: "Malware Traffic Analysis",
    url: "https://www.malware-traffic-analysis.net",
    copy: "Years of real infection pcaps with exercises and answers. Bring one to a Friday session and build the timeline as a group.",
    tags: ["blue-team", "forensics"],
    meta: ["intermediate", "free"],
  },
  {
    kind: "reference",
    name: "MITRE ATT&CK",
    url: "https://attack.mitre.org",
    copy: "The shared vocabulary for attacker behaviour. Once you can name a technique, detection engineering starts to make sense.",
    tags: ["blue-team"],
    meta: ["reference", "free"],
  },
  {
    kind: "reference",
    name: "Sigma Rules",
    url: "https://github.com/SigmaHQ/sigma",
    copy: "Detection rules written once and converted to whatever SIEM you are stuck with. Read a few before you write your first one.",
    tags: ["blue-team", "tooling"],
    meta: ["reference", "free"],
  },
  {
    kind: "tool",
    name: "Atomic Red Team",
    url: "https://atomicredteam.io",
    copy: "Small scripted tests mapped to ATT&CK techniques. Run one in a lab VM, then check whether your logging noticed.",
    tags: ["blue-team", "tooling"],
    meta: ["intermediate", "free"],
  },
  {
    kind: "reference",
    name: "OWASP Top 10 for LLM Apps",
    url: "https://genai.owasp.org/llm-top-10/",
    copy: "Prompt injection, insecure output handling, data leakage and the rest. The current baseline for reviewing anything with a model in it.",
    tags: ["ai", "web"],
    meta: ["reference", "free"],
  },
  {
    kind: "practice range",
    name: "Gandalf",
    url: "https://gandalf.lakera.ai",
    copy: "Seven levels of prompt injection against system prompts that get harder each time. Twenty minutes, and the lesson sticks.",
    tags: ["ai"],
    meta: ["beginner", "free"],
  },
  {
    kind: "practice range",
    name: "Prompt Airlines",
    url: "https://promptairlines.com",
    copy: "A chatbot CTF where the goal is a free flight. It shows how a model with tool access turns into an application vulnerability.",
    tags: ["ai", "web"],
    meta: ["beginner", "free"],
  },
  {
    kind: "tool",
    name: "garak",
    url: "https://github.com/NVIDIA/garak",
    copy: "A vulnerability scanner for LLMs. Jailbreak, leakage and toxicity probes run as one suite against a model you host yourself.",
    tags: ["ai", "tooling"],
    meta: ["tooling", "free"],
  },
  {
    kind: "reference",
    name: "MITRE ATLAS",
    url: "https://atlas.mitre.org",
    copy: "ATT&CK's counterpart for machine learning systems. Real tactics used against models, from evasion through to model theft.",
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

const RESOURCE_CATEGORIES = [
  "practice",
  "tooling",
  "reading",
  "blue-team",
  "ai-security",
];

const RESOURCE_SCRIPT = `$ ls resources/
${RESOURCE_CATEGORIES.join("  ")}
$ cat resources/readme.md
the most exploitable layer is the one operating the keyboard. patch it weekly.`;

const RESOURCE_FS = {
  dir: "resources",
  entries: RESOURCE_CATEGORIES,
  files: {
    "readme.md":
      "the most exploitable layer is the one operating the keyboard. patch it weekly.",
    "resources/readme.md":
      "the most exploitable layer is the one operating the keyboard. patch it weekly.",
  } as Record<string, string>,
} as const;

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
        `${r.name} ${r.kind} ${r.copy} ${r.meta.join(" ")} ${r.url}`
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
              fs={RESOURCE_FS}
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
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-accent transition-colors"
                  >
                    {r.name}
                  </a>
                </h3>
                <p className="text-sm text-fg-dim">{r.copy}</p>
                <div className="mt-auto pt-3.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.68rem] tracking-[0.1em] text-fg-faint border-t border-border">
                  {r.meta.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="ml-auto text-accent hover:underline"
                  >
                    &gt; open
                  </a>
                </div>
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
