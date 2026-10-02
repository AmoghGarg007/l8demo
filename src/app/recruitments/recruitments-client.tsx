"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { useAuth } from "../_components/auth-context";
import { Header, Footer } from "../_components/site-chrome";
import Terminal from "./recruitment-terminal";
import ApplicationForm from "./application-form";

export default function RecruitmentsClient() {
  const { user, isLoading, hasApplied, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  async function handleLogout() {
    setLoggingOut(true);
    await logout();
    setLoggingOut(false);
  }

  function scrollToForm() {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const applied = Boolean(user) && (submitted || hasApplied);

  return (
    <>
      <Header current="Recruitments" />

      <main className="flex-1">
      {!user && (
        <>
          <section className="max-w-6xl mx-auto px-4 sm:px-8 pt-20 pb-16 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="kicker">pesu club recruitment</span>
              <h1 className="text-4xl sm:text-5xl font-display mt-3 mb-5 leading-tight">
                join the club.
                <br />
                build something real.
              </h1>
              <p className="text-fg-dim mb-8 max-w-md">
                One application, five domains, no fluff. Log in with your PESU
                Academy credentials and we auto-fill the boring parts so you can
                get straight to telling us why you&apos;d be a good fit.
              </p>
              <button className="btn btn-solid" onClick={scrollToForm}>
                apply_now
              </button>
            </div>

            <Terminal onApply={scrollToForm} />
          </section>

          <section className="max-w-6xl mx-auto px-4 sm:px-8 pb-16">
            <div className="card">
              <span className="kicker">why join</span>
              <h2 className="text-2xl font-display mt-2 mb-4">what you get</h2>
              <ul className="space-y-3 text-fg-dim">
                <li>→ hands-on ownership over real projects from week one</li>
                <li>→ a domain that matches what you actually want to get better at</li>
                <li>→ a small, fast-moving team instead of a committee</li>
                <li>→ a straight line from &quot;I applied&quot; to &quot;I shipped this&quot;</li>
              </ul>
            </div>
          </section>
        </>
      )}

      <section
        ref={formRef}
        className={`max-w-3xl mx-auto px-4 sm:px-8 pb-24 ${
          user ? "pt-20" : ""
        }`}
      >
        <span className="kicker">application</span>
        <h2 className="text-2xl font-display mt-2 mb-6">
          {applied ? "status" : "apply_now"}
        </h2>

        {isLoading && <p className="text-fg-dim">loading session...</p>}

        {!isLoading && applied && (
          <div className="card flex flex-col items-center gap-5 text-center py-14 px-6">
            <div className="w-12 h-12 rounded-full border border-accent/40 bg-accent/10 flex items-center justify-center text-accent text-xl leading-none">
              ✓
            </div>
            <div>
              <h3 className="text-xl font-display mb-2">
                application received
              </h3>
              <p className="text-fg-dim max-w-sm mx-auto">
                {"> we've got your application on file"}
                {user?.name ? `, ${user.name.split(" ")[0]}` : ""}. We&apos;ll
                reach out over email if you&apos;re shortlisted.
              </p>
            </div>
            <div className="flex items-center gap-2">
              {user?.role === "admin" && (
                <Link href="/admin" className="btn btn-solid text-xs">
                  &gt; admin_panel
                </Link>
              )}
              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="btn text-xs"
              >
                {loggingOut ? "signing_out..." : "> sign_out"}
              </button>
            </div>
          </div>
        )}

        {!isLoading && !applied && !user && (
          <div className="card">
            <p className="mb-4">
              Please log in first to apply. We use your PESU Academy login to
              verify your identity and auto-fill your details.
            </p>
            <div className="mb-4 rounded border border-fg-dim/30 bg-fg-dim/5 p-3 text-sm">
              <p className="mb-2 font-medium">
                Note: To allow us to auto-fill your form, please complete this
                quick step in line with PESU Academy&apos;s IT policy:
              </p>
              <ol className="list-decimal space-y-1 pl-5">
                <li>Open pesuacademy.com</li>
                <li>Log in with your credentials</li>
                <li>
                  Check the consent checkbox and click &quot;Agree &amp;
                  Continue&quot;
                </li>
              </ol>
              <p className="mt-2">
                Please do this when you log in to fill the form.
              </p>
            </div>
            <Link href="/recruitments/login" className="btn btn-solid">
              go_to_login
            </Link>
          </div>
        )}

        {!isLoading && !applied && user && (
          <ApplicationForm onSuccess={() => setSubmitted(true)} />
        )}
      </section>
      </main>

      <Footer current="Recruitments" />
    </>
  );
}
