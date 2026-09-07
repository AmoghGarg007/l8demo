import type { Metadata } from "next";
import RecruitmentsClient from "./recruitments-client";

export const metadata: Metadata = {
  title: "Recruitments · Layer8 — PES University, ECC",
  description: "Layer8 recruitments — applications and timeline, opening soon.",
};

export default function RecruitmentsPage() {
  return <RecruitmentsClient />;
}
