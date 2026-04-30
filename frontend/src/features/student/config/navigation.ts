import type { NavLinkItem } from "@/components/layout/Sidebar/SidebarNavLink";
import { navIcon } from "@/utils/navIcon";

export const studentDashboardPath = "/student/dashboard";

export const studentNavItems: NavLinkItem[] = [
  { to: "/student/dashboard", label: "Dashboard", icon: navIcon("dashboard") },
  { to: "/student/roadmap", label: "Roadmap", icon: navIcon("map") },
  { to: "/student/study-hub", label: "Study Hub", icon: navIcon("groups") },
  { to: "/student/exams", label: "Exams", icon: navIcon("quiz") },
  { to: "/student/profile", label: "Profile", icon: navIcon("person") },
];
