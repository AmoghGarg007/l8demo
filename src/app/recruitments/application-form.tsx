"use client";

import Link from "next/link";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useAuth } from "../_components/auth-context";
import { deriveYear } from "@/lib/date";

type DomainId = "tech" | "events" | "marketing" | "media" | "design";
type SectionId = "you" | "domains" | "about" | "finish" | DomainId;
type Answers = Record<string, string>;

interface Question {
  id: string;
  label: string;
  type: "text" | "textarea" | "email" | "tel" | "url" | "scale" | "choice";
  required?: boolean;
  placeholder?: string;
  hint?: ReactNode;
  options?: string[];
  tall?: boolean;
  showIf?: (a: Answers) => boolean;
}

type Step =
  | { kind: "identity"; id: string; section: SectionId }
  | { kind: "domains"; id: string; section: SectionId }
  | { kind: "intro"; id: string; section: SectionId; count: number }
  | { kind: "question"; id: string; section: SectionId; q: Question }
  | { kind: "review"; id: string; section: SectionId };

const DOMAINS: {
  id: DomainId;
  label: string;
  blurb: string;
  layout: string;
}[] = [
  {
    id: "tech",
    label: "tech",
    blurb: "build & break things",
    layout: "col-span-2 sm:col-span-3 domain-tile-lg",
  },
  {
    id: "events",
    label: "events",
    blurb: "plan & run experiences",
    layout: "col-span-2 sm:col-span-3 domain-tile-lg",
  },
  {
    id: "marketing",
    label: "marketing",
    blurb: "campaigns, copy, outreach",
    layout: "col-span-1 sm:col-span-2",
  },
  {
    id: "media",
    label: "media",
    blurb: "photo, video, socials",
    layout: "col-span-1 sm:col-span-2",
  },
  {
    id: "design",
    label: "design",
    blurb: "visual identity, UI/UX",
    layout: "col-span-2 sm:col-span-2",
  },
];

const CONTACT_QUESTIONS: Question[] = [
  {
    id: "email",
    label: "What's your email?",
    type: "email",
    required: true,
    placeholder: "you@example.com",
    hint: "We'll reach out here if you're shortlisted.",
  },
  {
    id: "phone",
    label: "And your phone number?",
    type: "tel",
    required: true,
    placeholder: "10-digit number",
  },
];

const ABOUT_QUESTIONS: Question[] = [
  {
    id: "whyJoin",
    label: "Why do you want to join Layer8?",
    type: "textarea",
    tall: true,
  },
  {
    id: "experience",
    label: "Any experience that's relevant?",
    type: "textarea",
    hint: "Projects, clubs, competitions. Anything you've built or broken.",
  },
  {
    id: "portfolioUrl",
    label: "Got a portfolio or a link to share?",
    type: "url",
    placeholder: "https://...",
    hint: (
      <>
        Using Google Drive or Docs? Set sharing to{" "}
        <span className="text-fg">anyone with the link</span> first, or we
        won&apos;t be able to open it.
      </>
    ),
  },
];

const FEEDBACK_QUESTION: Question = {
  id: "feedback",
  label: "Anything else you'd like us to know, or ask?",
  type: "textarea",
  placeholder: "Feedback, questions, anything at all",
};

