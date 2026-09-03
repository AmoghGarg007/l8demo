"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Header, Footer } from "../_components/site-chrome";
import { POSTS, CATEGORIES, formatDate } from "./blogs";

/* ------------------------------------------------------------------ */
/*  terminal                                                            */
/* ------------------------------------------------------------------ */

const BLOG_TERM = `$ ls -1 content/blogs/
pwn/   web/   crypto/   reversing/   career/

$ cat README
field notes from the people who
broke things this week.

$ `;
const BLOG_TYPE_LINE = "./read --latest";

function BlogTerminal() {
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const step = reduce ? BLOG_TYPE_LINE.length : 1;
    let i = 0;
    const id = window.setInterval(() => {
      i += step;
      setTyped(BLOG_TYPE_LINE.slice(0, i));
      if (i >= BLOG_TYPE_LINE.length) window.clearInterval(id);
    }, 55);
    return () => window.clearInterval(id);
  }, []);

  const rows = BLOG_TERM.split("\n");

  return (
    <div className="term w-full" aria-hidden>
      <div className="term-bar">
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="term-dot" />
        <span className="ml-2 text-xs text-fg-dim">layer8@pesu — ~/blogs</span>
      </div>
      <div className="term-body font-mono">
        {rows.map((line, idx) => {
          if (line.startsWith("$")) {
            return (
              <div key={idx}>
                <span className="prompt">$</span>
                {line.slice(1)}
                {idx === rows.length - 1 && (
                  <>
                    {typed}
                    <span className="cursor">&nbsp;</span>
                  </>
                )}
              </div>
            );
          }
          return (
            <div key={idx}>
              <span className="muted">{line}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  page                                                                */
/* ------------------------------------------------------------------ */

export default function BlogsClient() {
  const [filter, setFilter] = useState<string>("all");
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.filter((p) => {
      const byCat = filter === "all" || p.category === filter;
      const byText =
        q === "" ||
        `${p.title} ${p.author} ${p.excerpt} ${p.tags.join(" ")}`
          .toLowerCase()
          .includes(q);
      return byCat && byText;
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
    `${shown.length} ${shown.length === 1 ? "post" : "posts"}` +
    (filter === "all" ? "" : ` in ${filter}`) +
    (query.trim() ? ` matching "${query.trim()}"` : "");

  return (
    <>
      <Header current="Blogs" />

      <main className="flex-1">
        {/* hero */}
        <section className="wrap pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div>
              <p className="kicker mb-5">
                {"// PES University — Electronic City Campus"}
              </p>
              <h1 className="font-display font-bold leading-[0.95] text-[clamp(3rem,11vw,6.5rem)]">
                Blogs
              </h1>
              <p className="mt-6 text-sm md:text-base text-fg-dim max-w-xl">
                Writeups, research notes and post-mortems from the people who
                broke things this week. Every post is a real challenge, a real
                disclosure, or a tool we actually run.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a className="btn btn-solid" href="#library">
                  &gt; browse_posts
                </a>
              </div>
            </div>

            <BlogTerminal />
          </div>
        </section>

        <div className="wrap">
          <div className="rule" />
        </div>

        {/* library */}
        <section id="library" className="wrap py-16 md:py-20">
          <span className="tag">field notes</span>
          <h2 className="mt-3 font-display font-bold text-2xl md:text-3xl">
            Everything the club has written up
          </h2>
          <p className="mt-2 text-sm text-fg-dim max-w-2xl">
            Filter by category, or search by title, author, tool or topic.
          </p>

          <div className="panel mt-8 p-4 md:p-5 grid gap-4">
            <label
              className="flex items-center gap-2.5 bg-bg-3 border border-border px-3 py-2.5 focus-within:border-accent transition-colors"
              htmlFor="blog-search"
            >
              <span className="text-accent text-sm" aria-hidden>
                $
              </span>
              <input
                id="blog-search"
                ref={searchRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="search posts — press / to focus"
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
              {CATEGORIES.map((value) => {
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
                    {value}
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
            {shown.map((p) => (
              <article key={p.slug} className="card flex flex-col gap-2">
                <span className="tag self-start">{p.category}</span>
                <h3 className="font-display font-bold text-lg text-fg">
                  <Link href={`/blogs/${p.slug}`} className="hover:text-accent">
                    {p.title}
                  </Link>
                </h3>
                <p className="text-[0.72rem] text-fg-faint">
                  {p.author} · {formatDate(p.date)} · {p.readTime} read
                </p>
                <p className="text-sm text-fg-dim">{p.excerpt}</p>
                <Link
                  href={`/blogs/${p.slug}`}
                  className="mt-auto pt-3.5 text-xs text-accent border-t border-border"
                >
                  &gt; read_post
                </Link>
              </article>
            ))}
          </div>

          {shown.length === 0 && (
            <p className="mt-6 p-5 border border-dashed border-border text-sm text-fg-dim">
              No match. Clear the filter, or pitch a post at{" "}
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
                Broke something interesting?
              </h2>
              <p className="mt-2 text-sm text-fg-dim max-w-2xl">
                Members write these. Bring a draft to a weekly session and we
                will help you shape it.
              </p>
            </div>
            <Link href="/#top" className="btn btn-solid">
              &gt; weekly_sessions
            </Link>
          </div>
        </section>
      </main>

      <Footer current="Blogs" />
    </>
  );
}
