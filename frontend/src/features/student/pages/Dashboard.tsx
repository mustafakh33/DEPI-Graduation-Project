import CurrentCourseCard from "../components/dashboard/CurrentCourseCard";
import StudentWelcomeSection from "../components/dashboard/StudentWelcomeSection";
import WeeklyGoalCard from "../components/dashboard/WeeklyGoalCard";
import StudentPageContainer from "../components/shared/StudentPageContainer";
import { useStudentDashboard } from "../hooks/useStudentDashboard";
import {
  calculateRoadmapProgress,
  getContinueLearningPath,
  useRoadmap,
} from "../hooks/useRoadmap";

const Dashboard = () => {
  const dashboard = useStudentDashboard();
  const roadmap = useRoadmap();

  const courseProgress = calculateRoadmapProgress(roadmap);
  const continueLearningPath = getContinueLearningPath(roadmap);

  const currentCourse = {
    ...dashboard.currentCourse,
    id: roadmap.trackId,
    title: roadmap.trackTitle,
    progress: courseProgress,
    lastLessonPath: continueLearningPath,
  };

  return (
    <StudentPageContainer>
      <div className="space-y-6">
        <StudentWelcomeSection
          studentName={dashboard.studentName}
          weeklyGoalPercentage={dashboard.weeklyGoal.percentage}
        />

        <CurrentCourseCard course={currentCourse} />

        <WeeklyGoalCard weeklyGoal={dashboard.weeklyGoal} />
      </div>
    </StudentPageContainer>
  );
};

export default Dashboard;