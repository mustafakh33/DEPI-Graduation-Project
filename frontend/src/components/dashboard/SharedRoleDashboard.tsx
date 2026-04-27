import React from "react";
import { useAuth } from "../../hooks/useAuth";
import PortalDashboardOverview from "./PortalDashboardOverview";

/**
 * Student / mentor / instructor home — same visuals as the Uni Hub admin dashboard reference.
 */
const SharedRoleDashboard: React.FC = () => {
  const { user } = useAuth();
  const welcomeName = user?.name || "there";

  return <PortalDashboardOverview welcomeName={welcomeName} />;
};

export default SharedRoleDashboard;
