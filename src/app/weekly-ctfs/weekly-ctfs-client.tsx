"use client";

import { ScrambleText } from "../_components/scramble-text";
import { Header, Footer } from "../_components/site-chrome";

export default function WeeklyCtfsClient() {
  return (
    <>
      <Header current="Weekly CTFs" />

      <main className="flex-1 grid place-items-center">
        <section className="wrap py-20 md:py-28 text-center">
          <p className="kicker mb-6">{"// ~/weekly-ctfs"}</p>

          <h1 className="font-mono font-bold uppercase tracking-[0.18em] text-accent glow leading-none break-words text-[clamp(2rem,9vw,5rem)]">
            <ScrambleText text="COMING SOON" />
          </h1>

          <p className="mt-8 text-sm md:text-base text-fg-dim max-w-md mx-auto">
            The weekly schedule and live scoreboard page are still being
            built. Sessions run every week regardless — bring a laptop.
          </p>
        </section>
      </main>

      <Footer current="Weekly CTFs" />
    </>
  );
}
