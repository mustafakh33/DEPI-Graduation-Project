import { Eye, Star, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import type { TopPerformersProps } from "../../types/mentor.types";

export default function TopPerformers({ students }: TopPerformersProps) {
  return (
    <div className="top-card">
      <div className="top-card__header">
        <div className="top-card__title">
          <Trophy size={18} aria-hidden />
          <h3>Top Performers</h3>
        </div>
        <Star size={16} className="top-card__star" aria-hidden />
      </div>

      {students.length === 0 ? (
        <p className="widget-empty">No performance data yet.</p>
      ) : (
        students.map((student, index) => (
          <div key={student.id} className="top-student">
            <span className="top-student__rank">{index + 1}</span>
            <span className="top-student__avatar" aria-hidden />
            <div className="top-student__body">
              <h4>{student.name}</h4>
              <p>
                GPA {student.gpa.toFixed(1)} — {student.major}
              </p>
            </div>
            <Link
              to={`/mentor/my-students/${student.id}`}
              className="top-student__view"
              aria-label={`View ${student.name}`}
            >
              <Eye size={16} />
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
