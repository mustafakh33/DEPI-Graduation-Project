import { Radio } from "lucide-react";
import type { StudyGroupSession } from "../../types/mentorSessions.types";
import SessionGroupCard from "./SessionGroupCard";

interface Props {
  groups: StudyGroupSession[];
  helpGroupId?: string;
  viewMode: "grid" | "list";
  onObserve: (group: StudyGroupSession) => void;
  onJoin: (group: StudyGroupSession) => void;
}

export default function ActiveSessionsSection({
  groups,
  helpGroupId,
  viewMode,
  onObserve,
  onJoin,
}: Props) {
  return (
    <section className="mentor-sessions-active">
      <div className="mentor-sessions-active__heading">
        <Radio size={18} className="mentor-sessions-active__icon" aria-hidden />
        <h2>Active Group Chats</h2>
        <span className="mentor-sessions-live-badge">Live Now</span>
      </div>

      <div
        className={
          viewMode === "grid"
            ? "mentor-sessions-grid"
            : "mentor-sessions-grid mentor-sessions-grid--list"
        }
      >
        {groups.map((group) => (
          <SessionGroupCard
            key={group.id}
            group={group}
            highlighted={group.id === helpGroupId}
            onObserve={onObserve}
            onJoin={onJoin}
          />
        ))}
      </div>
    </section>
  );
}
