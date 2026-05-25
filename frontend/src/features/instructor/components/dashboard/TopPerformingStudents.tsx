import { Link } from "react-router-dom";
import type { SubjectTopStudent } from "../../types/instructorDashboard.types";

interface Props {
  students: SubjectTopStudent[];
}

export default function TopPerformingStudents({ students }: Props) {
  return (
    <aside className="dashboard-top-students">
      <h3>Top Performing Students</h3>
      <ol className="dashboard-top-students__list">
        {students.map((student) => (
          <li key={student.id}>
            <span className="dashboard-top-students__rank">{student.rank}</span>
            <span className="dashboard-top-students__avatar" aria-hidden />
            <div className="dashboard-top-students__info">
              <Link to={`/instructor/students/${student.id}`}>
                {student.name}
              </Link>
              <span>{student.score.toFixed(1)}% score</span>
            </div>
          </li>
        ))}
      </ol>
      <Link to="/instructor/students" className="dashboard-top-students__view-all">
        View all students
      </Link>
    </aside>
  );
}
