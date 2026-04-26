import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

export function StatCard({
  label,
  value,
  detail,
  icon,
  accent = "blue",
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: ReactNode;
  accent?: "blue" | "emerald" | "amber" | "violet";
}) {
  const accents = {
    blue: "bg-primary/15 text-primary",
    emerald: "bg-emerald-500/15 text-emerald-300",
    amber: "bg-amber-500/15 text-amber-300",
    violet: "bg-violet-500/15 text-violet-300",
  };

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-white">{value}</p>
          <p className="mt-2 text-xs text-muted-foreground">{detail}</p>
        </div>
        <div className={`rounded-lg p-3 ${accents[accent]}`}>{icon}</div>
      </div>
    </Card>
  );
}
