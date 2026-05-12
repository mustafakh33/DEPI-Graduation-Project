
import LectureHeader from "../components/courses/LectureHeader.tsx";
import UploadMaterialsSection from "../components/courses/UploadMaterialSection";
import UploadQuizSection from "../components/courses/UploadQuizSection";
import { useLectureMaterials } from "../hooks/useLectureMaterials";
import "../styles/lectureMaterials.css";

export default function LectureMaterialsPage() {
  const {
    files,

    quizFile,

    handleSelectFiles,

    handleRemoveFile,

    setQuizFile,
  } = useLectureMaterials();

  return (
    <div className="lecture-page">

      <LectureHeader />

      <UploadMaterialsSection
        files={files}
        onSelectFiles={
          handleSelectFiles
        }
        onRemoveFile={
          handleRemoveFile
        }
      />

      <UploadQuizSection
        quizFile={quizFile}
        onSelectQuizFile={
          setQuizFile
        }
      />

    </div>
  );
}