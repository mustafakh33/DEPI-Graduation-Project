import React from "react";
import SidebarHeader from "../molecules/SidebarHeader";
import SidebarNavLink from "../atoms/SidebarNavLink";
import type { NavLinkItem } from "../atoms/SidebarNavLink";
import LogoutButton from "../atoms/LogoutButton";

interface SidebarProps {
  links: NavLinkItem[];
  dashboardPath: string;
  logo?: React.ReactNode;
  appName?: string;
  className?: string;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  links,
  dashboardPath,
  logo,
  appName,
  className = "sidebar",
  onLogout,
}) => (
  <aside className={className}>
    <SidebarHeader logo={logo} appName={appName} />
    <nav>
      {links.map((link) => (
        <SidebarNavLink key={link.to} link={link} dashboardPath={dashboardPath} />
      ))}
    </nav>
    {onLogout && <LogoutButton onLogout={onLogout} />}
  </aside>
);

export default Sidebar;
