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

const inactive =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800";
const active =
  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium bg-primary/10 text-primary";

const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({ link, dashboardPath }) => (
  <NavLink
    to={link.to}
    className={({ isActive }) => (isActive ? active : inactive)}
    end={link.to === dashboardPath}
  >
    <span className="flex shrink-0 items-center justify-center [&_.material-symbols-outlined]:text-[20px]">
      {link.icon}
    </span>
    <span>{link.label}</span>
  </NavLink>
);

export default SidebarNavLink;
