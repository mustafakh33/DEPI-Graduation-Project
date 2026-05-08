import type { AnalyticsMetric } from "../../types/student.types";

interface AnalyticsMetricCardProps {
  metric: AnalyticsMetric;
}

const getMetricColor = (metricId: string) => {
  if (metricId === "attendance") {
    return "bg-emerald-500";
  }

  if (metricId === "absence") {
    return "bg-red-500";
  }

  return "bg-blue-500";
};

const AnalyticsMetricCard = ({ metric }: AnalyticsMetricCardProps) => {
  const progressColor = getMetricColor(metric.id);

  return (
    <article className="rounded-2xl border border-slate-800 bg-[#111827] p-5 shadow-sm">
      <div>
        <p className="text-sm font-semibold text-slate-400">{metric.title}</p>

        <h3 className="mt-3 text-3xl font-bold text-white">{metric.value}</h3>
      </div>

      <div className="mt-5 h-2 rounded-full bg-slate-800">
        <div
          className={`h-2 rounded-full ${progressColor}`}
          style={{ width: `${metric.percentage}%` }}
        />
      </div>

      <p className="mt-3 text-xs leading-5 text-slate-500">
        {metric.helperText}
      </p>
    </article>
  );
};

export default AnalyticsMetricCard;