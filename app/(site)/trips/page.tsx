import type { Metadata } from "next";
import { getTripDestinationsFromDb, queryTripsFromDb } from "../../lib/tripsDb";
import TripsPageClient from "./TripsPageClient";

export const metadata: Metadata = {
  title: "Group Trips & Treks in India",
  description:
    "Browse curated group trips, treks and backpacking experiences across India. Filter by destination, budget and duration with Raahi Trail.",
  alternates: {
    canonical: "/trips",
  },
  openGraph: {
    title: "Group Trips & Treks in India | Raahi Trail",
    description:
      "Browse curated group trips, treks and backpacking experiences across India.",
    url: "/trips",
  },
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
