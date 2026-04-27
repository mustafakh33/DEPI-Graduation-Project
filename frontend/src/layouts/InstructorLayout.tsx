import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import DashboardLayout from "../components/templates/DashboardLayout";
import { navIcon } from "../components/dashboard/navIcon";

const instructorLinks = [
  { to: "/instructor/dashboard", label: "Dashboard", icon: navIcon("dashboard") },
  { to: "/instructor/my-courses", label: "My Courses", icon: navIcon("menu_book") },
  { to: "/instructor/students", label: "Students", icon: navIcon("group") },
  { to: "/instructor/grades", label: "Grades", icon: navIcon("grading") },
  { to: "/instructor/quizzes", label: "Quizzes", icon: navIcon("quiz") },
  { to: "/instructor/live-session", label: "Live Session", icon: navIcon("videocam") },
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
      portalSubtitle="Instructor Dashboard"
      onLogout={handleLogout}
    />
  );
};

export default InstructorLayout;
