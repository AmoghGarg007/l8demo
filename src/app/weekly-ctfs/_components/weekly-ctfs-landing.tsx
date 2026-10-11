import { ScrambleText } from "../../_components/scramble-text";
import { Footer, Header } from "../../_components/site-chrome";
import { SignInForm } from "./sign-in-form";

export function WeeklyCtfsLanding() {
  return (
    <>
      <Header current="Weekly CTFs" />

      <main className="flex-1 route-transition">
        <section className="wrap py-12 md:py-20">
          <div className="rule mb-8" />

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,24rem)] lg:gap-16">
            <div>
              <p className="kicker mb-6">{"// ~/weekly-ctfs"}</p>

              <h1 className="font-mono font-bold uppercase tracking-[0.18em] text-accent glow leading-none break-words text-[clamp(2rem,9vw,5rem)]">
                <ScrambleText text="COMING SOON" />
              </h1>

              <p className="mt-8 max-w-lg text-sm leading-relaxed text-fg-dim md:text-base">
                Weekly challenges, live scoring, and the Layer8 leaderboard
                are almost ready. Sign in now or create an account so you are
                ready when the first challenge drops.
              </p>
            </div>

            <div>
              <p className="kicker mb-4">{"// operator_access"}</p>
              <SignInForm />
            </div>
          </div>
        </section>
      </main>

      <Footer current="Weekly CTFs" />
    </>
  );
}
