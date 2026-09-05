"use client";

import { useEffect } from "react";

/**
 * A template re-mounts on every navigation (unlike layout), so this wrapper's
 * enter animation replays each time the route changes — a lightweight page
 * transition. Motion is disabled under prefers-reduced-motion via globals.css.
 *
 * The mount-time effect also resets scroll to the top of the new page, so
 * switching sections (nav tabs, the terminal's `cd`, etc.) always lands you
 * at the top instead of carrying over the previous page's scroll position.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div className="route-transition flex flex-1 flex-col">{children}</div>;
}
