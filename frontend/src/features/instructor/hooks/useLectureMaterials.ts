import { useState } from "react";

import type {
  UploadedMaterial,
} from "../types/lectureMaterials.types";

export const useLectureMaterials = () => {
  const [files, setFiles] = useState<
    UploadedMaterial[]
  >([]);

  const [quizFile, setQuizFile] =
    useState<File | null>(null);

  const handleSelectFiles = (
    selectedFiles: FileList | null
  ) => {
    if (!selectedFiles) return;

    const mappedFiles = Array.from(
      selectedFiles
    ).map((file) => ({
      id: crypto.randomUUID(),

      name: file.name,

      size: `${(
        file.size /
        1024 /
        1024
      ).toFixed(1)} MB`,

      progress: 100,

      status: "uploaded" as const,

      type: file.name.split(".").pop() as
        | "pdf"
        | "mp4"
        | "pptx"
        | "zip",
    }));

    setFiles((prev) => [
      ...prev,
      ...mappedFiles,
    ]);
  };

  const handleRemoveFile = (
    id: string
  ) => {
    setFiles((prev) =>
      prev.filter(
        (file) => file.id !== id
      )
    );
  };

  return {
    files,

    quizFile,

    handleSelectFiles,

    handleRemoveFile,

    setQuizFile,
  };
};