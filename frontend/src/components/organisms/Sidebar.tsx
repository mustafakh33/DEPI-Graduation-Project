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
  portalSubtitle?: string;
  userName?: string;
  userRole?: string;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  links,
  dashboardPath,
  logo,
  appName,
  portalSubtitle,
  userName,
  userRole,
  onLogout,
}) => (
  <aside className="sticky top-0 flex h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-[#0b0f1a]">
    <SidebarHeader logo={logo} appName={appName} portalSubtitle={portalSubtitle} />
    <nav className="flex flex-1 flex-col space-y-1 overflow-y-auto px-4 py-4">
      {links.map((link) => (
        <SidebarNavLink key={link.to} link={link} dashboardPath={dashboardPath} />
      ))}
    </nav>
    {(userName || onLogout) && (
      <div className="border-t border-slate-200 p-4 dark:border-slate-800">
        {userName ? (
          <div className="mb-3 flex items-center gap-3 p-2">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-slate-200 text-xs font-bold uppercase text-slate-600 dark:border-slate-700 dark:bg-slate-700 dark:text-slate-200">
              {userName.slice(0, 1)}
            </div>
            <div className="min-w-0 flex-1 overflow-hidden">
              <p className="truncate text-xs font-semibold text-slate-900 dark:text-white">{userName}</p>
              {userRole ? (
                <p className="truncate text-[10px] capitalize text-slate-500 dark:text-slate-400">{userRole}</p>
              ) : null}
            </div>
          </div>
        ) : null}
        {onLogout ? <LogoutButton onLogout={onLogout} /> : null}
      </div>
    )}
  </aside>
);

export default Sidebar;
