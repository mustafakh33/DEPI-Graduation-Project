import CountdownTimer from "././CountdownTimer";

import type {
  UpcomingSession,
} from "../../types/liveSessions.types";

interface Props {
  session: UpcomingSession;

  timeLeft: number;

  canJoin: boolean;

  onJoin: () => void;
}

export default function UpcomingSessionCard({
  session,

  timeLeft,

  canJoin,

  onJoin,
}: Props) {
  return (
    <div className="upcoming-session-card">

      <div>

        <span className="priority-badge">
          NEXT SESSION
        </span>

        <h1>{session.title}</h1>

        <h2>
          {session.batchName}
        </h2>

        <div className="session-info">

          <span>
            Today, 4:00 PM
          </span>

          <span>
            Lecture
            {session.lectureNumber}
          </span>

        </div>

      </div>

      <div className="countdown-card">

        <p>STARTS IN</p>

        <CountdownTimer
          timeLeft={timeLeft}
        />

        <button
          disabled={!canJoin}
          className={
            canJoin
              ? "join-btn active-join"
              : "join-btn"
          }
          onClick={onJoin}
        >
          Join Session Now
        </button>

      </div>

    </div>
  );
}