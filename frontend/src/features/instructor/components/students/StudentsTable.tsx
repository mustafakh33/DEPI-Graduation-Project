import { Link } from "react-router-dom";
import type { InstructorStudent } from "../../types/students.types";

interface Props {
  students: InstructorStudent[];
}

function statusLabel(status: InstructorStudent["status"]): string {
  if (status === "at_risk") return "At Risk";
  if (status === "inactive") return "Inactive";
  return "Active";
}

export default function StudentsTable({ students }: Props) {
  return (
    <div className="students-table-wrap">
      <table className="students-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Student ID</th>
            <th>Batch</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan={4} className="students-empty">
                No students match your filters.
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td>
                  <Link
                    to={`/instructor/students/${student.id}`}
                    className="student-name-link"
                  >
                    <span className="student-row-avatar" />
                    {student.name}
                  </Link>
                </td>
                <td>{student.studentId}</td>
                <td>
                  <span className="batch-pill">{student.batchName}</span>
                </td>
                <td>
                  <span className={`status-pill status-pill--${student.status}`}>
                    {statusLabel(student.status)}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
