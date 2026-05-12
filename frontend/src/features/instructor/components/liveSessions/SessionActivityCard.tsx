import type {
    SessionActivity,
  } from "../../types/liveSessions.types";
  
  interface Props {
    activity: SessionActivity;
  }
  
  export default function SessionActivityCard({
    activity,
  }: Props) {
    return (
      <div className="session-activity-card">
  
        <h3>Session Activity</h3>
  
        <div className="activity-status">
  
          {activity.attendedSuccessfully
            ? "Session Completed Successfully"
            : "You Missed Last Session"}
  
        </div>
  
        <p>
          Attendance Rate:
          {activity.attendanceRate}%
        </p>
  
      </div>
    );
  }