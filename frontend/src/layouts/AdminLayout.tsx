import React from "react";
import { useNavigate } from "react-router-dom";

import { adminDashboardPath, adminNavItems } from "@/features/admin/config/navigation";
import { AdminPortalProvider, useAdminPortal } from "@/features/admin/context/AdminPortalContext";
import { useLogout } from "@/hooks/useLogout";
import AppShellLayout from "@/layouts/AppShellLayout";

const entityRouteMap = {
  batches: "/admin/batches",
  courses: "/admin/courses",
  feedback: "/admin/feedback",
  sessions: "/admin/sessions",
  settings: "/admin/settings",
  users: "/admin/users",
} as const;

const AdminShell: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const navigate = useNavigate();
  const { activities } = useAdminPortal();

  const quickActions = [
    {
      id: "add-user",
      label: "Add account",
      description: "Create a new admin, instructor, mentor, or student.",
      icon: "person_add",
      onClick: () => navigate("/admin/users?action=create"),
    },
    {
      id: "schedule-session",
      label: "Schedule session",
      description: "Create a new learning session and assign its staff.",
      icon: "calendar_add_on",
      onClick: () => navigate("/admin/sessions?action=create"),
    },
    {
      id: "create-batch",
      label: "Create batch",
      description: "Open a fresh cohort and assign mentors and instructors.",
      icon: "stacked_line_chart",
      onClick: () => navigate("/admin/batches?action=create"),
    },
    {
      id: "create-course",
      label: "Create course",
      description: "Add a course and link it to one or more batches.",
      icon: "library_add",
      onClick: () => navigate("/admin/courses?action=create"),
    },
    {
      id: "student-portal",
      label: "Open student portal",
      description: "Inspect the student experience as admin.",
      icon: "school",
      onClick: () => navigate("/student/dashboard"),
    },
    {
      id: "instructor-portal",
      label: "Open instructor portal",
      description: "Inspect the instructor workspace and teaching tools.",
      icon: "co_present",
      onClick: () => navigate("/instructor/dashboard"),
    },
    {
      id: "instructor-attendance",
      label: "Take attendance",
      description: "Open instructor live-session tools and attendance controls.",
      icon: "fact_check",
      onClick: () => navigate("/instructor/live-session"),
    },
    {
      id: "instructor-grades",
      label: "Open grades",
      description: "Review quiz and assignment grading as admin.",
      icon: "grading",
      onClick: () => navigate("/instructor/grades"),
    },
    {
      id: "instructor-students",
      label: "Open instructor students",
      description: "Manage student rosters, profiles, and attendance logs.",
      icon: "group",
      onClick: () => navigate("/instructor/students"),
    },
    {
      id: "mentor-portal",
      label: "Open mentor portal",
      description: "Inspect mentor sessions, students, and chat tools.",
      icon: "supervisor_account",
      onClick: () => navigate("/mentor/dashboard"),
    },
    {
      id: "mentor-students",
      label: "Open mentor students",
      description: "Review mentee profiles, notes, and follow-up actions.",
      icon: "school",
      onClick: () => navigate("/mentor/my-students"),
    },
    {
      id: "mentor-sessions",
      label: "Open mentor sessions",
      description: "Create or supervise study-group sessions as admin.",
      icon: "video_chat",
      onClick: () => navigate("/mentor/my-sessions"),
    },
    {
      id: "mentor-progress",
      label: "Open mentor progress",
      description: "Track batch attendance, absence, and performance trends.",
      icon: "monitoring",
      onClick: () => navigate("/mentor/progress/1"),
    },
  ];

  const notificationItems = activities.slice(0, 8).map((activity) => ({
    id: activity.id,
    title: activity.message,
    description: `Source: ${activity.entity}`,
    timestamp: new Date(activity.createdAt).toLocaleString(),
    onClick: () => navigate(entityRouteMap[activity.entity]),
  }));

  return (
    <AppShellLayout
      links={adminNavItems}
      dashboardPath={adminDashboardPath}
      portalSubtitle="Admin Dashboard"
      onLogout={onLogout}
      quickActions={quickActions}
      notificationItems={notificationItems}
      notificationsTitle="Recent admin activity"
    />
  );
};

const AdminLayout: React.FC = () => {
  const handleLogout = useLogout();

  return (
    <AdminPortalProvider>
      <AdminShell onLogout={handleLogout} />
    </AdminPortalProvider>
  );
};

export default AdminLayout;
