import { useEffect, useRef, useState } from "react";
import { useRoadmap } from "@/features/student/hooks/useRoadmap";
import { MUSIC_TRACKS } from "../config/soloFocusMusic";
import {
  getMockQuizQuestions,
  PASSING_SCORE,
  type QuizResult,
} from "../config/soloFocusQuiz";
import type {
  SoloFocusActivePanel,
  SoloFocusMusicTrackId,
  SoloFocusStats,
  SoloStudyMaterial,
  SoloStudyTask,
} from "../types/student.types";
import { getRandomAutoBreakDelay } from "../utils/soloFocusBreak";
import { getAvailableSoloStudyMaterials } from "../utils/soloFocusMaterials";
import {
  createBreakNotification,
  exitFullScreenIfActive,
  requestNotificationPermission,
  saveStudentNotification,
  showBrowserBreakNotification,
} from "../utils/soloFocusNotifications";
import {
  FOCUS_STATS_STORAGE_KEY,
  getSavedCalendarPlans,
  getSavedFocusStats,
  getSavedSelectedMaterials,
  getSavedTasks,
  LAST_SESSION_QUIZ_SCORE_KEY,
  resetCountersIfNeeded,
  saveApprovedDailyStudyHours,
  SELECTED_MATERIALS_STORAGE_KEY,
  STUDY_CALENDAR_STORAGE_KEY,
  STUDY_NOTE_STORAGE_KEY,
  STUDY_TASKS_STORAGE_KEY,
  updateStreakAfterApprovedSession,
} from "../utils/soloFocusStorage";
import { formatTime, getTodayDate } from "../utils/soloFocusTime";

