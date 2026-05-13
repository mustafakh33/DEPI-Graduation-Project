import type { Student, TopPerformersProps } from "../../types/mentor.types";

export default function TopPerformers({ students }: TopPerformersProps) {
  return (
    <div className="top-card">

      <h3>Top Performers</h3>

      {students.map((student: Student) => (
        <div
          key={student.id}
          className="top-student"
        >
          <div>
            <h4>{student.name}</h4>

            <p>
              GPA {student.gpa}
            </p>
          </div>
        </div>
      ))}

    </div>
  );
}