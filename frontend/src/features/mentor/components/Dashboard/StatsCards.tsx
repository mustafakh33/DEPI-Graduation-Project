import { ClipboardCheck, UserRound, Users } from "lucide-react";
import type { StatsCardsProps } from "../../types/mentor.types";

export default function StatsCards({
  totalStudents,
  attendance,
  absence,
}: StatsCardsProps) {
  return (
    <div className="stats-grid">
      <article className="stat-card stat-card--students">
        <div className="stat-card__icon" aria-hidden>
          <Users size={22} />
        </div>
        <div>
          <p className="stat-card__label">Total Students</p>
          <p className="stat-card__value">{totalStudents.toLocaleString()}</p>
        </div>
      </article>

      <article className="stat-card stat-card--attendance">
        <div className="stat-card__icon" aria-hidden>
          <ClipboardCheck size={22} />
        </div>
        <div>
          <p className="stat-card__label">Attendance %</p>
          <p className="stat-card__value">{attendance}%</p>
        </div>
      </article>

      <article className="stat-card stat-card--absence">
        <div className="stat-card__icon" aria-hidden>
          <UserRound size={22} />
        </div>
        <div>
          <p className="stat-card__label">Absence %</p>
          <p className="stat-card__value">{absence}%</p>
        </div>
      </article>
    </div>
  );
}
