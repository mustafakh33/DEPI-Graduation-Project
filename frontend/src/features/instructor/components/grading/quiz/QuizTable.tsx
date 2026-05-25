import type { QuizStudent } from "../../../types/grading.types";
import QuizRow from "./QuizRow";

interface Props {
  students: QuizStudent[];
}

export default function QuizTable({ students }: Props) {
  return (
    <div className="grading-table-wrap">
      <table className="grading-table grading-table--quiz">
        <colgroup>
          <col className="col-rank" />
          <col className="col-student" />
          <col className="col-date" />
          <col className="col-score" />
          <col className="col-status" />
          <col className="col-action" />
        </colgroup>
        <thead>
          <tr>
            <th className="col-rank">Rank</th>
            <th className="col-student">Student</th>
            <th className="col-date">Submission Date</th>
            <th className="col-score">Score</th>
            <th className="col-status">Status</th>
            <th className="col-action">Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <QuizRow key={student.id} student={student} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
