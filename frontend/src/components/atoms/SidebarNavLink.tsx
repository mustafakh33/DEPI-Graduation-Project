import React from "react";
import { NavLink } from "react-router";

export interface NavLinkItem {
  to: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarNavLinkProps {
  link: NavLinkItem;
  /** The "home" route of this role — used to apply `end` so it only activates on exact match */
  dashboardPath: string;
}

const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({ link, dashboardPath }) => (
  <NavLink
    to={link.to}
    className={({ isActive }) => (isActive ? "sidebar-link active" : "sidebar-link")}
    end={link.to === dashboardPath}
  >
    <span className="icon">{link.icon}</span>
    <span>{link.label}</span>
  </NavLink>
);

export default SidebarNavLink;
