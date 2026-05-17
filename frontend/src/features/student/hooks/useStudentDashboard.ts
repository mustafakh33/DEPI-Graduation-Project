import { useEffect, useState } from "react";
import { useOnboarding } from "@/features/onboarding/context/OnboardingContext";
import { useAuth } from "@/hooks/useAuth";
import {
  calculateRoadmapProgress,
  getContinueLearningPath,
  useRoadmap,
} from "./useRoadmap";
import type { StudentDashboardData } from "../types/student.types";

const SOLO_FOCUS_STATS_STORAGE_KEY = "solo-focus-stats";

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

interface MockRankingStudent {
  id: string;
  name: string;
  coins: number;
}

const getTodayDate = () => new Date().toISOString().slice(0, 10);

const getYesterdayDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10);
};

const getWeekKey = (date = new Date()) => {
  const copiedDate = new Date(date);
  copiedDate.setHours(0, 0, 0, 0);

  const day = copiedDate.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;

  copiedDate.setDate(copiedDate.getDate() + mondayOffset);

  return copiedDate.toISOString().slice(0, 10);
};

const getDefaultSoloFocusStats = (): SavedSoloFocusStats => ({
  weeklySeconds: 0,
  dailySeconds: 0,
  breakCount: 0,
  streakDays: 0,
  isRunning: false,
  lastStartedAt: null,
  lastStudyDate: null,
  currentDayKey: getTodayDate(),
  currentWeekKey: getWeekKey(),
});

const resetSoloFocusStatsIfNeeded = (
  stats: SavedSoloFocusStats
): SavedSoloFocusStats => {
  const today = getTodayDate();
  const currentWeek = getWeekKey();

  let nextStats: SavedSoloFocusStats = {
    ...stats,
    // مهم جدًا:
    // الـ dashboard/navbar ماينفعش يحسبوا وقت running session.
    // الوقت الرسمي يتحفظ فقط بعد نجاح الطالب في quiz.
    isRunning: false,
    lastStartedAt: null,
  };

  if (nextStats.currentDayKey !== today) {
    nextStats = {
      ...nextStats,
      dailySeconds: 0,
      breakCount: 0,
      currentDayKey: today,
    };
  }

  if (nextStats.currentWeekKey !== currentWeek) {
    nextStats = {
      ...nextStats,
      weeklySeconds: 0,
      currentWeekKey: currentWeek,
    };
  }

  if (
    nextStats.lastStudyDate &&
    nextStats.lastStudyDate !== today &&
    nextStats.lastStudyDate !== getYesterdayDate()
  ) {
    nextStats = {
      ...nextStats,
      streakDays: 0,
    };
  }

  return nextStats;
};

const getSoloFocusStatsFromStorage = (): SavedSoloFocusStats => {
  const savedStats = localStorage.getItem(SOLO_FOCUS_STATS_STORAGE_KEY);

  if (!savedStats) {
    return getDefaultSoloFocusStats();
  }

  try {
    const parsedStats = JSON.parse(savedStats) as SavedSoloFocusStats;
    const normalizedStats = resetSoloFocusStatsIfNeeded(parsedStats);

    localStorage.setItem(
      SOLO_FOCUS_STATS_STORAGE_KEY,
      JSON.stringify(normalizedStats)
    );

    return normalizedStats;
  } catch {
    return getDefaultSoloFocusStats();
  }
};

const calculateWeeklyGoalPercentage = (
  completedHours: number,
  targetHours: number
) => {
  if (targetHours === 0) {
    return 0;
  }

  return Math.min(100, Math.round((completedHours / targetHours) * 100));
};

const calculateCoins = (weeklyHours: number, streakDays: number) => {
  const coinsFromHours = Math.floor(weeklyHours / 5) * 100;
  const coinsFromStreak = Math.floor(streakDays / 5) * 50;

  return coinsFromHours + coinsFromStreak;
};

const getMockRankingStudents = (): MockRankingStudent[] => {
  return [
    { id: "student-1", name: "Tames Chen", coins: 950 },
    { id: "student-2", name: "Sarah Williams", coins: 820 },
    { id: "student-3", name: "Alex Johnson", coins: 740 },
    { id: "student-4", name: "Michael Ross", coins: 610 },
    { id: "student-5", name: "Emily Blunt", coins: 520 },
    { id: "student-6", name: "Sophia Lee", coins: 430 },
    { id: "student-7", name: "Mariam Hassan", coins: 350 },
    { id: "student-8", name: "Omar Khaled", coins: 260 },
    { id: "student-9", name: "Laila Samir", coins: 180 },
    { id: "student-10", name: "Youssef Ali", coins: 90 },
  ];
};

const calculateCurrentStudentRank = (
  studentName: string,
  currentCoins: number
) => {
  const rankedStudents = [
    {
      id: "current-student",
      name: studentName,
      coins: currentCoins,
    },
    ...getMockRankingStudents(),
  ]
    .sort((firstStudent, secondStudent) => {
      if (secondStudent.coins !== firstStudent.coins) {
        return secondStudent.coins - firstStudent.coins;
      }

      return firstStudent.name.localeCompare(secondStudent.name);
    })
    .map((student, index) => ({
      ...student,
      rank: index + 1,
    }));

  return (
    rankedStudents.find((student) => student.id === "current-student")?.rank ??
    rankedStudents.length
  );
};

export const useStudentDashboard = (): StudentDashboardData => {
  const { user: onboardingUser, schedule } = useOnboarding();
  const { user: authUser } = useAuth();
  const roadmap = useRoadmap();

  const [soloFocusStats, setSoloFocusStats] = useState<SavedSoloFocusStats>(
    getSoloFocusStatsFromStorage
  );

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSoloFocusStats(getSoloFocusStatsFromStorage());
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  const studentName =
    onboardingUser?.name?.trim() || authUser?.name?.trim() || "Student";

  const weeklyGoalTargetHours = schedule?.weeklyCommitment ?? 10;

  // دي الساعات الرسمية المعتمدة فقط.
  // يعني الساعات اللي اتسجلت بعد نجاح الطالب في quiz.
  const weeklyStudyHours = Number(
    (soloFocusStats.weeklySeconds / 3600).toFixed(1)
  );

  const streakDays = soloFocusStats.streakDays;
  const coins = calculateCoins(weeklyStudyHours, streakDays);
  const rank = calculateCurrentStudentRank(studentName, coins);

  const courseProgress = calculateRoadmapProgress(roadmap);
  const continueLearningPath = getContinueLearningPath(roadmap);

  return {
    studentName,
    weeklyGoal: {
      targetHours: weeklyGoalTargetHours,
      completedHours: weeklyStudyHours,
      percentage: calculateWeeklyGoalPercentage(
        weeklyStudyHours,
        weeklyGoalTargetHours
      ),
    },
    stats: {
      rank,
      streakDays,
      studyHours: weeklyStudyHours,
      coins,
    },
    currentCourse: {
      id: roadmap.trackId,
      title: roadmap.trackTitle,
      status: "in-progress",
      progress: courseProgress,
      lastLessonPath: continueLearningPath,
    },
  };
};