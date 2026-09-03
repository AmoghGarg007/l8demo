"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Header, Footer } from "../_components/site-chrome";
import { DOMAINS, referenceLink, type Domain } from "./domains-data";

const TERM_TYPE_LINE = "cat ~/domains/*/README.md";

/* ------------------------------------------------------------------ */
/*  hero terminal                                                       */
/* ------------------------------------------------------------------ */

function DomainsTerminal() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = reduce ? TERM_TYPE_LINE.length : 1;
    let i = 0;
    const id = window.setInterval(() => {
      i += step;
      setTyped(TERM_TYPE_LINE.slice(0, i));
      if (i >= TERM_TYPE_LINE.length) window.clearInterval(id);
    }, 55);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="term w-full" aria-hidden>
      <div className="term-bar">
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="ml-2 text-xs text-fg-dim">layer8@pesu — ~/domains</span>
      </div>
      <div className="term-body font-mono">
        <div>
          <span className="prompt">$</span> ls ~/domains
        </div>
        <div className="muted">
          web pwn rev crypto forensics stego osint network
        </div>
        <div>
          <span className="prompt">$</span> {typed}
          <span className="cursor">&nbsp;</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  detail                                                              */
/* ------------------------------------------------------------------ */

function Detail({ domain }: { domain: Domain }) {
  return (
    <div
      key={domain.id}
      style={{ animation: "route-in 0.22s ease-out" }}
      className="grid lg:grid-cols-[1.3fr_1fr] gap-3"
    >
      {/* readme / terminal */}
      <div className="term">
        <div className="term-bar">
          <span className="term-dot" />
          <span className="term-dot" />
          <span className="term-dot" />
          <span className="ml-2 text-xs text-fg-dim">
            {domain.id}@layer8:~
          </span>
        </div>
        <div className="term-body font-mono">
          <div>
            <span className="prompt">$</span> cd {domain.cmd}
          </div>
          <div>
            <span className="prompt">$</span> cat README.md
          </div>
          <h3 className="mt-3 font-display font-bold text-xl text-fg">
            {domain.name}
          </h3>
          <p className="mt-1 text-sm text-fg-dim whitespace-normal">
            {domain.overview}
          </p>

          <div className="mt-4">
            <span className="prompt">$</span> ./explore --topics
          </div>
          <div className="muted">
            {domain.topics.map((t) => (
              <div key={t}>→ {t}</div>
            ))}
          </div>

          <div className="mt-4">
            <span className="prompt">$</span> suggested_path
            <br />
            <span className="muted">{domain.path}</span>
          </div>

          <div className="mt-4">
            <h4 className="text-fg-dim">{"// learning roadmap"}</h4>
            <ol className="mt-2 space-y-1">
              {domain.roadmap.map((step, i) => (
                <li key={step} className="flex gap-2.5">
                  <span className="text-fg-faint tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={referenceLink(step, domain.name)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-fg hover:text-accent transition-colors"
                  >
                    {step}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      {/* side panels */}
      <div className="flex flex-col gap-3">
        <div className="card">
          <h4 className="font-mono text-xs text-fg-dim">{"// tools"}</h4>
          <ul className="mt-2 space-y-1 text-sm text-fg">
            {domain.tools.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h4 className="font-mono text-xs text-fg-dim">
            {"// what_you_learn"}
          </h4>
          <div className="mt-3 space-y-3">
            {(
              Object.entries(domain.learn) as [string, string[]][]
            ).map(([level, items]) => (
              <div key={level}>
                <strong className="block text-[0.68rem] tracking-[0.14em] uppercase text-accent">
                  {level}
                </strong>
                <div className="mt-1 flex flex-col">
                  {items.map((item) => (
                    <a
                      key={item}
                      href={referenceLink(item, domain.name)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-fg-dim hover:text-accent transition-colors"
                    >
                      → {item}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h4 className="font-mono text-xs text-fg-dim">{"// projects"}</h4>
          <p className="mt-2 text-[13px] text-fg-dim">{domain.projects}</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  page                                                                */
/* ------------------------------------------------------------------ */

export default function DomainsClient() {
  const [selected, setSelected] = useState<string>(DOMAINS[0].id);
  const detailRef = useRef<HTMLDivElement>(null);

  const select = useCallback((id: string) => {
    setSelected(id);
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(min-width: 1024px)").matches
    ) {
      requestAnimationFrame(() =>
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  }, []);

  const domain = DOMAINS.find((d) => d.id === selected) ?? DOMAINS[0];

  return (
    <>
      <Header current="Domains" />

      <main className="flex-1">
        {/* hero */}
        <section className="wrap pt-12 pb-10 md:pt-16 md:pb-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p className="kicker mb-5">{"// layer8 / domains"}</p>
              <h1 className="font-display font-bold leading-[0.95] text-[clamp(3rem,11vw,6.5rem)]">
                Domains
              </h1>
              <p className="mt-6 text-sm md:text-base text-fg-dim max-w-xl">
                Eight areas the club works across. Pick one to see the attack
                surface, the tools, and a rough path from zero to research —
                break things responsibly.
              </p>
            </div>

            <DomainsTerminal />
          </div>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* grid + detail */}
        <section className="wrap py-12 md:py-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {DOMAINS.map((d, i) => {
              const active = d.id === selected;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => select(d.id)}
                  aria-pressed={active}
                  className={`card text-left flex flex-col gap-2 transition-colors ${
                    active ? "border-accent" : ""
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[0.68rem] text-fg-faint">
                    <span>drwxr-xr-x</span>
                    <span>{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h2 className="font-display font-bold text-base text-fg">
                    {d.name}
                  </h2>
                  <p className="text-[13px] text-fg-dim">{d.desc}</p>
                  <div className="mt-1 font-mono text-xs text-accent">
                    $ cd {d.cmd}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {d.topics.slice(0, 3).map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          <div ref={detailRef} className="mt-8 scroll-mt-24">
            <p className="kicker mb-3">{"// domain dossier"}</p>
            <Detail domain={domain} />
          </div>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* cta */}
        <section className="wrap py-16 md:py-20">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div>
              <h2 className="font-display font-bold text-2xl md:text-3xl">
                Not sure which one?
              </h2>
              <p className="mt-2 text-sm text-fg-dim max-w-2xl">
                Most people try a few before something sticks. Bring an unsolved
                challenge to a weekly session and pick a lane from there.
              </p>
            </div>
            <Link href="/#top" className="btn btn-solid">
              &gt; weekly_sessions
            </Link>
          </div>
        </section>
      </main>

      <Footer current="Domains" />
    </>
  );
}
