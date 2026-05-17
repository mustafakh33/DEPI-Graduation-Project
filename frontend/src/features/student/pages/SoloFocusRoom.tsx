import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ClipboardCheck,
  Coffee,
  Eye,
  FileText,
  Map,
  Music2,
  Pause,
  Play,
  Plus,
  Save,
  StickyNote,
  X,
} from "lucide-react";
import { Link } from "react-router";
import { useRoadmap } from "@/features/student/hooks/useRoadmap";
import type {
  SoloFocusActivePanel,
  SoloFocusMusicTrackId,
  SoloFocusStats,
  SoloStudyMaterial,
  SoloStudyTask,
} from "@/features/student/types/student.types";

const STUDY_TASKS_STORAGE_KEY = "solo-focus-study-tasks";
const STUDY_NOTE_STORAGE_KEY = "solo-focus-study-note";
const STUDY_CALENDAR_STORAGE_KEY = "solo-focus-calendar-plans";
const SELECTED_MATERIALS_STORAGE_KEY = "solo-focus-selected-materials";
const FOCUS_STATS_STORAGE_KEY = "solo-focus-stats";
const STUDENT_NOTIFICATIONS_STORAGE_KEY = "student-notifications";

const MIN_AUTO_BREAK_DELAY_MS = 60 * 60 * 1000;
const MAX_AUTO_BREAK_DELAY_MS = 3 * 60 * 60 * 1000;

interface StudentNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "break" | "quiz" | "assignment" | "login" | "signup";
  isRead: boolean;
  createdAt: number;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizResult {
  score: number;
  passed: boolean;
  correctAnswers: number;
  totalQuestions: number;
}

const PASSING_SCORE = 50;

const MUSIC_TRACKS: Record<
  SoloFocusMusicTrackId,
  { title: string; src: string }
> = {
  lofi: {
    title: "Lofi Library",
    src: "/music/Lofi.mp3",
  },
  rain: {
    title: "Soft Rain",
    src: "/music/Soft-rain.mp3",
  },
};

const getTodayDate = () => new Date().toISOString().slice(0, 10);

const getYesterdayDate = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date.toISOString().slice(0, 10);
};

const getCurrentTime = () => {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getRandomAutoBreakDelay = () => {
  return Math.floor(
    Math.random() * (MAX_AUTO_BREAK_DELAY_MS - MIN_AUTO_BREAK_DELAY_MS + 1) +
      MIN_AUTO_BREAK_DELAY_MS
  );
};

const saveStudentNotification = (notification: StudentNotification) => {
  const savedNotifications = localStorage.getItem(
    STUDENT_NOTIFICATIONS_STORAGE_KEY
  );

  let notifications: StudentNotification[] = [];

  if (savedNotifications) {
    try {
      notifications = JSON.parse(savedNotifications) as StudentNotification[];
    } catch {
      notifications = [];
    }
  }

  localStorage.setItem(
    STUDENT_NOTIFICATIONS_STORAGE_KEY,
    JSON.stringify([notification, ...notifications])
  );
};

const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    return;
  }

  if (Notification.permission === "default") {
    await Notification.requestPermission();
  }
};

const showBrowserBreakNotification = () => {
  if (!("Notification" in window)) {
    return;
  }

  if (Notification.permission !== "granted") {
    return;
  }

  new Notification("Time for a break", {
    body: "Your focus timer has been paused automatically.",
  });
};

const exitFullScreenIfActive = async () => {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    }
  } catch {
    // Fullscreen exit is optional.
  }
};

const getWeekKey = (date = new Date()) => {
  const copiedDate = new Date(date);
  copiedDate.setHours(0, 0, 0, 0);

  const day = copiedDate.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;

  copiedDate.setDate(copiedDate.getDate() + mondayOffset);

  return copiedDate.toISOString().slice(0, 10);
};

