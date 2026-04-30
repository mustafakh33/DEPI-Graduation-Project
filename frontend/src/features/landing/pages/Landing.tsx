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
    <div className="bg-[#09090b] text-gray-200 selection:bg-blue-500/30 selection:text-white w-full min-h-screen font-sans antialiased overflow-x-hidden">
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
