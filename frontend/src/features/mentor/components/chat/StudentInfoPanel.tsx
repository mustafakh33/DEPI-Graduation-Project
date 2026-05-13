import type { Student } from "../../types/mentor.types";

export default function StudentInfoPanel({ student }: { student: Student }) {
  return (
    <div className="student-panel">
      <div className="student-card">
        <div className="student-avatar" />

        <h3>{student.name}</h3>

        <p>{student.major}</p>

        <div className="badges">
          <span>Senior</span>
          <span>Honors</span>
          <span>{student.gpa}</span>
        </div>
      </div>

      <div className="notes-box">
        <h4>Notes</h4>

        <textarea placeholder="Add a private note..." />
      </div>
    </div>
  );
}