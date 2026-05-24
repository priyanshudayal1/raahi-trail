import type { Metadata } from "next";
import TripsPageClient from "./TripsPageClient";

export const metadata: Metadata = {
  title: "Trips - Raahi Trail",
  description:
    "Browse curated group trips and treks across India with Raahi Trail.",
};

export default function TripsPage() {
  return <TripsPageClient />;
}
