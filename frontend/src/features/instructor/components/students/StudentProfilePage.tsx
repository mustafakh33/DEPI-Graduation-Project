import { Navigate, useParams } from "react-router-dom";
import { useStudentProfile } from "../../hooks/useStudentProfile";
import AdvisorNotesCard from "./AdvisorNotesCard";
import PerformanceTrendCard from "./PerformanceTrendCard";
import StudentKpiCards from "./StudentKpiCards";
import StudentProfileHeader from "./StudentProfileHeader";
import StudentProfileTabs from "./StudentProfileTabs";
import "../../styles/students.css";

export default function StudentProfilePage() {
  const { studentId } = useParams<{ studentId: string }>();
  const {
    profile,
    activeTab,
    setActiveTab,
    isAtRisk,
    putAtRisk,
    clearRisk,
  } = useStudentProfile(studentId);

  if (!profile) {
    return <Navigate to="/instructor/students" replace />;
  }

  return (
    <div className="students-page student-profile-page">
      <StudentProfileHeader
        profile={profile}
        isAtRisk={isAtRisk}
        onPutAtRisk={putAtRisk}
        onClearRisk={clearRisk}
      />

      <StudentProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "overview" ? (
        <div className="student-profile-content">
          <StudentKpiCards kpis={profile.kpis} />

          <div className="student-profile-grid">
            <PerformanceTrendCard months={profile.performanceTrend} />
            <AdvisorNotesCard note={profile.advisorNote} />
          </div>
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
