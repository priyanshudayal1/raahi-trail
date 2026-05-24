import type { Metadata } from "next";
import TripsSection from "../components/TripsSection";

export const metadata: Metadata = {
  title: "Trips - Raahi Trail",
  description:
    "Browse curated group trips and treks across India with Raahi Trail.",
};

export default function TripsPage() {
  return (
    <div className="pt-16 md:pt-20">
      <TripsSection />
    </div>
  );
}
