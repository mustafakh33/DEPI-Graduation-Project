import { AlertTriangle, TrendingUp } from "lucide-react";
import type { CSSProperties } from "react";
import type { StudentKpi } from "../../types/students.types";

interface Props {
  kpis: StudentKpi[];
}

function ProgressRing({
  value,
  variant,
}: {
  value: number;
  variant: "blue" | "red";
}) {
  return (
    <div
      className={`kpi-ring kpi-ring--${variant}`}
      style={{ "--progress": value } as CSSProperties}
      role="img"
      aria-label={`${value} percent`}
    >
      <span>{value}%</span>
    </div>
  );
}

export default function StudentKpiCards({ kpis }: Props) {
  return (
    <div className="student-kpi-grid">
      {kpis.map((kpi) => (
        <article key={kpi.label} className="student-kpi-card">
          <p className="kpi-label">{kpi.label}</p>
          <ProgressRing value={kpi.value} variant={kpi.variant} />
          {(kpi.trend || kpi.footnote) && (
            <p className={`kpi-footnote kpi-footnote--${kpi.trendVariant ?? "neutral"}`}>
              {kpi.trendVariant === "positive" && (
                <TrendingUp size={14} aria-hidden />
              )}
              {kpi.trendVariant === "warning" && (
                <AlertTriangle size={14} aria-hidden />
              )}
              {kpi.trend ?? kpi.footnote}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}
