import type {
  UploadQuizSectionProps,
} from "../../types/lectureMaterials.types";

export default function UploadQuizSection({
  quizFile,
  onSelectQuizFile,
}: UploadQuizSectionProps) {
  return (
    <div className="quiz-section">
      <div className="section-header">
        <div className="title-wrap">
          <div className="section-icon orange">?</div>
          <div className="section-title">Section 2: Upload Quiz Questions</div>
        </div>

        <span className="step-text">STEP 2 OF 2</span>
      </div>

      <p className="quiz-description">
        Import quiz questions from a structured file. Our AI engine will
        automatically parse questions, multiple-choice options, and correct
        answers.
      </p>

      <div className="quiz-actions">
        <button>
          <strong>Download Template</strong>
          <span>Get the Excel/CSV structure for seamless import.</span>
        </button>

        <button>
          <strong>Import Guide</strong>
          <span>Learn about supported question types (MCQ, T/F).</span>
        </button>
      </div>

      <div className="quiz-upload-row">
        <div className="quiz-file-preview">
          {quizFile ? quizFile.name : "No file selected..."}
        </div>

        <label className="choose-file-btn">
          Choose File
          <input
            type="file"
            hidden
            accept=".csv,.xlsx"
            onChange={(e) =>
              onSelectQuizFile(e.target.files?.[0] || null)
            }
          />
        </label>
      </div>
    </div>
  );
}