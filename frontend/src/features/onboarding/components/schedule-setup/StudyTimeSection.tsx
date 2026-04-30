import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Clock, Moon, Sun, Sunrise, Sunset } from "lucide-react";

import { ScheduleSection } from "@/components/schedule-setup/ScheduleSection";
import { cn } from "@/utils/cn";

type StudyTime = {
  icon: LucideIcon;
  id: string;
  label: string;
  range: string;
};

type StudyTimeSectionProps = {
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
};

const studyTimes: StudyTime[] = [
  { id: "morning", label: "Morning", range: "8am to 12pm", icon: Sunrise },
  { id: "afternoon", label: "Afternoon", range: "12pm to 5pm", icon: Sun },
  { id: "evening", label: "Evening", range: "5pm to 10pm", icon: Sunset },
  { id: "night", label: "Night", range: "10pm to 2am", icon: Moon },
];

export function StudyTimeSection({
  selectedTime,
  onSelectTime,
}: StudyTimeSectionProps) {
  return (
    <ScheduleSection
      icon={Clock}
      label="What time of day works best for you?"
      title="Preferred Study Time"
    >
      <div className="grid grid-cols-1 gap-stack-md sm:grid-cols-2 md:grid-cols-4">
        {studyTimes.map(({ icon: Icon, id, label, range }) => {
          const isSelected = selectedTime === id;

          return (
            <button
              aria-pressed={isSelected}
              className={cn(
                "relative flex cursor-pointer flex-col items-center rounded-lg p-stack-md text-center transition-all",
                isSelected
                  ? "border-2 border-[#2563eb] bg-[#2563eb]/5 hover:bg-[#2563eb]/10"
                  : "border border-[#434655] bg-[#191b23] hover:bg-[#282a32]",
              )}
              key={id}
              onClick={() => onSelectTime(id)}
              type="button"
            >
              <Icon
                className={cn(
                  "mb-stack-xs size-8",
                  isSelected ? "text-[#2563eb]" : "text-[#c3c6d7]",
                )}
              />
              <span
                className={cn(
                  "font-label-md",
                  isSelected ? "text-[#b4c5ff]" : "text-[#e1e2ed]",
                )}
              >
                {label}
              </span>
              <span className="text-label-sm text-[#c3c6d7] opacity-70">
                {range}
              </span>
              {isSelected && (
                <CheckCircle2 className="absolute right-2 top-2 size-4 fill-[#b4c5ff] text-[#b4c5ff]" />
              )}
            </button>
          );
        })}
      </div>
    </ScheduleSection>
  );
}
