import { Card } from "@/components/ui/card";
import type {
  ScheduleState,
  SelectedTrack,
  TestResultState,
} from "@/store/onboarding/OnboardingContext";

type SummaryTableProps = {
  result: TestResultState;
  schedule: ScheduleState;
  selectedTrack: SelectedTrack;
};

export function SummaryTable({
  result,
  schedule,
  selectedTrack,
}: SummaryTableProps) {
  const summary = [
    { label: "TRACK", value: selectedTrack.title },
    { label: "LEVEL", value: result.level },
    { label: "SCHEDULE", value: `${schedule.days.length} days / ${schedule.preferredTime}` },
    { label: "GOAL", value: `${schedule.weeklyCommitment} hrs/week` },
    { label: "BATCH", value: "Winter 2024", highlight: true },
  ];

  return (
    <Card className="w-full overflow-hidden rounded-xl border border-[#434655]/30 !bg-[#1d1f27] shadow-lg">
      <div className="grid grid-cols-2 divide-x divide-[#434655]/30 md:grid-cols-5">
        {summary.map(({ highlight = false, label, value }) => (
          <div
            className="col-span-2 flex flex-col items-center border-t border-[#434655]/30 p-stack-md md:col-span-1 md:border-t-0"
            key={label}
          >
            <span className="mb-stack-xs font-label-sm text-label-sm text-[#8d90a0]">
              {label}
            </span>
            <span
              className={
                highlight
                  ? "font-body-md text-body-md text-[#ffb873]"
                  : "font-body-md text-body-md text-[#e1e2ed]"
              }
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
