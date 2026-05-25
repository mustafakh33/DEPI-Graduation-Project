import { Calendar, Video } from "lucide-react";
import type { DashboardUpcomingSessionProps } from "../../types/mentor.types";

function formatCountdown(timeLeft: number): string {
  if (timeLeft <= 0) return "Live now";
  const mins = Math.ceil(timeLeft / (1000 * 60));
  if (mins < 60) return `Starts in ${mins} min`;
  const hours = Math.floor(mins / 60);
  return `Starts in ${hours}h ${mins % 60}m`;
}

export default function DashboardUpcomingSession({
  session,
  timeLeft,
  canJoin,
  onJoin,
}: DashboardUpcomingSessionProps) {
  return (
    <section className="mentor-upcoming-session">
      <div className="mentor-upcoming-session__info">
        <span className="mentor-upcoming-session__badge">
          <Video size={14} aria-hidden />
          Upcoming session
        </span>
        <h3>{session.title}</h3>
        <p>
          <Calendar size={14} aria-hidden />
          {session.subjectName} · {formatCountdown(timeLeft)}
        </p>
      </div>
      <button
        type="button"
        className={
          canJoin
            ? "mentor-upcoming-session__join mentor-upcoming-session__join--active"
            : "mentor-upcoming-session__join"
        }
        disabled={!canJoin}
        onClick={onJoin}
      >
        Join Now
      </button>
    </section>
  );
}
