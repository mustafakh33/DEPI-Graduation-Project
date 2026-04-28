import { Navigate, Outlet } from "react-router";

import { useOnboarding } from "@/store/onboarding/OnboardingContext";

type OnboardingStep =
  | "signup"
  | "track"
  | "schedule"
  | "intro"
  | "test"
  | "result"
  | "complete"
  | "dashboard";

type OnboardingRouteGuardProps = {
  step: OnboardingStep;
};

function getRedirectPath(step: OnboardingStep, state: ReturnType<typeof useOnboarding>) {
  if (step === "signup") {
    return null;
  }

  if (!state.user) {
    return "/signup";
  }

  if (step === "track") {
    return null;
  }

  if (!state.selectedTrack) {
    return "/track-selection";
  }

  if (step === "schedule") {
    return null;
  }

  if (!state.schedule) {
    return "/schedule";
  }

  if (step === "intro") {
    return null;
  }

  if (step === "test" && state.testQuestions.length === 0) {
    return "/placement-intro";
  }

  if (step === "test") {
    return null;
  }

  if (!state.result) {
    return state.testQuestions.length > 0 ? "/placement-test" : "/placement-intro";
  }

  if (step === "result" || step === "complete") {
    return null;
  }

  if (step === "dashboard" && !state.completed) {
    return "/onboarding-complete";
  }

  return null;
}

export function OnboardingRouteGuard({ step }: OnboardingRouteGuardProps) {
  const onboarding = useOnboarding();
  const redirectPath = getRedirectPath(step, onboarding);

  if (redirectPath) {
    return <Navigate replace to={redirectPath} />;
  }

  return <Outlet />;
}
