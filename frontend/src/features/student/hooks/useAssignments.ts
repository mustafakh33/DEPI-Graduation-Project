import { useOnboarding } from "@/features/onboarding/context/OnboardingContext";
import type {
  RoadmapData,
  RoadmapLesson,
  StudentAssignment,
} from "../types/student.types";
import { useRoadmap } from "./useRoadmap";

const assignmentsByTrack: Record<string, StudentAssignment[]> = {
  "web-development": [
    {
      id: "web-assignment-1",
      assignmentNumber: 1,
      title: "HTML Structure Practice",
      lessonId: "html-intro",
      lessonTitle: "HTML Basics",
      trackId: "web-development",
      description:
        "Build a simple semantic HTML page using headings, paragraphs, lists, and links.",
      publishedAt: "2026-05-01T10:00:00",
      deadline: "2026-05-06T23:59:00",
      status: "graded",
      grade: 18,
      totalGrade: 20,
      assignmentPath: "/student/assignments/web-assignment-1",
      isPublished: true,
    },
    {
      id: "web-assignment-2",
      assignmentNumber: 2,
      title: "CSS Layout Challenge",
      lessonId: "css-basics",
      lessonTitle: "CSS Fundamentals",
      trackId: "web-development",
      description:
        "Create a responsive card layout using Flexbox and spacing utilities.",
      publishedAt: "2026-05-04T12:00:00",
      deadline: "2026-05-12T23:59:00",
      status: "open",
      totalGrade: 20,
      assignmentPath: "/student/assignments/web-assignment-2",
      isPublished: true,
    },
    {
      id: "web-assignment-3",
      assignmentNumber: 3,
      title: "JavaScript Basics Task",
      lessonId: "js-basics",
      lessonTitle: "JavaScript Basics",
      trackId: "web-development",
      description:
        "Solve practice tasks covering variables, conditions, loops, and functions.",
      publishedAt: "2026-05-07T09:00:00",
      deadline: "2024-05-09T23:59:00",
      status: "open",
      totalGrade: 20,
      assignmentPath: "/student/assignments/web-assignment-3",
      isPublished: false,
    },
  ],

  "ai-data-science": [
  {
    id: "ai-assignment-1",
    assignmentNumber: 1,
    title: "Python Data Types Practice",
    lessonId: "python-basics",
    lessonTitle: "Python Basics",
    trackId: "ai-data-science",
    description:
      "Solve beginner Python tasks using variables, lists, dictionaries, and functions.",
    publishedAt: "2026-05-01T10:00:00",
    deadline: "2024-05-06T23:59:00",
    status: "open",
    totalGrade: 20,
    assignmentPath: "/student/assignments/ai-assignment-1",
    isPublished: true,
  },
  {
    id: "ai-assignment-2",
    assignmentNumber: 2,
    title: "Data Cleaning Exercise",
    lessonId: "python-data",
    lessonTitle: "Working with Data",
    trackId: "ai-data-science",
    description:
      "Clean a small dataset by handling missing values, duplicates, and simple formatting issues.",
    publishedAt: "2026-05-05T11:00:00",
    deadline: "2026-05-12T23:59:00",
    status: "submitted",
    totalGrade: 20,
    assignmentPath: "/student/assignments/ai-assignment-2",
    isPublished: true,
  },
  {
    id: "ai-assignment-3",
    assignmentNumber: 3,
    title: "Statistics Basics Task",
    lessonId: "stats-basics",
    lessonTitle: "Statistics Basics",
    trackId: "ai-data-science",
    description:
      "Calculate mean, median, variance, and explain basic probability examples.",
    publishedAt: "2026-05-07T09:00:00",
    deadline: "2026-05-18T23:59:00",
    status: "open",
    totalGrade: 20,
    assignmentPath: "/student/assignments/ai-assignment-3",
    isPublished: true,
  },
  {
    id: "ai-assignment-4",
    assignmentNumber: 4,
    title: "Model Evaluation Submission",
    lessonId: "ml-models",
    lessonTitle: "Core ML Models",
    trackId: "ai-data-science",
    description:
      "Submit your answers for model accuracy, precision, recall, and confusion matrix analysis.",
    publishedAt: "2026-05-10T10:30:00",
    deadline: "2026-05-25T23:59:00",
    status: "open",
    totalGrade: 20,
    assignmentPath: "/student/assignments/ai-assignment-4",
    isPublished: true,
  },
],

  "mobile-development": [
    {
      id: "mobile-assignment-1",
      assignmentNumber: 1,
      title: "Mobile Screen Layout",
      lessonId: "mobile-ui",
      lessonTitle: "Mobile UI Fundamentals",
      trackId: "mobile-development",
      description:
        "Design and build a simple mobile screen with clear spacing, hierarchy, and responsive layout.",
      publishedAt: "2026-05-01T10:00:00",
      deadline: "2026-05-07T23:59:00",
      status: "submitted",
      totalGrade: 20,
      assignmentPath: "/student/assignments/mobile-assignment-1",
      isPublished: true,
    },
    {
      id: "mobile-assignment-2",
      assignmentNumber: 2,
      title: "React Native Components Task",
      lessonId: "rn-components",
      lessonTitle: "React Native Components",
      trackId: "mobile-development",
      description:
        "Create reusable React Native components for cards, buttons, and screen sections.",
      publishedAt: "2026-05-06T12:00:00",
      deadline: "2026-05-15T23:59:00",
      status: "open",
      totalGrade: 20,
      assignmentPath: "/student/assignments/mobile-assignment-2",
      isPublished: true,
    },
  ],

  cybersecurity: [
    {
      id: "cyber-assignment-1",
      assignmentNumber: 1,
      title: "Networking Basics Worksheet",
      lessonId: "network-basics",
      lessonTitle: "Networking Basics",
      trackId: "cybersecurity",
      description:
        "Answer practical questions about IP addresses, ports, protocols, and basic network layers.",
      publishedAt: "2026-05-02T10:00:00",
      deadline: "2026-05-08T23:59:00",
      status: "graded",
      grade: 19,
      totalGrade: 20,
      assignmentPath: "/student/assignments/cyber-assignment-1",
      isPublished: true,
    },
    {
      id: "cyber-assignment-2",
      assignmentNumber: 2,
      title: "OWASP Vulnerabilities Review",
      lessonId: "owasp",
      lessonTitle: "OWASP Basics",
      trackId: "cybersecurity",
      description:
        "Review common web vulnerabilities and describe how to prevent them in simple applications.",
      publishedAt: "2026-05-06T11:00:00",
      deadline: "2026-05-13T23:59:00",
      status: "open",
      totalGrade: 20,
      assignmentPath: "/student/assignments/cyber-assignment-2",
      isPublished: true,
    },
  ],
};

const getUnlockedLessonIds = (roadmap: RoadmapData) => {
  return roadmap.modules
    .flatMap((module) => module.lessons)
    .filter((lesson: RoadmapLesson) => lesson.status !== "locked")
    .map((lesson) => lesson.id);
};

export const useAssignments = (): StudentAssignment[] => {
  const { selectedTrack } = useOnboarding();
  const roadmap = useRoadmap();

  const selectedTrackId = selectedTrack?.id ?? "web-development";
  const trackAssignments =
    assignmentsByTrack[selectedTrackId] ?? assignmentsByTrack["web-development"];

  const unlockedLessonIds = getUnlockedLessonIds(roadmap);

  return trackAssignments.filter((assignment) => {
    const isAssignmentPublished = assignment.isPublished;
    const isLessonUnlocked = unlockedLessonIds.includes(assignment.lessonId);

    return isAssignmentPublished && isLessonUnlocked;
  });
};