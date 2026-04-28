import React from "react";
import PortalDashboardOverview from "@/features/dashboard/components/PortalDashboardOverview";
import { useAuth } from "@/hooks/useAuth";

/**
 * Shared portal home for all roles (admin, instructor, mentor, student).
 */
const PortalHomePage: React.FC = () => {
  const { user } = useAuth();
  const welcomeName = user?.name || "there";

  return <PortalDashboardOverview welcomeName={welcomeName} />;
};

export default PortalHomePage;
