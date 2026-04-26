"use client";

import { cn } from "@/lib/utils";
import {
  BarChart3,
  ClipboardList,
  FileCheck2,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  MessageSquareText,
  ScrollText,
  ShieldCheck,
  Tickets,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/sessions", label: "Sessions", icon: ClipboardList },
  { href: "/users", label: "Users", icon: Users },
  { href: "/students", label: "Students", icon: GraduationCap },
  { href: "/groups", label: "Groups", icon: FolderKanban },
  { href: "/community", label: "Community", icon: MessageSquareText },
  { href: "/tickets", label: "Tickets", icon: Tickets },
  { href: "/surveys", label: "Survey", icon: ScrollText },
  { href: "/quizzes", label: "Quizzes", icon: FileCheck2 },
  { href: "/assessments", label: "Assessments", icon: ShieldCheck },
  { href: "/reports", label: "Reports", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="grid-surface sticky top-0 hidden h-screen w-[280px] shrink-0 border-r border-border/70 bg-white/70 p-6 backdrop-blur xl:block">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-white">
          U
        </div>
        <div>
          <div className="text-lg font-semibold">UniHub Admin</div>
          <div className="text-xs text-muted-foreground">Structured LMS control panel</div>
        </div>
      </div>

      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                active
                  ? "bg-primary text-white shadow-panel"
                  : "text-slate-600 hover:bg-secondary hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-[28px] bg-slate-950 p-5 text-white shadow-float">
        <p className="text-xs uppercase tracking-[0.24em] text-white/55">Arabic support</p>
        <p className="mt-3 font-arabic text-lg font-bold">لوحة تحكم متكاملة للإدارة</p>
        <p className="mt-2 text-sm text-white/70">
          Manage cohorts, surveys, attendance, and support flows from one surface.
        </p>
      </div>
    </aside>
  );
}
