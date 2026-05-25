import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import type { NavLinkItem } from "@/components/shared/Sidebar/SidebarNavLink";
import Sidebar from "@/components/shared/Sidebar/Sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { useForceDashboardTheme } from "@/hooks/useForceDashboardTheme";
import { useAuth } from "@/hooks/useAuth";

interface QuickActionItem {
  description?: string;
  icon: string;
  id: string;
  label: string;
  onClick: () => void;
}

interface NotificationItem {
  description?: string;
  id: string;
  onClick?: () => void;
  timestamp?: string;
  title: string;
}

export interface AppShellLayoutProps {
  links: NavLinkItem[];
  dashboardPath: string;
  logo?: React.ReactNode;
  appName?: string;
  portalSubtitle?: string;
  onLogout?: () => void;
  headerContent?: React.ReactNode;
  showNewActionButton?: boolean;
  sidebarUserName?: string;
  sidebarUserAvatarUrl?: string;
  showSidebarUserRole?: boolean;
  quickActions?: QuickActionItem[];
  notificationItems?: NotificationItem[];
  notificationsTitle?: string;
}

const AppShellLayout: React.FC<AppShellLayoutProps> = ({
  links,
  dashboardPath,
  logo,
  appName = "Uni Hub",
  portalSubtitle = "Portal",
  onLogout,
  headerContent,
  showNewActionButton = true,
  sidebarUserName,
  sidebarUserAvatarUrl,
  showSidebarUserRole,
  quickActions = [],
  notificationItems = [],
  notificationsTitle = "Notifications",
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useForceDashboardTheme();
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const [quickActionsOpen, setQuickActionsOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);

  const handleLogout = React.useCallback(() => {
    setMobileNavOpen(false);
    onLogout?.();
  }, [onLogout]);

  const sidebarProps = {
    links,
    dashboardPath,
    logo,
    appName,
    portalSubtitle,
    userName: sidebarUserName ?? user?.name,
    userRole: user?.role,
    userAvatarUrl: sidebarUserAvatarUrl,
    showUserRole: showSidebarUserRole,
    onLogout: handleLogout,
  };

  return (
    <div className="flex min-h-screen bg-background-light font-display text-slate-900 dark:bg-background-dark dark:text-slate-100">
      <Sidebar {...sidebarProps} className="hidden h-screen shrink-0 md:flex" />
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent
          side="left"
          className="w-[min(100vw-1rem,18rem)] max-w-none border-slate-200 bg-slate-50 p-0 sm:max-w-[18rem] dark:border-slate-800 dark:bg-[#0b0f1a]"
        >
          <SheetTitle className="sr-only">Main navigation</SheetTitle>
          <SheetDescription className="sr-only">Application sections and account actions</SheetDescription>
          <Sidebar
            {...sidebarProps}
            className="sticky top-auto flex h-full min-h-0 w-full max-w-none border-0 pt-12 shadow-none"
            onNavigate={() => setMobileNavOpen(false)}
          />
        </SheetContent>
      </Sheet>

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        {headerContent ? (
  headerContent
) : (
        <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-2 border-b border-slate-800 bg-slate-950 px-3 sm:gap-4 sm:px-4 md:px-8">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
            <Button
              type="button"
              variant="headerIcon"
              size="icon"
              className="shrink-0 md:hidden"
              aria-label="Open menu"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen(true)}
            >
              <span className="material-symbols-outlined">menu</span>
            </Button>
            <div className="relative min-w-0 flex-1 max-sm:max-w-none max-w-md">
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
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-slate-700 bg-slate-900 text-white hover:bg-slate-800 hover:text-white"
              onClick={() => navigate("/home")}
            >
              <span className="material-symbols-outlined text-[18px]">home</span>
              <span className="hidden sm:inline">Home</span>
            </Button>
            {showNewActionButton ? (
              <Button
                type="button"
                variant="primary"
                size="sm"
                className="font-bold"
                onClick={() => setQuickActionsOpen(true)}
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span className="hidden sm:inline">New Action</span>
              </Button>
            ) : null}
            <div className="flex h-8 items-center gap-2 pl-1 md:gap-3">
              <Separator orientation="vertical" className="h-8 bg-slate-700" decorative />
              <Button
                type="button"
                variant="headerIcon"
                size="icon"
                aria-label="Notifications"
                onClick={() => setNotificationsOpen(true)}
              >
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute right-1 top-1 size-2 rounded-full bg-red-500 ring-2 ring-slate-950" />
              </Button>
              <div className="ml-1 flex items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-sm font-bold leading-none text-white">{user?.name || "User"}</p>
                  <p className="mt-1 text-xs capitalize text-slate-400">{user?.role || "Member"}</p>
                </div>
                <Avatar className="size-9 border border-slate-600 bg-slate-700">
                  <AvatarFallback className="bg-slate-700 text-xs font-bold uppercase text-slate-200">
                    {(user?.name || "U").slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>
        
)}
        <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-background-light dark:bg-background-dark">
          <ScrollArea className="min-h-0 flex-1">
            <div className="p-4 pr-6 sm:p-6 md:p-8 md:pr-10">
              <Outlet />
            </div>
          </ScrollArea>
        </main>
      </div>

      <Modal
        open={quickActionsOpen}
        onOpenChange={setQuickActionsOpen}
        title="Quick actions"
        description="Jump straight to common actions from the current dashboard."
        contentClassName="max-w-2xl"
      >
        <div className="grid gap-3 md:grid-cols-2">
          {quickActions.length > 0 ? (
            quickActions.map((action) => (
              <button
                key={action.id}
                type="button"
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition-colors hover:border-primary/30 hover:bg-primary/5 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:bg-primary/10"
                onClick={() => {
                  setQuickActionsOpen(false);
                  action.onClick();
                }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <span className="material-symbols-outlined text-[20px]">{action.icon}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{action.label}</p>
                    {action.description ? (
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {action.description}
                      </p>
                    ) : null}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <Card className="rounded-2xl border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400 md:col-span-2">
              No quick actions were configured for this area yet.
            </Card>
          )}
        </div>
      </Modal>

      <Modal
        open={notificationsOpen}
        onOpenChange={setNotificationsOpen}
        title={notificationsTitle}
        description="Recent updates related to this workspace."
        contentClassName="max-w-2xl"
      >
        <div className="space-y-3">
          {notificationItems.length > 0 ? (
            notificationItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="block w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition-colors hover:border-primary/30 hover:bg-primary/5 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:bg-primary/10"
                onClick={() => {
                  setNotificationsOpen(false);
                  item.onClick?.();
                }}
              >
                <p className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</p>
                {item.description ? (
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                ) : null}
                {item.timestamp ? (
                  <p className="mt-2 text-xs text-slate-400">{item.timestamp}</p>
                ) : null}
              </button>
            ))
          ) : (
            <Card className="rounded-2xl border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">
              No notifications right now.
            </Card>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AppShellLayout;
