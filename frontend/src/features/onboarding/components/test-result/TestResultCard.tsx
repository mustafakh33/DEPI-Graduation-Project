import { BatchAssignmentNote } from "@/features/onboarding/components/test-result/BatchAssignmentNote";
import { ProfileSummaryGrid } from "@/features/onboarding/components/test-result/ProfileSummaryGrid";
import { ResultHero } from "@/features/onboarding/components/test-result/ResultHero";
import { ScoreSection } from "@/features/onboarding/components/test-result/ScoreSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import type {
  ScheduleState,
  SelectedTrack,
  TestResultState,
} from "@/features/onboarding/context/OnboardingContext";

type TestResultCardProps = {
  onContinue: () => void;
  result: TestResultState;
  schedule: ScheduleState;
  selectedTrack: SelectedTrack;
};

export function TestResultCard({
  onContinue,
  result,
  schedule,
  selectedTrack,
}: TestResultCardProps) {
  return (
    <Card className="overflow-hidden rounded-xl border border-[#434655]/30 !bg-[#282a32] !text-[#e1e2ed] shadow-xl backdrop-blur-sm">
      <ResultHero />

      <div className="flex flex-col items-center px-gutter pb-stack-lg pt-stack-sm">
        <div className="mb-stack-md text-center">
          <span className="mb-stack-sm inline-block rounded-full bg-[#b4c5ff]/20 px-3 py-1 font-label-sm text-label-sm uppercase tracking-wider text-[#b4c5ff]">
            Placement Result
          </span>
          <h1 className="mb-stack-xs font-h2 text-h2 text-[#ffffff]">
            {result.level}
          </h1>
          <p className="font-body-md text-body-md text-[#c3c6d7] italic">
            "You Know Your Basics"
          </p>
        </div>

        <ScoreSection score={result.score} total={result.total} />
        <ProfileSummaryGrid
          commitment={schedule.weeklyCommitment}
          level={result.level}
          scheduleDays={schedule.days}
          track={selectedTrack.title}
        />
        <BatchAssignmentNote />

        <Button
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg !bg-[#2563eb] font-label-md text-label-md !text-white shadow-sm transition-all hover:brightness-110 active:scale-[0.98]"
          onClick={onContinue}
        >
          Continue
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </Card>
  );
}
