import CountdownTimer from "./CountdownTimer";
import type { UpcomingSession } from "../../types/liveSessions.types";

interface Props {
  session: UpcomingSession;
  timeLeft: number;
  canJoin: boolean;
  
}

export default function UpcomingSessionCard({
  session,
  timeLeft,
  canJoin,
 
}: Props) {
  return (
    <section className="upcoming-session-card">
      <div className="session-main-info">
        <span className="priority-badge">NEXT SESSION PRIORITY</span>

        <h1>{session.title}</h1>

        <h2>{session.batchName}</h2>

        <div className="session-info">
          <span>📅 Today, 4:00 PM</span>
          <span>📖 Lecture {session.lectureNumber}</span>
        </div>
      </div>

      <div className="countdown-card">
        <p>STARTS IN</p>

        <CountdownTimer timeLeft={timeLeft} />

        <button
  type="button"
  disabled={!canJoin}
  className={
    canJoin
      ? "join-btn active-join"
      : "join-btn"
  }
  onClick={() =>
    window.open(
      session.meetingLink,
      "_blank"
    )
  }
>
  Join Session Now
</button>
      </div>
    </section>
  );
}