import { MessageCircle } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import StudentKpiCards from "@/features/instructor/components/students/StudentKpiCards";
import PerformanceTrendCard from "@/features/instructor/components/students/PerformanceTrendCard";
import StudentProfileTabs from "@/features/instructor/components/students/StudentProfileTabs";
import "@/features/instructor/styles/students.css";
import "../../style/mentorStudents.css";
import { useMentorStudentProfile } from "../../hooks/useMentorStudentProfile";
import MentorAdvisorNotesCard from "./MentorAdvisorNotesCard";
import MentorStudentProfileHeader from "./MentorStudentProfileHeader";

export default function MentorStudentProfilePage() {
  const { studentId } = useParams<{ studentId: string }>();
  const { profile, activeTab, setActiveTab } = useMentorStudentProfile(studentId);

  if (!profile) {
    return <Navigate to="/mentor/my-students" replace />;
  }

  const firstName = profile.name.split(" ")[0];

  return (
    <div className="students-page student-profile-page">
      <MentorStudentProfileHeader profile={profile} />

      <StudentProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "overview" ? (
        <div className="student-profile-content">
          <StudentKpiCards kpis={profile.kpis} />

          <div className="student-profile-grid">
            <PerformanceTrendCard months={profile.performanceTrend} />
            <MentorAdvisorNotesCard notes={profile.advisorNotes} />
          </div>

          <Link
            to={`/mentor/chat/${profile.id}`}
            className="mentor-start-chat-btn"
          >
            <MessageCircle size={20} aria-hidden />
            Start Chat with {firstName}
          </Link>
        </div>
      ) : (
        <div className="student-tab-placeholder">
          <p>
            {activeTab.replace(/-/g, " ")} content will be available soon.
          </p>
        </div>
      )}
    </div>
  );
}
