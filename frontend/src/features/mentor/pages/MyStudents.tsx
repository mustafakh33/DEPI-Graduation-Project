/**
 * My Students — `/mentor/my-students` and `/mentor/my-students/:studentId`
 *
 * List or profile view; profile reuses instructor KPI/chart/tab components.
 *
 * @see ../README.md#section-my-students
 */
import { useParams } from "react-router-dom";
import MentorStudentProfilePage from "../components/my-students/MentorStudentProfilePage";
import MentorStudentsListPage from "../components/my-students/MentorStudentsListPage";

export default function MyStudents() {
  const { studentId } = useParams<{ studentId?: string }>();

  if (!studentId) {
    return <MentorStudentsListPage />;
  }

  return <MentorStudentProfilePage />;
}
