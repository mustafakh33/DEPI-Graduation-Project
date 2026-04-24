import React from "react";
import {
  FaTachometerAlt,
  FaMap,
  FaUsers,
  FaBook,
  FaUser,
  FaMedal,
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import DashboardLayout from "../components/templates/DashboardLayout";

const studentLinks = [
  { to: "/student/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { to: "/student/roadmap", label: "Roadmap", icon: <FaMap /> },
  { to: "/student/study-hub", label: "Study Hub", icon: <FaUsers /> },
  { to: "/student/exams", label: "Exams", icon: <FaBook /> },
  { to: "/student/profile", label: "Profile", icon: <FaUser /> },
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
      logo={<FaMedal className="logo" />}
      layoutClassName="dashboard-layout"
      sidebarClassName="dashboard-sidebar"
      mainClassName="dashboard-main"
      onLogout={handleLogout}
    />
  );
};

export default StudentLayout;
