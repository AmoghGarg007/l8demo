import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "./_components/site-chrome";

export const metadata: Metadata = {
  title: "404 · Layer8 — PES University, ECC",
  description: "This page doesn't exist.",
};

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="flex-1 grid place-items-center overflow-hidden h-[calc(100vh-4rem)]">
        <section className="wrap py-6 text-center">
          <p className="kicker mb-3">{"// 404"}</p>

          <h1 className="font-display font-bold leading-[0.9] text-[clamp(3rem,11vw,6rem)] text-accent glow">
            404
          </h1>

          <p className="mt-4 text-sm text-fg-dim max-w-md mx-auto">
            Nothing resolved at that path. It never existed, moved, or you
            mistyped it — the terminal doesn&apos;t judge.
          </p>

          <div className="term mt-6 mx-auto max-w-md text-left">
            <div className="term-bar">
              <span className="term-dot" />
              <span className="term-dot" />
              <span className="term-dot" />
              <span className="ml-2 text-xs text-fg-dim">layer8 — ~</span>
            </div>
            <div className="term-body font-mono !min-h-0 !py-3">
              <div>
                <span className="prompt">$</span> cd ./requested-page
              </div>
              <div className="muted">bash: cd: no such file or directory</div>
              <div className="mt-2">
                <span className="prompt">$</span> cd ..
                <span className="cursor">&nbsp;</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className="btn btn-solid">
              &gt; cd ~
            </Link>
            <Link href="/blogs" className="btn">
              &gt; browse_blogs
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
