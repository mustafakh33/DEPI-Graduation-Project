import type { NavLinkItem } from "@/components/shared/Sidebar/SidebarNavLink";
import { navIcon } from "@/utils/navIcon";

export const studentDashboardPath = "/student/dashboard";

export const studentNavItems: NavLinkItem[] = [
  { to: "/student/dashboard", label: "Dashboard", icon: navIcon("dashboard") },
  { to: "/student/roadmap", label: "Roadmap", icon: navIcon("map") },
  { to: "/student/Sessions", label: "Sessions", icon: navIcon("groups") },
  { to: "/student/analytics", label: "Analytics", icon: navIcon("analytics") },
  { to: "/student/assignments", label: "Assignments", icon: navIcon("assignment") },
  { to: "/student/quizzes", label: "Quizzes", icon: navIcon("quiz") },
  { to: "/student/ranking", label: "Ranking", icon: navIcon("leaderboard") },
  { to: "/student/chat", label: "Chat", icon: navIcon("message") },
];