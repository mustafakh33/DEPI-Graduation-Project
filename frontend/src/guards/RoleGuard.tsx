import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import type { Role } from "../types/global.types";
import { useAuth } from "../hooks/useAuth";

interface RoleGuardProps {
  allowedRoles: Role[];
}

const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles }) => {
  const { user } = useAuth();
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export default RoleGuard;
