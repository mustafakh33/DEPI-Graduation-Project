import type { LucideIcon } from "lucide-react";
import { Bolt, CalendarDays, Code2, TrendingUp } from "lucide-react";

type SummaryItem = {
  icon: LucideIcon;
  label: string;
  value: string;
};

type ProfileSummaryGridProps = {
  commitment: number;
  level: string;
  scheduleDays: string[];
  track: string;
};

export function ProfileSummaryGrid({
  commitment,
  level,
  scheduleDays,
  track,
}: ProfileSummaryGridProps) {
  const summaryItems: SummaryItem[] = [
    { icon: Code2, label: "Track", value: track },
    { icon: TrendingUp, label: "Level", value: level },
    { icon: CalendarDays, label: "Schedule", value: scheduleDays.join(" & ") },
    { icon: Bolt, label: "Goal", value: `${commitment} hrs/wk` },
  ];

  return (
    <div className="mb-stack-lg grid w-full grid-cols-2 gap-stack-sm">
      {summaryItems.map(({ icon: Icon, label, value }) => (
        <div className="flex flex-col rounded-lg bg-[#1d1f27] p-stack-sm" key={label}>
          <span className="mb-1 font-label-sm text-label-sm uppercase text-[#c3c6d7]">
            {label}
          </span>
          <div className="flex items-center gap-2">
            <Icon className="size-4 text-[#b4c5ff]" />
            <span className="font-body-md text-body-md text-[#e1e2ed]">
              {value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
