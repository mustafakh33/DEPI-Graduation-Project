import React from "react";
import { studentDashboardPath, studentNavItems } from "@/features/student/config/navigation";
import { useLogout } from "@/core/hooks/useLogout";
import AppShellLayout from "@/layouts/AppShellLayout";

const StudentLayout: React.FC = () => {
  const handleLogout = useLogout();

  return (
    <AppShellLayout
      links={studentNavItems}
      dashboardPath={studentDashboardPath}
      portalSubtitle="Student Dashboard"
      onLogout={handleLogout}
    />
  );
};

export default StudentLayout;
