import CurrentCourseCard from "../components/dashboard/CurrentCourseCard";
import StudentWelcomeSection from "../components/dashboard/StudentWelcomeSection";
import WeeklyGoalCard from "../components/dashboard/WeeklyGoalCard";
import StudentPageContainer from "../components/shared/StudentPageContainer";
import { useStudentDashboard } from "../hooks/useStudentDashboard";

const Dashboard = () => {
  const dashboard = useStudentDashboard();

  return (
    <StudentPageContainer>
      <div className="space-y-6">
        <StudentWelcomeSection
          studentName={dashboard.studentName}
          weeklyGoalPercentage={dashboard.weeklyGoal.percentage}
        />

        <CurrentCourseCard course={dashboard.currentCourse} />

        <WeeklyGoalCard weeklyGoal={dashboard.weeklyGoal} />
      </div>
    </StudentPageContainer>
  );
};

export default Dashboard;