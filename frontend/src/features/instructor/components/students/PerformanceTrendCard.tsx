import { ChevronDown } from "lucide-react";
import type { PerformanceMonth } from "../../types/students.types";

interface Props {
  months: PerformanceMonth[];
}

export default function PerformanceTrendCard({ months }: Props) {
  const maxScore = Math.max(...months.map((m) => m.score), 1);

  return (
    <article className="performance-trend-card">
      <div className="performance-trend-header">
        <h3>Performance Trend</h3>
        <div className="performance-range-select">
          <span>Last 6 Months</span>
          <ChevronDown size={16} aria-hidden />
        </div>
      </div>

      <div className="performance-chart">
        {months.map((month) => (
          <div key={month.month} className="performance-bar-group">
            <div
              className={`performance-bar ${month.highlighted ? "performance-bar--active" : ""}`}
              style={{ height: `${(month.score / maxScore) * 100}%` }}
              title={`${month.score}%`}
            />
            <span className="performance-month">{month.month}</span>
          </div>
        ))}
      </div>
    </article>
  );
}
