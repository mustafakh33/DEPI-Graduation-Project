import type {
    UploadQuizSectionProps,
  } from "../../types/lectureMaterials.types";
  
  export default function UploadQuizSection({
    quizFile,
  
    onSelectQuizFile,
  }: UploadQuizSectionProps) {
    return (
      <div className="quiz-section">
  
        <div className="section-title">
          Section 2:
          Upload Quiz Questions
        </div>
  
        <p className="quiz-description">
          Import quiz questions from
          CSV or Excel file.
        </p>
  
        <div className="quiz-actions">
  
          <button>
            Download Template
          </button>
  
          <button>
            Import Guide
          </button>
  
        </div>
  
        <div className="quiz-upload-row">
  
          <div className="quiz-file-preview">
            {quizFile
              ? quizFile.name
              : "No file selected"}
          </div>
  
          <label className="choose-file-btn">
  
            Choose File
  
            <input
              type="file"
              hidden
              accept=".csv,.xlsx"
              onChange={(e) =>
                onSelectQuizFile(
                  e.target.files?.[0] ||
                    null
                )
              }
            />
  
          </label>
  
        </div>
  
      </div>
    );
  }