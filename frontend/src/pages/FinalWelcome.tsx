import { Navigate, useNavigate } from "react-router";
import { FeaturePreviewGrid } from "@/components/final-welcome/FeaturePreviewGrid";
import { FinalWelcomeFooter } from "@/components/final-welcome/FinalWelcomeFooter";
import { FinalWelcomeHero } from "@/components/final-welcome/FinalWelcomeHero";
import { SummaryTable } from "@/components/final-welcome/SummaryTable";
import { useOnboarding } from "@/store/onboarding/OnboardingContext";
import { useAuth } from "@/hooks/useAuth";

export default function FinalWelcome() {
  const navigate = useNavigate();
  const { completeOnboarding, result, schedule, selectedTrack, user } =
    useOnboarding();

  const { login } = useAuth();

  if (!user || !selectedTrack || !schedule || !result) {
    return <Navigate replace to="/signup" />;
  }

  const handleGoToDashboard = () => {
    completeOnboarding();
    // Assign student role in global auth state
    login("student");
    navigate("/student/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#11131b] p-margin font-body-md text-[#e1e2ed] selection:bg-primary-container selection:text-on-primary-container">
      <main className="flex w-full max-w-container-max flex-col items-center space-y-stack-lg text-center">
        <FinalWelcomeHero name={user.name.split(" ")[0] || user.name} />
        <SummaryTable
          result={result}
          schedule={schedule}
          selectedTrack={selectedTrack}
        />
        <FeaturePreviewGrid />
        <FinalWelcomeFooter onGoToDashboard={handleGoToDashboard} />
      </main>
    </div>
  );
}
