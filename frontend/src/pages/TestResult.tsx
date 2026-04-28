import { Navigate, useNavigate } from "react-router";

import { TestResultCard } from "@/components/test-result/TestResultCard";
import { useOnboarding } from "@/store/onboarding/OnboardingContext";

export default function TestResult() {
  const navigate = useNavigate();
  const { result, schedule, selectedTrack } = useOnboarding();

  if (!result || !schedule || !selectedTrack) {
    return <Navigate replace to="/placement-intro" />;
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-[#11131b] py-stack-lg font-body-md text-[#e1e2ed]">
      <main className="relative z-10 w-full max-w-[560px] px-margin">
        <TestResultCard
          onContinue={() => navigate("/onboarding-complete")}
          result={result}
          schedule={schedule}
          selectedTrack={selectedTrack}
        />

        <p className="mt-stack-lg text-center font-body-sm text-body-sm text-[#c3c6d7]">
          Not happy with your score?{" "}
          <a className="text-[#b4c5ff] hover:underline" href="#">
            Retake in 30 days
          </a>
        </p>
      </main>
    </div>
  );
}
