/**
 * Students — `/instructor/students` and `/instructor/students/:studentId`
 *
 * Single route entry: list (`StudentsListPage`) or profile (`StudentProfilePage`) from URL param.
 *
 * @see ../README.md#section-students
 */
import { useParams } from "react-router-dom";
import StudentProfilePage from "../components/students/StudentProfilePage";
import StudentsListPage from "../components/students/StudentsListPage";

export default function Students() {
  const { studentId } = useParams<{ studentId?: string }>();

  if (!studentId) {
    return <StudentsListPage />;
  }

  return <StudentProfilePage />;
}

