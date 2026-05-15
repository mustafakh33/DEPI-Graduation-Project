import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  BookOpen,
  CalendarDays,
  Check,
  ClipboardCheck,
  ExternalLink,
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

  let nextStats = { ...stats };

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

const updateRunningStats = (stats: SoloFocusStats): SoloFocusStats => {
  const normalizedStats = resetCountersIfNeeded(stats);

  if (!normalizedStats.isRunning || !normalizedStats.lastStartedAt) {
    return normalizedStats;
  }

  const elapsedSeconds = Math.max(
    0,
    Math.floor((Date.now() - normalizedStats.lastStartedAt) / 1000)
  );

  if (elapsedSeconds === 0) {
    return normalizedStats;
  }

  const today = getTodayDate();

  let nextStreakDays = normalizedStats.streakDays;

  if (normalizedStats.lastStudyDate !== today) {
    nextStreakDays =
      normalizedStats.lastStudyDate === getYesterdayDate()
        ? normalizedStats.streakDays + 1
        : 1;
  }

  return resetCountersIfNeeded({
    ...normalizedStats,
    weeklySeconds: normalizedStats.weeklySeconds + elapsedSeconds,
    dailySeconds: normalizedStats.dailySeconds + elapsedSeconds,
    streakDays: nextStreakDays,
    lastStudyDate: today,
    lastStartedAt: Date.now(),
  });
};

const getSavedFocusStats = (): SoloFocusStats => {
  const savedStats = localStorage.getItem(FOCUS_STATS_STORAGE_KEY);

  if (!savedStats) {
    return getDefaultFocusStats();
  }

  try {
    const parsedStats = JSON.parse(savedStats) as SoloFocusStats;
    return updateRunningStats(parsedStats);
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

const SoloFocusRoom = () => {
  const roadmap = useRoadmap();

  const [focusStats, setFocusStats] =
    useState<SoloFocusStats>(getSavedFocusStats);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeTrack, setActiveTrack] =
    useState<SoloFocusMusicTrackId | null>(null);

  const [tasks, setTasks] = useState<SoloStudyTask[]>(getSavedTasks);
  const [newTask, setNewTask] = useState("");

  const [activePanel, setActivePanel] =
    useState<SoloFocusActivePanel>(null);

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
    if (!focusStats.isRunning) {
      return;
    }

    const timer = window.setInterval(() => {
      setFocusStats((prev) => updateRunningStats(prev));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [focusStats.isRunning]);

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
    };
  }, []);

  const handleToggleTimer = () => {
    setFocusStats((prev) => {
      const updatedStats = updateRunningStats(prev);

      if (updatedStats.isRunning) {
        return {
          ...updatedStats,
          isRunning: false,
          lastStartedAt: null,
          breakCount: updatedStats.breakCount + 1,
        };
      }

      return {
        ...resetCountersIfNeeded(updatedStats),
        isRunning: true,
        lastStartedAt: Date.now(),
      };
    });
  };

  const handleEndSession = () => {
    setFocusStats((prev) => ({
      ...updateRunningStats(prev),
      isRunning: false,
      lastStartedAt: null,
    }));

    setQuizMaterials(selectedMaterials);
    setSelectedMaterials([]);
    localStorage.removeItem(SELECTED_MATERIALS_STORAGE_KEY);
    setActivePanel("quiz");
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

    window.open(material.fileUrl, "_blank", "noopener,noreferrer");
    setActivePanel(null);
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
            onClick={handleEndSession}
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
                Your private study space. Start the timer and keep your focus.
              </p>

              <div className="mt-4 space-y-2">
                <StatRow label="Weekly Hours" value={`${weeklyHours}h`} />
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
                Deep Work Mode
              </p>

              <h1 className="mt-4 text-5xl font-black tracking-tight md:text-6xl">
                {formatTime(focusStats.weeklySeconds)}
              </h1>

              <button
                type="button"
                onClick={handleToggleTimer}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-400 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                {focusStats.isRunning ? (
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

              <div className="mt-4 flex justify-center gap-5 text-xs text-slate-200">
                <span>Today: {dailyHours}h</span>
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
                        onClick={() =>
                          window.open(
                            material.fileUrl,
                            "_blank",
                            "noopener,noreferrer"
                          )
                        }
                        className="text-cyan-300 transition hover:text-cyan-100"
                        title="Open PDF"
                      >
                        <ExternalLink className="size-4" />
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
                        : "Review what you studied"}
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
                  Choose one to add it to your session and open its PDF.
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
                <div className="rounded-2xl bg-white/10 p-4">
                  <div className="flex items-center gap-3">
                    <ClipboardCheck className="size-6 text-cyan-300" />

                    <div>
                      <p className="text-sm font-bold text-white">
                        Quiz will be generated from your selected materials.
                      </p>

                      <p className="mt-1 text-xs leading-5 text-slate-300">
                        This is a temporary preview until backend quiz
                        generation is connected.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {quizMaterials.length > 0 ? (
                    quizMaterials.map((material) => (
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
                    ))
                  ) : (
                    <div className="rounded-xl bg-white/10 px-4 py-3 text-xs text-slate-300">
                      No materials selected for this session.
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={() => setActivePanel(null)}
                className="rounded-xl bg-cyan-400 px-6 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                OK
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