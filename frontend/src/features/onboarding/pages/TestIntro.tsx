import { useNavigate } from "react-router";
import {
  Brain,
  Clock,
  ShieldAlert,
  Target,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

import OnboardingLayout from "@/layouts/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/features/onboarding/context/OnboardingContext";

export default function TestIntro() {
  const navigate = useNavigate();
  const { startPlacementTest } = useOnboarding();

  const handleStart = () => {
    startPlacementTest();
    navigate("/placement-test", { replace: true });
  };

  return (
    <OnboardingLayout
      currentStep={3}
      totalSteps={6}
      title="Placement Test"
      subtitle="Let's find the right starting point for you. This helps us personalize your curriculum."
    >
      <div className="w-full max-w-3xl mx-auto space-y-8">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-black/40 border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6" />
            </div>
            <div className="text-xl font-bold text-white mb-1">15 Mins</div>
            <div className="text-sm text-gray-500">Estimated time</div>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Brain className="w-6 h-6" />
            </div>
            <div className="text-xl font-bold text-white mb-1">
              20 Questions
            </div>
            <div className="text-sm text-gray-500">Multiple choice</div>
          </div>

          <div className="bg-black/40 border border-white/10 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6" />
            </div>
            <div className="text-xl font-bold text-white mb-1">Adaptive</div>
            <div className="text-sm text-gray-500">Adjusts to your level</div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 flex gap-4">
          <ShieldAlert className="w-6 h-6 text-blue-400 shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Before you begin
            </h3>
            <ul className="space-y-2 text-blue-100/70 text-sm">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <span>Find a quiet place where you won't be interrupted.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <span>You cannot pause the test once it begins.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                <span>
                  Don't use external resources. We want to know your true
                  baseline.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-between items-center w-full max-w-3xl mx-auto border-t border-white/10 pt-6">
        <Button
          onClick={() => navigate("/schedule")}
          variant="ghost"
          className="text-gray-400 hover:text-white hover:bg-white/5 rounded-xl h-12 px-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Button
          onClick={handleStart}
          className="bg-white text-black hover:bg-gray-200 h-12 px-8 rounded-xl font-semibold group transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Start Test
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </OnboardingLayout>
  );
}
