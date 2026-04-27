import React from "react";
import {
  instructorDashboardPath,
  instructorNavItems,
} from "@/features/instructor/config/navigation";
import { useLogout } from "@/core/hooks/useLogout";
import AppShellLayout from "@/layouts/AppShellLayout";

const InstructorLayout: React.FC = () => {
  const handleLogout = useLogout();

  return (
    <AppShellLayout
      links={instructorNavItems}
      dashboardPath={instructorDashboardPath}
      portalSubtitle="Instructor Dashboard"
      onLogout={handleLogout}
    />
  );
};

export default InstructorLayout;
