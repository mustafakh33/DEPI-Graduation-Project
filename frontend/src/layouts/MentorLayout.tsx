import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import DashboardLayout from "../components/templates/DashboardLayout";
import { navIcon } from "../components/dashboard/navIcon";

const mentorLinks = [
  { to: "/mentor/dashboard", label: "Dashboard", icon: navIcon("dashboard") },
  { to: "/mentor/my-students", label: "My Students", icon: navIcon("group") },
  { to: "/mentor/alerts", label: "Alerts", icon: navIcon("notifications") },
  { to: "/mentor/check-ins", label: "Check-Ins", icon: navIcon("assignment") },
  { to: "/mentor/progress/1", label: "Progress", icon: navIcon("trending_up") },
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
      portalSubtitle="Mentor Dashboard"
      onLogout={handleLogout}
    />
  );
};

export default MentorLayout;
