import type { Metadata } from "next";
import DomainsClient from "./domains-client";

export const metadata: Metadata = {
  title: "Domains · Layer8 — PES University, ECC",
  description:
    "The eight security domains Layer8 works across — web, pwn, reversing, crypto, forensics, steganography, OSINT and network — with tools and a learning path for each.",
};

export default function DomainsPage() {
  return <DomainsClient />;
}
