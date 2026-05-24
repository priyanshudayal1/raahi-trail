import CommunitySection from "../components/CommunitySection";
import HomeHero from "../components/HomeHero";
import HomeImageBand from "../components/HomeImageBand";
import TestimonialsSection from "../components/TestimonialsSection";
import TripsSection from "../components/TripsSection";
import UpcomingDeparturesSection from "../components/UpcomingDeparturesSection";
import WhyRaahiSection from "../components/WhyRaahiSection";

export default function Home() {
  return (
    <>
      <HomeHero />
      <TripsSection />
      <WhyRaahiSection />
      <CommunitySection />
      <UpcomingDeparturesSection />
      <TestimonialsSection />
      <HomeImageBand />
    </>
  );
}
