import { useOnboarding } from "@/features/onboarding/context/OnboardingContext";
import type { SessionsData } from "../types/student.types";

const sessionsByTrack: Record<string, SessionsData> = {
  "web-development": {
    trackId: "web-development",
    trackTitle: "Web Development",
    upcomingSession: {
      id: "web-live-1",
      title: "CSS Flexbox & Grid Workshop",
      description:
        "A live session to practice responsive layouts using Flexbox and CSS Grid.",
      startsAt: "2026-05-10T18:00:00",
      durationMinutes: 90,
      meetingUrl: "https://meet.google.com/",
    },
    recordings: [
      {
        id: "web-rec-1",
        title: "HTML Basics",
        description: "Page structure, tags, semantic HTML, and forms.",
        moduleTitle: "HTML",
        durationMinutes: 64,
        recordedAt: "2026-05-01",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        materialPath: "/student/sessions/web-rec-1",
      },
      {
        id: "web-rec-2",
        title: "CSS Fundamentals",
        description: "Selectors, colors, spacing, typography, and box model.",
        moduleTitle: "CSS",
        durationMinutes: 58,
        recordedAt: "2026-05-03",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        materialPath: "/student/sessions/web-rec-2",
      },
    ],
  },

  "ai-data-science": {
    trackId: "ai-data-science",
    trackTitle: "AI & Data Science",
    upcomingSession: {
      id: "ai-live-1",
      title: "Python Data Cleaning Session",
      description:
        "Learn how to prepare simple datasets before analysis and modeling.",
      startsAt: "2026-05-10T19:00:00",
      durationMinutes: 90,
      meetingUrl: "https://meet.google.com/",
    },
    recordings: [
      {
        id: "ai-rec-1",
        title: "Python Basics",
        description: "Syntax, variables, functions, lists, and dictionaries.",
        moduleTitle: "Python",
        durationMinutes: 72,
        recordedAt: "2026-05-02",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
        materialPath: "/student/sessions/ai-rec-1",
      },
      {
        id: "ai-rec-2",
        title: "Working with Data",
        description: "Reading, cleaning, and preparing datasets with Python.",
        moduleTitle: "Python",
        durationMinutes: 68,
        recordedAt: "2026-05-04",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
        materialPath: "/student/sessions/ai-rec-2",
      },
    ],
  },

  "mobile-development": {
    trackId: "mobile-development",
    trackTitle: "Mobile Development",
    upcomingSession: {
      id: "mobile-live-1",
      title: "React Native Components",
      description:
        "Build reusable mobile UI components and organize app screens.",
      startsAt: "2026-05-11T18:00:00",
      durationMinutes: 90,
      meetingUrl: "https://meet.google.com/",
    },
    recordings: [
      {
        id: "mobile-rec-1",
        title: "Mobile UI Fundamentals",
        description: "Screens, navigation, layout, and mobile-first design.",
        moduleTitle: "Mobile Basics",
        durationMinutes: 54,
        recordedAt: "2026-05-01",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
        materialPath: "/student/sessions/mobile-rec-1",
      },
      {
        id: "mobile-rec-2",
        title: "JavaScript for Mobile",
        description: "JavaScript concepts used in mobile app development.",
        moduleTitle: "Mobile Basics",
        durationMinutes: 62,
        recordedAt: "2026-05-05",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1551650975-87deedd944c3",
        materialPath: "/student/sessions/mobile-rec-2",
      },
    ],
  },

  cybersecurity: {
    trackId: "cybersecurity",
    trackTitle: "Cybersecurity",
    upcomingSession: {
      id: "cyber-live-1",
      title: "Networking Basics for Security",
      description:
        "Understand IP addresses, ports, protocols, and network layers.",
      startsAt: "2026-05-12T18:00:00",
      durationMinutes: 90,
      meetingUrl: "https://meet.google.com/",
    },
    recordings: [
      {
        id: "cyber-rec-1",
        title: "Cybersecurity Intro",
        description: "Core security concepts, threats, and protection goals.",
        moduleTitle: "Security Basics",
        durationMinutes: 60,
        recordedAt: "2026-05-02",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
        materialPath: "/student/sessions/cyber-rec-1",
      },
      {
        id: "cyber-rec-2",
        title: "Networking Basics",
        description: "Ports, protocols, network layers, and basic defense.",
        moduleTitle: "Security Basics",
        durationMinutes: 70,
        recordedAt: "2026-05-06",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
        materialPath: "/student/sessions/cyber-rec-2",
      },
    ],
  },
};

export const useSessions = (): SessionsData => {
  const { selectedTrack } = useOnboarding();

  const selectedTrackId = selectedTrack?.id ?? "web-development";

  return sessionsByTrack[selectedTrackId] ?? sessionsByTrack["web-development"];
};