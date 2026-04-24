import React from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaLayerGroup,
  FaBook,
  FaChartBar,
  FaCog,
} from "react-icons/fa";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import DashboardLayout from "../components/templates/DashboardLayout";

const adminLinks = [
  { to: "/admin/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { to: "/admin/users", label: "Users", icon: <FaUsers /> },
  { to: "/admin/batches", label: "Batches", icon: <FaLayerGroup /> },
  { to: "/admin/courses", label: "Courses", icon: <FaBook /> },
  { to: "/admin/reports", label: "Reports", icon: <FaChartBar /> },
  { to: "/admin/settings", label: "Settings", icon: <FaCog /> },
];

const AdminLayout: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <DashboardLayout
      links={adminLinks}
      dashboardPath="/admin/dashboard"
      logo={<span role="img" aria-label="Admin">🛡️</span>}
      layoutClassName="dashboard-layout"
      sidebarClassName="dashboard-sidebar"
      mainClassName="dashboard-main"
      onLogout={handleLogout}
    />
  );
};

export default AdminLayout;
