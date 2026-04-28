import { Gauge, TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScheduleSection } from "@/components/schedule-setup/ScheduleSection";
import { cn } from "@/utils/cn";

type WeeklyCommitmentSectionProps = {
  selectedHours: number | null;
  onSelectHours: (hours: number) => void;
};

const hourOptions = [5, 10, 15, 20];

export function WeeklyCommitmentSection({
  selectedHours,
  onSelectHours,
}: WeeklyCommitmentSectionProps) {
  return (
    <ScheduleSection
      icon={Gauge}
      label="I commit to studying at least ___ hours per week."
      title="Weekly Commitment"
    >
      <div className="grid grid-cols-2 gap-stack-md md:grid-cols-4">
        {hourOptions.map((hours) => {
          const isSelected = selectedHours === hours;

          return (
            <Button
              aria-pressed={isSelected}
              className={cn(
                "group flex h-auto flex-col items-center gap-2 rounded-lg p-stack-md transition-all",
                isSelected
                  ? "border-2 border-[#2563eb] bg-[#2563eb]/10"
                  : "border border-[#434655] bg-transparent hover:border-[#2563eb] hover:bg-[#2563eb]/5",
              )}
              key={hours}
              onClick={() => onSelectHours(hours)}
              type="button"
              variant="ghost"
            >
              <span
                className={cn(
                  "font-h2 text-h2",
                  isSelected
                    ? "text-[#b4c5ff]"
                    : "text-[#e1e2ed] group-hover:text-[#b4c5ff]",
                )}
              >
                {hours}
              </span>
              <span
                className={cn(
                  "font-label-sm text-label-sm uppercase tracking-wider",
                  isSelected ? "text-[#b4c5ff]" : "text-[#c3c6d7]",
                )}
              >
                hrs
              </span>
            </Button>
          );
        })}
      </div>

      <div className="mt-stack-md flex items-start gap-stack-sm rounded-lg border border-[#434655]/30 bg-[#32343d]/50 p-stack-md text-[#c3c6d7]">
        <TriangleAlert className="mt-0.5 size-4 shrink-0 text-[#ffb873]" />
        <p className="font-body-sm text-body-sm">
          This is your weekly goal. You'll receive alerts if you fall below your
          commitment.
        </p>
      </div>
    </ScheduleSection>
  );
}
