import type { Metadata } from "next";
import RecruitmentsClient from "./recruitments-client";

export const metadata: Metadata = {
  title: "Recruitments · Layer8 — PES University, ECC",
  description:
    "Apply to join Layer8 — one application, five domains. Log in with your PESU Academy credentials to get started.",
};

export default function RecruitmentsPage() {
  return <RecruitmentsClient />;
}
