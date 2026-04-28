import React, { useEffect } from "react";
import TopNavBar from "@/features/landing/components/TopNavBar";
import HeroSection from "@/features/landing/components/HeroSection";
import StatsBar from "@/features/landing/components/StatsBar";
import ProblemSolution from "@/features/landing/components/ProblemSolution";
import HowItWorks from "@/features/landing/components/HowItWorks";
import CoreFeatures from "@/features/landing/components/CoreFeatures";
import LearningTracks from "@/features/landing/components/LearningTracks";
import Testimonials from "@/features/landing/components/Testimonials";
import Pricing from "@/features/landing/components/Pricing";
import FinalCTA from "@/features/landing/components/FinalCTA";
import LandingFooter from "@/features/landing/components/LandingFooter";

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
