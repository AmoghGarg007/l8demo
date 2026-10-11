import type { Metadata } from "next";
import { loadCtfDashboard } from "../../lib/ctf";
import { WeeklyCtfsLanding } from "./_components/weekly-ctfs-landing";
import { WeeklyCtfsDashboard } from "./weekly-ctfs-client";

export const metadata: Metadata = {
  title: "Weekly CTFs · Layer8 — PES University, ECC",
  description:
    "Layer8 weekly CTF challenges — compete, solve, and climb the leaderboard. New challenges every week.",
};

export default async function WeeklyCtfsPage() {
  const data = await loadCtfDashboard();

  if (!data.viewer) {
    return <WeeklyCtfsLanding />;
  }

  return <WeeklyCtfsDashboard data={data} />;
}
