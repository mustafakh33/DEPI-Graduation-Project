import type { LucideIcon } from "lucide-react";
import { ListOrdered, Timer } from "lucide-react";

import { GlassCard } from "@/features/onboarding/components/test-intro/GlassCard";
import { cn } from "@/utils/cn";

type StatItem = {
  icon: LucideIcon;
  iconBox: string;
  iconColor: string;
  label: string;
  value: string;
};

const stats: StatItem[] = [
  {
    icon: ListOrdered,
    iconBox: "bg-[#2563eb]/20",
    iconColor: "text-[#2563eb]",
    label: "Content",
    value: "20 Questions",
  },
  {
    icon: Timer,
    iconBox: "bg-[#ac6300]/20",
    iconColor: "text-[#ffb873]",
    label: "Duration",
    value: "30 Mins",
  },
  {
    icon: CircleAlert,
    iconBox: "bg-[#93000a]/20",
    iconColor: "text-[#ffb4ab]",
    label: "Constraints",
    value: "One Attempt",
  },
];

export function QuickStats() {
  return (
    <div className="col-span-12 space-y-4 lg:col-span-4">
      {stats.map(({ icon: Icon, iconBox, iconColor, label, value }) => (
        <GlassCard className="flex items-center gap-4 rounded-xl p-stack-md" key={label}>
          <div className={cn("flex size-12 items-center justify-center rounded-lg", iconBox)}>
            <Icon className={cn("size-6", iconColor)} />
          </div>
          <div>
            <p className="font-label-sm text-label-sm uppercase text-[#8d90a0]">
              {label}
            </p>
            <h3 className="font-h3 text-h3 text-[#e1e2ed]">{value}</h3>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
