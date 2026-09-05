/**
 * The eight security domains, ported from Iannaelizabeth/Layer8_Domains
 * (standalone app.js). Roadmap steps and "what you learn" items link out to a
 * Google search for the topic — same as the source; its unused reference maps
 * were dropped.
 */

export type Domain = {
  id: string;
  name: string;
  cmd: string;
  desc: string;
  overview: string;
  topics: string[];
  tools: string[];
  projects: string;
  path: string;
  roadmap: string[];
  learn: {
    beginner: string[];
    intermediate: string[];
    advanced: string[];
  };
};

export const DOMAINS: Domain[] = [
  {
    id: "web",
    name: "Web Exploitation",
    cmd: "~/domains/web",
    desc: "Find and understand weaknesses in modern web applications.",
    overview:
      "Map how a web application handles identity, input and data before testing where those boundaries fail.",
    topics: ["OWASP Top 10", "XSS", "SQLi", "SSRF", "Auth"],
    tools: ["Burp Suite", "ffuf", "SQLMap"],
    projects: "Web security labs & CTF challenges",
    path: "Request mapping -> input testing -> impact proof",
    roadmap: [
      "Fundamentals",
      "HTTP / Cookies / Sessions",
      "OWASP Top 10",
      "Web CTFs",
      "Advanced exploitation",
      "Vulnerability research",
    ],
    learn: {
      beginner: [
        "Networking fundamentals",
        "Linux basics",
        "HTTP & web architecture",
      ],
      intermediate: [
        "OWASP vulnerabilities",
        "Burp Suite",
        "Authentication attacks",
      ],
      advanced: ["Exploit chains", "Custom tooling", "Vulnerability research"],
    },
  },
  {
    id: "pwn",
    name: "Binary Exploitation",
    cmd: "~/domains/pwn",
    desc: "Understand memory, binaries and the bugs that make them exploitable.",
    overview:
      "Learn how compiled programs use memory, then turn precise memory-safety bugs into controlled behavior.",
    topics: ["Stack", "Heap", "ROP", "Format Strings", "Mitigations"],
    tools: ["GDB", "pwndbg", "pwntools"],
    projects: "Exploit development & pwn challenges",
    path: "Crash triage -> primitive discovery -> mitigation bypass",
    roadmap: [
      "C and memory fundamentals",
      "Assembly and calling conventions",
      "Stack vulnerabilities",
      "Heap exploitation",
      "ROP and mitigations",
      "Exploit development",
    ],
    learn: {
      beginner: ["C programming", "Linux process memory", "Assembly basics"],
      intermediate: ["GDB debugging", "Stack and format bugs", "ROP chains"],
      advanced: [
        "Heap exploitation",
        "Kernel attack surfaces",
        "Custom exploit tooling",
      ],
    },
  },
  {
    id: "rev",
    name: "Reverse Engineering",
    cmd: "~/domains/rev",
    desc: "Take binaries apart and work backwards from machine code to intent.",
    overview:
      "Recover the logic of unfamiliar software by combining static inspection with carefully chosen runtime experiments.",
    topics: ["Assembly", "Debugging", "Static Analysis", "Dynamic Analysis"],
    tools: ["Ghidra", "IDA", "GDB"],
    projects: "Binary analysis & reversing challenges",
    path: "Identify -> trace -> annotate -> explain",
    roadmap: [
      "Computer architecture",
      "Assembly reading",
      "Static analysis",
      "Dynamic tracing",
      "Obfuscation and packers",
      "Malware and vulnerability research",
    ],
    learn: {
      beginner: [
        "Binary formats",
        "x86/x64 assembly",
        "Debugger fundamentals",
      ],
      intermediate: [
        "Ghidra workflows",
        "Control-flow analysis",
        "Dynamic instrumentation",
      ],
      advanced: [
        "Anti-analysis techniques",
        "Deobfuscation",
        "Automated reverse engineering",
      ],
    },
  },
  {
    id: "crypto",
    name: "Cryptography",
    cmd: "~/domains/crypto",
    desc: "Break weak implementations and understand the mathematics behind secure systems.",
    overview:
      "Separate strong algorithms from fragile implementations by studying assumptions, randomness and key handling.",
    topics: ["Ciphers", "RSA", "ECC", "Hashing", "Crypto Attacks"],
    tools: ["SageMath", "CyberChef"],
    projects: "Cryptanalysis & crypto CTFs",
    path: "Model assumptions -> find weakness -> validate mathematically",
    roadmap: [
      "Number theory basics",
      "Classical ciphers",
      "Modern symmetric crypto",
      "Public-key cryptography",
      "Implementation attacks",
      "Cryptanalysis research",
    ],
    learn: {
      beginner: [
        "Modular arithmetic",
        "Encoding and hashing",
        "Cipher fundamentals",
      ],
      intermediate: [
        "AES and RSA",
        "Randomness and key handling",
        "Known crypto attacks",
      ],
      advanced: [
        "Elliptic curves",
        "Side-channel analysis",
        "Novel cryptanalysis",
      ],
    },
  },
  {
    id: "forensics",
    name: "Digital Forensics",
    cmd: "~/domains/forensics",
    desc: "Recover evidence from systems, files and memory during investigations.",
    overview:
      "Build a timeline from imperfect digital evidence while preserving context, provenance and repeatability.",
    topics: [
      "Disk Forensics",
      "Memory",
      "PCAP",
      "File Analysis",
      "Incident Response",
    ],
    tools: ["Autopsy", "Volatility", "Wireshark"],
    projects: "Investigation labs & forensic CTFs",
    path: "Acquire -> preserve -> extract -> correlate",
    roadmap: [
      "Evidence handling",
      "Filesystems and artifacts",
      "Disk investigations",
      "Memory analysis",
      "Network forensics",
      "Incident response",
    ],
    learn: {
      beginner: [
        "Operating system artifacts",
        "File metadata",
        "Evidence preservation",
      ],
      intermediate: [
        "Disk imaging",
        "Memory analysis",
        "PCAP investigation",
      ],
      advanced: ["Threat hunting", "Malware triage", "Forensic automation"],
    },
  },
  {
    id: "stego",
    name: "Steganography",
    cmd: "~/domains/stego",
    desc: "Find information hidden in images, audio, files and other digital media.",
    overview:
      "Inspect the layers beneath ordinary-looking media for payloads, anomalies and clues in file structure.",
    topics: ["Image Stego", "Audio", "Metadata", "File Structures"],
    tools: ["zsteg", "exiftool", "binwalk"],
    projects: "Hidden-data challenges & research",
    path: "Fingerprint -> inspect -> extract -> verify",
    roadmap: [
      "File formats",
      "Metadata and signatures",
      "Image stego",
      "Audio and text channels",
      "Custom extractors",
      "Stego detection research",
    ],
    learn: {
      beginner: [
        "Hex and file signatures",
        "Image fundamentals",
        "Metadata inspection",
      ],
      intermediate: [
        "LSB techniques",
        "Audio spectrograms",
        "Payload extraction",
      ],
      advanced: [
        "Statistical detection",
        "Custom tooling",
        "Steganalysis research",
      ],
    },
  },
  {
    id: "osint",
    name: "OSINT",
    cmd: "~/domains/osint",
    desc: "Turn publicly available information into useful intelligence.",
    overview:
      "Connect open sources into a defensible picture while separating corroborated facts from attractive assumptions.",
    topics: ["Recon", "Social Search", "Geolocation", "Metadata"],
    tools: ["Google Dorks", "Sherlock", "Maltego"],
    projects: "Investigation & reconnaissance challenges",
    path: "Discover -> pivot -> corroborate -> document",
    roadmap: [
      "Search fundamentals",
      "Source evaluation",
      "Digital footprints",
      "Geolocation and imagery",
      "Entity correlation",
      "Intelligence reporting",
    ],
    learn: {
      beginner: [
        "Search operators",
        "Source validation",
        "Research note-taking",
      ],
      intermediate: [
        "Username and domain pivots",
        "Metadata analysis",
        "Geolocation",
      ],
      advanced: [
        "Automated collection",
        "Graph analysis",
        "Attribution research",
      ],
    },
  },
  {
    id: "network",
    name: "Network Security",
    cmd: "~/domains/network",
    desc: "Understand traffic, protocols and the systems that connect everything.",
    overview:
      "Read the conversation between systems, spot unusual behavior and understand where trust crosses a network.",
    topics: [
      "TCP/IP",
      "Packet Analysis",
      "Wi-Fi",
      "Scanning",
      "Network Attacks",
    ],
    tools: ["Nmap", "Wireshark", "Netcat"],
    projects: "Network labs & CTF challenges",
    path: "Enumerate -> capture -> analyze -> harden",
    roadmap: [
      "Networking fundamentals",
      "Protocols and services",
      "Traffic analysis",
      "Network enumeration",
      "Wireless and segmentation",
      "Detection and hardening",
    ],
    learn: {
      beginner: ["TCP/IP basics", "Linux networking", "Common services"],
      intermediate: [
        "Nmap and Wireshark",
        "Wireless security",
        "Network attack patterns",
      ],
      advanced: [
        "Detection engineering",
        "Protocol research",
        "Network architecture hardening",
      ],
    },
  },
];

/** A "learn more" link for a roadmap step or topic — a scoped web search. */
export function referenceLink(label: string, domain: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(
    `${label} ${domain} beginner`,
  )}`;
}
