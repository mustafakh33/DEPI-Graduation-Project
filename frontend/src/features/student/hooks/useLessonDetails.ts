import type { StudentLessonDetails } from "../types/student.types";

export const useLessonDetails = (lessonId?: string): StudentLessonDetails => {
  return {
    id: lessonId ?? "lesson-1",
    title: "HTML Basics",
    description:
      "Watch the lesson video and download the material to review the main concepts.",
    videoUrl: "/videos/Welcome.mp4",
    material: {
      id: "material-1",
      title: "Lesson Material",
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
      chatPath: "/student/messages/instructor-1",
    },
    mentor: {
      id: "mentor-1",
      name: "Mariam Ali",
      role: "mentor",
      avatarUrl: "https://i.pravatar.cc/80?img=32",
      chatPath: "/student/messages/mentor-1",
    },
  };
};