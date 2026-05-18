import { useEffect, useState } from "react";
import { useOnboarding } from "@/features/onboarding/context/OnboardingContext";
import type { AnalyticsData } from "../types/student.types";

const SOLO_FOCUS_STATS_STORAGE_KEY = "solo-focus-stats";
const APPROVED_DAILY_STUDY_HOURS_KEY = "approved-daily-study-hours";

interface SavedSoloFocusStats {
  weeklySeconds: number;
  dailySeconds: number;
  breakCount: number;
  streakDays: number;
  isRunning: boolean;
  lastStartedAt: number | null;
  lastStudyDate: string | null;
  currentDayKey: string;
  currentWeekKey: string;
}

type DailyStudyHours = Record<string, number>;

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getWeekKey = (date = new Date()) => {
  const copiedDate = new Date(date);
  copiedDate.setHours(0, 0, 0, 0);

  const day = copiedDate.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;

  copiedDate.setDate(copiedDate.getDate() + mondayOffset);

  return copiedDate.toISOString().slice(0, 10);
};

const getDateForWeekDay = (dayIndex: number) => {
  const monday = new Date(getWeekKey());
  monday.setDate(monday.getDate() + dayIndex);

  return monday.toISOString().slice(0, 10);
};

const getSavedDailyStudyHours = (): DailyStudyHours => {
  const savedDailyHours = localStorage.getItem(APPROVED_DAILY_STUDY_HOURS_KEY);

  if (!savedDailyHours) {
    return {};
  }

  try {
    return JSON.parse(savedDailyHours) as DailyStudyHours;
  } catch {
    return {};
  }
};

const getSavedSoloFocusStats = (): SavedSoloFocusStats | null => {
  const savedStats = localStorage.getItem(SOLO_FOCUS_STATS_STORAGE_KEY);

  if (!savedStats) {
    return null;
  }

  try {
    return JSON.parse(savedStats) as SavedSoloFocusStats;
  } catch {
    return null;
  }
};

const getWeeklyStudyHours = () => {
  const dailyStudyHours = getSavedDailyStudyHours();

  return weekDays.map((day, index) => {
    const dateKey = getDateForWeekDay(index);
    const seconds = dailyStudyHours[dateKey] ?? 0;

    return {
      day,
      hours: Number((seconds / 3600).toFixed(1)),
    };
  });
};

const getStudyDays = () => {
  const weeklyStudyHours = getWeeklyStudyHours();

  return weeklyStudyHours
    .filter((day) => day.hours > 0)
    .map((day) => day.day);
};

const calculateAverageQuizScore = () => {
  const lastQuizScore = localStorage.getItem("last-session-quiz-score");

  if (!lastQuizScore) {
    return 0;
  }

  return Number(lastQuizScore);
};

export const useAnalytics = (): AnalyticsData => {
  const { schedule } = useOnboarding();

  const [weeklyStudyHours, setWeeklyStudyHours] = useState(
    getWeeklyStudyHours
  );

  const [approvedStudyDays, setApprovedStudyDays] = useState(getStudyDays);
  const [quizScore, setQuizScore] = useState(calculateAverageQuizScore);

  useEffect(() => {
    const refreshAnalytics = () => {
      setWeeklyStudyHours(getWeeklyStudyHours());
      setApprovedStudyDays(getStudyDays());
      setQuizScore(calculateAverageQuizScore());
    };

    refreshAnalytics();

    const interval = window.setInterval(refreshAnalytics, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const soloFocusStats = getSavedSoloFocusStats();

  const approvedWeeklyHours = soloFocusStats
    ? Number((soloFocusStats.weeklySeconds / 3600).toFixed(1))
    : 0;

  const targetWeeklyHours = schedule?.weeklyCommitment ?? 10;

  const attendancePercentage =
    targetWeeklyHours > 0
      ? Math.min(100, Math.round((approvedWeeklyHours / targetWeeklyHours) * 100))
      : 0;

  const absencePercentage = Math.max(0, 100 - attendancePercentage);

  return {
    metrics: [
      {
        id: "attendance",
        title: "Attendance",
        value: `${attendancePercentage}%`,
        percentage: attendancePercentage,
        helperText: "Approved study sessions this week",
      },
      {
        id: "absence",
        title: "Absence",
        value: `${absencePercentage}%`,
        percentage: absencePercentage,
        helperText: "Remaining weekly study commitment",
      },
      {
        id: "quiz-score",
        title: "Average Quiz Score",
        value: `${quizScore}%`,
        percentage: quizScore,
        helperText: "Average score across approved session quizzes",
      },
      {
        id: "assignment-score",
        title: "Average Assignment Score",
        value: "68%",
        percentage: 68,
        helperText: "Average score across assignments",
      },
    ],
    weeklyStudyHours,
    studyDays:
      approvedStudyDays.length > 0
        ? approvedStudyDays
        : schedule?.days ?? ["Mon", "Wed", "Sat"],
  };
};