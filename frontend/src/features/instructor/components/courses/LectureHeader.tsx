import { Bell, Eye } from "lucide-react";
import { lectureSession } from "../../data/lectureMaterials.mock";

export default function LectureHeader() {
  return (
    <header className="lecture-header">
      <div className="lecture-header-main">
        <div className="session-row">
          <span className="lecture-session">Current Session</span>
          <span className="course-code">{lectureSession.courseCode}</span>
        </div>
        <h1>{lectureSession.lectureTitle}</h1>
      </div>

      <div className="lecture-header-actions">
        <button type="button" className="notification-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="notification-dot" aria-hidden />
        </button>
        <button type="button" className="preview-btn">
          <Eye size={18} aria-hidden />
          Preview Student View
        </button>
      </div>
    </header>
  );
}
