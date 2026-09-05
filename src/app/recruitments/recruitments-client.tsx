"use client";

import { ScrambleText } from "../_components/scramble-text";
import { Header, Footer } from "../_components/site-chrome";

export default function RecruitmentsClient() {
  return (
    <>
      <Header current="Recruitments" />

      <main className="flex-1 grid place-items-center">
        <section className="wrap py-20 md:py-28 text-center">
          <p className="kicker mb-6">{"// ~/recruitments"}</p>

          <h1 className="font-mono font-bold uppercase tracking-[0.18em] text-accent glow leading-none break-words text-[clamp(2rem,9vw,5rem)]">
            <ScrambleText text="RECRUITING SOON" decryptStepMs={85} />
          </h1>

          <p className="mt-8 text-sm md:text-base text-fg-dim max-w-md mx-auto">
            Applications aren&apos;t open yet. When they are, the form and the
            timeline land right here — until then, turn up to a weekly session.
          </p>
        </section>
      </main>

      <Footer current="Recruitments" />
    </>
  );
}
