import { useLiveSessions } from "../hooks/useLiveSessions";
import UpcomingSessionCard from "../components/liveSessions/UpcomingSessionCard";
import SessionActivityCard from "../components/liveSessions/SessionActivityCard";
import RewardStudentCard from "../components/liveSessions/RewardStudentCard";
import UpcomingLecturesList from "../components/liveSessions/UpcomingLecturesList";
import "../styles/liveSessions.css";

export default function LiveSessionsPage() {
  const {
    upcomingSession,
    sessionActivity,
    upcomingLectures,
    timeLeft,
    canJoin,
  } = useLiveSessions();

  return (
    <div className="live-sessions-page">
      <div className="live-layout">
        <main className="live-main">
          <UpcomingSessionCard
            session={upcomingSession}
            timeLeft={timeLeft}
            canJoin={canJoin}
            
          />

          <UpcomingLecturesList lectures={upcomingLectures} />
        </main>

        <aside className="live-sidebar">
          <SessionActivityCard activity={sessionActivity} />
          <RewardStudentCard />
        </aside>
      </div>
    </div>
  );
}