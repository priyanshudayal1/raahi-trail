import CommunitySection from "../components/CommunitySection";
import HomeHero from "../components/HomeHero";
import HomeImageBand from "../components/HomeImageBand";
import TestimonialsSection from "../components/TestimonialsSection";
import TripsSection from "../components/TripsSection";
import UpcomingDeparturesSection from "../components/UpcomingDeparturesSection";
import WhyRaahiSection from "../components/WhyRaahiSection";
import { queryTripsFromDb } from "../lib/tripsDb";

export default async function Home() {
  const { trips } = await queryTripsFromDb({ page: 1, pageSize: 6 });

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
