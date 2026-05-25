import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import type { StudentProfile } from "@/features/instructor/types/students.types";

interface Props {
  profile: StudentProfile;
}

function statusLabel(status: StudentProfile["status"]): string {
  if (status === "at_risk") return "At Risk";
  if (status === "inactive") return "Inactive";
  return "Active";
}

export default function MentorStudentProfileHeader({ profile }: Props) {
  return (
    <header className="student-profile-header">
      <Link to="/mentor/my-students" className="back-to-students">
        <ArrowLeft size={18} aria-hidden />
        Back to Students
      </Link>

      <div className="student-profile-top">
        <div className="student-profile-identity">
          <div className="student-profile-avatar" />
          <div>
            <div className="student-profile-name-row">
              <h1>{profile.name}</h1>
              <span className={`profile-status profile-status--${profile.status}`}>
                {statusLabel(profile.status)}
              </span>
            </div>
            <p className="student-profile-meta">
              ID: #{profile.studentId} • {profile.major} • {profile.term}
            </p>
          </div>
        </div>

        <div className="student-profile-actions">
          <Link
            to={`/mentor/chat/${profile.id}`}
            className="mentor-chat-header-btn"
          >
            Message Student
          </Link>
          <button type="button" className="edit-profile-btn">
            Edit Profile
          </button>
          <button type="button" className="more-btn" aria-label="More options">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
