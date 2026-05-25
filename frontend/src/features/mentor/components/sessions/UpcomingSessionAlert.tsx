import { Clock } from "lucide-react";
import type { UpcomingMentorSession } from "../../types/mentorSessions.types";

interface Props {
  session: UpcomingMentorSession;
}

export default function UpcomingSessionAlert({ session }: Props) {
  return (
    <div className="mentor-upcoming-alert">
      <div className="mentor-upcoming-alert__label">
        <Clock size={16} aria-hidden />
        Upcoming in {session.startsIn}
      </div>
      <p>{session.title}</p>
    </div>
  );
}
