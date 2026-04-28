import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/cn";
import SidebarHeader from "./SidebarHeader";
import SidebarNavLink from "./SidebarNavLink";
import type { NavLinkItem } from "./SidebarNavLink";
import LogoutButton from "./LogoutButton";

interface SidebarProps {
  links: NavLinkItem[];
  dashboardPath: string;
  logo?: React.ReactNode;
  appName?: string;
  portalSubtitle?: string;
  userName?: string;
  userRole?: string;
  onLogout?: () => void;
  /** Extra classes — e.g. mobile drawer (`h-full`) vs desktop (`md:flex w-64`) */
  className?: string;
  onNavigate?: () => void;
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
  className,
  onNavigate,
}) => (
  <aside
    className={cn(
      "flex shrink-0 flex-col border-r border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-[#0b0f1a]",
      "sticky top-0 h-screen w-64",
      className,
    )}
  >
    <SidebarHeader logo={logo} appName={appName} portalSubtitle={portalSubtitle} />
    <ScrollArea className="min-h-0 flex-1">
      <nav className="flex flex-col space-y-1 px-4 py-4">
        {links.map((link) => (
          <SidebarNavLink
            key={link.to}
            link={link}
            dashboardPath={dashboardPath}
            onNavigate={onNavigate}
          />
        ))}
      </nav>
    </ScrollArea>
    {(userName || onLogout) && (
      <div className="p-4">
        <Separator className="mb-4 bg-slate-200 dark:bg-slate-800" />
        {userName ? (
          <div className="mb-3 flex items-center gap-3 p-2">
            <Avatar className="size-8 border border-slate-300 bg-slate-200 dark:border-slate-700 dark:bg-slate-700">
              <AvatarFallback className="bg-slate-200 text-xs font-bold uppercase text-slate-600 dark:bg-slate-700 dark:text-slate-200">
                {userName.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
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
