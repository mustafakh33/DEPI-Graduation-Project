import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../organisms/Sidebar";
import type { NavLinkItem } from "../atoms/SidebarNavLink";
import "./DashboardLayout.css";

interface DashboardLayoutProps {
  links: NavLinkItem[];
  dashboardPath: string;
  logo?: React.ReactNode;
  appName?: string;
  layoutClassName?: string;
  sidebarClassName?: string;
  mainClassName?: string;
  onLogout?: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  links,
  dashboardPath,
  logo,
  appName,
  layoutClassName = "dashboard-layout",
  sidebarClassName = "dashboard-sidebar",
  mainClassName = "dashboard-main",
  onLogout,
}) => (
  <div className={layoutClassName}>
    <Sidebar
      links={links}
      dashboardPath={dashboardPath}
      logo={logo}
      appName={appName}
      className={sidebarClassName}
      onLogout={onLogout}
    />
    <main className={mainClassName}>
      <Outlet />
    </main>
  </div>
);

export default DashboardLayout;
