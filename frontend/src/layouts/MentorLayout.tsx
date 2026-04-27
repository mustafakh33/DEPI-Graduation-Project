import React from "react";
import { mentorDashboardPath, mentorNavItems } from "@/features/mentor/config/navigation";
import { useLogout } from "@/core/hooks/useLogout";
import AppShellLayout from "@/layouts/AppShellLayout";

const MentorLayout: React.FC = () => {
  const handleLogout = useLogout();

  return (
    <AppShellLayout
      links={mentorNavItems}
      dashboardPath={mentorDashboardPath}
      portalSubtitle="Mentor Dashboard"
      onLogout={handleLogout}
    />
  );
};

export default MentorLayout;
