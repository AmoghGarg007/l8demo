"use client";

import Link from "next/link";
import { useState } from "react";

/* ------------------------------------------------------------------ */
/*  shared nav data                                                    */
/* ------------------------------------------------------------------ */

export const NAV = [
  "Blogs",
  "Weekly CTFs",
  "Events",
  "Resources",
  "Sandbox",
  "Domains",
  "Legacy/Alumni",
  "Hall of Fame",
  "About Us",
] as const;

// nav entries that have a real route yet — everything else is still a button.
const ROUTES: Partial<Record<(typeof NAV)[number], string>> = {
  Blogs: "/blogs",
  Events: "/events",
  Resources: "/resources",
  Sandbox: "/sandbox",
  Domains: "/domains",
  "About Us": "/about",
};

/* ------------------------------------------------------------------ */
/*  wordmark                                                           */
/* ------------------------------------------------------------------ */

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-display font-bold tracking-tight select-none ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/brand/l8-mark.png" alt="" aria-hidden className="brandmark" />
      <span>LAYER8</span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  header                                                             */
/* ------------------------------------------------------------------ */

function NavItem({
  item,
  current,
  onNavigate,
  className = "",
}: {
  item: (typeof NAV)[number];
  current?: string;
  onNavigate?: () => void;
  className?: string;
}) {
  const href = ROUTES[item];
  const isCurrent = current === item;

  if (href) {
    return (
      <Link
        href={href}
        className={`navlink ${className}`}
        data-current={isCurrent || undefined}
        aria-current={isCurrent ? "page" : undefined}
        onClick={onNavigate}
      >
        {item}
      </Link>
    );
  }

  return (
    <button type="button" className={`navlink ${className}`} onClick={onNavigate}>
      {item}
    </button>
  );
}

export function Header({ current }: { current?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] border-b border-border">
      <div className="wrap">
        <div className="flex items-center justify-between gap-4 h-16">
          <Link href="/" className="text-lg">
            <Wordmark />
          </Link>

          <nav className="hidden lg:flex items-center gap-x-6 gap-y-2 flex-wrap justify-end">
            {NAV.map((item) => (
              <NavItem
                key={item}
                item={item}
                current={current}
                className={
                  item === "About Us"
                    ? "lg:ml-1 lg:pl-5 lg:border-l lg:border-border"
                    : ""
                }
              />
            ))}
          </nav>

          <button
            type="button"
            className="lg:hidden btn px-3 py-2"
            aria-expanded={open}
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "[ x ]" : "[ = ]"}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-bg-2">
          <div className="wrap py-3 grid grid-cols-2 gap-x-4 gap-y-1">
            {NAV.map((item) => (
              <NavItem
                key={item}
                item={item}
                current={current}
                className="text-left"
                onNavigate={() => setOpen(false)}
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  footer                                                             */
/* ------------------------------------------------------------------ */

export function Footer({ current }: { current?: string }) {
  return (
    <footer className="mt-auto border-t border-border bg-bg-2">
      <div className="wrap py-9">
        <div className="grid gap-x-8 gap-y-7 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Wordmark className="text-base" />
            <p className="mt-2.5 text-xs text-fg-dim max-w-xs">
              Cybersecurity Club · PES University, Electronic City Campus,
              Bengaluru.
            </p>
            <a
              href="https://www.pes.edu"
              target="_blank"
              rel="noreferrer"
              className="pesu-chip mt-4"
              aria-label="PES University"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/brand/pesu.png" alt="PES University" />
            </a>
          </div>

          <div>
            <div className="kicker mb-2.5">pages</div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[13px]">
              {NAV.map((item) => {
                const href = ROUTES[item];
                return (
                  <li key={item}>
                    {href ? (
                      <Link
                        href={href}
                        className="link-ghost"
                        data-current={current === item || undefined}
                      >
                        {item}
                      </Link>
                    ) : (
                      <button type="button" className="link-ghost">
                        {item}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <div className="kicker mb-2.5">elsewhere</div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-[13px]">
              {["Instagram", "Discord", "GitHub", "LinkedIn", "Email"].map((s) => (
                <li key={s}>
                  <button type="button" className="link-ghost">
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rule my-5" />

        <div className="text-xs text-fg-dim">
          © {new Date().getFullYear()} Layer8 · built in the 8th layer
        </div>
      </div>
    </footer>
  );
}
