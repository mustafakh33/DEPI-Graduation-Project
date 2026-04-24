import React from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaBell,
  FaClipboardList,
  FaChartLine,
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import DashboardLayout from "../components/templates/DashboardLayout";

const mentorLinks = [
  { to: "/mentor/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { to: "/mentor/my-students", label: "My Students", icon: <FaUsers /> },
  { to: "/mentor/alerts", label: "Alerts", icon: <FaBell /> },
  { to: "/mentor/check-ins", label: "Check-Ins", icon: <FaClipboardList /> },
  { to: "/mentor/progress/1", label: "Progress", icon: <FaChartLine /> },
];

const MentorLayout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <DashboardLayout
      links={mentorLinks}
      dashboardPath="/mentor/dashboard"
      logo={<span role="img" aria-label="Mentor">🧑‍🏫</span>}
      layoutClassName="dashboard-layout"
      sidebarClassName="dashboard-sidebar"
      mainClassName="dashboard-main"
      onLogout={handleLogout}
    />
  );
};

export default MentorLayout;
