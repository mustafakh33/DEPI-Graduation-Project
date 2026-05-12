import type { NavLinkItem } from "@/components/layout/Sidebar/SidebarNavLink"; 
import { navIcon } from "@/utils/navIcon";

export const mentorDashboardPath = "/mentor/dashboard";

export const mentorNavItems: NavLinkItem[] = [
  { to: "/mentor/dashboard", label: "Dashboard", icon: navIcon("dashboard") },
  { to: "/mentor/my-students", label: "My Students", icon: navIcon("group") },
  { to: "/mentor/chatPage", label: "Chat", icon: navIcon("chat") },
  { to: "/mentor/check-ins", label: "Check-Ins", icon: navIcon("assignment") },
  { to: "/mentor/progress/1", label: "Progress", icon: navIcon("trending_up") },
];
