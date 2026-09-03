import type { Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About Us · Layer8 — PES University, ECC",
  description:
    "Who Layer8 is — the student-run cybersecurity club at PES University, Electronic City Campus — and the core team behind it.",
};

export default function AboutPage() {
  return <AboutClient />;
}
