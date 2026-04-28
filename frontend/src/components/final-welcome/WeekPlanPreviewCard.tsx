import { Columns3 } from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/utils/cn";

const weekPlan = [
  { day: "MON", label: "Python Basics" },
  { day: "WED", label: "Stats Workshop" },
  { day: "SAT", label: "Live Lab", active: true },
];

export function WeekPlanPreviewCard() {
  return (
    <Card className="group rounded-xl border border-[#434655]/10 !bg-[#282a32] p-stack-md shadow-md transition-colors hover:border-[#ffb596]/40">
      <div className="mb-stack-md flex items-center gap-stack-sm">
        <div className="flex size-10 items-center justify-center rounded-lg bg-[#bc4800]/10 text-[#ffb596]">
          <Columns3 className="size-5" />
        </div>
        <h3 className="text-left font-h3 text-h3 text-[#e1e2ed]">Week Plan</h3>
      </div>

      <div className="space-y-unit">
        {weekPlan.map(({ active = false, day, label }, index) => (
          <div
            className={cn(
              "flex items-center justify-between p-stack-xs",
              index < weekPlan.length - 1 && "border-b border-[#434655]/20",
            )}
            key={day}
          >
            <span className="font-label-sm text-label-sm text-[#8d90a0]">
              {day}
            </span>
            <span
              className={
                active
                  ? "font-label-md text-label-md text-[#b4c5ff]"
                  : "font-label-md text-label-md text-[#e1e2ed]"
              }
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-stack-md text-left font-body-sm text-body-sm text-[#c3c6d7]">
        Your upcoming sessions and deadlines synced to your local timezone.
      </p>
    </Card>
  );
}
