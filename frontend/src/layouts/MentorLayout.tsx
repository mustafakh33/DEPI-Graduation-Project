/**
 * Shell for all `/mentor/*` routes. Renders sidebar from `mentorNavItems`
 * and page content via React Router `<Outlet />`.
 *
 * @see @/features/mentor/README.md
 */
import React from "react";
import { mentorDashboardPath, mentorNavItems } from "@/features/mentor/config/navigation";
import { useLogout } from "@/hooks/useLogout";
import AppShellLayout from "@/layouts/AppShellLayout";

const MentorLayout: React.FC = () => {
  const handleLogout = useLogout();

  return (
    <AppShellLayout
      links={mentorNavItems}
      dashboardPath={mentorDashboardPath}
      portalSubtitle="Mentor Dashboard"
      showNewActionButton={false}
      onLogout={handleLogout}
    />
  );
};

export default MentorLayout;
