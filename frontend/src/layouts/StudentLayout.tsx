import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import DashboardLayout from "../components/templates/DashboardLayout";
import { navIcon } from "../components/dashboard/navIcon";

const studentLinks = [
  { to: "/student/dashboard", label: "Dashboard", icon: navIcon("dashboard") },
  { to: "/student/roadmap", label: "Roadmap", icon: navIcon("map") },
  { to: "/student/study-hub", label: "Study Hub", icon: navIcon("groups") },
  { to: "/student/exams", label: "Exams", icon: navIcon("quiz") },
  { to: "/student/profile", label: "Profile", icon: navIcon("person") },
];

const StudentLayout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <DashboardLayout
      links={studentLinks}
      dashboardPath="/student/dashboard"
      portalSubtitle="Student Dashboard"
      onLogout={handleLogout}
    />
  );
};

export default StudentLayout;
