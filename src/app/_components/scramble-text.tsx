"use client";

import { useEffect, useState } from "react";

/**
 * Decrypt-style reveal: on mount, `text` churns in from random glyphs,
 * per-character, then resolves and holds. It does NOT repeat the full
 * decrypt — once resolved, only a single random (non-space) letter
 * glitches to a random glyph and back, at a randomised interval, so it
 * reads as "alive" without redoing the whole reveal. Used by /sandbox and
 * /weekly-ctfs' "coming soon" headings.
 */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}=+*^?#$%&";

const DEFAULT_DECRYPT_STEP_MS = 120; // default speed of the one-time reveal
const GLITCH_FLICKER_MS = 90; // how long a single glitched letter shows

type Slot = { char: string; start: number; end: number };

function makeQueue(text: string): Slot[] {
  return [...text].map((char, i) => {
    const start = Math.floor(i * 2 + Math.random() * 8);
    return { char, start, end: start + 10 + Math.floor(Math.random() * 16) };
  });
}

function randomGlyph(): string {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

export function ScrambleText({
  text,
  decryptStepMs = DEFAULT_DECRYPT_STEP_MS,
  minGlitchMs = 1500,
  maxGlitchMs = 6000,
}: {
  text: string;
  /** ms per glyph-churn step during the one-time reveal — lower is faster */
  decryptStepMs?: number;
  /** randomised gap between single-letter glitches, in ms */
  minGlitchMs?: number;
  maxGlitchMs?: number;
}) {
  // SSR + first paint show the final text; the reveal takes over on mount.
  const [out, setOut] = useState(text);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let cancelled = false;
    let glitchTimeoutId: number | undefined;

    function scheduleGlitch() {
      if (cancelled) return;
      const delay = minGlitchMs + Math.random() * (maxGlitchMs - minGlitchMs);

      glitchTimeoutId = window.setTimeout(() => {
        if (cancelled) return;

        const letterIndexes = [...text]
          .map((char, i) => (char === " " ? -1 : i))
          .filter((i) => i >= 0);

        if (letterIndexes.length === 0) {
          scheduleGlitch();
          return;
        }

        const i = letterIndexes[Math.floor(Math.random() * letterIndexes.length)];
        setOut(text.slice(0, i) + randomGlyph() + text.slice(i + 1));

        window.setTimeout(() => {
          if (cancelled) return;
          setOut(text);
          scheduleGlitch();
        }, GLITCH_FLICKER_MS);
      }, delay);
    }

    // one-time decrypt-in, then hand off to the occasional single-letter glitch
    let frame = 0;
    const queue = makeQueue(text);

    const decryptId = window.setInterval(() => {
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
          rendered += randomGlyph();
        } else {
          rendered += " ";
        }
      }
      setOut(rendered);
      frame += 1;

      if (done === queue.length) {
        window.clearInterval(decryptId);
        setOut(text);
        scheduleGlitch();
      }
    }, decryptStepMs);

    return () => {
      cancelled = true;
      if (decryptId !== undefined) window.clearInterval(decryptId);
      if (glitchTimeoutId !== undefined) window.clearTimeout(glitchTimeoutId);
    };
  }, [text, decryptStepMs, minGlitchMs, maxGlitchMs]);

  return (
    <>
      {out}
      <span className="cursor align-middle">&nbsp;</span>
    </>
  );
}
