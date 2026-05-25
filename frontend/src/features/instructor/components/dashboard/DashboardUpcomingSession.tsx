import { Calendar, Users, Video } from "lucide-react";
import { Link } from "react-router-dom";
import CountdownTimer from "../liveSessions/CountdownTimer";
import type { SubjectUpcomingSession } from "../../types/instructorDashboard.types";

interface Props {
  session: SubjectUpcomingSession;
  subjectName: string;
  timeLeft: number;
  canJoin: boolean;
  onJoin: () => void;
}

function formatStartTime(startsAt: string): string {
  const date = new Date(startsAt);
  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return isToday ? `Today at ${time}` : date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function sessionStatusLabel(timeLeft: number, canJoin: boolean): string {
  if (timeLeft <= 0) return "Session is live now";
  if (canJoin) {
    const mins = Math.ceil(timeLeft / (1000 * 60));
    return mins <= 1 ? "Starting in less than a minute" : `Starts in ${mins} minutes`;
  }
  return "Upcoming session";
}

export default function DashboardUpcomingSession({
  session,
  subjectName,
  timeLeft,
  canJoin,
  onJoin,
}: Props) {
  return (
    <section className="dashboard-upcoming-session" aria-label="Upcoming session">
      <div className="dashboard-upcoming-session__main">
        <span className="dashboard-upcoming-session__badge">
          <span className="dashboard-upcoming-session__dot" aria-hidden />
          {sessionStatusLabel(timeLeft, canJoin)}
        </span>
        <h2 className="dashboard-upcoming-session__title">{session.title}</h2>
        <p className="dashboard-upcoming-session__subject">{subjectName}</p>
        <div className="dashboard-upcoming-session__meta">
          <span>
            <Calendar size={16} aria-hidden />
            {formatStartTime(session.startsAt)}
          </span>
          <span>
            <Video size={16} aria-hidden />
            Lecture {session.lectureNumber}
          </span>
          <span>
            <Users size={16} aria-hidden />
            {session.enrolledStudents} students enrolled
          </span>
        </div>
      </div>

      <div className="dashboard-upcoming-session__actions">
        {timeLeft > 0 ? (
          <div className="dashboard-upcoming-session__countdown">
            <p>Starts in</p>
            <CountdownTimer timeLeft={timeLeft} />
          </div>
        ) : null}
        <button
          type="button"
          className={
            canJoin
              ? "dashboard-upcoming-session__join dashboard-upcoming-session__join--active"
              : "dashboard-upcoming-session__join"
          }
          disabled={!canJoin}
          onClick={onJoin}
        >
          Join Now
        </button>
        <Link
          to="/instructor/live-session"
          className="dashboard-upcoming-session__link"
        >
          Open session hub
        </Link>
      </div>
    </section>
  );
}
