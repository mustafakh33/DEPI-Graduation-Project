import type { UploadedMaterial } from "../types/lectureMaterials.types";

export const defaultUploadQueue: UploadedMaterial[] = [
  {
    id: "default-1",
    name: "Lecture_04_DP_Slides.pdf",
    size: "4.2 MB",
    progress: 100,
    status: "uploaded",
    type: "pdf",
  },
  {
    id: "default-2",
    name: "DP_Recording_Full.mp4",
    size: "128.5 MB",
    progress: 62,
    status: "uploading",
    type: "mp4",
  },
];

export const lectureSession = {
  courseCode: "CS504 - Advanced Algorithms",
  lectureTitle: "Lecture 04: Dynamic Programming",
};
