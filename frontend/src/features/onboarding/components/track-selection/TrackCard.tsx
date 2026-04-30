import type { LucideIcon } from "lucide-react";
import { Check, CheckCircle2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/utils/cn";

type TrackCardProps = {
  accent: "primary" | "tertiary" | "error";
  description: string;
  duration: string;
  icon: LucideIcon;
  isNew?: boolean;
  isSelected: boolean;
  modules: string;
  onSelect: () => void;
  title: string;
};

const accentClasses = {
  primary: {
    glow: "group-hover:bg-[#b4c5ff]/5",
    hoverBorder: "hover:!border-[#b4c5ff]/50",
    icon: "bg-[#2563eb]/20 text-[#b4c5ff]",
    selectedBorder: "!border-[#b4c5ff]",
    selectedRing: "ring-[#b4c5ff]/20",
  },
  tertiary: {
    glow: "group-hover:bg-[#ffb596]/5",
    hoverBorder: "hover:!border-[#ffb596]/50",
    icon: "bg-[#bc4800]/20 text-[#ffb596]",
    selectedBorder: "!border-[#ffb596]",
    selectedRing: "ring-[#ffb596]/20",
  },
  error: {
    glow: "group-hover:bg-[#93000a]/5",
    hoverBorder: "hover:!border-[#ffb4ab]/50",
    icon: "bg-[#93000a]/20 text-[#ffb4ab]",
    selectedBorder: "!border-[#ffb4ab]",
    selectedRing: "ring-[#ffb4ab]/20",
  },
} satisfies Record<TrackCardProps["accent"], Record<string, string>>;

export function TrackCard({
  accent,
  description,
  duration,
  icon: Icon,
  isNew = false,
  isSelected,
  modules,
  onSelect,
  title,
}: TrackCardProps) {
  const styles = accentClasses[accent];

  return (
    <Card
      aria-pressed={isSelected}
      className={cn(
        "group relative cursor-pointer rounded-xl border-outline-variant bg-surface-container p-stack-md shadow-none transition-all",
        "!border-[#434655] !bg-[#1d1f27] !text-[#e1e2ed]",
        styles.hoverBorder,
        isSelected && styles.selectedBorder,
        isSelected && "ring-4",
        isSelected && styles.selectedRing,
      )}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          styles.glow,
          isSelected && "opacity-100",
        )}
      />

      <div className="relative">
        <div className="mb-stack-md flex items-start justify-between gap-stack-md">
          <div className={cn("rounded-lg p-3", styles.icon)}>
            <Icon className="size-8" />
          </div>
          <div className="flex flex-wrap justify-end gap-stack-sm">
            {isNew && (
              <Badge className="!bg-[#2563eb] !text-[#eeefff]">
                New Track
              </Badge>
            )}
            <Badge className="!bg-[#ac6300] !text-[#fffbff]">
              {duration}
            </Badge>
          </div>
        </div>

        <div className="mb-stack-xs flex items-center justify-between gap-stack-md">
          <h3 className="font-h3 text-h3 text-[#e1e2ed]">{title}</h3>
          <span
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-full border border-[#434655] text-transparent transition-colors",
              isSelected && "border-[#2563eb] bg-[#2563eb] text-[#eeefff]",
            )}
          >
            <Check className="size-4" />
          </span>
        </div>

        <p className="mb-stack-md font-body-sm text-body-sm text-[#c3c6d7]">
          {description}
        </p>

        <div className="flex items-start gap-unit font-label-md text-label-md text-[#c3c6d7]">
          <CheckCircle2 className="mt-0.5 size-[18px] shrink-0" />
          <span>{modules}</span>
        </div>
      </div>
    </Card>
  );
}
