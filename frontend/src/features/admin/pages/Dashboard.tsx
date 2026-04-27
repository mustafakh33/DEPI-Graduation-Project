import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import PortalDashboardOverview from "../../../components/dashboard/PortalDashboardOverview";

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  return <PortalDashboardOverview welcomeName={user?.name || "Admin"} />;
};

export default Dashboard;
