import type { Metadata } from "next";
import WeeklyCtfsClient from "./weekly-ctfs-client";

export const metadata: Metadata = {
  title: "Weekly CTFs · Layer8 — PES University, ECC",
  description:
    "Layer8's weekly CTF schedule and scoreboard — coming soon.",
};

export default function WeeklyCtfsPage() {
  return <WeeklyCtfsClient />;
}
