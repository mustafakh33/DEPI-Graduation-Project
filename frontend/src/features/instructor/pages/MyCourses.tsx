/**
 * My Courses (Lecture Materials) — `/instructor/my-courses`
 *
 * Upload and manage lecture PDFs and quiz files via `useLectureMaterials` (mock/local File API).
 *
 * @see ../README.md#section-my-courses
 */
import LectureHeader from "../components/courses/LectureHeader";
import UploadMaterialsSection from "../components/courses/UploadMaterialSection";
import UploadQuizSection from "../components/courses/UploadQuizSection";
import { useLectureMaterials } from "../hooks/useLectureMaterials";
import "../styles/LectureMaterials.css";

export default function LectureMaterialsPage() {
  const {
    files,
    quizFile,
    handleSelectFiles,
    handleDeleteAll,
    setQuizFile,
  } = useLectureMaterials();

  return (
    <div className="lecture-page">
      <LectureHeader />

      <main className="lecture-content">
        <UploadMaterialsSection
          files={files}
          onSelectFiles={handleSelectFiles}
          onDeleteAll={handleDeleteAll}
        />

        <UploadQuizSection
          quizFile={quizFile}
          onSelectQuizFile={setQuizFile}
        />
      </main>
    </div>
  );
}
