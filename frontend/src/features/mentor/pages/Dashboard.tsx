/**
 * Mentor Dashboard — `/mentor/dashboard`
 *
 * Subject tabs, search, stats, upcoming session, student grid, risk and top-performer widgets.
 *
 * @see ../README.md#section-dashboard
 */
import { Link } from "react-router-dom";
import { useMentorDashboard } from "../hooks/useMentorDashboard";
import DashboardHeader from "../components/Dashboard/DashboardHeader";
import StatsCards from "../components/Dashboard/StatsCards";
import DashboardUpcomingSession from "../components/Dashboard/DashboardUpcomingSession";
import StudentGrid from "../components/Dashboard/StudentGrid";
import RiskStudents from "../components/Dashboard/RiskStudents";
import TopPerformers from "../components/Dashboard/TopPerformers";
import "../style/mentorDashboard.css";

export default function MentorDashboardPage() {
  const {
    subjects,
    selectedSubject,
    selectedSubjectId,
    setSelectedSubjectId,
    students,
    topPerformers,
    riskStudents,
    searchQuery,
    setSearchQuery,
    timeLeft,
    canJoin,
    joinSession,
  } = useMentorDashboard();

  if (!selectedSubject) return null;

  return (
    <div className="mentor-dashboard">
      <DashboardHeader
        subjects={subjects}
        selectedSubjectId={selectedSubjectId}
        onSelectSubject={setSelectedSubjectId}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <StatsCards
        totalStudents={selectedSubject.students.length}
        attendance={selectedSubject.attendance}
        absence={selectedSubject.absence}
      />

      <DashboardUpcomingSession
        session={selectedSubject.upcomingSession}
        timeLeft={timeLeft}
        canJoin={canJoin}
        onJoin={joinSession}
      />

      <div className="dashboard-content">
        <div className="students-section">
          <div className="section-header">
            <h2>Student List — {selectedSubject.name}</h2>
            <Link to="/mentor/my-students" className="section-header__link">
              View All →
            </Link>
          </div>

          <StudentGrid students={students} />
        </div>

        <div className="side-widgets">
          <RiskStudents students={riskStudents} />
          <TopPerformers students={topPerformers} />
        </div>
      </div>
    </div>
  );
}
