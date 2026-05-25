import { useLocation, useParams } from "react-router-dom";
import StudentProfilePage from "../components/students/StudentProfilePage";
import StudentsListPage from "../components/students/StudentsListPage";

export default function Students() {
  const { studentId } = useParams();
  const { pathname } = useLocation();

  const normalizedPath = pathname.replace(/\/$/, "");
  const isStudentsListPage = normalizedPath === "/instructor/students";

  if (isStudentsListPage || !studentId) {
    return <StudentsListPage />;
  }

  return <StudentProfilePage />;
}

