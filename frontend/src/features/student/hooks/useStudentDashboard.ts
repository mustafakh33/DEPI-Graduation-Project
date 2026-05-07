import { useOnboarding } from "@/features/onboarding/context/OnboardingContext";
import type { StudentDashboardData } from "../types/student.types";

const calculateWeeklyGoalPercentage = (
  completedHours: number,
  targetHours: number
) => {
  if (targetHours === 0) {
    return 0;
  }

  return Math.round((completedHours / targetHours) * 100);
};

export const useStudentDashboard = (): StudentDashboardData => {
  const { user, selectedTrack, schedule } = useOnboarding();

  const weeklyGoalTargetHours = schedule?.weeklyCommitment ?? 10;
  const completedStudyHours = 7.5;

  return {
    studentName: user?.name ?? "Student",
    weeklyGoal: {
      targetHours: weeklyGoalTargetHours,
      completedHours: completedStudyHours,
      percentage: calculateWeeklyGoalPercentage(
        completedStudyHours,
        weeklyGoalTargetHours
      ),
    },
    stats: {
      rank: 12,
      streakDays: 5,
      studyHours: 12,
      coins: 450,
    },
    currentCourse: {
      id: selectedTrack?.id ?? "web-development",
      title: selectedTrack?.title ?? "Web Development",
      status: "in-progress",
      progress: 68,
      lastLessonPath: `/student/subject/${selectedTrack?.id ?? "web-development"}`,
    },
  };
};