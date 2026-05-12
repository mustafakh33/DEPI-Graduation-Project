import type {
    ProjectStudent,
  } from "../../../types/grading.types";
  
  import ProjectRow from "./ProjectRow";
  
  interface Props {
    students: ProjectStudent[];
  
    updateScore: (
      id: string,
      score: number
    ) => void;
  
    saveGrade: (
      id: string
    ) => void;
  }
  
  export default function ProjectTable({
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
            <th>Score (/100)</th>
            <th>Actions</th>
          </tr>
        </thead>
  
        <tbody>
  
          {students.map((student) => (
            <ProjectRow
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