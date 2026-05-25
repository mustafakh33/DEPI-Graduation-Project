import { useState } from "react";
import { defaultUploadQueue } from "../data/lectureMaterials.mock";
import type { UploadedMaterial } from "../types/lectureMaterials.types";

function mapFileType(name: string): UploadedMaterial["type"] {
  const ext = name.split(".").pop()?.toLowerCase();
  if (ext === "mp4") return "mp4";
  if (ext === "pptx") return "pptx";
  if (ext === "zip") return "zip";
  return "pdf";
}

export const useLectureMaterials = () => {
  const [files, setFiles] = useState<UploadedMaterial[]>(defaultUploadQueue);
  const [quizFile, setQuizFile] = useState<File | null>(null);

  const handleSelectFiles = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const mappedFiles = Array.from(selectedFiles).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      progress: 100,
      status: "uploaded" as const,
      type: mapFileType(file.name),
    }));

    setFiles((prev) => [...prev, ...mappedFiles]);
  };

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleDeleteAll = () => {
    setFiles([]);
  };

  return {
    files,
    quizFile,
    handleSelectFiles,
    handleRemoveFile,
    handleDeleteAll,
    setQuizFile,
  };
};
