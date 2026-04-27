import React from "react";
import { adminDashboardPath, adminNavItems } from "@/features/admin/config/navigation";
import { useLogout } from "@/core/hooks/useLogout";
import AppShellLayout from "@/layouts/AppShellLayout";

const AdminLayout: React.FC = () => {
  const handleLogout = useLogout();

  return (
    <AppShellLayout
      links={adminNavItems}
      dashboardPath={adminDashboardPath}
      portalSubtitle="Admin Dashboard"
      onLogout={handleLogout}
    />
  );
};

export default AdminLayout;
