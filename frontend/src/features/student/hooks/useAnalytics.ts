import { useOnboarding } from "@/features/onboarding/context/OnboardingContext";
import type { AnalyticsData } from "../types/student.types";

export const useAnalytics = (): AnalyticsData => {
  const { schedule } = useOnboarding();

  return {
    metrics: [
      {
        id: "attendance",
        title: "Attendance",
        value: "82%",
        percentage: 82,
        helperText: "Sessions attended successfully",
      },
      {
        id: "absence",
        title: "Absence",
        value: "18%",
        percentage: 18,
        helperText: "Sessions missed this term",
      },
      {
        id: "quiz-score",
        title: "Average Quiz Score",
        value: "76%",
        percentage: 76,
        helperText: "Average score across quizzes",
      },
      {
        id: "assignment-score",
        title: "Average Assignment Score",
        value: "68%",
        percentage: 68,
        helperText: "Average score across assignments",
      },
    ],
    weeklyStudyHours: [
      { day: "Mon", hours: 2 },
      { day: "Tue", hours: 4 },
      { day: "Wed", hours: 1.5 },
      { day: "Thu", hours: 3 },
      { day: "Fri", hours: 2.5 },
      { day: "Sat", hours: 5 },
      { day: "Sun", hours: 1 },
    ],
    studyDays: schedule?.days ?? ["Mon", "Wed", "Sat"],
  };
};