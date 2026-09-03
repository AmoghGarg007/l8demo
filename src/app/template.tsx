"use client";

/**
 * A template re-mounts on every navigation (unlike layout), so this wrapper's
 * enter animation replays each time the route changes — a lightweight page
 * transition. Motion is disabled under prefers-reduced-motion via globals.css.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-transition flex flex-1 flex-col">{children}</div>;
}
