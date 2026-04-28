import { CalendarClock, Info } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const calendarImageUrl =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBUHwq9z9Xxgx4fowt3zrsMsjkPSZNFhEe7X6ylvoy34xOGL9r9ZApouzkDMtzI48AGfttfyXhe7DtO8Gu3FssQc9_JV0FAEaUFcbQ0-_-fbVP85K4GHYT88tuI1wGGqQkUbedbdw9AuNGSf-Fikez5-t65CiTj_fYkRHEupY8uQyeCt1wU-ueEaHjw9NO75Wr6Q6nCE_rchMd97UYUt1qArkjx1P-wFY2Ov5MKwhEPIkGUyPgc204gYLEqUkBNa4IieAcf8yngHN4";

type ScheduleSummaryCardProps = {
  selectedDaysCount: number;
  selectedHours: number | null;
};

function getIntensity(selectedHours: number | null) {
  if (!selectedHours) {
    return "Pending";
  }

  if (selectedHours <= 5) {
    return "Light";
  }

  if (selectedHours <= 10) {
    return "Moderate";
  }

  return "Intensive";
}

function getCompletionEstimate(selectedHours: number | null) {
  if (!selectedHours) {
    return "--";
  }

  if (selectedHours >= 20) {
    return "~2 Weeks";
  }

  if (selectedHours >= 15) {
    return "~3 Weeks";
  }

  if (selectedHours >= 10) {
    return "~4 Weeks";
  }

  return "~8 Weeks";
}

export function ScheduleSummaryCard({
  selectedDaysCount,
  selectedHours,
}: ScheduleSummaryCardProps) {
  return (
    <Card className="sticky top-24 overflow-hidden rounded-xl border border-[#434655] bg-[#282a32] p-gutter text-[#e1e2ed] shadow-lg">
      <div className="absolute right-0 top-0 p-4 opacity-10">
        <CalendarClock className="size-[120px]" />
      </div>

      <h4 className="mb-stack-md flex items-center gap-2 font-label-md text-label-md text-[#b4c5ff]">
        <Info className="size-4" />
        Estimated Progress
      </h4>

      <div className="relative z-10 mb-stack-lg space-y-stack-md">
        <div className="flex items-center justify-between">
          <span className="text-[#c3c6d7]">Selected Days</span>
          <span className="font-semibold text-[#e1e2ed]">
            {selectedDaysCount} {selectedDaysCount === 1 ? "Day" : "Days"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#c3c6d7]">Intensity</span>
          <Badge className="!bg-[#ac6300] !text-[#fffbff]">
            {getIntensity(selectedHours)}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[#c3c6d7]">Module Completion</span>
          <span className="font-semibold text-[#e1e2ed]">
            {getCompletionEstimate(selectedHours)}
          </span>
        </div>
      </div>

      <div className="mb-stack-md rounded-lg border border-[#434655]/30 bg-[#32343d]/50 p-stack-md">
        <p className="text-label-sm leading-relaxed text-[#c3c6d7] italic">
          "A 10-hour weekly commitment ensures a 92% higher completion rate
          among UniHub students."
        </p>
      </div>

      <div className="h-32 w-full overflow-hidden rounded-lg border border-[#434655]">
        <img
          alt="Weekly calendar visualization"
          className="size-full object-cover"
          src={calendarImageUrl}
        />
      </div>
    </Card>
  );
}
