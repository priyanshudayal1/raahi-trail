import type { Metadata } from "next";
import { getTripsFromDb } from "../../lib/tripsDb";
import TripsPageClient from "./TripsPageClient";

export const metadata: Metadata = {
  title: "Trips - Raahi Trail",
  description:
    "Browse curated group trips and treks across India with Raahi Trail.",
};

export default async function TripsPage() {
  const trips = await getTripsFromDb();

  return <TripsPageClient trips={trips} />;
}
