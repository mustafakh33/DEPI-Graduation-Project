import { useNavigate } from "react-router";

import { BeforeStartRules } from "@/components/test-intro/BeforeStartRules";
import { PlacementPreview } from "@/components/test-intro/PlacementPreview";
import { QuickStats } from "@/components/test-intro/QuickStats";
import { TestIntroFooter } from "@/components/test-intro/TestIntroFooter";
import { TestIntroHeader } from "@/components/test-intro/TestIntroHeader";
import { TestIntroNavbar } from "@/components/test-intro/TestIntroNavbar";
import { TestStructure } from "@/components/test-intro/TestStructure";
import { useOnboarding } from "@/store/onboarding/OnboardingContext";

export default function TestIntro() {
  const navigate = useNavigate();
  const { startPlacementTest } = useOnboarding();

  const handleStart = () => {
    startPlacementTest();
    navigate("/placement-test", { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#11131b] font-body-md text-[#e1e2ed]">
      <TestIntroNavbar />

      <main className="mx-auto min-h-screen max-w-container-max px-gutter pb-32 pt-24">
        <TestIntroHeader />

        <div className="grid grid-cols-12 gap-gutter">
          <QuickStats />
          <TestStructure />
          <BeforeStartRules />
          <PlacementPreview />
        </div>
      </main>

      <TestIntroFooter onStart={handleStart} />
    </div>
  );
}
