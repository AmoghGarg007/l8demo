"use client";

import {
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { NAV, ROUTES } from "./site-chrome";

const DEFAULT_SCRIPT = `$ whoami
layer8@pesu-ecc
$ cat mission.txt
teach offense. build defense. capture flags.
$ ls domains/
web pwn rev crypto forensics stego osint network`;

const DEFAULT_HINT = "try: ls · cd resources · help";
const DEFAULT_BAR_LABEL = "layer8 — ~";

const HELP = [
  "help             show available commands",
  "ls               list website sections",
  "cd <section>     open a website section",
  "pwd              print the current location",
  "whoami           identify the current user",
  "cat mission.txt  print the Layer8 mission",
  "clear            clear terminal output",
];

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\//g, "-")
    .replace(/\s+/g, "-");
}

const NAV_ENTRIES = NAV.map((item) => ({
  item,
  slug: slugify(item),
  route: ROUTES[item],
}));

const LIVE_ROUTES = {
  ...Object.fromEntries(
    NAV_ENTRIES.filter((entry) => entry.route).map((entry) => [
      entry.slug,
      entry.route!,
    ]),
  ),
  home: "/",
  about: "/about",
} as Record<string, string>;

function normaliseSection(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/^~\/?/, "")
    .replace(/^\/+/, "")
    .replace(/\/+$/, "")
    .replace(/\//g, "-")
    .replace(/\s+/g, "-");
}

function TerminalLine({ line }: { line: string }) {
  const isPrompt = line.startsWith("$ ");

  return (
    <div>
      {isPrompt ? (
        <>
          <span className="prompt">$</span>
          {line.slice(1)}
        </>
      ) : (
        <span className="muted">{line}</span>
      )}
    </div>
  );
}

export function InteractiveTerminal({
  script = DEFAULT_SCRIPT,
  hint = DEFAULT_HINT,
  barLabel = DEFAULT_BAR_LABEL,
}: {
  /** Page-specific intro text, typed out before the live prompt appears. */
  script?: string;
  /** Hint line shown once the prompt is live. */
  hint?: string;
  /** Label in the terminal's title bar, e.g. "layer8 — ~/events". */
  barLabel?: string;
} = {}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const [intro, setIntro] = useState("");
  const [ready, setReady] = useState(false);
  const [command, setCommand] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      const timeout = window.setTimeout(() => {
        setIntro(script);
        setReady(true);
      }, 0);

      return () => window.clearTimeout(timeout);
    }

    let index = 0;

    const interval = window.setInterval(() => {
      index += 1;
      setIntro(script.slice(0, index));

      if (index >= script.length) {
        window.clearInterval(interval);
        setReady(true);
      }
    }, 22);

    return () => window.clearInterval(interval);
  }, [script]);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [intro, output]);

  function runCommand(rawCommand: string) {
    const trimmed = rawCommand.trim();
    const [rawName, ...rawArguments] = trimmed.split(/\s+/);
    const name = rawName.toLowerCase();
    const rawArgument = rawArguments.join(" ");
    const argument = normaliseSection(rawArgument);

    let response: string[] = [];

    switch (name) {
      case "help":
        response = ["available commands:", ...HELP];
        break;

      case "ls":
        response = [
          NAV_ENTRIES.map((entry) => `${entry.slug}/`).join("  "),
        ];
        break;

      case "pwd":
        response = ["/home/layer8"];
        break;

      case "whoami":
        response = ["visitor@layer8"];
        break;

      case "cat":
        response =
          argument === "mission.txt"
            ? ["teach offense. build defense. capture flags."]
            : [
                `cat: ${
                  rawArgument || "missing file operand"
                }: no such file`,
              ];
        break;

      case "cd": {
        if (!argument || argument === "..") {
          response = ["opening home..."];
          router.push("/");
          break;
        }

        const route = LIVE_ROUTES[argument];

        if (route) {
          response = [`opening ${route}...`];
          router.push(route);
        } else if (
          NAV_ENTRIES.some((entry) => entry.slug === argument)
        ) {
          response = [`cd: ${argument}: section coming soon`];
        } else {
          response = [`cd: ${argument}: no such section`];
        }

        break;
      }

      case "clear":
        setIntro("");
        setOutput([]);
        return;

      default:
        response = [
          `command not found: ${name}. type 'help' for commands.`,
        ];
    }

    setOutput((lines) => [
      ...lines,
      `$ ${trimmed}`,
      ...response,
    ]);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = command.trim();
    if (!trimmed) return;

    runCommand(trimmed);

    const nextHistory = [...history, trimmed];
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length);
    setCommand("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp" && history.length > 0) {
      event.preventDefault();

      const nextIndex = Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setCommand(history[nextIndex]);
    }

    if (event.key === "ArrowDown" && history.length > 0) {
      event.preventDefault();

      const nextIndex = Math.min(
        history.length,
        historyIndex + 1,
      );

      setHistoryIndex(nextIndex);
      setCommand(
        nextIndex === history.length ? "" : history[nextIndex],
      );
    }

    if (event.key === "Tab") {
      const match = NAV_ENTRIES.find((entry) =>
        `cd ${entry.slug}`.startsWith(command.toLowerCase()),
      );

      if (match) {
        event.preventDefault();
        setCommand(`cd ${match.slug}`);
      }
    }
  }

  return (
    <div
      className="term term-interactive w-full"
      role="region"
      aria-label="Interactive Layer8 terminal"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="term-bar">
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="ml-2 text-xs text-fg-dim">{barLabel}</span>
      </div>

      <div
        ref={bodyRef}
        className="term-body font-mono"
        aria-live="polite"
      >
        {intro.split("\n").map((line, index) => (
          <TerminalLine key={`intro-${index}`} line={line} />
        ))}

        {ready && (
          <>
            {output.map((line, index) => (
              <TerminalLine
                key={`output-${index}`}
                line={line}
              />
            ))}

            <form
              className="term-input-row"
              onSubmit={handleSubmit}
            >
              <label
                htmlFor="layer8-command"
                className="prompt"
              >
                $
              </label>

              <input
                ref={inputRef}
                id="layer8-command"
                className="term-input"
                value={command}
                onChange={(event) =>
                  setCommand(event.target.value)
                }
                onKeyDown={handleKeyDown}
                autoCapitalize="none"
                autoComplete="off"
                spellCheck={false}
                aria-label="Layer8 terminal command"
              />
            </form>

            <div className="term-hint">{hint}</div>
          </>
        )}

        {!ready && <span className="cursor">&nbsp;</span>}
      </div>
    </div>
  );
}