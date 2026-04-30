import type { ComponentProps } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/utils/cn";

type GlassCardProps = ComponentProps<typeof Card>;

export function GlassCard({ className, ...props }: GlassCardProps) {
  return (
    <Card
      className={cn(
        "border border-white/5 bg-[rgba(31,41,55,0.6)] text-[#e1e2ed] shadow-none backdrop-blur-md",
        className,
      )}
      {...props}
    />
  );
}
