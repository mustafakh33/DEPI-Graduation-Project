import type { AnalyticsStats } from "../../types/analystics.types";

interface Props {
  stats: AnalyticsStats;
}

export default function AnalyticsStats({ stats }: Props) {
  return (
    <section className="analytics-stats" aria-label="Summary statistics">
      {stats.cards.map((card) => (
        <article key={card.label} className="analytics-stat-card">
          <p className="analytics-stat-card__label">{card.label}</p>
          <div className="analytics-stat-card__row">
            <p className="analytics-stat-card__value">{card.value}</p>
            <span
              className={`analytics-stat-card__delta analytics-stat-card__delta--${card.deltaVariant}`}
            >
              {card.delta}
            </span>
          </div>
        </article>
      ))}
    </section>
  );
}
