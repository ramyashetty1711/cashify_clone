import React from "react";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import WhyChooseUs from "./WhyChooseUs";
import FeaturedServices from "./FeaturedServices";
import CityStores from "./CityStores";
import CTASection from "./CTASection";

function Home() {
  return (
    <div className="text-black min-h-[100vh]">
      {/* Hero / First Impression */}
      <HeroSection />

      {/* Explain the process */}
      <HowItWorks />

      {/* Build trust */}
      <WhyChooseUs />

      {/* Show what services are offered */}
      <FeaturedServices />

      {/* Display stores based on city */}
      <CityStores />

      {/* Strong Call to Action */}
      <CTASection />
    </div>
  );
}

export default Home;