const DOMAIN_QUESTIONS: Record<DomainId, Question[]> = {
  tech: [
    {
      id: "techCyberExperience",
      label: "Do you have prior cybersecurity experience?",
      type: "choice",
      options: ["yes", "no"],
      required: true,
    },
    {
      id: "techLanguage",
      label: "Which coding language(s) do you prefer?",
      type: "text",
      required: true,
    },
    {
      id: "techWhyDomain",
      label: "Why do you want to join the tech domain?",
      type: "textarea",
      required: true,
    },
    {
      id: "techPriorExperience",
      label: "What prior experience do you have that's relevant to tech?",
      type: "textarea",
      required: true,
    },
    {
      id: "techCtfParticipated",
      label: "Have you participated in a CTF before?",
      type: "choice",
      options: ["yes", "no", "other"],
      required: true,
    },
    {
      id: "techCtfOther",
      label: "Tell us more about your CTF experience.",
      type: "textarea",
      required: true,
      showIf: (a) => a.techCtfParticipated === "other",
    },
    {
      id: "techCtfConfidence",
      label: "How confident are you solving CTF challenges? (1-10)",
      type: "scale",
      required: true,
    },
    {
      id: "techProject",
      label: "Describe a project you're proud of.",
      type: "textarea",
      required: true,
      tall: true,
    },
    {
      id: "techGithub",
      label: "Your GitHub profile?",
      type: "text",
      placeholder: "https://github.com/...",
    },
    {
      id: "techLinkedin",
      label: "Your LinkedIn profile?",
      type: "text",
      placeholder: "https://linkedin.com/in/...",
    },
  ],
  events: [
    {
      id: "eventsWhyJoin",
      label: "Why do you want to join events?",
      type: "textarea",
      required: true,
    },
    {
      id: "eventsPriorExperience",
      label: "What prior event-planning experience do you have?",
      type: "textarea",
      required: true,
    },
    {
      id: "eventsPlanSteps",
      label: "Walk us through the steps you'd take to plan an event.",
      type: "textarea",
      required: true,
      tall: true,
    },
    {
      id: "eventsOrientationIdeas",
      label: "Got any ideas for our next orientation?",
      type: "textarea",
      required: true,
    },
    {
      id: "eventsExcites",
      label: "What excites you most about running events?",
      type: "textarea",
      required: true,
    },
  ],
  marketing: [
    {
      id: "marketingWhyDomain",
      label: "Why do you want to join the marketing domain?",
      type: "textarea",
      required: true,
    },
    {
      id: "marketingExperience",
      label: "Any prior marketing, copywriting or social media experience?",
      type: "textarea",
      required: true,
    },
    {
      id: "marketingConfidence",
      label: "How comfortable are you with copywriting and content strategy? (1-10)",
      type: "scale",
      required: true,
    },
  ],
  media: [
    {
      id: "mediaWhyDomain",
      label: "Why do you want to join the media domain?",
      type: "textarea",
      required: true,
    },
    {
      id: "mediaTools",
      label: "Which tools do you use?",
      type: "text",
      required: true,
      placeholder: "Photoshop, Premiere, CapCut...",
    },
    {
      id: "mediaPortfolio",
      label: "Any photography or video work to show us?",
      type: "text",
      placeholder: "Link",
    },
  ],
  design: [
    {
      id: "designWhyDomain",
      label: "Why do you want to join the design domain?",
      type: "textarea",
      required: true,
    },
    {
      id: "designTools",
      label: "Which tools do you use?",
      type: "text",
      required: true,
      placeholder: "Figma, Illustrator...",
    },
    {
      id: "designConfidence",
      label: "How confident are you in UI and visual design? (1-10)",
      type: "scale",
      required: true,
    },
  ],
};

function buildSteps(domains: DomainId[], a: Answers): Step[] {
  const steps: Step[] = [{ kind: "identity", id: "identity", section: "you" }];
  for (const q of CONTACT_QUESTIONS) {
    steps.push({ kind: "question", id: q.id, section: "you", q });
  }
  steps.push({ kind: "domains", id: "domains", section: "domains" });
  for (const q of ABOUT_QUESTIONS) {
    steps.push({ kind: "question", id: q.id, section: "about", q });
  }
  for (const d of DOMAINS.filter((x) => domains.includes(x.id))) {
    const qs = DOMAIN_QUESTIONS[d.id].filter((q) => !q.showIf || q.showIf(a));
    steps.push({ kind: "intro", id: `${d.id}:intro`, section: d.id, count: qs.length });
    for (const q of qs) {
      steps.push({ kind: "question", id: q.id, section: d.id, q });
    }
  }
  steps.push({ kind: "question", id: FEEDBACK_QUESTION.id, section: "finish", q: FEEDBACK_QUESTION });
  steps.push({ kind: "review", id: "review", section: "finish" });
  return steps;
}

function questionProblem(q: Question, raw: string): string | null {
  const v = raw.trim();
  if (!v) return q.required ? "This one is required." : null;
  if (q.type === "email" && !/^\S+@\S+\.\S+$/.test(v)) {
    return "Enter a valid email address.";
  }
  if (q.type === "tel") {
    const digits = v.replace(/\D/g, "");
    if (digits.length < 10 || v.length > 20) {
      return "Enter a valid phone number (at least 10 digits).";
    }
  }
  if (q.type === "url") {
    try {
      const u = new URL(v);
      if (!/^https?:$/.test(u.protocol)) throw new Error("protocol");
    } catch {
      return "Enter a full link starting with https://";
    }
  }
  return null;
}

