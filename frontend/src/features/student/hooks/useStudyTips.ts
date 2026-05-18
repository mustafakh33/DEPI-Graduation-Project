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

export interface StudyTip {
  title: string;
  description: string;
}

export interface StudyTipsSummary {
  totalStudyHours: number;
  attendancePercentage: number;
  absencePercentage: number;
  quizScore: number;
  assignmentScore: number;
  activeStudyDays: { day: string; hours: number }[];
  bestStudyDay: { day: string; hours: number };
  streakDays: number;
  coins: number;
  rank: number;
}

const APPROVED_DAILY_STUDY_HOURS_KEY = "approved-daily-study-hours";
const LAST_SESSION_QUIZ_SCORE_KEY = "last-session-quiz-score";
const SOLO_FOCUS_STATS_STORAGE_KEY = "solo-focus-stats";

const WEEKLY_TARGET_HOURS = 10;
const MOCK_ASSIGNMENT_SCORE = 68;

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

const getApprovedDailyStudyHours = (): Record<string, number> => {
  const savedHours = localStorage.getItem(APPROVED_DAILY_STUDY_HOURS_KEY);

  if (!savedHours) {
    return {};
  }

  try {
    return JSON.parse(savedHours) as Record<string, number>;
  } catch {
    return {};
  }
};

const getWeeklyStudyHours = () => {
  const approvedDailyStudyHours = getApprovedDailyStudyHours();

  return weekDays.map((day, index) => {
    const dateKey = getDateForWeekDay(index);
    const seconds = approvedDailyStudyHours[dateKey] ?? 0;

    return {
      day,
      hours: Number((seconds / 3600).toFixed(1)),
    };
  });
};

const getLastQuizScore = () => {
  const savedScore = localStorage.getItem(LAST_SESSION_QUIZ_SCORE_KEY);

  if (!savedScore) {
    return 0;
  }

  return Number(savedScore);
};

