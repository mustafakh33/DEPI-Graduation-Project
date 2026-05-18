import type { RoadmapData, SoloStudyMaterial } from "../types/student.types";

export const getAvailableSoloStudyMaterials = (
  roadmap: RoadmapData
): SoloStudyMaterial[] => {
  return roadmap.modules.flatMap((module) =>
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
};