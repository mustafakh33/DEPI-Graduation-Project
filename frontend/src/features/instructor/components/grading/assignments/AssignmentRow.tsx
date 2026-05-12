import SaveGradeButton from "../shared/SaveGradeButton";

import type {
  AssignmentStudent,
} from "../../../types/grading.types";

interface Props {
  student: AssignmentStudent;

  onScoreChange: (
    score: number
  ) => void;

  onSave: () => void;
}

export default function AssignmentRow({
  student,

  onScoreChange,

  onSave,
}: Props) {
  return (
    <tr>

      <td>
        {student.studentName}
        <br />
        <span>
          {student.studentId}
        </span>
      </td>

      <td>
        {student.status}
      </td>

      <td>
        {student.fileName}
      </td>

      <td>

        <input
          type="number"
          value={student.score}
          max={20}
          onChange={(e) =>
            onScoreChange(
              Number(
                e.target.value
              )
            )
          }
        />

      </td>

      <td>

        <SaveGradeButton
          saved={student.saved}
          onClick={onSave}
        />

      </td>

    </tr>
  );
}