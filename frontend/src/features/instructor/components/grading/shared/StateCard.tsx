import type { ReactNode } from "react";

interface Props {
  title: string;
  value: string;
  icon?: ReactNode;
  iconVariant?: "blue" | "green" | "amber";
  extra?: string;
  extraVariant?: "positive" | "negative" | "neutral" | "info";
}

export default function StatCard({
  title,
  value,
  icon,
  iconVariant = "blue",
  extra,
  extraVariant = "neutral",
}: Props) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <p className="stat-card-label">{title}</p>
        {icon && (
          <div
            className={`stat-card-icon stat-card-icon--${iconVariant}`}
            aria-hidden
          >
            {icon}
          </div>
        )}
      </div>

      <div className="stat-card-body">
        <h2 className="stat-card-value">{value}</h2>
        {extra && (
          <span className={`stat-card-extra stat-card-extra--${extraVariant}`}>
            {extra}
          </span>
        )}
      </div>
    </div>
  );
}
