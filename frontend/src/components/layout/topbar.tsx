"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { AUTH_COOKIE } from "@/lib/constants";
import { Bell, LogOut, Mail, Menu, Search, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export function Topbar() {
  const router = useRouter();

  function logout() {
    document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0`;
    localStorage.removeItem("admin_lms_user");
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-20 flex min-h-16 items-center justify-between gap-4 border-b border-border bg-background/85 px-4 backdrop-blur sm:px-6 xl:px-8">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <Button variant="ghost" size="sm" className="xl:hidden" aria-label="Open navigation">
          <Menu className="h-4 w-4" />
        </Button>
        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="h-9 bg-slate-900/70 pl-9" placeholder="Search students, batches, or sessions..." />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <Button size="sm" className="hidden gap-2 sm:inline-flex">
          <UserPlus className="h-4 w-4" />
          New User
        </Button>
        <Button variant="ghost" size="sm" aria-label="Messages">
          <Mail className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>
        <ThemeToggle />
        <div className="hidden items-center gap-3 border-l border-border pl-3 sm:flex">
          <div className="text-right">
            <p className="text-xs font-semibold text-white">Admin User</p>
            <p className="text-[10px] text-muted-foreground">Administrator</p>
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-slate-900">
            AU
          </div>
        </div>
        <Button variant="outline" size="sm" className="gap-2" onClick={logout}>
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    </header>
  );
}
