import { Eye } from "lucide-react";
import type { QuizStudent } from "../../../types/grading.types";
import ScoreBar from "../shared/ScoreBar";

interface Props {
  student: QuizStudent;
}

function rankBadgeClass(rank: number): string {
  if (rank === 1) return "rank-badge rank-badge--gold";
  if (rank === 2) return "rank-badge rank-badge--silver";
  if (rank === 3) return "rank-badge rank-badge--bronze";
  return "rank-badge";
}

export default function QuizRow({ student }: Props) {
  return (
    <tr>
      <td className="col-rank">
        <span className={rankBadgeClass(student.rank)}>
          {student.rank}
        </span>
      </td>

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

      <td className="col-date">{student.submissionDate}</td>

      <td className="col-score">
        {student.status === "absent" ? (
          <span className="score-empty">No Data</span>
        ) : (
          <ScoreBar score={student.score} />
        )}
      </td>

      <td className="col-status">
        <span className={`status-badge status-badge--${student.status}`}>
          {student.status}
        </span>
      </td>

      <td className="col-action">
        <button type="button" className="view-answers-btn">
          <Eye size={16} aria-hidden />
          View Answers
        </button>
      </td>
    </tr>
  );
}
