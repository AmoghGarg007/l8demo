"use client";

import { useEffect, useState } from "react";

/**
 * Decrypt-style scramble: renders `text`, but on mount it churns through
 * random glyphs per-character before resolving, then does it again after a
 * randomised pause — so re-scrambles don't land on a predictable beat. Used
 * by /sandbox and /weekly-ctfs' "coming soon" headings.
 */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}=+*^?#$%&";
const STEP_MS = 120;

type Slot = { char: string; start: number; end: number };

function makeQueue(text: string): Slot[] {
  return [...text].map((char, i) => {
    const start = Math.floor(i * 2 + Math.random() * 8);
    return { char, start, end: start + 10 + Math.floor(Math.random() * 16) };
  });
}

function randomHoldSteps(minSteps: number, maxSteps: number) {
  return minSteps + Math.floor(Math.random() * (maxSteps - minSteps + 1));
}

export function ScrambleText({
  text,
  minHoldMs = 4000,
  maxHoldMs = 16000,
}: {
  text: string;
  /** randomised pause range between decrypt passes, in ms */
  minHoldMs?: number;
  maxHoldMs?: number;
}) {
  // SSR + first paint show the final text; the scramble takes over on mount.
  const [out, setOut] = useState(text);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const minSteps = Math.round(minHoldMs / STEP_MS);
    const maxSteps = Math.round(maxHoldMs / STEP_MS);

    let frame = 0;
    let hold = 0;
    let queue = makeQueue(text);

    const id = window.setInterval(() => {
      // paused between passes — sit on the finished word for a random while
      if (hold > 0) {
        hold -= 1;
        if (hold === 0) {
          frame = 0;
          queue = makeQueue(text);
        }
        return;
      }

      let rendered = "";
      let done = 0;
      for (const slot of queue) {
        if (slot.char === " ") {
          rendered += " ";
          done += 1;
        } else if (frame >= slot.end) {
          rendered += slot.char;
          done += 1;
        } else if (frame >= slot.start) {
          rendered += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        } else {
          rendered += " ";
        }
      }
      setOut(rendered);
      frame += 1;

      if (done === queue.length) {
        setOut(text);
        hold = randomHoldSteps(minSteps, maxSteps);
      }
    }, STEP_MS);

    return () => window.clearInterval(id);
  }, [text, minHoldMs, maxHoldMs]);

  return (
    <>
      {out}
      <span className="cursor align-middle">&nbsp;</span>
    </>
  );
}
