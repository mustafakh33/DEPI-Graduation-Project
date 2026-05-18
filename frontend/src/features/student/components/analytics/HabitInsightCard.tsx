import { useMemo, useState } from "react";

interface HabitInsightCardProps {
  studyDays: string[];
}

const APPROVED_DAILY_STUDY_HOURS_KEY = "approved-daily-study-hours";
const LAST_SESSION_QUIZ_SCORE_KEY = "last-session-quiz-score";
const SOLO_FOCUS_STATS_STORAGE_KEY = "solo-focus-stats";

const WEEKLY_TARGET_HOURS = 10;
const MOCK_ASSIGNMENT_SCORE = 68;

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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

interface AnalyticsSummary {
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

const buildStudyTips = (summary: AnalyticsSummary) => {
  const tips: { title: string; description: string }[] = [];

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
      description:
        `You have a ${summary.streakDays}-day streak. Try to complete at least one short approved session daily to reach the next streak reward.`,
    });
  } else {
    tips.push({
      title: "Use your streak as motivation",
      description:
        `Great work. Your ${summary.streakDays}-day streak shows consistency. Keep it going and use lighter days for revision instead of skipping study completely.`,
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
      description:
        `You currently have ${summary.coins} coins and rank #${summary.rank}. More approved hours and longer streaks will help you move higher in the ranking.`,
    });
  }

  if (summary.bestStudyDay.hours > 0) {
    tips.push({
      title: `Use ${summary.bestStudyDay.day} for harder lessons`,
      description:
        `Your strongest study day is ${summary.bestStudyDay.day} with ${summary.bestStudyDay.hours}h. Use this day for difficult lessons, and use lighter days for revision.`,
    });
  }

  return tips;
};

const HabitInsightCard = ({ studyDays }: HabitInsightCardProps) => {
  const [isTipsOpen, setIsTipsOpen] = useState(false);

  const formattedDays =
    studyDays.length > 0 ? studyDays.join(", ") : "your selected study days";

  const dayLabel = studyDays.length === 1 ? "this day" : "these days";

  const analyticsSummary = useMemo((): AnalyticsSummary => {
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

    return {
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
  }, [isTipsOpen]);

  const studyTips = useMemo(() => {
    return buildStudyTips(analyticsSummary);
  }, [analyticsSummary]);

  return (
    <>
      <section className="rounded-2xl border border-slate-800 bg-[#111827] p-6 shadow-sm">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
              Habit Insight
            </p>

            <h2 className="mt-2 text-2xl font-bold text-white">
              Build a stronger study routine
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
              You chose to study on{" "}
              <span className="font-semibold text-white">{formattedDays}</span>.
              I can help you use {dayLabel} better with tips based on your
              attendance, absence, quiz score, assignment score, study hours,
              streak, and rank.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsTipsOpen(true)}
            className="inline-flex shrink-0 items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Get Study Tips
          </button>
        </div>
      </section>

      {isTipsOpen ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
          <div className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-slate-800 bg-[#0f172a] text-white shadow-2xl">
            <div className="shrink-0 border-b border-slate-800 px-6 py-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-400">
                    Smart Study Tips
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-white">
                    Personalized learning advice
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                    These recommendations are currently generated from mock and
                    local analytics data. Later, the AI Agent can analyze each
                    student deeply and generate smarter personalized advice.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsTipsOpen(false)}
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close study tips"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <SummaryBox
                  label="Study hours"
                  value={`${analyticsSummary.totalStudyHours}h`}
                />

                <SummaryBox
                  label="Attendance"
                  value={`${analyticsSummary.attendancePercentage}%`}
                />

                <SummaryBox
                  label="Absence"
                  value={`${analyticsSummary.absencePercentage}%`}
                />

                <SummaryBox
                  label="Quiz score"
                  value={`${analyticsSummary.quizScore}%`}
                />

                <SummaryBox
                  label="Assignment score"
                  value={`${analyticsSummary.assignmentScore}%`}
                />

                <SummaryBox
                  label="Streak"
                  value={`${analyticsSummary.streakDays} days`}
                />

                <SummaryBox
                  label="Coins"
                  value={`${analyticsSummary.coins}`}
                />

                <SummaryBox
                  label="Rank"
                  value={`#${analyticsSummary.rank}`}
                />
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold text-white">
                  Recommended actions
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  These tips are generated from your current learning
                  performance and study activity.
                </p>

                <div className="mt-4 grid gap-4 lg:grid-cols-2">
                  {studyTips.map((tip, index) => (
                    <div
                      key={`${tip.title}-${index}`}
                      className="rounded-2xl border border-slate-800 bg-[#111827] p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-sm font-bold text-blue-300">
                          {index + 1}
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-white">
                            {tip.title}
                          </h4>

                          <p className="mt-2 text-sm leading-6 text-slate-400">
                            {tip.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="shrink-0 border-t border-slate-800 px-6 py-4">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsTipsOpen(false)}
                  className="rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

interface SummaryBoxProps {
  label: string;
  value: string;
}

const SummaryBox = ({ label, value }: SummaryBoxProps) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-[#111827] p-4">
      <p className="text-xs font-medium text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
    </div>
  );
};

export default HabitInsightCard;