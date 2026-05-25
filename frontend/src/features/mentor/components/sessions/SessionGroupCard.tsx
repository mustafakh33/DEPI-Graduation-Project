import type { StudyGroupSession } from "../../types/mentorSessions.types";

interface Props {
  group: StudyGroupSession;
  highlighted?: boolean;
  onObserve: (group: StudyGroupSession) => void;
  onJoin: (group: StudyGroupSession) => void;
}

function statusLabel(status: StudyGroupSession["status"]): string {
  if (status === "help_requested") return "Help Requested";
  if (status === "idle") return "Idle";
  return "Stable";
}

export default function SessionGroupCard({
  group,
  highlighted = false,
  onObserve,
  onJoin,
}: Props) {
  const isHelp = group.status === "help_requested";
  const waitingClass =
    group.activeLabel.includes("waiting") ? "mentor-session-card__meta--urgent" : "";

  return (
    <article
      className={
        highlighted || isHelp
          ? "mentor-session-card mentor-session-card--highlight"
          : "mentor-session-card"
      }
    >
      <div className="mentor-session-card__top">
        <span
          className={`mentor-session-card__status mentor-session-card__status--${group.status}`}
        >
          {statusLabel(group.status)}
        </span>
      </div>

      <h3>{group.name}</h3>

      <div className="mentor-session-card__stats">
        <span>{group.studentCount} Students</span>
        <span className={waitingClass}>{group.activeLabel}</span>
      </div>

      {isHelp ? (
        <button
          type="button"
          className="mentor-session-card__join"
          onClick={() => onJoin(group)}
        >
          Join Discussion
        </button>
      ) : (
        <button
          type="button"
          className="mentor-session-card__observe"
          onClick={() => onObserve(group)}
        >
          Observe Room
        </button>
      )}
    </article>
  );
}
