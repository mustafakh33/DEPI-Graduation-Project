"use client";

import { AUTH_COOKIE } from "@/lib/constants";
import { Bell, LogOut, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Topbar() {
  const router = useRouter();

  function logout() {
    document.cookie = `${AUTH_COOKIE}=; path=/; max-age=0`;
    localStorage.removeItem("admin_lms_user");
    router.push("/login");
  }

  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-border/70 bg-white/85 p-4 shadow-panel backdrop-blur lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">Admin workspace</p>
        <h1 className="mt-1 text-2xl font-semibold text-foreground">Operations overview</h1>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative min-w-[240px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search users, groups, tickets..." />
        </div>
        <Button variant="secondary" size="sm" className="gap-2">
          <Bell className="h-4 w-4" />
          Alerts
        </Button>
        <Button variant="outline" size="sm" className="gap-2" onClick={logout}>
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
