import type { ClassroomLogEntry } from "../../types/mentorSessions.types";

interface Props {
  logs: ClassroomLogEntry[];
}

export default function ClassroomLogs({ logs }: Props) {
  return (
    <section className="mentor-classroom-logs" aria-label="Classroom activity log">
      <h2>Classroom Logs</h2>
      <ul>
        {logs.map((log) => (
          <li
            key={log.id}
            className={
              log.variant === "urgent"
                ? "mentor-classroom-logs__item mentor-classroom-logs__item--urgent"
                : "mentor-classroom-logs__item"
            }
          >
            {log.message}
          </li>
        ))}
      </ul>
    </section>
  );
}