const getDefaultFocusStats = (): SoloFocusStats => ({
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

const resetCountersIfNeeded = (stats: SoloFocusStats): SoloFocusStats => {
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

const updateStreakAfterApprovedSession = (stats: SoloFocusStats) => {
  const today = getTodayDate();

  if (stats.lastStudyDate === today) {
    return stats.streakDays;
  }

  if (stats.lastStudyDate === getYesterdayDate()) {
    return stats.streakDays + 1;
  }

  return 1;
};

const getSavedFocusStats = (): SoloFocusStats => {
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

const getSavedTasks = (): SoloStudyTask[] => {
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

const getSavedCalendarPlans = (): Record<string, string> => {
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

const getSavedSelectedMaterials = (): SoloStudyMaterial[] => {
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

const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");
};

const getMockQuizQuestions = (trackId: string): QuizQuestion[] => {
  if (trackId === "ai-data-science") {
    return [
      {
        id: "ai-q1",
        question: "What is the main goal of data cleaning?",
        options: [
          "To make data ready for analysis",
          "To delete all rows",
          "To make charts only",
          "To change the programming language",
        ],
        correctAnswer: "To make data ready for analysis",
      },
      {
        id: "ai-q2",
        question: "Mean, median, and variance are related to which topic?",
        options: ["HTML", "Statistics", "Routing", "Authentication"],
        correctAnswer: "Statistics",
      },
      {
        id: "ai-q3",
        question: "In machine learning, features are used to help the model learn patterns.",
        options: ["True", "False"],
        correctAnswer: "True",
      },
      {
        id: "ai-q4",
        question: "Python dictionaries store data as:",
        options: [
          "Key-value pairs",
          "Only images",
          "Only CSS styles",
          "HTML tags",
        ],
        correctAnswer: "Key-value pairs",
      },
    ];
  }

  if (trackId === "mobile-development") {
    return [
      {
        id: "mobile-q1",
        question: "Mobile-first design means starting with which screen size?",
        options: ["Small screens", "Large TVs", "Projectors", "Printers"],
        correctAnswer: "Small screens",
      },
      {
        id: "mobile-q2",
        question: "React Native is used to build mobile app interfaces.",
        options: ["True", "False"],
        correctAnswer: "True",
      },
      {
        id: "mobile-q3",
        question: "Navigation in mobile apps helps users move between:",
        options: ["Screens", "Fonts only", "Colors only", "Files only"],
        correctAnswer: "Screens",
      },
      {
        id: "mobile-q4",
        question: "Local storage is useful for saving small data on the device.",
        options: ["True", "False"],
        correctAnswer: "True",
      },
    ];
  }

  if (trackId === "cybersecurity") {
    return [
      {
        id: "cyber-q1",
        question: "Ports and protocols are part of networking basics.",
        options: ["True", "False"],
        correctAnswer: "True",
      },
      {
        id: "cyber-q2",
        question: "OWASP focuses on common security risks, especially in:",
        options: ["Web applications", "Cooking", "Video editing", "Typography"],
        correctAnswer: "Web applications",
      },
      {
        id: "cyber-q3",
        question: "Authentication is related to checking user identity.",
        options: ["True", "False"],
        correctAnswer: "True",
      },
      {
        id: "cyber-q4",
        question: "Logs can help detect suspicious activity.",
        options: ["True", "False"],
        correctAnswer: "True",
      },
    ];
  }

  return [
    {
      id: "web-q1",
      question: "HTML is mainly used for:",
      options: [
        "Page structure",
        "Database hosting",
        "Operating systems",
        "Image compression",
      ],
      correctAnswer: "Page structure",
    },
    {
      id: "web-q2",
      question: "CSS is used to style web pages.",
      options: ["True", "False"],
      correctAnswer: "True",
    },
    {
      id: "web-q3",
      question: "Flexbox and Grid are used for:",
      options: ["Layout", "Authentication", "Databases", "Audio editing"],
      correctAnswer: "Layout",
    },
    {
      id: "web-q4",
      question: "React components help build reusable UI parts.",
      options: ["True", "False"],
      correctAnswer: "True",
    },
  ];
};

const SoloFocusRoom = () => {
  const roadmap = useRoadmap();

  const [focusStats, setFocusStats] =
    useState<SoloFocusStats>(getSavedFocusStats);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoBreakTimeoutRef = useRef<number | null>(null);

  const [isSessionRunning, setIsSessionRunning] = useState(false);
  const [sessionSeconds, setSessionSeconds] = useState(0);

  const [activeTrack, setActiveTrack] =
    useState<SoloFocusMusicTrackId | null>(null);

  const [tasks, setTasks] = useState<SoloStudyTask[]>(getSavedTasks);
  const [newTask, setNewTask] = useState("");

  const [activePanel, setActivePanel] = useState<SoloFocusActivePanel>(null);

  const [note, setNote] = useState(
    () => localStorage.getItem(STUDY_NOTE_STORAGE_KEY) ?? ""
  );

  const [selectedDate, setSelectedDate] = useState(getTodayDate);
  const [calendarPlans, setCalendarPlans] = useState<Record<string, string>>(
    getSavedCalendarPlans
  );

  const [selectedMaterials, setSelectedMaterials] =
    useState<SoloStudyMaterial[]>(getSavedSelectedMaterials);

  const [quizMaterials, setQuizMaterials] = useState<SoloStudyMaterial[]>([]);
  const [openedMaterial, setOpenedMaterial] =
    useState<SoloStudyMaterial | null>(null);

  const [timerWarning, setTimerWarning] = useState("");
  const [autoBreakMessage, setAutoBreakMessage] = useState("");
  const [isBreakModalOpen, setIsBreakModalOpen] = useState(false);

  const quizQuestions = getMockQuizQuestions(roadmap.trackId);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [quizWarning, setQuizWarning] = useState("");

  const hasSelectedMaterials = selectedMaterials.length > 0;

  const availableMaterials: SoloStudyMaterial[] = roadmap.modules.flatMap(
    (module) =>
      module.lessons
        .filter(
          (lesson) =>
            lesson.status === "completed" || lesson.status === "active"
        )
        .map((lesson) => ({
          id: lesson.id,
          lessonTitle: lesson.title,
          fileName: `${lesson.title} Material.pdf`,
          fileUrl: "/materials/UNI-HUP.pdf",
        }))
  );

  useEffect(() => {
    if (!isSessionRunning) {
      return;
    }

    const timer = window.setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isSessionRunning]);

  useEffect(() => {
    if (!isSessionRunning || !hasSelectedMaterials) {
      if (autoBreakTimeoutRef.current) {
        window.clearTimeout(autoBreakTimeoutRef.current);
        autoBreakTimeoutRef.current = null;
      }

      return;
    }

    const autoBreakDelay = getRandomAutoBreakDelay();

    autoBreakTimeoutRef.current = window.setTimeout(() => {
      const notification: StudentNotification = {
        id: `break-${Date.now()}`,
        title: "Time for a break",
        description:
          "Your focus timer has been paused automatically. Take a short break or resume when you are ready.",
        time: getCurrentTime(),
        type: "break",
        isRead: false,
        createdAt: Date.now(),
      };

      saveStudentNotification(notification);
      showBrowserBreakNotification();
      void exitFullScreenIfActive();

      setAutoBreakMessage(
        "Time for a break. The timer has been paused automatically."
      );
      setIsBreakModalOpen(true);
      setIsSessionRunning(false);

      setFocusStats((prev) => ({
        ...resetCountersIfNeeded(prev),
        breakCount: resetCountersIfNeeded(prev).breakCount + 1,
      }));
    }, autoBreakDelay);

    return () => {
      if (autoBreakTimeoutRef.current) {
        window.clearTimeout(autoBreakTimeoutRef.current);
        autoBreakTimeoutRef.current = null;
      }
    };
  }, [isSessionRunning, hasSelectedMaterials]);

  useEffect(() => {
    localStorage.setItem(FOCUS_STATS_STORAGE_KEY, JSON.stringify(focusStats));
  }, [focusStats]);

  useEffect(() => {
    localStorage.setItem(STUDY_TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STUDY_NOTE_STORAGE_KEY, note);
  }, [note]);

  useEffect(() => {
    localStorage.setItem(
      STUDY_CALENDAR_STORAGE_KEY,
      JSON.stringify(calendarPlans)
    );
  }, [calendarPlans]);

  useEffect(() => {
    localStorage.setItem(
      SELECTED_MATERIALS_STORAGE_KEY,
      JSON.stringify(selectedMaterials)
    );
  }, [selectedMaterials]);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();

      if (autoBreakTimeoutRef.current) {
        window.clearTimeout(autoBreakTimeoutRef.current);
      }
    };
  }, []);

  const startFocusTimer = () => {
    setTimerWarning("");
    setAutoBreakMessage("");
    setIsBreakModalOpen(false);
    setIsSessionRunning(true);
  };

  const handleToggleTimer = () => {
    if (!hasSelectedMaterials && !isSessionRunning) {
      setTimerWarning("Choose at least one material before starting the timer.");
      setActivePanel("materials");
      return;
    }

    if (!isSessionRunning) {
      void requestNotificationPermission();
    }

    setTimerWarning("");
    setAutoBreakMessage("");
    setIsSessionRunning((prev) => !prev);

    if (isSessionRunning) {
      setFocusStats((prev) => ({
        ...resetCountersIfNeeded(prev),
        breakCount: resetCountersIfNeeded(prev).breakCount + 1,
      }));
    }
  };

  const handleResumeFromBreak = () => {
    if (!hasSelectedMaterials) {
      setTimerWarning("Choose at least one material before starting the timer.");
      setActivePanel("materials");
      setIsBreakModalOpen(false);
      return;
    }

    void requestNotificationPermission();
    startFocusTimer();
  };

  const openSessionQuiz = () => {
    if (sessionSeconds === 0) {
      setTimerWarning("Start studying first before ending the session.");
      return;
    }

    if (selectedMaterials.length === 0) {
      setTimerWarning("Choose at least one material before ending the session.");
      setActivePanel("materials");
      return;
    }

    setIsSessionRunning(false);
    setOpenedMaterial(null);
    setIsBreakModalOpen(false);
    setQuizMaterials(selectedMaterials);
    setQuizAnswers({});
    setQuizResult(null);
    setQuizWarning("");
    setActivePanel("quiz");
  };

  const approveSessionHours = () => {
    const approvedSeconds = sessionSeconds;

    setFocusStats((prev) => {
      const normalizedStats = resetCountersIfNeeded(prev);
      const today = getTodayDate();

      return {
        ...normalizedStats,
        weeklySeconds: normalizedStats.weeklySeconds + approvedSeconds,
        dailySeconds: normalizedStats.dailySeconds + approvedSeconds,
        streakDays: updateStreakAfterApprovedSession(normalizedStats),
        lastStudyDate: today,
        isRunning: false,
        lastStartedAt: null,
      };
    });

    setSessionSeconds(0);
    setSelectedMaterials([]);
    setQuizMaterials([]);
    setQuizAnswers({});
    setQuizResult(null);
    setActivePanel(null);
    localStorage.removeItem(SELECTED_MATERIALS_STORAGE_KEY);
  };

  const discardSessionHours = () => {
    setIsSessionRunning(false);
    setSessionSeconds(0);
    setSelectedMaterials([]);
    setQuizMaterials([]);
    setQuizAnswers({});
    setQuizResult(null);
    setQuizWarning("");
    setActivePanel(null);
    localStorage.removeItem(SELECTED_MATERIALS_STORAGE_KEY);
  };

  const retrySession = () => {
    setIsSessionRunning(false);
    setSessionSeconds(0);
    setQuizAnswers({});
    setQuizResult(null);
    setQuizWarning("");
    setActivePanel(null);
  };

  const handleSubmitQuiz = () => {
    const hasAnsweredAllQuestions = quizQuestions.every(
      (question) => quizAnswers[question.id]
    );

    if (!hasAnsweredAllQuestions) {
      setQuizWarning("Please answer all questions before submitting.");
      return;
    }

    const correctAnswers = quizQuestions.filter(
      (question) => quizAnswers[question.id] === question.correctAnswer
    ).length;

    const score = Math.round((correctAnswers / quizQuestions.length) * 100);
    const passed = score >= PASSING_SCORE;

    setQuizWarning("");
    setQuizResult({
      score,
      passed,
      correctAnswers,
      totalQuestions: quizQuestions.length,
    });
  };

  const handleToggleMusic = (trackId: SoloFocusMusicTrackId) => {
    const selectedTrack = MUSIC_TRACKS[trackId];

    if (activeTrack === trackId) {
      audioRef.current?.pause();
      audioRef.current = null;
      setActiveTrack(null);
      return;
    }

    audioRef.current?.pause();

    const audio = new Audio(selectedTrack.src);
    audio.loop = true;
    audio.volume = 0.5;

    audio
      .play()
      .then(() => {
        audioRef.current = audio;
        setActiveTrack(trackId);
      })
      .catch(() => {
        setActiveTrack(null);
      });
  };

  const handleAddTask = () => {
    const trimmedTask = newTask.trim();

    if (!trimmedTask) {
      return;
    }

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: trimmedTask,
        isCompleted: false,
      },
    ]);

    setNewTask("");
  };

  const handleToggleTask = (taskId: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      )
    );
  };

  const handleRemoveTask = (taskId: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const handleCalendarPlanChange = (value: string) => {
    setCalendarPlans((prev) => ({
      ...prev,
      [selectedDate]: value,
    }));
  };

  const handleSelectMaterial = (material: SoloStudyMaterial) => {
    setSelectedMaterials((prev) => {
      const isAlreadySelected = prev.some((item) => item.id === material.id);

      if (isAlreadySelected) {
        return prev;
      }

      return [...prev, material];
    });

    setOpenedMaterial(material);
    setTimerWarning("");
    setActivePanel(null);
  };

  const handleOpenMaterial = (material: SoloStudyMaterial) => {
    setOpenedMaterial(material);
  };

  const weeklyHours = (focusStats.weeklySeconds / 3600).toFixed(1);
  const dailyHours = (focusStats.dailySeconds / 3600).toFixed(1);
  const selectedDayPlan = calendarPlans[selectedDate] ?? "";

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url('/Main.png')" }}
    >
      <div className="min-h-screen bg-black/25 px-6 py-6">
        <div className="mx-auto mb-4 flex max-w-6xl items-center justify-between">
          <Link
            to="/student/roadmap"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-950/35 px-4 py-2 text-xs font-semibold text-cyan-100 backdrop-blur-md transition hover:bg-slate-950/50"
          >
            <Map className="size-4" />
            Back to Roadmap
          </Link>

          <button
            type="button"
            onClick={openSessionQuiz}
            className="rounded-xl bg-red-500/80 px-4 py-2 text-xs font-bold text-white transition hover:bg-red-500"
          >
            End Session
          </button>
        </div>

        <div className="mx-auto grid min-h-[calc(100vh-96px)] max-w-6xl items-center gap-5 lg:grid-cols-[230px_1fr_230px]">
          <aside className="space-y-4">
            <GlassCard>
              <p className="text-sm font-bold text-white">Solo Focus Room</p>

              <p className="mt-2 text-[11px] leading-5 text-slate-200">
                Your approved hours only count after passing the session quiz.
              </p>

              <div className="mt-4 space-y-2">
                <StatRow label="Approved Weekly Hours" value={`${weeklyHours}h`} />
                <StatRow label="Today Approved" value={`${dailyHours}h`} />
                <StatRow
                  label="Focus Streak"
                  value={`${focusStats.streakDays} Days`}
                />
              </div>
            </GlassCard>

            <GlassCard>
              <div className="mb-3 flex items-center gap-2">
                <Music2 className="size-4 text-cyan-300" />
                <p className="text-sm font-bold text-white">Ambient Sound</p>
              </div>

              <button
                type="button"
                onClick={() => handleToggleMusic("lofi")}
                className="flex w-full items-center justify-between rounded-xl bg-cyan-400/20 px-3 py-2.5 text-xs text-cyan-100 transition hover:bg-cyan-400/30"
              >
                <span>{MUSIC_TRACKS.lofi.title}</span>
                {activeTrack === "lofi" ? (
                  <Pause className="size-4" />
                ) : (
                  <Play className="size-4" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleToggleMusic("rain")}
                className="mt-2 flex w-full items-center justify-between rounded-xl bg-white/10 px-3 py-2.5 text-xs text-slate-200 transition hover:bg-white/15"
              >
                <span>{MUSIC_TRACKS.rain.title}</span>
                {activeTrack === "rain" ? (
                  <Pause className="size-4" />
                ) : (
                  <Play className="size-4" />
                )}
              </button>
            </GlassCard>
          </aside>

          <section className="flex flex-col items-center justify-center gap-4">
            <GlassCard className="w-full max-w-[440px] text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300">
                Current Session Time
              </p>

              <h1 className="mt-4 text-5xl font-black tracking-tight md:text-6xl">
                {formatTime(sessionSeconds)}
              </h1>

              <button
                type="button"
                onClick={handleToggleTimer}
                disabled={!hasSelectedMaterials && !isSessionRunning}
                className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3.5 text-sm font-bold transition ${
                  !hasSelectedMaterials && !isSessionRunning
                    ? "cursor-not-allowed bg-slate-500/70 text-slate-200"
                    : "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
                }`}
              >
                {isSessionRunning ? (
                  <>
                    <Pause className="size-5" />
                    Take Break
                  </>
                ) : (
                  <>
                    <Play className="size-5" />
                    Start Session
                  </>
                )}
              </button>

              {autoBreakMessage ? (
                <div className="mt-3 rounded-xl bg-yellow-400/15 px-3 py-3 text-left">
                  <p className="text-xs font-bold text-yellow-200">
                    {autoBreakMessage}
                  </p>

                  <p className="mt-1 text-[11px] leading-5 text-yellow-100/80">
                    Your current session time is still pending until you pass the
                    quiz.
                  </p>
                </div>
              ) : timerWarning ? (
                <p className="mt-3 rounded-xl bg-red-500/15 px-3 py-2 text-xs font-semibold text-red-200">
                  {timerWarning}
                </p>
              ) : !hasSelectedMaterials ? (
                <p className="mt-3 rounded-xl bg-cyan-400/10 px-3 py-2 text-xs font-semibold text-cyan-100">
                  Choose a material first to unlock the timer.
                </p>
              ) : null}

              <div className="mt-4 flex justify-center gap-5 text-xs text-slate-200">
                <span>Pending: {formatTime(sessionSeconds)}</span>
                <span>Breaks: {focusStats.breakCount}</span>
              </div>
            </GlassCard>

            <GlassCard className="w-full max-w-[440px]">
              <div className="mb-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="size-4 text-cyan-300" />
                  <p className="text-sm font-bold text-white">
                    Study Materials
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActivePanel("materials")}
                  className="inline-flex items-center gap-1 rounded-xl bg-cyan-400 px-3 py-2 text-[11px] font-bold text-slate-950 transition hover:bg-cyan-300"
                >
                  <Plus className="size-3" />
                  Add
                </button>
              </div>

              {selectedMaterials.length > 0 ? (
                <div className="space-y-2">
                  {selectedMaterials.map((material) => (
                    <div
                      key={material.id}
                      className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5"
                    >
                      <FileText className="size-4 shrink-0 text-cyan-300" />

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-semibold text-white">
                          {material.lessonTitle}
                        </p>

                        <p className="truncate text-[10px] text-slate-300">
                          {material.fileName}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOpenMaterial(material)}
                        className="text-cyan-300 transition hover:text-cyan-100"
                        title="Open material"
                      >
                        <Eye className="size-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setActivePanel("materials")}
                  className="flex min-h-[95px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/25 bg-white/10 p-4 text-center transition hover:border-cyan-300 hover:bg-cyan-400/10"
                >
                  <FileText className="size-7 text-cyan-300" />

                  <p className="mt-2 text-sm font-semibold text-white">
                    Choose material from roadmap
                  </p>

                  <p className="mt-1 text-[11px] text-slate-300">
                    Select from opened lessons in your track.
                  </p>
                </button>
              )}
            </GlassCard>
          </section>

          <aside className="space-y-4">
            <GlassCard>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                Session Goals
              </p>

              <div className="mt-3 space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2.5"
                  >
                    <button
                      type="button"
                      onClick={() => handleToggleTask(task.id)}
                      className="flex size-5 shrink-0 items-center justify-center rounded-md border border-cyan-300/60"
                    >
                      {task.isCompleted ? <Check className="size-3" /> : null}
                    </button>

                    <span
                      className={`flex-1 text-xs ${
                        task.isCompleted
                          ? "text-slate-400 line-through"
                          : "text-white"
                      }`}
                    >
                      {task.title}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleRemoveTask(task.id)}
                      className="text-slate-300 hover:text-white"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex gap-2">
                <input
                  value={newTask}
                  onChange={(event) => setNewTask(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleAddTask();
                    }
                  }}
                  placeholder="Add task"
                  className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-xs text-white outline-none placeholder:text-slate-300 focus:border-cyan-300"
                />

                <button
                  type="button"
                  onClick={handleAddTask}
                  className="flex size-9 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-cyan-400 hover:text-slate-950"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </GlassCard>

            <GlassCard>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                Quick Actions
              </p>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setActivePanel("note")}
                  className="rounded-xl bg-white/10 p-4 text-center transition hover:bg-white/15"
                >
                  <StickyNote className="mx-auto size-6 text-cyan-300" />
                  <p className="mt-2 text-xs font-semibold">Note</p>
                </button>

                <button
                  type="button"
                  onClick={() => setActivePanel("calendar")}
                  className="rounded-xl bg-white/10 p-4 text-center transition hover:bg-white/15"
                >
                  <CalendarDays className="mx-auto size-6 text-cyan-300" />
                  <p className="mt-2 text-xs font-semibold">Calendar</p>
                </button>
              </div>
            </GlassCard>
          </aside>
        </div>
      </div>

      {openedMaterial ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm">
          <div className="flex h-[92vh] w-full max-w-6xl flex-col rounded-[28px] border border-white/15 bg-slate-950/95 text-white shadow-2xl">
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-5 py-4">
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-300">
                  Material Viewer
                </p>

                <h2 className="mt-1 truncate text-lg font-bold text-white">
                  {openedMaterial.lessonTitle}
                </h2>

                <p className="mt-1 truncate text-xs text-slate-300">
                  {openedMaterial.fileName}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpenedMaterial(null)}
                className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-slate-200 transition hover:bg-white/20 hover:text-white"
                aria-label="Close material viewer"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 bg-slate-950">
              <iframe
                src={openedMaterial.fileUrl}
                title={openedMaterial.lessonTitle}
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      ) : null}

      {activePanel ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[28px] border border-white/15 bg-slate-950/80 p-5 text-white shadow-2xl backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
                  {activePanel === "note"
                    ? "Study Note"
                    : activePanel === "calendar"
                      ? "Study Calendar"
                      : activePanel === "materials"
                        ? "Study Materials"
                        : "Session Quiz"}
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  {activePanel === "note"
                    ? "Write your notes"
                    : activePanel === "calendar"
                      ? "Plan your study day"
                      : activePanel === "materials"
                        ? "Choose material"
                        : "Pass the quiz to save your time"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setActivePanel(null)}
                className="flex size-9 items-center justify-center rounded-full bg-white/10 text-slate-200 transition hover:bg-white/20 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            {activePanel === "note" ? (
              <div>
                <textarea
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  placeholder="Write anything you want to remember..."
                  className="min-h-[220px] w-full resize-none rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-6 text-white outline-none placeholder:text-slate-400 focus:border-cyan-300"
                />

                <div className="mt-4 flex items-center gap-2 text-xs text-slate-300">
                  <Save className="size-4 text-cyan-300" />
                  Saved automatically
                </div>
              </div>
            ) : activePanel === "calendar" ? (
              <div>
                <label className="text-xs font-semibold text-slate-300">
                  Choose date
                </label>

                <input
                  type="date"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
                />

                <label className="mt-4 block text-xs font-semibold text-slate-300">
                  Plan for this day
                </label>

                <textarea
                  value={selectedDayPlan}
                  onChange={(event) =>
                    handleCalendarPlanChange(event.target.value)
                  }
                  placeholder="Example: Finish HTML lesson, revise CSS, solve quiz..."
                  className="mt-2 min-h-[180px] w-full resize-none rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-6 text-white outline-none placeholder:text-slate-400 focus:border-cyan-300"
                />

                <div className="mt-4 flex items-center gap-2 text-xs text-slate-300">
                  <Save className="size-4 text-cyan-300" />
                  Plan saved automatically for {selectedDate}
                </div>
              </div>
            ) : activePanel === "materials" ? (
              <div>
                <p className="mb-4 text-xs leading-5 text-slate-300">
                  These materials are collected from your opened roadmap lessons.
                  Choose one to add it to your session.
                </p>

                <div className="max-h-[300px] space-y-2 overflow-y-auto pr-1">
                  {availableMaterials.length > 0 ? (
                    availableMaterials.map((material) => {
                      const isSelected = selectedMaterials.some(
                        (item) => item.id === material.id
                      );

                      return (
                        <button
                          key={material.id}
                          type="button"
                          onClick={() => handleSelectMaterial(material)}
                          className="flex w-full items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-left transition hover:bg-cyan-400/15"
                        >
                          <FileText className="size-5 shrink-0 text-cyan-300" />

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-white">
                              {material.lessonTitle}
                            </p>

                            <p className="truncate text-xs text-slate-300">
                              {material.fileName}
                            </p>
                          </div>

                          {isSelected ? (
                            <span className="rounded-full bg-cyan-400 px-2 py-1 text-[10px] font-bold text-slate-950">
                              Added
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold text-cyan-300">
                              Add
                            </span>
                          )}
                        </button>
                      );
                    })
                  ) : (
                    <div className="rounded-2xl bg-white/10 p-4 text-center text-sm text-slate-300">
                      No opened lessons yet.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4 rounded-2xl bg-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <ClipboardCheck className="size-6 text-cyan-300" />

                    <div>
                      <p className="text-sm font-bold text-white">
                        Session Quiz
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-300">
                        You must score at least {PASSING_SCORE}% to save{" "}
                        {formatTime(sessionSeconds)} as approved study time.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-4 space-y-2">
                  {quizMaterials.map((material) => (
                    <div
                      key={material.id}
                      className="rounded-xl bg-white/10 px-4 py-3"
                    >
                      <p className="text-xs font-semibold text-white">
                        {material.lessonTitle}
                      </p>

                      <p className="mt-1 text-[10px] text-slate-300">
                        {material.fileName}
                      </p>
                    </div>
                  ))}
                </div>

                {quizResult ? (
                  <div
                    className={`rounded-2xl p-4 ${
                      quizResult.passed ? "bg-emerald-500/15" : "bg-red-500/15"
                    }`}
                  >
                    <p
                      className={`text-sm font-bold ${
                        quizResult.passed ? "text-emerald-200" : "text-red-200"
                      }`}
                    >
                      Your score: {quizResult.score}%
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-300">
                      You answered {quizResult.correctAnswers} of{" "}
                      {quizResult.totalQuestions} questions correctly.
                    </p>

                    {quizResult.passed ? (
                      <div className="mt-4">
                        <p className="text-xs leading-5 text-emerald-100">
                          Great job. Your session time will now be saved to your
                          approved weekly hours.
                        </p>

                        <button
                          type="button"
                          onClick={approveSessionHours}
                          className="mt-4 w-full rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-emerald-300"
                        >
                          Save Hours & Finish Session
                        </button>
                      </div>
                    ) : (
                      <div className="mt-4 space-y-2">
                        <p className="text-xs leading-5 text-red-100">
                          You did not pass. This session time will not be added
                          to your approved hours unless you study again and pass.
                        </p>

                        <button
                          type="button"
                          onClick={retrySession}
                          className="w-full rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                        >
                          Retry Session
                        </button>

                        <button
                          type="button"
                          onClick={discardSessionHours}
                          className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
                        >
                          Exit Without Saving
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="max-h-[360px] space-y-4 overflow-y-auto pr-1">
                    {quizQuestions.map((question, questionIndex) => (
                      <div
                        key={question.id}
                        className="rounded-2xl bg-white/10 p-4"
                      >
                        <p className="text-sm font-bold text-white">
                          {questionIndex + 1}. {question.question}
                        </p>

                        <div className="mt-3 space-y-2">
                          {question.options.map((option) => (
                            <label
                              key={option}
                              className="flex cursor-pointer items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:bg-white/10"
                            >
                              <input
                                type="radio"
                                name={question.id}
                                value={option}
                                checked={quizAnswers[question.id] === option}
                                onChange={() =>
                                  setQuizAnswers((prev) => ({
                                    ...prev,
                                    [question.id]: option,
                                  }))
                                }
                              />

                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}

                    {quizWarning ? (
                      <p className="rounded-xl bg-red-500/15 px-3 py-2 text-xs font-semibold text-red-200">
                        {quizWarning}
                      </p>
                    ) : null}

                    <button
                      type="button"
                      onClick={handleSubmitQuiz}
                      className="w-full rounded-xl bg-cyan-400 px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
                    >
                      Submit Quiz
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : null}

      {isBreakModalOpen ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 px-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-[28px] border border-yellow-300/30 bg-slate-950 p-6 text-white shadow-2xl shadow-yellow-500/10">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-yellow-300 text-slate-950">
              <Coffee className="size-8" />
            </div>

            <div className="mt-5 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-yellow-300">
                Break Reminder
              </p>

              <h2 className="mt-3 text-2xl font-black text-white">
                Time for a break
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-300">
                Your focus timer has been paused automatically. Take a short
                break, then resume when you are ready.
              </p>
            </div>

            <div className="mt-5 rounded-2xl bg-yellow-300/10 p-4">
              <div className="flex items-start gap-3">
                <Bell className="mt-0.5 size-5 shrink-0 text-yellow-300" />

                <p className="text-xs leading-5 text-yellow-100">
                  This reminder appears above the material viewer and other
                  panels so you do not miss that the timer has stopped.
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setIsBreakModalOpen(false)}
                className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Take Break
              </button>

              <button
                type="button"
                onClick={handleResumeFromBreak}
                className="rounded-2xl bg-yellow-300 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-yellow-200"
              >
                Resume Session
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
};

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

const GlassCard = ({ children, className = "" }: GlassCardProps) => {
  return (
    <div
      className={`rounded-[24px] border border-white/15 bg-slate-950/35 p-4 shadow-2xl backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
};

interface StatRowProps {
  label: string;
  value: string;
}

const StatRow = ({ label, value }: StatRowProps) => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white/10 px-3 py-2.5">
      <span className="text-[11px] text-slate-200">{label}</span>
      <span className="text-[11px] font-bold text-cyan-300">{value}</span>
    </div>
  );
};

export default SoloFocusRoom;