export const useSoloFocusRoom = () => {
  const roadmap = useRoadmap();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoBreakTimeoutRef = useRef<number | null>(null);

  const [focusStats, setFocusStats] =
    useState<SoloFocusStats>(getSavedFocusStats);

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
  const hasSessionProgress = sessionSeconds > 0;

  const availableMaterials = getAvailableSoloStudyMaterials(roadmap);

  const weeklyHours = (focusStats.weeklySeconds / 3600).toFixed(1);
  const dailyHours = (focusStats.dailySeconds / 3600).toFixed(1);
  const selectedDayPlan = calendarPlans[selectedDate] ?? "";
  const formattedSessionTime = formatTime(sessionSeconds);

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
      const notification = createBreakNotification();

      saveStudentNotification(notification);
      showBrowserBreakNotification();
      void exitFullScreenIfActive();

      setAutoBreakMessage(
        "Time for a break. The timer has been paused automatically."
      );

      setIsBreakModalOpen(true);
      setIsSessionRunning(false);

      setFocusStats((prev) => {
        const normalizedStats = resetCountersIfNeeded(prev);

        return {
          ...normalizedStats,
          breakCount: normalizedStats.breakCount + 1,
          isRunning: false,
          lastStartedAt: null,
        };
      });
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

  const resetSessionUI = () => {
    setIsSessionRunning(false);
    setSessionSeconds(0);
    setSelectedMaterials([]);
    setQuizMaterials([]);
    setQuizAnswers({});
    setQuizResult(null);
    setQuizWarning("");
    setTimerWarning("");
    setAutoBreakMessage("");
    setIsBreakModalOpen(false);
    setOpenedMaterial(null);
    setActivePanel(null);

    localStorage.removeItem(SELECTED_MATERIALS_STORAGE_KEY);
  };

  const startFocusTimer = () => {
    setTimerWarning("");
    setAutoBreakMessage("");
    setIsBreakModalOpen(false);
    setIsSessionRunning(true);

    setFocusStats((prev) => ({
      ...resetCountersIfNeeded(prev),
      isRunning: true,
      lastStartedAt: Date.now(),
    }));
  };

  const handleToggleTimer = () => {
    if (!hasSelectedMaterials && !isSessionRunning) {
      setTimerWarning("Choose at least one material before starting the timer.");
      setActivePanel("materials");
      return;
    }

    if (!isSessionRunning) {
      void requestNotificationPermission();

      if (sessionSeconds === 0) {
        setFocusStats((prev) => ({
          ...resetCountersIfNeeded(prev),
          breakCount: 0,
          isRunning: true,
          lastStartedAt: Date.now(),
        }));
      } else {
        setFocusStats((prev) => ({
          ...resetCountersIfNeeded(prev),
          isRunning: true,
          lastStartedAt: Date.now(),
        }));
      }

      setTimerWarning("");
      setAutoBreakMessage("");
      setIsSessionRunning(true);
      return;
    }

    setTimerWarning("");
    setAutoBreakMessage("");
    setIsSessionRunning(false);

    setFocusStats((prev) => {
      const normalizedStats = resetCountersIfNeeded(prev);

      return {
        ...normalizedStats,
        breakCount: normalizedStats.breakCount + 1,
        isRunning: false,
        lastStartedAt: null,
      };
    });
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

  const handleCloseBreakModal = () => {
    setIsBreakModalOpen(false);
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

    setFocusStats((prev) => ({
      ...resetCountersIfNeeded(prev),
      isRunning: false,
      lastStartedAt: null,
    }));
  };

  const approveSessionHours = () => {
    const approvedSeconds = sessionSeconds;
    const approvedQuizScore = quizResult?.score ?? 0;

    saveApprovedDailyStudyHours(approvedSeconds);

    localStorage.setItem(
      LAST_SESSION_QUIZ_SCORE_KEY,
      String(approvedQuizScore)
    );

    setFocusStats((prev) => {
      const normalizedStats = resetCountersIfNeeded(prev);
      const today = getTodayDate();

      return {
        ...normalizedStats,
        weeklySeconds: normalizedStats.weeklySeconds + approvedSeconds,
        dailySeconds: normalizedStats.dailySeconds + approvedSeconds,
        breakCount: 0,
        streakDays: updateStreakAfterApprovedSession(normalizedStats),
        lastStudyDate: today,
        isRunning: false,
        lastStartedAt: null,
      };
    });

    resetSessionUI();
  };

  const discardSessionHours = () => {
    setFocusStats((prev) => {
      const normalizedStats = resetCountersIfNeeded(prev);

      return {
        ...normalizedStats,
        breakCount: 0,
        isRunning: false,
        lastStartedAt: null,
      };
    });

    resetSessionUI();
  };

  const retryQuiz = () => {
    setQuizAnswers({});
    setQuizResult(null);
    setQuizWarning("");
  };

  const continueStudyingAfterFailedQuiz = () => {
    setIsSessionRunning(false);
    setQuizMaterials([]);
    setQuizAnswers({});
    setQuizResult(null);
    setQuizWarning("");
    setTimerWarning("");
    setAutoBreakMessage("");
    setIsBreakModalOpen(false);
    setActivePanel(null);
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
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

  const handleCloseMaterial = () => {
    setOpenedMaterial(null);
  };

  const handleOpenPanel = (panel: SoloFocusActivePanel) => {
    setActivePanel(panel);
  };

  const handleClosePanel = () => {
    setActivePanel(null);
  };

  return {
    focusStats,
    isSessionRunning,
    sessionSeconds,
    formattedSessionTime,
    hasSessionProgress,
    activeTrack,
    tasks,
    newTask,
    activePanel,
    note,
    selectedDate,
    selectedDayPlan,
    selectedMaterials,
    availableMaterials,
    quizMaterials,
    openedMaterial,
    timerWarning,
    autoBreakMessage,
    isBreakModalOpen,
    quizQuestions,
    quizAnswers,
    quizResult,
    quizWarning,
    hasSelectedMaterials,
    weeklyHours,
    dailyHours,
    passingScore: PASSING_SCORE,
    musicTracks: MUSIC_TRACKS,

    setNewTask,
    setNote,
    setSelectedDate,

    handleToggleTimer,
    handleResumeFromBreak,
    handleCloseBreakModal,
    openSessionQuiz,
    approveSessionHours,
    discardSessionHours,
    retryQuiz,
    continueStudyingAfterFailedQuiz,
    handleAnswerChange,
    handleSubmitQuiz,
    handleToggleMusic,
    handleAddTask,
    handleToggleTask,
    handleRemoveTask,
    handleCalendarPlanChange,
    handleSelectMaterial,
    handleOpenMaterial,
    handleCloseMaterial,
    handleOpenPanel,
    handleClosePanel,
  };
};