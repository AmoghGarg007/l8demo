import type { Metadata } from "next";
import EventsClient from "./events-client";

export const metadata: Metadata = {
  title: "Events · Layer8 — PES University, ECC",
  description:
    "Layer8 events — CTFs, workshops and seminars, live and archived, with venue, prerequisites and how to take part.",
};

export default function EventsPage() {
  return <EventsClient />;
}
