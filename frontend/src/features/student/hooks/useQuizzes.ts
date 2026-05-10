import { useOnboarding } from "@/features/onboarding/context/OnboardingContext";
import type { RoadmapData, RoadmapLesson, StudentQuiz } from "../types/student.types";
import { useRoadmap } from "./useRoadmap";

const quizzesByTrack: Record<string, StudentQuiz[]> = {
  "web-development": [
    {
      id: "web-quiz-1",
      quizNumber: 1,
      title: "HTML Basics Quiz",
      lessonId: "html-intro",
      lessonTitle: "HTML Basics",
      trackId: "web-development",
      description: "Test your understanding of HTML structure and semantic tags.",
      scheduledAt: "2026-05-05T18:00:00",
      durationMinutes: 20,
      totalGrade: 10,
      score: 8,
      hasAttempted: true,
      isPublished: true,
      quizPath: "/student/quizzes/web-quiz-1",
    },
    {
      id: "web-quiz-2",
      quizNumber: 2,
      title: "CSS Fundamentals Quiz",
      lessonId: "css-basics",
      lessonTitle: "CSS Fundamentals",
      trackId: "web-development",
      description: "Practice selectors, spacing, colors, and the box model.",
      scheduledAt: "2026-05-18T18:00:00",
      durationMinutes: 25,
      totalGrade: 10,
      hasAttempted: false,
      isPublished: true,
      quizPath: "/student/quizzes/web-quiz-2",
    },
  ],

  "ai-data-science": [
    {
      id: "ai-quiz-1",
      quizNumber: 1,
      title: "Python Basics Quiz",
      lessonId: "python-basics",
      lessonTitle: "Python Basics",
      trackId: "ai-data-science",
      description: "A short quiz about variables, data types, lists, and functions.",
      scheduledAt: "2026-05-01T18:00:00",
      durationMinutes: 20,
      totalGrade: 10,
      score: 8,
      hasAttempted: true,
      isPublished: true,
      quizPath: "/student/quizzes/ai-quiz-1",
    },
    {
      id: "ai-quiz-2",
      quizNumber: 2,
      title: "Working with Data Quiz",
      lessonId: "python-data",
      lessonTitle: "Working with Data",
      trackId: "ai-data-science",
      description: "Review data cleaning basics, missing values, and simple datasets.",
      scheduledAt: "2026-05-06T18:00:00",
      durationMinutes: 25,
      totalGrade: 10,
      score: 4,
      hasAttempted: true,
      isPublished: true,
      quizPath: "/student/quizzes/ai-quiz-2",
    },
    {
      id: "ai-quiz-3",
      quizNumber: 3,
      title: "Statistics Basics Quiz",
      lessonId: "stats-basics",
      lessonTitle: "Statistics Basics",
      trackId: "ai-data-science",
      description: "Test your understanding of mean, median, variance, and probability.",
      scheduledAt: "2026-05-18T18:00:00",
      durationMinutes: 20,
      totalGrade: 10,
      hasAttempted: false,
      isPublished: true,
      quizPath: "/student/quizzes/ai-quiz-3",
    },
    {
      id: "ai-quiz-4",
      quizNumber: 4,
      title: "Machine Learning Models Quiz",
      lessonId: "ml-models",
      lessonTitle: "Core ML Models",
      trackId: "ai-data-science",
      description: "A quiz about model evaluation, regression, and classification.",
      scheduledAt: "2026-05-22T18:00:00",
      durationMinutes: 30,
      totalGrade: 10,
      hasAttempted: false,
      isPublished: true,
      quizPath: "/student/quizzes/ai-quiz-4",
    },
  ],

  "mobile-development": [
    {
      id: "mobile-quiz-1",
      quizNumber: 1,
      title: "Mobile UI Fundamentals Quiz",
      lessonId: "mobile-ui",
      lessonTitle: "Mobile UI Fundamentals",
      trackId: "mobile-development",
      description: "A quiz about screens, layouts, spacing, and mobile-first design.",
      scheduledAt: "2026-05-04T18:00:00",
      durationMinutes: 20,
      totalGrade: 10,
      score: 9,
      hasAttempted: true,
      isPublished: true,
      quizPath: "/student/quizzes/mobile-quiz-1",
    },
    {
      id: "mobile-quiz-2",
      quizNumber: 2,
      title: "React Native Components Quiz",
      lessonId: "rn-components",
      lessonTitle: "React Native Components",
      trackId: "mobile-development",
      description: "Check your understanding of reusable mobile components.",
      scheduledAt: "2026-05-20T18:00:00",
      durationMinutes: 25,
      totalGrade: 10,
      hasAttempted: false,
      isPublished: true,
      quizPath: "/student/quizzes/mobile-quiz-2",
    },
  ],

  cybersecurity: [
    {
      id: "cyber-quiz-1",
      quizNumber: 1,
      title: "Networking Basics Quiz",
      lessonId: "network-basics",
      lessonTitle: "Networking Basics",
      trackId: "cybersecurity",
      description: "Test your knowledge of IP addresses, ports, and protocols.",
      scheduledAt: "2026-05-05T18:00:00",
      durationMinutes: 20,
      totalGrade: 10,
      score: 7,
      hasAttempted: true,
      isPublished: true,
      quizPath: "/student/quizzes/cyber-quiz-1",
    },
    {
      id: "cyber-quiz-2",
      quizNumber: 2,
      title: "OWASP Basics Quiz",
      lessonId: "owasp",
      lessonTitle: "OWASP Basics",
      trackId: "cybersecurity",
      description: "A quiz about common web vulnerabilities and prevention.",
      scheduledAt: "2026-05-19T18:00:00",
      durationMinutes: 25,
      totalGrade: 10,
      hasAttempted: false,
      isPublished: true,
      quizPath: "/student/quizzes/cyber-quiz-2",
    },
  ],
};

const getUnlockedLessonIds = (roadmap: RoadmapData) => {
  return roadmap.modules
    .flatMap((module) => module.lessons)
    .filter((lesson: RoadmapLesson) => lesson.status !== "locked")
    .map((lesson) => lesson.id);
};

export const useQuizzes = (): StudentQuiz[] => {
  const { selectedTrack } = useOnboarding();
  const roadmap = useRoadmap();

  const selectedTrackId = selectedTrack?.id ?? "web-development";
  const trackQuizzes = quizzesByTrack[selectedTrackId] ?? quizzesByTrack["web-development"];
  const unlockedLessonIds = getUnlockedLessonIds(roadmap);

  return trackQuizzes.filter((quiz) => {
    const isQuizPublished = quiz.isPublished;
    const isLessonUnlocked = unlockedLessonIds.includes(quiz.lessonId);

    return isQuizPublished && isLessonUnlocked;
  });
};