function stepProblem(
  step: Step,
  a: Answers,
  ctx: { year: string; domains: DomainId[] },
): string | null {
  switch (step.kind) {
    case "identity":
      return ctx.year
        ? null
        : "We couldn't work out your year from PESU Academy. Log into pesuacademy.com, accept the consent prompt, then sign out and back in here.";
    case "domains":
      return ctx.domains.length > 0 ? null : "Pick at least one domain.";
    case "question":
      return questionProblem(step.q, a[step.q.id] ?? "");
    default:
      return null;
  }
}

function sectionLabel(id: SectionId): string {
  const d = DOMAINS.find((x) => x.id === id);
  if (d) return d.label;
  return { you: "you", domains: "pick", about: "about", finish: "finish" }[
    id as "you" | "domains" | "about" | "finish"
  ];
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function ScalePicker({
  value,
  onChange,
  labelledBy,
}: {
  value: string;
  onChange: (v: string) => void;
  labelledBy: string;
}) {
  return (
    <div>
      <div className="flow-scale" role="radiogroup" aria-labelledby={labelledBy}>
        {Array.from({ length: 10 }, (_, i) => String(i + 1)).map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            onClick={() => onChange(n)}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flow-scale-ends">
        <span>not at all</span>
        <span>very</span>
      </div>
    </div>
  );
}

export default function ApplicationForm({ onSuccess }: { onSuccess: () => void }) {
  const { user, profile, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const [answers, setAnswers] = useState<Answers>({});
  const [domains, setDomains] = useState<DomainId[]>([]);
  const [website, setWebsite] = useState(""); // honeypot

  const [index, setIndex] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [dir, setDir] = useState<"fwd" | "back">("fwd");
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const cardRef = useRef<HTMLElement>(null);

  // Display only. The backend re-derives the year from the verified session.
  const year = useMemo(
    () => deriveYear(profile?.semester ?? user?.semester),
    [profile, user],
  );

  const steps = useMemo(() => buildSteps(domains, answers), [domains, answers]);
  const safeIndex = Math.min(index, steps.length - 1);
  const step = steps[safeIndex];
  const ctx = { year, domains };

  const sections = useMemo(() => {
    const out: { id: SectionId; first: number; count: number }[] = [];
    steps.forEach((s, i) => {
      const last = out[out.length - 1];
      if (last && last.id === s.section) last.count += 1;
      else out.push({ id: s.section, first: i, count: 1 });
    });
    return out;
  }, [steps]);

  const missing = useMemo(() => {
    const out: { index: number; label: string; problem: string }[] = [];
    steps.forEach((s, i) => {
      const p = stepProblem(s, answers, { year, domains });
      if (!p) return;
      const label =
        s.kind === "question"
          ? s.q.label
          : s.kind === "identity"
            ? "Your year"
            : "Domains";
      out.push({ index: i, label, problem: p });
    });
    return out;
  }, [steps, answers, year, domains]);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.querySelector<HTMLElement>("[data-autofocus]")?.focus({ preventScroll: true });
    if (el.getBoundingClientRect().top < 0) {
      el.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, [step.id]);

  function setAnswer(id: string, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function goTo(i: number) {
    setDir(i > safeIndex ? "fwd" : "back");
    setAttempted(false);
    setErrorMessage(null);
    setIndex(i);
    setMaxReached((m) => Math.max(m, i));
  }

  function next() {
    if (stepProblem(step, answers, ctx)) {
      setAttempted(true);
      return;
    }
    if (safeIndex < steps.length - 1) goTo(safeIndex + 1);
  }

  function back() {
    if (safeIndex > 0) goTo(safeIndex - 1);
  }

  function toggleDomain(id: DomainId) {
    setDomains((prev) => {
      if (prev.includes(id)) return prev.filter((d) => d !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  }

  function onKeyDown(e: KeyboardEvent<HTMLFormElement>) {
    if (e.key !== "Enter" || e.nativeEvent.isComposing) return;
    const t = e.target as HTMLElement;
    if (t.tagName === "BUTTON" || t.tagName === "A") return;
    if (step.kind === "review") return;
    if (t.tagName === "TEXTAREA" && !(e.metaKey || e.ctrlKey)) return;
    e.preventDefault();
    next();
  }

  async function handleLogout() {
    setLoggingOut(true);
    await logout();
    setLoggingOut(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step.kind !== "review" || !user || status === "submitting") return;
    if (missing.length > 0) return;

    setStatus("submitting");
    setErrorMessage(null);

    const body: Record<string, unknown> = {
      fullName: profile?.name ?? user.name,
      srn: profile?.srn ?? user.srn,
      branch: profile?.branch ?? user.branch,
      year,
      domains,
      email: (answers.email ?? "").trim(),
      phone: (answers.phone ?? "").trim(),
      feedback: answers.feedback ?? "",
      website,
    };
    const answered: Question[] = [
      ...ABOUT_QUESTIONS,
      ...domains.flatMap((d) =>
        DOMAIN_QUESTIONS[d].filter((q) => !q.showIf || q.showIf(answers)),
      ),
    ];
    for (const q of answered) {
      const v = (answers[q.id] ?? "").trim();
      if (v) body[q.id] = v;
    }

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        const fieldErrors = data?.issues?.fieldErrors as
          | Record<string, string[]>
          | undefined;
        if (fieldErrors) {
          const detail = Object.entries(fieldErrors)
            .filter(([, msgs]) => msgs && msgs.length > 0)
            .map(([field, msgs]) => `${field}: ${msgs[0]}`)
            .join("; ");
          setErrorMessage(detail || data.error || "Validation failed");
        } else {
          setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        }
        return;
      }

      setStatus("idle");
      onSuccess();
    } catch {
      setStatus("error");
      setErrorMessage("Could not reach the server. Please try again.");
    }
  }

  const isDomainSection = DOMAINS.some((d) => d.id === step.section);
  const domainMeta = DOMAINS.find((d) => d.id === step.section);
  const problem = attempted ? stepProblem(step, answers, ctx) : null;

  const sectionQuestions = steps.filter(
    (s) => s.section === step.section && s.kind === "question",
  );
  const qNumber = sectionQuestions.indexOf(step) + 1;

  const value = step.kind === "question" ? (answers[step.q.id] ?? "") : "";
  const optionalEmpty =
    step.kind === "question" && !step.q.required && value.trim() === "";
  const nextLabel =
    step.kind === "intro"
      ? "start →"
      : step.kind === "identity"
        ? "that's me →"
        : optionalEmpty
          ? "skip →"
          : "next →";

  function renderQuestion(q: Question) {
    const labelId = `label-${q.id}`;
    const inputId = `input-${q.id}`;
    const errId = `err-${q.id}`;
    const common = {
      id: inputId,
      "data-autofocus": true,
      "aria-labelledby": labelId,
      "aria-invalid": problem ? true : undefined,
      "aria-describedby": problem ? errId : undefined,
    };
    return (
      <div className="flow-q">
        <span className="flow-q-n">
          {isDomainSection || step.section === "about"
            ? `q${pad(qNumber)} of ${pad(sectionQuestions.length)}`
            : `q${pad(qNumber)}`}
        </span>
        <label id={labelId} htmlFor={inputId} className="flow-q-label">
          {q.label}
          {q.required ? (
            <span className="req" aria-hidden="true">
              {" "}
              *
            </span>
          ) : (
            <span className="flow-opt">optional</span>
          )}
        </label>
        {q.hint && <p className="flow-hint">{q.hint}</p>}

        {q.type === "textarea" && (
          <textarea
            {...common}
            className={`flow-input flow-textarea ${q.tall ? "" : "flow-textarea-sm"}`}
            maxLength={4000}
            placeholder={q.placeholder}
            value={value}
            onChange={(e) => setAnswer(q.id, e.target.value)}
          />
        )}
        {(q.type === "text" ||
          q.type === "email" ||
          q.type === "tel" ||
          q.type === "url") && (
          <input
            {...common}
            className="flow-input"
            type={q.type === "text" ? "text" : q.type}
            inputMode={q.type === "tel" ? "tel" : undefined}
            autoComplete={
              q.type === "email" ? "email" : q.type === "tel" ? "tel" : "off"
            }
            maxLength={q.type === "tel" ? 20 : q.type === "email" ? 200 : 500}
            placeholder={q.placeholder}
            value={value}
            onChange={(e) => setAnswer(q.id, e.target.value)}
          />
        )}
        {q.type === "choice" && (
          <div className="flow-choice" role="radiogroup" aria-labelledby={labelId}>
            {q.options?.map((opt, i) => (
              <button
                key={opt}
                type="button"
                role="radio"
                aria-checked={value === opt}
                data-autofocus={i === 0 ? true : undefined}
                onClick={() => setAnswer(q.id, opt)}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
        {q.type === "scale" && (
          <ScalePicker
            value={value}
            labelledBy={labelId}
            onChange={(v) => setAnswer(q.id, v)}
          />
        )}

        {problem && (
          <p id={errId} className="field-error mt-3" role="alert">
            {"> "}
            {problem}
          </p>
        )}
      </div>
    );
  }

  function renderBody() {
    switch (step.kind) {
      case "identity":
        return (
          <div className="flow-q">
            <span className="flow-q-n">verified via pesu auth</span>
            <h2 id="label-identity" className="flow-q-label">
              Is this you?
            </h2>
            <p className="flow-hint">
              Pulled from PESU Academy. You can&apos;t edit these. Your year is
              worked out from your semester.
            </p>
            <dl className="id-strip">
              <div className="id-strip-wide">
                <dt>name</dt>
                <dd>{profile?.name ?? user?.name}</dd>
              </div>
              <div>
                <dt>srn</dt>
                <dd>{profile?.srn ?? user?.srn}</dd>
              </div>
              <div>
                <dt>year</dt>
                <dd>{year || "unknown"}</dd>
              </div>
              <div className="id-strip-wide">
                <dt>branch</dt>
                <dd>{profile?.branch ?? user?.branch}</dd>
              </div>
            </dl>
            {!year && (
              <p className="field-error mt-3" role="alert">
                {"> "}PESU Academy didn&apos;t return your semester, so we
                can&apos;t determine your year. Log into{" "}
                <a
                  href="https://www.pesuacademy.com"
                  target="_blank"
                  rel="noreferrer"
                  className="underline"
                >
                  pesuacademy.com
                </a>{" "}
                directly, accept the consent prompt if one appears, then sign
                out and back in here.
              </p>
            )}
          </div>
        );

      case "domains":
        return (
          <div className="flow-q">
            <span className="flow-q-n">pick up to 2</span>
            <h2 id="label-domains" className="flow-q-label">
              Which domains do you want to apply to?
            </h2>
            <p className="flow-hint">
              You&apos;ll answer a short set of questions for each one you pick.
            </p>
            <div className="domain-grid" role="group" aria-labelledby="label-domains">
              {DOMAINS.map((d, i) => {
                const active = domains.includes(d.id);
                const disabled = !active && domains.length >= 2;
                return (
                  <label
                    key={d.id}
                    className={`domain-tile ${d.layout} ${
                      active ? "domain-tile-active" : ""
                    } ${disabled ? "domain-tile-disabled" : ""}`}
                  >
                    <input
                      type="checkbox"
                      checked={active}
                      disabled={disabled}
                      data-autofocus={i === 0 ? true : undefined}
                      onChange={() => toggleDomain(d.id)}
                    />
                    <span className="domain-tile-idx">{pad(i + 1)}</span>
                    <span>
                      <span className="domain-tile-name">{d.label}</span>
                      <span className="domain-tile-blurb">{d.blurb}</span>
                      <span className="domain-tile-state">
                        {active ? "picked" : disabled ? "max 2 reached" : "tap to pick"}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
            {problem && (
              <p className="field-error mt-3" role="alert">
                {"> "}
                {problem}
              </p>
            )}
          </div>
        );

      case "intro": {
        const pos = domains.filter((d) => DOMAINS.findIndex((x) => x.id === d) <= DOMAINS.findIndex((x) => x.id === step.section)).length;
        return (
          <div className="flow-intro">
            <p className="flow-intro-kicker">
              domain {pad(pos)} of {pad(domains.length)}
            </p>
            <h2 className="flow-intro-name">{domainMeta?.label}</h2>
            <p className="flow-intro-blurb">{domainMeta?.blurb}</p>
            <p className="flow-intro-meta">
              {step.count} questions, about {Math.max(2, Math.round(step.count * 0.8))} minutes
            </p>
          </div>
        );
      }

      case "question":
        return renderQuestion(step.q);

      case "review":
        return (
          <div className="flow-q">
            <span className="flow-q-n">last step</span>
            <h2 id="label-review" className="flow-q-label">
              Check it over, then send it.
            </h2>
            <dl className="flow-review">
              <div>
                <dt>name</dt>
                <dd>{profile?.name ?? user?.name}</dd>
              </div>
              <div>
                <dt>srn / year</dt>
                <dd>
                  {profile?.srn ?? user?.srn} / {year || "unknown"}
                </dd>
              </div>
              <div>
                <dt>contact</dt>
                <dd>
                  {answers.email}
                  <br />
                  {answers.phone}
                  <button
                    type="button"
                    className="flow-link"
                    onClick={() => goTo(steps.findIndex((s) => s.id === "email"))}
                  >
                    edit
                  </button>
                </dd>
              </div>
              <div>
                <dt>domains</dt>
                <dd>
                  {domains.length > 0
                    ? DOMAINS.filter((d) => domains.includes(d.id))
                        .map((d) => d.label)
                        .join(" + ")
                    : "none"}
                  <button
                    type="button"
                    className="flow-link"
                    onClick={() => goTo(steps.findIndex((s) => s.id === "domains"))}
                  >
                    edit
                  </button>
                </dd>
              </div>
            </dl>

            {missing.length > 0 && (
              <div className="flow-missing" role="alert">
                <p>Still needed before you can send:</p>
                <ul>
                  {missing.map((m) => (
                    <li key={m.index}>
                      <button type="button" onClick={() => goTo(m.index)}>
                        {m.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {errorMessage && (
              <p className="field-error mt-4" role="alert">
                {"> error: " + errorMessage}
              </p>
            )}
          </div>
        );
    }
  }

  return (
    <form
      className="flow"
      onSubmit={handleSubmit}
      onKeyDown={onKeyDown}
      noValidate
    >
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1 }}
        aria-hidden="true"
      />

      <div className="flow-top">
        <span className="text-xs text-accent tracking-wide">verified via pesu auth</span>
        <div className="flex items-center gap-2 shrink-0">
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

      <nav className="flow-rail" aria-label="Application progress">
        {sections.map((sec) => {
          const done = safeIndex >= sec.first + sec.count;
          const current = safeIndex >= sec.first && !done;
          const fill = done ? 1 : current ? (safeIndex - sec.first) / sec.count : 0;
          return (
            <button
              key={sec.id}
              type="button"
              className={`flow-rail-seg ${current ? "is-current" : ""} ${done ? "is-done" : ""}`}
              style={{ "--w": sec.count } as React.CSSProperties}
              disabled={sec.first > maxReached}
              aria-current={current ? "step" : undefined}
              onClick={() => goTo(sec.first)}
            >
              <span className="flow-rail-bar">
                <i style={{ transform: `scaleX(${fill})` }} />
              </span>
              <span className="flow-rail-label">{sectionLabel(sec.id)}</span>
            </button>
          );
        })}
      </nav>

      <p className="sr-only" aria-live="polite">
        Step {safeIndex + 1} of {steps.length}
      </p>

      <section
        ref={cardRef}
        key={step.id}
        data-dir={dir}
        className={`flow-card ${isDomainSection ? "flow-card-domain" : ""}`}
      >
        <header className="flow-head">
          <span className={`flow-chip ${isDomainSection ? "flow-chip-solid" : ""}`}>
            {sectionLabel(step.section)}
          </span>
          <span className="flow-count">
            {pad(safeIndex + 1)} / {pad(steps.length)}
          </span>
        </header>

        <div className="flow-body">
          {isDomainSection && step.kind === "question" && (
            <p className="flow-domain-name" aria-hidden="true">
              {domainMeta?.label}
            </p>
          )}
          {renderBody()}
        </div>

        <footer className="flow-foot">
          <button
            type="button"
            className="btn"
            onClick={back}
            disabled={safeIndex === 0}
          >
            ← back
          </button>

          <div className="flow-foot-right">
            {step.kind !== "review" && (
              <span className="flow-keys">
                press <kbd>enter</kbd>
              </span>
            )}
            {step.kind === "review" ? (
              <button
                type="submit"
                className="btn btn-solid"
                data-autofocus
                disabled={missing.length > 0 || status === "submitting"}
              >
                {status === "submitting" ? "submitting..." : "submit_application"}
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-solid"
                data-autofocus={
                  step.kind === "identity" || step.kind === "intro" ? true : undefined
                }
                onClick={next}
              >
                {nextLabel}
              </button>
            )}
          </div>
        </footer>
      </section>
    </form>
  );
}
