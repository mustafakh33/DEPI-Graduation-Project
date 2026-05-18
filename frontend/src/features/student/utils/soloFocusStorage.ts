import type {
  SoloFocusStats,
  SoloStudyMaterial,
  SoloStudyTask,
} from "../types/student.types";
import { getTodayDate, getWeekKey, getYesterdayDate } from "./soloFocusTime";

export const STUDY_TASKS_STORAGE_KEY = "solo-focus-study-tasks";
export const STUDY_NOTE_STORAGE_KEY = "solo-focus-study-note";
export const STUDY_CALENDAR_STORAGE_KEY = "solo-focus-calendar-plans";
export const SELECTED_MATERIALS_STORAGE_KEY = "solo-focus-selected-materials";
export const FOCUS_STATS_STORAGE_KEY = "solo-focus-stats";
export const APPROVED_DAILY_STUDY_HOURS_KEY = "approved-daily-study-hours";
export const LAST_SESSION_QUIZ_SCORE_KEY = "last-session-quiz-score";

export const getDefaultFocusStats = (): SoloFocusStats => ({
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

export const resetCountersIfNeeded = (
  stats: SoloFocusStats
): SoloFocusStats => {
  const today = getTodayDate();
  const currentWeek = getWeekKey();

  let nextStats: SoloFocusStats = {
    ...stats,
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

export const updateStreakAfterApprovedSession = (stats: SoloFocusStats) => {
  const today = getTodayDate();

  if (stats.lastStudyDate === today) {
    return stats.streakDays;
  }

  if (stats.lastStudyDate === getYesterdayDate()) {
    return stats.streakDays + 1;
  }

  return 1;
};

export const getSavedFocusStats = (): SoloFocusStats => {
  const savedStats = localStorage.getItem(FOCUS_STATS_STORAGE_KEY);

  if (!savedStats) {
    return getDefaultFocusStats();
  }

  try {
    const parsedStats = JSON.parse(savedStats) as SoloFocusStats;
    return resetCountersIfNeeded(parsedStats);
  } catch {
    return getDefaultFocusStats();
  }
};

export const getSavedTasks = (): SoloStudyTask[] => {
  const savedTasks = localStorage.getItem(STUDY_TASKS_STORAGE_KEY);

  if (!savedTasks) {
    return [{ id: 1, title: "Review today’s lesson", isCompleted: false }];
  }

  try {
    return JSON.parse(savedTasks) as SoloStudyTask[];
  } catch {
    return [{ id: 1, title: "Review today’s lesson", isCompleted: false }];
  }
};

export const getSavedCalendarPlans = (): Record<string, string> => {
  const savedPlans = localStorage.getItem(STUDY_CALENDAR_STORAGE_KEY);

  if (!savedPlans) {
    return {};
  }

  try {
    return JSON.parse(savedPlans) as Record<string, string>;
  } catch {
    return {};
  }
};

export const getSavedSelectedMaterials = (): SoloStudyMaterial[] => {
  const savedMaterials = localStorage.getItem(SELECTED_MATERIALS_STORAGE_KEY);

  if (!savedMaterials) {
    return [];
  }

  try {
    return JSON.parse(savedMaterials) as SoloStudyMaterial[];
  } catch {
    return [];
  }
};

export const getSavedApprovedDailyStudyHours = (): Record<string, number> => {
  const savedDailyHours = localStorage.getItem(
    APPROVED_DAILY_STUDY_HOURS_KEY
  );

  if (!savedDailyHours) {
    return {};
  }

  try {
    return JSON.parse(savedDailyHours) as Record<string, number>;
  } catch {
    return {};
  }
};

export const saveApprovedDailyStudyHours = (approvedSeconds: number) => {
  const today = getTodayDate();
  const savedDailyHours = getSavedApprovedDailyStudyHours();

  const updatedDailyHours = {
    ...savedDailyHours,
    [today]: (savedDailyHours[today] ?? 0) + approvedSeconds,
  };

  localStorage.setItem(
    APPROVED_DAILY_STUDY_HOURS_KEY,
    JSON.stringify(updatedDailyHours)
  );
};