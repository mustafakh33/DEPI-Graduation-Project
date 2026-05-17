import { useOnboarding } from "@/features/onboarding/context/OnboardingContext";
import type { SessionsData } from "../types/student.types";
import { useRoadmap } from "./useRoadmap";

const DEFAULT_MEET_LINK = "https://meet.google.com/gmu-hjka-irf";

const getSessionThumbnail = (index: number) => {
  const thumbnails = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
  ];

  return thumbnails[index % thumbnails.length];
};

export const useSessions = (): SessionsData => {
  const { selectedTrack } = useOnboarding();
  const roadmap = useRoadmap();

  const selectedTrackId = selectedTrack?.id ?? roadmap.trackId;
  const selectedTrackTitle = selectedTrack?.title ?? roadmap.trackTitle;

  const openedLessons = roadmap.modules.flatMap((module) =>
    module.lessons
      .filter(
        (lesson) => lesson.status === "completed" || lesson.status === "active"
      )
      .map((lesson, index) => ({
        lesson,
        moduleTitle: module.title,
        index,
      }))
  );

  return {
    trackId: selectedTrackId,
    trackTitle: selectedTrackTitle,
    upcomingSession: {
      id: `${selectedTrackId}-live-session`,
      title: `${selectedTrackTitle} Live Session`,
      description:
        "Join your instructor live session for your current track and group.",
      startsAt: "2026-05-17T19:00:00",
      durationMinutes: 90,
      meetingUrl: DEFAULT_MEET_LINK,
    },
    recordings: openedLessons.map(({ lesson, moduleTitle }, index) => ({
      id: `recording-${lesson.id}`,
      title: lesson.title,
      description:
        lesson.description ??
        "Review this lesson recording and continue learning from your roadmap.",
      moduleTitle,
      durationMinutes: 45 + index * 5,
      recordedAt: "2026-05-17",
      thumbnailUrl: getSessionThumbnail(index),
      materialPath: `/student/lesson/${lesson.id}`,
    })),
  };
};