import React, { useEffect } from "react";
import TopNavBar from "@/components/organisms/Landing/TopNavBar";
import HeroSection from "@/components/organisms/Landing/HeroSection";
import StatsBar from "@/components/organisms/Landing/StatsBar";
import ProblemSolution from "@/components/organisms/Landing/ProblemSolution";
import HowItWorks from "@/components/organisms/Landing/HowItWorks";
import CoreFeatures from "@/components/organisms/Landing/CoreFeatures";
import LearningTracks from "@/components/organisms/Landing/LearningTracks";
import Testimonials from "@/components/organisms/Landing/Testimonials";
import Pricing from "@/components/organisms/Landing/Pricing";
import FinalCTA from "@/components/organisms/Landing/FinalCTA";
import LandingFooter from "@/components/organisms/Landing/LandingFooter";

const Landing: React.FC = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container w-full min-h-screen font-body-sm">
      <TopNavBar />
      <HeroSection />
      <StatsBar />
      <ProblemSolution />
      <HowItWorks />
      <CoreFeatures />
      <LearningTracks />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <LandingFooter />
    </div>
  );
};

export default Landing;
