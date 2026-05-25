import { ChevronDown } from "lucide-react";
import type { AttendanceDay } from "../../types/instructorDashboard.types";

interface Props {
  days: AttendanceDay[];
}

export default function AttendanceChart({ days }: Props) {
  const maxTotal = Math.max(
    ...days.map((d) => d.attended + d.absent),
    1
  );

  return (
    <article className="dashboard-attendance-card">
      <div className="dashboard-attendance-card__header">
        <h3>Attendance vs. Absence</h3>
        <div className="dashboard-attendance-card__select">
          <span>Last 30 Days</span>
          <ChevronDown size={16} aria-hidden />
        </div>
      </div>

      <div className="dashboard-attendance-chart">
        {days.map((day) => {
          const total = day.attended + day.absent;
          const heightPct = (total / maxTotal) * 100;
          const attendedPct = total > 0 ? (day.attended / total) * 100 : 0;

          return (
            <div key={day.day} className="dashboard-attendance-bar-group">
              <div
                className="dashboard-attendance-bar"
                style={{ height: `${heightPct}%` }}
                title={`${day.attended}% attended, ${day.absent}% absent`}
              >
                <span
                  className="dashboard-attendance-bar__absent"
                  style={{ height: `${100 - attendedPct}%` }}
                />
                <span
                  className="dashboard-attendance-bar__attended"
                  style={{ height: `${attendedPct}%` }}
                />
              </div>
              <span className="dashboard-attendance-bar__label">{day.day}</span>
            </div>
          );
        })}
      </div>
    </article>
  );
}