const getSoloFocusStats = (): SavedSoloFocusStats | null => {
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

const calculateCoins = (weeklyHours: number, streakDays: number) => {
  const coinsFromHours = Math.floor(weeklyHours / 5) * 100;
  const coinsFromStreak = Math.floor(streakDays / 5) * 50;

  return coinsFromHours + coinsFromStreak;
};

const calculateRank = (coins: number) => {
  const mockStudentsCoins = [950, 820, 740, 610, 520, 430, 350, 260, 180, 90];

  const studentsAboveCurrent = mockStudentsCoins.filter(
    (studentCoins) => studentCoins > coins
  ).length;

  return studentsAboveCurrent + 1;
};

const buildStudyTips = (summary: StudyTipsSummary): StudyTip[] => {
  const tips: StudyTip[] = [];

  if (summary.totalStudyHours === 0) {
    tips.push({
      title: "Start with one approved study session",
      description:
        "You do not have approved study hours yet this week. Start with one short solo session, choose a material, study for 25 minutes, then pass the quiz so the time appears in your Analytics.",
    });
  } else if (summary.totalStudyHours < WEEKLY_TARGET_HOURS / 2) {
    tips.push({
      title: "Increase your weekly study hours",
      description:
        "Your approved study hours are still below half of the weekly target. Try adding two short sessions this week and make sure you pass the quiz after each session.",
    });
  } else {
    tips.push({
      title: "Keep your study hours consistent",
      description:
        "Your study hours are moving in the right direction. Keep spreading your sessions across the week instead of studying everything in one day.",
    });
  }

  if (summary.attendancePercentage < 50) {
    tips.push({
      title: "Focus on improving attendance",
      description:
        "Your attendance percentage is low compared to your weekly goal. Try to join upcoming live sessions and finish approved solo sessions to increase your attendance progress.",
    });
  } else if (summary.attendancePercentage < 80) {
    tips.push({
      title: "Push your attendance higher",
      description:
        "Your attendance is acceptable, but there is still room to improve. Try not to miss sessions related to your active roadmap lesson.",
    });
  } else {
    tips.push({
      title: "Maintain your strong attendance",
      description:
        "Your attendance is strong. Keep joining live sessions on time and reviewing recordings after each class.",
    });
  }

  if (summary.absencePercentage > 50) {
    tips.push({
      title: "Reduce missed study commitment",
      description:
        "Your absence percentage is high. Plan smaller sessions during the week so you do not leave too much study time until the end.",
    });
  } else {
    tips.push({
      title: "Keep absence under control",
      description:
        "Your absence percentage is not too high. Keep following your schedule and avoid skipping your planned study days.",
    });
  }

  if (summary.quizScore === 0) {
    tips.push({
      title: "Complete more session quizzes",
      description:
        "There is no approved quiz score yet. After every solo session, finish the quiz so your score can be tracked and used to improve your recommendations.",
    });
  } else if (summary.quizScore < 50) {
    tips.push({
      title: "Review before submitting quizzes",
      description:
        "Your quiz score is below the passing level. Before ending a session, review the material, write quick notes, then answer the quiz carefully.",
    });
  } else if (summary.quizScore < 75) {
    tips.push({
      title: "Use quick recap before quizzes",
      description:
        "Your quiz score is okay, but you can improve it by explaining the lesson in your own words before submitting the quiz.",
    });
  } else {
    tips.push({
      title: "Keep using active recall",
      description:
        "Your quiz performance is strong. Keep closing the material and testing yourself from memory before moving to the next lesson.",
    });
  }

  if (summary.assignmentScore < 70) {
    tips.push({
      title: "Improve assignment quality",
      description:
        "Your assignment score needs improvement. Break every assignment into smaller parts: understand the requirements, solve the main logic, then improve design and details.",
    });
  } else {
    tips.push({
      title: "Use feedback to level up assignments",
      description:
        "Your assignment score is acceptable. To improve it, compare your solution with the lesson objectives and apply feedback from previous tasks.",
    });
  }

  if (summary.streakDays === 0) {
    tips.push({
      title: "Build a new study streak",
      description:
        "Your streak is currently zero. Start with a small approved session today, then repeat tomorrow to begin building consistency.",
    });
  } else if (summary.streakDays < 5) {
    tips.push({
      title: "Protect your current streak",
      description: `You have a ${summary.streakDays}-day streak. Try to complete at least one short approved session daily to reach the next streak reward.`,
    });
  } else {
    tips.push({
      title: "Use your streak as motivation",
      description: `Great work. Your ${summary.streakDays}-day streak shows consistency. Keep it going and use lighter days for revision instead of skipping study completely.`,
    });
  }

  if (summary.coins === 0) {
    tips.push({
      title: "Earn your first coins",
      description:
        "You do not have coins yet. Every 5 approved study hours gives you coins, and your streak can add extra rewards.",
    });
  } else {
    tips.push({
      title: "Use coins to improve your rank",
      description: `You currently have ${summary.coins} coins and rank #${summary.rank}. More approved hours and longer streaks will help you move higher in the ranking.`,
    });
  }

  if (summary.bestStudyDay.hours > 0) {
    tips.push({
      title: `Use ${summary.bestStudyDay.day} for harder lessons`,
      description: `Your strongest study day is ${summary.bestStudyDay.day} with ${summary.bestStudyDay.hours}h. Use this day for difficult lessons, and use lighter days for revision.`,
    });
  }

  return tips;
};

export const useStudyTips = () => {
  const weeklyStudyHours = getWeeklyStudyHours();

  const totalStudyHours = weeklyStudyHours.reduce(
    (total, day) => total + day.hours,
    0
  );

  const activeStudyDays = weeklyStudyHours.filter((day) => day.hours > 0);

  const bestStudyDay = [...weeklyStudyHours].sort(
    (firstDay, secondDay) => secondDay.hours - firstDay.hours
  )[0];

  const attendancePercentage =
    WEEKLY_TARGET_HOURS > 0
      ? Math.min(
          100,
          Math.round((totalStudyHours / WEEKLY_TARGET_HOURS) * 100)
        )
      : 0;

  const absencePercentage = Math.max(0, 100 - attendancePercentage);
  const quizScore = getLastQuizScore();
  const soloFocusStats = getSoloFocusStats();

  const streakDays = soloFocusStats?.streakDays ?? 0;
  const coins = calculateCoins(totalStudyHours, streakDays);
  const rank = calculateRank(coins);

  const summary: StudyTipsSummary = {
    totalStudyHours: Number(totalStudyHours.toFixed(1)),
    attendancePercentage,
    absencePercentage,
    quizScore,
    assignmentScore: MOCK_ASSIGNMENT_SCORE,
    activeStudyDays,
    bestStudyDay,
    streakDays,
    coins,
    rank,
  };

  return {
    summary,
    tips: buildStudyTips(summary),
  };
};