import type { Student, RiskStudentsProps } from "../../types/mentor.types";

export default function RiskStudents({ students }: RiskStudentsProps) {
  return (
    <div className="risk-card">

      <h3>Risk Warning</h3>

      {students.map((student: Student) => (
        <div
          key={student.id}
          className="risk-student"
        >
          <div>
            <h4>{student.name}</h4>
            <p>
              Attendance {student.attendanceRate}%
            </p>
          </div>
        </div>
      ))}

    </div>
  );
}