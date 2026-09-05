import type { Metadata } from "next";
import ResourcesClient from "./resources-client";

export const metadata: Metadata = {
  title: "Resources · Layer8 — PES University, ECC",
  description:
    "Curated practice platforms, tooling and reading for Layer8 members — the cybersecurity club at PES University, Electronic City Campus.",
};

export default function ResourcesPage() {
  return <ResourcesClient />;
}
