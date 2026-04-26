"use client";

import { cn } from "@/lib/utils";
import {
  BarChart3,
  ClipboardList,
  FileCheck2,
  FolderKanban,
  GraduationCap,
  HelpCircle,
  LayoutDashboard,
  LibraryBig,
  MessageSquareText,
  ScrollText,
  Settings,
  ShieldCheck,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/users", label: "User Management", icon: UserCog },
  { href: "/students", label: "Students", icon: GraduationCap },
  { href: "/groups", label: "Batches", icon: FolderKanban },
  { href: "/sessions", label: "Sessions", icon: ClipboardList },
  { href: "/assessments", label: "Assignments", icon: ShieldCheck },
  { href: "/quizzes", label: "Quizzes", icon: FileCheck2 },
  { href: "/community", label: "Resources", icon: LibraryBig },
  { href: "/tickets", label: "Complaints", icon: MessageSquareText },
  { href: "/surveys", label: "Feedback", icon: ScrollText },
  { href: "/reports", label: "Reports", icon: BarChart3 },
];

const supportItems = [
  { href: "/reports", label: "Settings", icon: Settings },
  { href: "/tickets", label: "Help Center", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border bg-slate-950/55 xl:flex xl:flex-col">
      <div className="flex items-center gap-3 border-b border-border p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-panel shadow-primary/20">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <div className="text-lg font-bold leading-none text-white">Uni Hub</div>
          <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">Admin Portal</div>
        </div>
      </div>

      <nav className="dark-scrollbar flex-1 space-y-1 overflow-y-auto px-4 py-5">
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                active
                  ? "bg-primary text-white shadow-panel shadow-primary/20"
                  : "text-slate-300 hover:bg-primary/10 hover:text-primary",
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}

        <div className="px-3 pb-2 pt-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">
          Support
        </div>

        {supportItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-primary/10 hover:text-primary"
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-lg p-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-700 text-sm font-bold text-white">
            AJ
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-white">Alex Johnson</p>
            <p className="truncate text-[10px] text-muted-foreground">Super Admin</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
