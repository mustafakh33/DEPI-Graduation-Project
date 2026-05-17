import { useRoadmap, getRoadmapLessons } from "./useRoadmap";
import type { StudentLessonDetails } from "../types/student.types";

export const useLessonDetails = (lessonId?: string): StudentLessonDetails => {
  const roadmap = useRoadmap();
  const lessons = getRoadmapLessons(roadmap);

  const selectedLesson =
    lessons.find((lesson) => lesson.id === lessonId) ??
    lessons.find((lesson) => lesson.status === "active") ??
    lessons[0];

  const lessonTitle = selectedLesson?.title ?? "Lesson";
  const lessonDescription =
    selectedLesson?.description ??
    "Watch the lesson video and download the material to review the main concepts.";

  return {
    id: selectedLesson?.id ?? lessonId ?? "lesson-1",
    title: lessonTitle,
    description: lessonDescription,
    videoUrl: "/videos/Welcome.mp4",
    material: {
      id: `${selectedLesson?.id ?? "lesson"}-material`,
      title: `${lessonTitle} Material`,
      description:
        "This material is currently fixed for all students until instructor uploads are connected.",
      fileName: "UNI-HUP.pdf",
      fileUrl: "/materials/UNI-HUP.pdf",
    },
    instructor: {
      id: "instructor-1",
      name: "Ahmed Hassan",
      role: "instructor",
      avatarUrl: "https://i.pravatar.cc/80?img=12",
      chatPath: "/student/chat?contactId=instructor-1",
    },
    mentor: {
      id: "mentor-1",
      name: "Mariam Ali",
      role: "mentor",
      avatarUrl: "https://i.pravatar.cc/80?img=32",
      chatPath: "/student/chat?contactId=mentor-1",
    },
  };
};