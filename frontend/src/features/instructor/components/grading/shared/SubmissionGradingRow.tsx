import { FileText } from "lucide-react";
import type {
  AssignmentStudent,
  ProjectStudent,
} from "../../../types/grading.types";
import SaveGradeButton from "./SaveGradeButton";

type SubmissionStudent = AssignmentStudent | ProjectStudent;

interface Props {
  student: SubmissionStudent;
  maxScore: number;
  openLabel: string;
  onScoreChange: (score: number) => void;
  onSave: () => void;
}

function formatStatus(status: SubmissionStudent["status"]): string {
  return status === "not_submitted" ? "Not Submitted" : "Submitted";
}

export default function SubmissionGradingRow({
  student,
  maxScore,
  openLabel,
  onScoreChange,
  onSave,
}: Props) {
  const canGrade = student.status === "submitted";
  const showScoreInput = canGrade && !student.saved;

  return (
    <tr>
      <td className="col-student">
        <div className="student-cell">
          <div className="student-avatar">
            {student.avatar ? (
              <img src={student.avatar} alt={student.studentName} />
            ) : (
              <div className="avatar-placeholder" />
            )}
          </div>

          <div className="student-info">
            <h4>{student.studentName}</h4>
            <span>{student.studentId}</span>
          </div>
        </div>
      </td>

      <td className="col-status">
        <span className={`status-badge status-badge--${student.status}`}>
          {formatStatus(student.status)}
        </span>
      </td>

      <td className="col-submission">
        {canGrade ? (
          <button type="button" className="submission-link">
            <FileText size={16} aria-hidden />
            {openLabel}
          </button>
        ) : (
          <span className="submission-empty">No file uploaded</span>
        )}
      </td>

      <td className="col-score-input">
        {showScoreInput ? (
          <input
            type="number"
            className="score-input"
            value={student.score > 0 ? student.score : ""}
            min={0}
            max={maxScore}
            placeholder="--"
            onChange={(e) =>
              onScoreChange(Number(e.target.value) || 0)
            }
          />
        ) : (
          <span className="score-display">
            {canGrade && student.score > 0 ? student.score : "--"}
          </span>
        )}
      </td>

      <td className="col-actions">
        <SaveGradeButton
          saved={student.saved}
          onClick={onSave}
          disabled={!canGrade || student.score <= 0}
        />
      </td>
    </tr>
  );
}
