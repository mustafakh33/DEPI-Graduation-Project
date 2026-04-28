import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { Card } from "@/components/ui/card";

type ScheduleSectionProps = {
  children: ReactNode;
  icon: LucideIcon;
  label: string;
  title: string;
};

export function ScheduleSection({
  children,
  icon: Icon,
  label,
  title,
}: ScheduleSectionProps) {
  return (
    <Card className="rounded-xl border border-[#434655]/30 bg-[#1d1f27] p-gutter text-[#e1e2ed] shadow-md">
      <div className="mb-stack-md flex items-center gap-stack-sm">
        <Icon className="size-6 text-[#b4c5ff]" />
        <div>
          <h3 className="font-h3 text-h3 text-[#e1e2ed]">{title}</h3>
          <p className="mt-1 font-body-sm text-body-sm text-[#c3c6d7]">
            {label}
          </p>
        </div>
      </div>
      {children}
    </Card>
  );
}
