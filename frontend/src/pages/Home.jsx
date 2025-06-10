import React from "react";

import HeroSection from "../components/HeroSection/HeroSection";
import BrandSection from "../components/BrandSection/BrandSection";
import FeaturedProductsSection from "../components/FeaturedProductsSection/FeaturedProductsSection";
import AboutSection from "../components/AboutSection/AboutSection";
import SupportSection from "../components/SupportSection/SupportSection";
import NewsletterSection from "../components/NewsletterSection/NewsletterSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <BrandSection />
      <FeaturedProductsSection />
      <AboutSection />
      <SupportSection />
      <NewsletterSection />
    </div>
  );
};

export default Home;
