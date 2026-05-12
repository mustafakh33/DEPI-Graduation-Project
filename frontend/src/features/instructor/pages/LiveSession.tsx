import { useNavigate } from "react-router-dom";
import { useLiveSessions,} from "../hooks/useLiveSessions";
import UpcomingSessionCard from "../components/liveSessions/UpcomingSessionCard";
import SessionActivityCard from "../components/liveSessions/SessionActivityCard";
import RewardStudentCard from "../components/liveSessions/RewardStudentCard";
import UpcomingLecturesList from "../components/liveSessions/UpcomingLecturesList";
import "../styles/liveSessions.css";

export default function LiveSessionsPage() {
  //const navigate = useNavigate();

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

        <div className="live-main">

          <UpcomingSessionCard
            session={upcomingSession}
            timeLeft={timeLeft}
            canJoin={canJoin}
            onJoin={() =>
              console.log("join")
            }
          />

          <UpcomingLecturesList
            lectures={
              upcomingLectures
            }
          />

        </div>

        <div className="live-sidebar">

          <SessionActivityCard
            activity={
              sessionActivity
            }
          />

          <RewardStudentCard />

        </div>

      </div>

    </div>
  );
}