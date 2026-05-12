import type {
    AssignmentStudent,
  } from "../../../types/grading.types";
  
  import AssignmentRow from "./AssignmentRow";
  
  interface Props {
    students: AssignmentStudent[];
  
    updateScore: (
      id: string,
      score: number
    ) => void;
  
    saveGrade: (
      id: string
    ) => void;
  }
  
  export default function AssignmentTable({
    students,
  
    updateScore,
  
    saveGrade,
  }: Props) {
    return (
      <table>
  
        <thead>
          <tr>
            <th>Student</th>
            <th>Status</th>
            <th>Submission File</th>
            <th>Score (/20)</th>
            <th>Actions</th>
          </tr>
        </thead>
  
        <tbody>
  
          {students.map((student) => (
            <AssignmentRow
              key={student.id}
              student={student}
              onScoreChange={(
                score
              ) =>
                updateScore(
                  student.id,
                  score
                )
              }
              onSave={() =>
                saveGrade(
                  student.id
                )
              }
            />
          ))}
  
        </tbody>
  
      </table>
    );
  }