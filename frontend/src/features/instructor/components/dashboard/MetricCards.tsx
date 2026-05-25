import type { SubjectMetric } from "../../types/instructorDashboard.types";

interface Props {
  metrics: SubjectMetric[];
}

export default function MetricCards({ metrics }: Props) {
  return (
    <div className="dashboard-metrics">
      {metrics.map((metric) => (
        <article key={metric.label} className="dashboard-metric-card">
          <p className="dashboard-metric-card__label">{metric.label}</p>
          <div className="dashboard-metric-card__row">
            <span className="dashboard-metric-card__value">{metric.value}</span>
            <span
              className={`dashboard-metric-card__trend dashboard-metric-card__trend--${metric.trendDirection}`}
            >
              {metric.trend}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
