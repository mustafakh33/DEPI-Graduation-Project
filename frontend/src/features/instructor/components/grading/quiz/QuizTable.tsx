import type {
    QuizStudent,
  } from "../../../types/grading.types";
  
  import QuizRow from "./QuizRow";
  
  interface Props {
    students: QuizStudent[];
  }
  
  export default function QuizTable({
    students,
  }: Props) {
    return (
      <table>
  
        <thead>
          <tr>
            <th>Rank</th>
            <th>Student</th>
            <th>Submission Date</th>
            <th>Quiz Score</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
  
        <tbody>
  
          {students.map((student) => (
            <QuizRow
              key={student.id}
              student={student}
            />
          ))}
  
        </tbody>
  
      </table>
    );
  }