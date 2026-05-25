import type { AssignmentStudent } from "../../../types/grading.types";
import SubmissionGradingRow from "../shared/SubmissionGradingRow";

interface Props {
  students: AssignmentStudent[];
  updateScore: (id: string, score: number) => void;
  saveGrade: (id: string) => void;
}

const MAX_SCORE = 100;

export default function AssignmentTable({
  students,
  updateScore,
  saveGrade,
}: Props) {
  return (
    <div className="grading-table-wrap">
      <table className="grading-table grading-table--submission">
        <colgroup>
          <col className="col-student" />
          <col className="col-status" />
          <col className="col-submission" />
          <col className="col-score-input" />
          <col className="col-actions" />
        </colgroup>
        <thead>
          <tr>
            <th className="col-student">Student</th>
            <th className="col-status">Status</th>
            <th className="col-submission">Submission</th>
            <th className="col-score-input">Score (/100)</th>
            <th className="col-actions">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <SubmissionGradingRow
              key={student.id}
              student={student}
              maxScore={MAX_SCORE}
              openLabel="Open Assignment"
              onScoreChange={(score) => updateScore(student.id, score)}
              onSave={() => saveGrade(student.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
