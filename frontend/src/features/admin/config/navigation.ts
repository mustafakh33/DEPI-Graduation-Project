import type { NavLinkItem } from "@/components/atoms/SidebarNavLink";
import { navIcon } from "@/components/dashboard/navIcon";

export const adminDashboardPath = "/admin/dashboard";

export const adminNavItems: NavLinkItem[] = [
  { to: "/admin/dashboard", label: "Dashboard", icon: navIcon("dashboard") },
  { to: "/admin/users", label: "User Management", icon: navIcon("group") },
  { to: "/admin/students", label: "Students", icon: navIcon("school") },
  { to: "/admin/sessions", label: "Sessions", icon: navIcon("calendar_month") },
  { to: "/admin/courses", label: "Courses", icon: navIcon("menu_book") },
  { to: "/admin/batches", label: "Batches", icon: navIcon("layers") },
  { to: "/admin/feedback", label: "Feedback", icon: navIcon("chat_bubble") },
  { to: "/admin/settings", label: "Settings", icon: navIcon("settings") },
];
