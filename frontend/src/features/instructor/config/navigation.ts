/**
 * Instructor portal navigation.
 *
 * Consumed by `InstructorLayout` → `AppShellLayout` sidebar and by `AppRouter`
 * (`roleRedirects.instructor`). Each `to` path must match a route under
 * `/instructor/*` in `src/router/AppRouter.tsx`.
 *
 * @see ../README.md — full section docs (Dashboard, Courses, Students, Grades, Live Session)
 */
import type { NavLinkItem } from "@/components/shared/Sidebar/SidebarNavLink";
import { navIcon } from "@/utils/navIcon";

/** Post-login and logo home for the instructor role. */
export const instructorDashboardPath = "/instructor/dashboard";

export const instructorNavItems: NavLinkItem[] = [
  {
    to: "/instructor/dashboard",
    label: "Dashboard",
    icon: navIcon("dashboard"),
  },
  {
    to: "/instructor/my-courses",
    label: "My Courses",
    icon: navIcon("menu_book"),
  },
  { to: "/instructor/students", label: "Students", icon: navIcon("group") },
  { to: "/instructor/grades", label: "Grades", icon: navIcon("grading") },
  {
    to: "/instructor/live-session",
    label: "Live Session",
    icon: navIcon("videocam"),
  },
];
