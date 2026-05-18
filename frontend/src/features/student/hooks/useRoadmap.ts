import { useOnboarding } from "@/features/onboarding/context/OnboardingContext";
import { DEFAULT_TRACK_ID, roadmapsByTrack } from "../config/roadmap";
import type { RoadmapData, RoadmapLesson } from "../types/student.types";

export const getRoadmapLessons = (roadmap: RoadmapData): RoadmapLesson[] => {
  return roadmap.modules.flatMap((module) => module.lessons);
};

export const calculateRoadmapProgress = (roadmap: RoadmapData): number => {
  const lessons = getRoadmapLessons(roadmap);

  if (lessons.length === 0) {
    return 0;
  }

  const completedLessons = lessons.filter(
    (lesson) => lesson.status === "completed"
  ).length;

  return Math.round((completedLessons / lessons.length) * 100);
};

export const getContinueLearningLesson = (
  roadmap: RoadmapData
): RoadmapLesson | null => {
  const lessons = getRoadmapLessons(roadmap);

  const activeLesson = lessons.find((lesson) => lesson.status === "active");

  if (activeLesson) {
    return activeLesson;
  }

  const completedLessons = lessons.filter(
    (lesson) => lesson.status === "completed"
  );

  return completedLessons.at(-1) ?? lessons[0] ?? null;
};

export const getContinueLearningPath = (roadmap: RoadmapData): string => {
  const continueLesson = getContinueLearningLesson(roadmap);

  if (!continueLesson) {
    return "/student/roadmap";
  }

  return `/student/lesson/${continueLesson.id}`;
};

const getStoredSelectedTrackId = (): string | null => {
  try {
    const storedOnboarding = localStorage.getItem("unihub:onboarding");

    if (!storedOnboarding) {
      return null;
    }

    const parsedOnboarding = JSON.parse(storedOnboarding) as {
      selectedTrack?: {
        id?: string;
      } | null;
    };

    return parsedOnboarding.selectedTrack?.id ?? null;
  } catch {
    return null;
  }
};

const isValidTrackId = (trackId: string | null | undefined): trackId is string => {
  return Boolean(trackId && trackId in roadmapsByTrack);
};

const getSelectedTrackId = (
  selectedTrackIdFromContext: string | undefined
): string => {
  if (isValidTrackId(selectedTrackIdFromContext)) {
    return selectedTrackIdFromContext;
  }

  const storedSelectedTrackId = getStoredSelectedTrackId();

  if (isValidTrackId(storedSelectedTrackId)) {
    return storedSelectedTrackId;
  }

  return DEFAULT_TRACK_ID;
};

export const useRoadmap = (): RoadmapData => {
  const { selectedTrack } = useOnboarding();

  const selectedTrackId = getSelectedTrackId(selectedTrack?.id);

  return roadmapsByTrack[selectedTrackId];
};