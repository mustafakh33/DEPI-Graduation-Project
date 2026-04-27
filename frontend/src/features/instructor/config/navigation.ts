import type { NavLinkItem } from "@/components/atoms/SidebarNavLink";
import { navIcon } from "@/components/dashboard/navIcon";

export const instructorDashboardPath = "/instructor/dashboard";

export const instructorNavItems: NavLinkItem[] = [
  { to: "/instructor/dashboard", label: "Dashboard", icon: navIcon("dashboard") },
  { to: "/instructor/my-courses", label: "My Courses", icon: navIcon("menu_book") },
  { to: "/instructor/students", label: "Students", icon: navIcon("group") },
  { to: "/instructor/grades", label: "Grades", icon: navIcon("grading") },
  { to: "/instructor/quizzes", label: "Quizzes", icon: navIcon("quiz") },
  { to: "/instructor/live-session", label: "Live Session", icon: navIcon("videocam") },
];
