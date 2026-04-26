import { Card } from "@/components/ui/card";
import { ReactNode } from "react";

export function StatCard({
  label,
  value,
  detail,
  icon,
}: {
  label: string;
  value: string | number;
  detail: string;
  icon: ReactNode;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
          <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
        </div>
        <div className="rounded-2xl bg-secondary p-3 text-primary">{icon}</div>
      </div>
    </Card>
  );
}
