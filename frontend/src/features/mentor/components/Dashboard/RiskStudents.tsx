import { AlertTriangle, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import type { RiskStudentsProps } from "../../types/mentor.types";

export default function RiskStudents({ students }: RiskStudentsProps) {
  return (
    <div className="risk-card">
      <div className="risk-card__header">
        <div className="risk-card__title">
          <AlertTriangle size={18} aria-hidden />
          <h3>Risk Warning</h3>
        </div>
        <span className="risk-card__badge">URGENT</span>
      </div>

      {students.length === 0 ? (
        <p className="widget-empty">No at-risk students in this subject.</p>
      ) : (
        students.map((student) => (
          <div key={student.id} className="risk-student">
            <span className="risk-student__avatar" aria-hidden />
            <div className="risk-student__body">
              <h4>{student.name}</h4>
              <p>{student.riskReason ?? `Attendance: ${student.attendanceRate}%`}</p>
            </div>
            <Link
              to={`/mentor/my-students/${student.id}`}
              className="risk-student__link"
              aria-label={`View ${student.name} profile`}
            >
              <ExternalLink size={16} />
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
