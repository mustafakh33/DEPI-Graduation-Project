import React from "react";
import { Outlet } from "react-router";
import type { NavLinkItem } from "@/components/layout/Sidebar/SidebarNavLink";
import Sidebar from "@/components/layout/Sidebar/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForceDashboardTheme } from "@/hooks/useForceDashboardTheme";
import { useAuth } from "@/hooks/useAuth";

export interface AppShellLayoutProps {
  links: NavLinkItem[];
  dashboardPath: string;
  logo?: React.ReactNode;
  appName?: string;
  /** Shown under app name, e.g. "Student Dashboard" (same pattern as admin reference). */
  portalSubtitle?: string;
  onLogout?: () => void;
}

const AppShellLayout: React.FC<AppShellLayoutProps> = ({
  links,
  dashboardPath,
  logo,
  appName = "Uni Hub",
  portalSubtitle = "Portal",
  onLogout,
}) => {
  const { user } = useAuth();
  useForceDashboardTheme();

  return (
    <div className="flex min-h-screen bg-background-light font-display text-slate-900 dark:bg-background-dark dark:text-slate-100">
      <Sidebar
        links={links}
        dashboardPath={dashboardPath}
        logo={logo}
        appName={appName}
        portalSubtitle={portalSubtitle}
        userName={user?.name}
        userRole={user?.role}
        onLogout={onLogout}
      />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-slate-800 bg-slate-950 px-4 md:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-500">
                search
              </span>
              <Input
                type="search"
                variant="shell"
                placeholder="Search..."
                className="w-full"
                aria-label="Search"
              />
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3 md:gap-4">
            <Button variant="primary" size="sm" className="font-bold">
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span className="hidden sm:inline">New Action</span>
            </Button>
            <div className="flex h-8 items-center gap-2 border-l border-slate-700 pl-3 md:gap-3 md:pl-4">
              <Button variant="headerIcon" aria-label="Notifications">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute right-0 top-0 size-2 rounded-full bg-red-500 ring-2 ring-slate-950" />
              </Button>
              <div className="ml-1 flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-bold leading-none text-white">{user?.name || "User"}</p>
                  <p className="mt-1 text-xs capitalize text-slate-400">{user?.role || "Member"}</p>
                </div>
                <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-600 bg-slate-700 text-xs font-bold uppercase text-slate-200">
                  {(user?.name || "U").slice(0, 1)}
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="min-h-0 flex-1 overflow-y-auto bg-background-light p-8 dark:bg-background-dark">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppShellLayout;
