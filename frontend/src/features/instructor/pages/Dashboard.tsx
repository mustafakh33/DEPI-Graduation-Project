/**
 * Instructor Dashboard — `/instructor/dashboard`
 *
 * Subject-scoped overview: metrics, attendance chart, top students, progress cards,
 * and upcoming live session with 15-minute join window.
 *
 * @see ../README.md#section-dashboard
 */
import { useInstructorDashboard } from "../hooks/useInstructorDashboard";
import SubjectTabs from "../components/dashboard/SubjectTabs";
import DashboardUpcomingSession from "../components/dashboard/DashboardUpcomingSession";
import MetricCards from "../components/dashboard/MetricCards";
import AttendanceChart from "../components/dashboard/AttendanceChart";
import TopPerformingStudents from "../components/dashboard/TopPerformingStudents";
import ProgressSummaryCards from "../components/dashboard/ProgressSummaryCards";
import "../styles/instructorDashboard.css";

export default function InstructorDashboard() {
  const {
    subjects,
    activeSubjectId,
    setActiveSubjectId,
    dashboard,
    timeLeft,
    canJoin,
    joinSession,
  } = useInstructorDashboard();

  if (!dashboard) {
    return null;
  }

  return (
    <div className="instructor-dashboard">
      <SubjectTabs
        subjects={subjects}
        activeId={activeSubjectId}
        onChange={setActiveSubjectId}
      />

      <header className="instructor-dashboard__header">
        <h1>{dashboard.subject.name} Overview</h1>
        <p>
          Monitoring performance analytics and student engagement for{" "}
          {dashboard.subject.name}.
        </p>
      </header>

      <DashboardUpcomingSession
        session={dashboard.upcomingSession}
        subjectName={dashboard.subject.name}
        timeLeft={timeLeft}
        canJoin={canJoin}
        onJoin={joinSession}
      />

      <MetricCards metrics={dashboard.metrics} />

      <div className="dashboard-main-grid">
        <AttendanceChart days={dashboard.attendance} />
        <TopPerformingStudents students={dashboard.topStudents} />
      </div>

      <ProgressSummaryCards progress={dashboard.progress} />
    </div>
  );
}
