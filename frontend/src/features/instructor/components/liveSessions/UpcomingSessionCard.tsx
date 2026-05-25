import { BookOpen, Calendar } from "lucide-react";
import CountdownTimer from "./CountdownTimer";
import type { UpcomingSession } from "../../types/liveSessions.types";

interface Props {
  session: UpcomingSession;
  timeLeft: number;
  canJoin: boolean;
}

function formatSessionDateTime(startsAt: string): string {
  const date = new Date(startsAt);
  const today = new Date();
  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return isToday ? `Today, ${time}` : date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function UpcomingSessionCard({
  session,
  timeLeft,
  canJoin,
}: Props) {
  return (
    <section className="upcoming-session-card">
      <div className="session-main-info">
        <span className="priority-badge">
          <span className="priority-dot" aria-hidden />
          Next Session Priority
        </span>

        <h1 className="session-title">
          {session.title} {session.batchName}
        </h1>

        <div className="session-info">
          <span className="session-info-item">
            <Calendar size={16} aria-hidden />
            {formatSessionDateTime(session.startsAt)}
          </span>
          <span className="session-info-item">
            <BookOpen size={16} aria-hidden />
            Lecture {session.lectureNumber}
          </span>
        </div>
      </div>

      <div className="countdown-card">
        <p className="countdown-heading">Starts In</p>
        <CountdownTimer timeLeft={timeLeft} />
        <button
          type="button"
          disabled={!canJoin}
          className={canJoin ? "join-btn active-join" : "join-btn"}
          onClick={() => window.open(session.meetingLink, "_blank")}
        >
          Join Session Now
        </button>
      </div>
    </section>
  );
}
