import StudentCard from "./StudentCard";
import type { Student, StudentGridProps } from "../../types/mentor.types";

export default function StudentGrid({ students }: StudentGridProps) {
  return (
    <div className="students-grid">

      {students.map((student: Student) => (
        <StudentCard
          key={student.id}
          student={student}
        />
      ))}

    </div>
  );
}