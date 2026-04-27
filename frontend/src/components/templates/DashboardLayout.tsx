import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Sidebar from "../organisms/Sidebar";
import type { NavLinkItem } from "../atoms/SidebarNavLink";
import { useAuth } from "../../hooks/useAuth";

export interface DashboardLayoutProps {
  links: NavLinkItem[];
  dashboardPath: string;
  logo?: React.ReactNode;
  appName?: string;
  /** Shown under app name, e.g. "Student Dashboard" (same pattern as admin reference). */
  portalSubtitle?: string;
  onLogout?: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  links,
  dashboardPath,
  logo,
  appName = "Uni Hub",
  portalSubtitle = "Portal",
  onLogout,
}) => {
  const { user } = useAuth();

  /* Match admin HTML reference: Tailwind dark: tokens + correct slate on cards. */
  useEffect(() => {
    const root = document.documentElement;
    const hadDark = root.classList.contains("dark");
    if (!hadDark) root.classList.add("dark");
    return () => {
      if (!hadDark) root.classList.remove("dark");
    };
  }, []);

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
              <input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg border-0 bg-slate-900 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 outline-none ring-0 focus:ring-2 focus:ring-[#135bec]/50"
                aria-label="Search"
              />
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3 md:gap-4">
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-[#135bec] px-3 py-2 text-sm font-bold text-white transition-colors hover:bg-[#135bec]/90 md:px-4"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span className="hidden sm:inline">New Action</span>
            </button>
            <div className="flex h-8 items-center gap-2 border-l border-slate-700 pl-3 md:gap-3 md:pl-4">
              <button
                type="button"
                className="relative text-slate-300 transition-colors hover:text-white"
                aria-label="Notifications"
              >
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute right-0 top-0 size-2 rounded-full bg-red-500 ring-2 ring-slate-950" />
              </button>
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

export default DashboardLayout;
