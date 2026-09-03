import type { Metadata } from "next";
import CoreClient from "./core-client";

export const metadata: Metadata = {
  title: "Core · Layer8 — PES University, ECC",
  description:
    "The Layer8 core team — club head and vice-head, plus a head and vice-head for each of the Tech, Events, Media and Design domains.",
};

export default function CorePage() {
  return <CoreClient />;
}
