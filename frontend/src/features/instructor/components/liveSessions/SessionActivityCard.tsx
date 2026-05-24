import type { SessionActivity } from "../../types/liveSessions.types";

interface Props {
  activity: SessionActivity;
}

export default function SessionActivityCard({ activity }: Props) {
  return (
    <div className="session-activity-card">
      <div className="session-activity-header">
        <h3>Session Activity</h3>
        <button type="button">•••</button>
      </div>

      <div className="activity-row">
        <div
          className={
            activity.attendedSuccessfully
              ? "activity-icon success"
              : "activity-icon danger"
          }
        >
          {activity.attendedSuccessfully ? "✓" : "✕"}
        </div>

        <div>
          <h4>
            {activity.attendedSuccessfully
              ? "Morning Session Completed"
              : "Session Missed"}
          </h4>
          <p>Attendance Rate: {activity.attendanceRate}%</p>
        </div>
      </div>

      <div className="activity-row">
        <div className="activity-icon blue">↗</div>

        <div>
          <h4>Attendance High</h4>
          <p>Attendance is up by 15% this week</p>
        </div>
      </div>

      <button type="button" className="detailed-stats-btn">
        View Detailed Stats
      </button>
    </div>
  );
}