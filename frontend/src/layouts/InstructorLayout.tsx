/**
 * Shell for all `/instructor/*` routes. Renders sidebar from
 * `instructorNavItems` and page content via React Router `<Outlet />`.
 *
 * @see @/features/instructor/README.md
 */
import React from "react";
import {
  instructorDashboardPath,
  instructorNavItems,
} from "@/features/instructor/config/navigation";
import { useLogout } from "@/hooks/useLogout";
import AppShellLayout from "@/layouts/AppShellLayout";

const InstructorLayout: React.FC = () => {
  const handleLogout = useLogout();

  return (
    <AppShellLayout
      links={instructorNavItems}
      dashboardPath={instructorDashboardPath}
      portalSubtitle="Instructor Dashboard"
      showNewActionButton={false}
      onLogout={handleLogout}
    />
  );
};

export default InstructorLayout;
