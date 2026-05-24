import CommunitySection from "../components/CommunitySection";
import HomeHero from "../components/HomeHero";
import HomeImageBand from "../components/HomeImageBand";
import TestimonialsSection from "../components/TestimonialsSection";
import TripsSection from "../components/TripsSection";
import UpcomingDeparturesSection from "../components/UpcomingDeparturesSection";
import WhyRaahiSection from "../components/WhyRaahiSection";
import { getTripsFromDb } from "../lib/tripsDb";

export default async function Home() {
  const trips = await getTripsFromDb();

  return (
    <>
      <HomeHero />
      <TripsSection trips={trips} />
      <WhyRaahiSection />
      <CommunitySection />
      <UpcomingDeparturesSection trips={trips} />
      <TestimonialsSection />
      <HomeImageBand />
    </>
  );
}
