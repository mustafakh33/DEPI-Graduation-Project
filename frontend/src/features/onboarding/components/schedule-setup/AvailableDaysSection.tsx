import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScheduleSection } from "@/components/schedule-setup/ScheduleSection";
import { cn } from "@/utils/cn";

type AvailableDaysSectionProps = {
  selectedDays: string[];
  onToggleDay: (day: string) => void;
};

const days = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
];

export function AvailableDaysSection({
  selectedDays,
  onToggleDay,
}: AvailableDaysSectionProps) {
  return (
    <ScheduleSection
      icon={CalendarDays}
      label="Which days can you study?"
      title="Available Days"
    >
      <div className="flex flex-wrap gap-stack-md">
        {days.map((day) => {
          const isSelected = selectedDays.includes(day);

          return (
            <Button
              aria-pressed={isSelected}
              className={cn(
                "rounded-full border px-gutter py-stack-md font-label-md transition-all active:scale-95",
                isSelected
                  ? "border-[#2563eb] bg-[#2563eb]/10 text-[#b4c5ff]"
                  : "border-[#434655] bg-transparent text-[#c3c6d7] hover:bg-[#282a32]",
              )}
              key={day}
              onClick={() => onToggleDay(day)}
              type="button"
              variant="ghost"
            >
              {day}
            </Button>
          );
        })}
      </div>
    </ScheduleSection>
  );
}
