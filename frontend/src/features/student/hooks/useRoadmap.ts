import { useOnboarding } from "@/features/onboarding/context/OnboardingContext";
import type { RoadmapData, RoadmapLesson } from "../types/student.types";

const roadmapsByTrack: Record<string, RoadmapData> = {
  "web-development": {
    trackId: "web-development",
    trackTitle: "Web Development",
    modules: [
      {
        id: "html",
        title: "HTML",
        lessons: [
          {
            id: "html-intro",
            title: "HTML Basics",
            description: "Learn page structure, tags, and semantic elements.",
            status: "completed",
          },
          {
            id: "html-forms",
            title: "Forms & Inputs",
            description:
              "Build forms using inputs, labels, buttons, and validation basics.",
            status: "completed",
          },
        ],
      },
      {
        id: "css",
        title: "CSS",
        lessons: [
          {
            id: "css-basics",
            title: "CSS Fundamentals",
            description:
              "Learn selectors, colors, spacing, typography, and layout basics.",
            status: "active",
          },
          {
            id: "css-layout",
            title: "Flexbox & Grid",
            description: "Create responsive layouts using Flexbox and CSS Grid.",
            status: "locked",
          },
        ],
      },
      {
        id: "javascript",
        title: "JavaScript",
        lessons: [
          {
            id: "js-basics",
            title: "JavaScript Basics",
            description:
              "Learn variables, conditions, loops, functions, and arrays.",
            status: "locked",
          },
          {
            id: "js-dom",
            title: "DOM & Events",
            description:
              "Interact with the page using DOM selection and events.",
            status: "locked",
          },
        ],
      },
      {
        id: "react",
        title: "React",
        lessons: [
          {
            id: "react-components",
            title: "React Components",
            description: "Build reusable UI components using props and state.",
            status: "locked",
          },
          {
            id: "react-routing",
            title: "Routing & Pages",
            description:
              "Create multi-page experiences and organize app routes.",
            status: "locked",
          },
        ],
      },
    ],
  },

  "ai-data-science": {
    trackId: "ai-data-science",
    trackTitle: "AI & Data Science",
    modules: [
      {
        id: "python",
        title: "Python",
        lessons: [
          {
            id: "python-basics",
            title: "Python Basics",
            description:
              "Learn syntax, variables, functions, lists, and dictionaries.",
            status: "completed",
          },
          {
            id: "python-data",
            title: "Working with Data",
            description:
              "Use Python to clean, read, and prepare simple datasets.",
            status: "completed",
          },
        ],
      },
      {
        id: "statistics",
        title: "Statistics",
        lessons: [
          {
            id: "stats-basics",
            title: "Statistics Basics",
            description:
              "Understand mean, median, variance, distributions, and probability.",
            status: "active",
          },
          {
            id: "data-visualization",
            title: "Data Visualization",
            description: "Create charts and communicate insights from data.",
            status: "locked",
          },
        ],
      },
      {
        id: "machine-learning",
        title: "Machine Learning",
        lessons: [
          {
            id: "ml-intro",
            title: "Machine Learning Intro",
            description:
              "Learn supervised learning, features, labels, and model training.",
            status: "locked",
          },
          {
            id: "ml-models",
            title: "Core ML Models",
            description:
              "Explore regression, classification, and evaluation metrics.",
            status: "locked",
          },
        ],
      },
    ],
  },

  "mobile-development": {
    trackId: "mobile-development",
    trackTitle: "Mobile Development",
    modules: [
      {
        id: "mobile-basics",
        title: "Mobile Basics",
        lessons: [
          {
            id: "mobile-ui",
            title: "Mobile UI Fundamentals",
            description:
              "Learn screens, navigation, layout, and mobile-first design.",
            status: "completed",
          },
          {
            id: "mobile-js",
            title: "JavaScript for Mobile",
            description:
              "Review JavaScript concepts used in mobile app development.",
            status: "active",
          },
        ],
      },
      {
        id: "react-native",
        title: "React Native",
        lessons: [
          {
            id: "rn-components",
            title: "React Native Components",
            description: "Build native app screens using reusable components.",
            status: "locked",
          },
          {
            id: "rn-navigation",
            title: "Navigation & Screens",
            description: "Move between screens and organize mobile app flows.",
            status: "locked",
          },
        ],
      },
      {
        id: "mobile-data",
        title: "Data & APIs",
        lessons: [
          {
            id: "mobile-api",
            title: "APIs in Mobile Apps",
            description: "Fetch and display data from APIs inside mobile apps.",
            status: "locked",
          },
          {
            id: "mobile-storage",
            title: "Local Storage",
            description: "Store small pieces of data locally on the device.",
            status: "locked",
          },
        ],
      },
    ],
  },

  cybersecurity: {
    trackId: "cybersecurity",
    trackTitle: "Cybersecurity",
    modules: [
      {
        id: "security-basics",
        title: "Security Basics",
        lessons: [
          {
            id: "security-intro",
            title: "Cybersecurity Intro",
            description:
              "Learn core security concepts, threats, and protection goals.",
            status: "completed",
          },
          {
            id: "network-basics",
            title: "Networking Basics",
            description:
              "Understand IP addresses, ports, protocols, and network layers.",
            status: "active",
          },
        ],
      },
      {
        id: "web-security",
        title: "Web Security",
        lessons: [
          {
            id: "owasp",
            title: "OWASP Basics",
            description:
              "Learn common web vulnerabilities and safe coding practices.",
            status: "locked",
          },
          {
            id: "auth-security",
            title: "Authentication Security",
            description:
              "Understand passwords, sessions, tokens, and access control.",
            status: "locked",
          },
        ],
      },
      {
        id: "defense",
        title: "Defense & Monitoring",
        lessons: [
          {
            id: "logs",
            title: "Logs & Monitoring",
            description: "Read logs and detect suspicious activity.",
            status: "locked",
          },
          {
            id: "incident-response",
            title: "Incident Response",
            description:
              "Learn basic steps to respond to security incidents.",
            status: "locked",
          },
        ],
      },
    ],
  },
};

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

const getSelectedTrackId = (
  selectedTrackIdFromContext: string | undefined
): string => {
  if (
    selectedTrackIdFromContext &&
    selectedTrackIdFromContext in roadmapsByTrack
  ) {
    return selectedTrackIdFromContext;
  }

  const storedSelectedTrackId = getStoredSelectedTrackId();

  if (storedSelectedTrackId && storedSelectedTrackId in roadmapsByTrack) {
    return storedSelectedTrackId;
  }

  return "web-development";
};

export const useRoadmap = (): RoadmapData => {
  const { selectedTrack } = useOnboarding();

  const selectedTrackId = getSelectedTrackId(selectedTrack?.id);

  return roadmapsByTrack[selectedTrackId];
};