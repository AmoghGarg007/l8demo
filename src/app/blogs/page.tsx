import type { Metadata } from "next";
import BlogsClient from "./blogs-client";

export const metadata: Metadata = {
  title: "Blogs · Layer8 — PES University, ECC",
  description:
    "Writeups, research notes and post-mortems from Layer8 members — the cybersecurity club at PES University, Electronic City Campus.",
};

export default function BlogsPage() {
  return <BlogsClient />;
}
