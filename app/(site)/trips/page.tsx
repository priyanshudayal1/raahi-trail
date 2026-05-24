import type { Metadata } from "next";
import { getTripDestinationsFromDb, queryTripsFromDb } from "../../lib/tripsDb";
import TripsPageClient from "./TripsPageClient";

export const metadata: Metadata = {
  title: "Trips - Raahi Trail",
  description:
    "Browse curated group trips and treks across India with Raahi Trail.",
};

export default async function TripsPage() {
  const [initialResult, destinations] = await Promise.all([
    queryTripsFromDb({ page: 1, pageSize: 9 }),
    getTripDestinationsFromDb(),
  ]);

  return (
    <TripsPageClient
      destinations={destinations}
      initialResult={initialResult}
    />
  );
}
