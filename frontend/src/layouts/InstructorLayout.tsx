import React from "react";
import {
  FaTachometerAlt,
  FaBook,
  FaUsers,
  FaClipboardCheck,
  FaQuestion,
  FaVideo,
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import DashboardLayout from "../components/templates/DashboardLayout";

const instructorLinks = [
  { to: "/instructor/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { to: "/instructor/my-courses", label: "My Courses", icon: <FaBook /> },
  { to: "/instructor/students", label: "Students", icon: <FaUsers /> },
  { to: "/instructor/grades", label: "Grades", icon: <FaClipboardCheck /> },
  { to: "/instructor/quizzes", label: "Quizzes", icon: <FaQuestion /> },
  { to: "/instructor/live-session", label: "Live Session", icon: <FaVideo /> },
];

const InstructorLayout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <DashboardLayout
      links={instructorLinks}
      dashboardPath="/instructor/dashboard"
      logo={<span role="img" aria-label="Instructor">🎓</span>}
      layoutClassName="dashboard-layout"
      sidebarClassName="dashboard-sidebar"
      mainClassName="dashboard-main"
      onLogout={handleLogout}
    />
  );
};

export default InstructorLayout;
