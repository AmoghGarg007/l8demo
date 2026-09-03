import type { Metadata } from "next";
import SandboxClient from "./sandbox-client";

export const metadata: Metadata = {
  title: "Sandbox · Layer8 — PES University, ECC",
  description:
    "The Layer8 sandbox — experiments, half-built tools and challenge infrastructure. Coming soon.",
};

export default function SandboxPage() {
  return <SandboxClient />;
}
