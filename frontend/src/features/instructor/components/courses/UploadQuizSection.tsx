import { CircleHelp, Download, FileUp, Info } from "lucide-react";
import type { UploadQuizSectionProps } from "../../types/lectureMaterials.types";

export default function UploadQuizSection({
  quizFile,
  onSelectQuizFile,
}: UploadQuizSectionProps) {
  return (
    <section className="quiz-section">
      <div className="section-header">
        <div className="title-wrap">
          <div className="section-icon section-icon--orange">
            <CircleHelp size={20} aria-hidden />
          </div>
          <h2 className="section-title">Section 2: Upload Quiz Questions</h2>
        </div>
        <span className="step-text">Step 2 of 2</span>
      </div>

      <p className="quiz-description">
        Import quiz questions from a structured file. Our AI engine will
        automatically parse questions, multiple-choice options, and correct
        answers for your lecture quiz.
      </p>

      <div className="quiz-actions">
        <button type="button" className="quiz-action-card">
          <span className="quiz-action-icon quiz-action-icon--blue">
            <Download size={20} aria-hidden />
          </span>
          <span className="quiz-action-text">
            <strong>Download Template</strong>
            <span>Get the Excel/CSV structure for seamless import.</span>
          </span>
        </button>

        <button type="button" className="quiz-action-card">
          <span className="quiz-action-icon quiz-action-icon--muted">
            <Info size={20} aria-hidden />
          </span>
          <span className="quiz-action-text">
            <strong>Import Guide</strong>
            <span>Learn about supported question types (MCQ, T/F).</span>
          </span>
        </button>
      </div>

      <div className="quiz-upload-row">
        <div className="quiz-file-preview">
          <FileUp size={18} className="quiz-file-icon" aria-hidden />
          <span>{quizFile ? quizFile.name : "No file selected..."}</span>
        </div>

        <label className="choose-file-btn">
          Choose File
          <input
            type="file"
            hidden
            accept=".csv,.xlsx"
            onChange={(e) => onSelectQuizFile(e.target.files?.[0] || null)}
          />
        </label>
      </div>
    </section>
  );
}
