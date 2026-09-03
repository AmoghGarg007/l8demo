"use client";

import { useEffect, useState } from "react";
import { Header, Footer } from "../_components/site-chrome";

const TARGET = "COMING SOON";
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}=+*^?#$%&";

// ~120ms per step slows the glyph churn; ~9s hold between decrypt passes.
const STEP_MS = 120;
const HOLD_STEPS = 75;

type Slot = { char: string; start: number; end: number };

function makeQueue(): Slot[] {
  return [...TARGET].map((char, i) => {
    const start = Math.floor(i * 2 + Math.random() * 8);
    return { char, start, end: start + 10 + Math.floor(Math.random() * 16) };
  });
}

export default function SandboxClient() {
  // SSR + first paint show the final text; the scramble takes over on mount.
  const [text, setText] = useState(TARGET);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let frame = 0;
    let hold = 0;
    let queue = makeQueue();

    const id = window.setInterval(() => {
      // paused between passes — sit on the finished word for a while
      if (hold > 0) {
        hold -= 1;
        if (hold === 0) {
          frame = 0;
          queue = makeQueue();
        }
        return;
      }

      let out = "";
      let done = 0;
      for (const slot of queue) {
        if (slot.char === " ") {
          out += " ";
          done += 1;
        } else if (frame >= slot.end) {
          out += slot.char;
          done += 1;
        } else if (frame >= slot.start) {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        } else {
          out += " ";
        }
      }
      setText(out);
      frame += 1;

      if (done === queue.length) {
        setText(TARGET);
        hold = HOLD_STEPS;
      }
    }, STEP_MS);

    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <Header current="Sandbox" />

      <main className="flex-1 grid place-items-center">
        <section className="wrap py-20 md:py-28 text-center">
          <p className="kicker mb-6">{"// ~/sandbox"}</p>

          <h1 className="font-mono font-bold uppercase tracking-[0.18em] text-accent glow leading-none break-words text-[clamp(2rem,9vw,5rem)]">
            {text}
            <span className="cursor align-middle">&nbsp;</span>
          </h1>

          <p className="mt-8 text-sm md:text-base text-fg-dim max-w-md mx-auto">
            Experiments, half-built tools and challenge infrastructure. Nothing
            to see here yet — check back after the next build cycle.
          </p>
        </section>
      </main>

      <Footer current="Sandbox" />
    </>
  );
}
