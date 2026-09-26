import type { Metadata } from "next";
import RecruitmentsClosedClient from "./recruitments-closed-client";

export const metadata: Metadata = {
  title: "Recruitments · Layer8 — PES University, ECC",
  description:
    "Layer8 recruitment — applications aren't open right now. Check back soon.",
};

// Applications are temporarily closed on the official site. The real
// form (./recruitments-client.tsx) and its API routes are untouched —
// swap the import above back to re-enable.
export default function RecruitmentsPage() {
  return <RecruitmentsClosedClient />;
}
