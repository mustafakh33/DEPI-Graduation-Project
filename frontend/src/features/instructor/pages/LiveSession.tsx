import { Search } from "lucide-react";
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
      <header className="live-page-header">
        <div className="live-page-header-text">
          <nav className="live-breadcrumbs" aria-label="Breadcrumb">
            <span>Home</span>
            <span aria-hidden>›</span>
            <span>Sessions Management</span>
          </nav>
        </div>

        <div className="live-global-search">
          <Search size={18} className="live-search-icon" aria-hidden />
          <input type="search" placeholder="Global search..." />
        </div>
      </header>

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
