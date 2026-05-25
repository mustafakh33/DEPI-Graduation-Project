import { Link } from "react-router-dom";
import type { StudentCardProps } from "../../types/mentor.types";

export default function StudentCard({ student }: StudentCardProps) {
  const initials = student.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="student-card">
      <span className="student-card__id">ID: {student.studentId}</span>

      <div className="student-image-placeholder">
        {student.image ? (
          <img src={student.image} alt={student.name} />
        ) : (
          <span className="student-card__avatar" aria-hidden>
            {initials}
          </span>
        )}
      </div>

      <h3>{student.name}</h3>
      <p className="student-card__meta">
        {student.major} · {student.year}
      </p>

      <Link
        to={`/mentor/my-students/${student.id}`}
        className="view-profile-btn"
      >
        View Profile
      </Link>
    </article>
  );
}
