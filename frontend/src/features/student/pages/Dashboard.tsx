import React from "react";
import PortalDashboardOverview from "@/components/shared/PortalDashboardOverview";
import { useAuth } from "@/hooks/useAuth";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const welcomeName = user?.name || "there";

  return <PortalDashboardOverview welcomeName={welcomeName} />;
};

export default Dashboard;
