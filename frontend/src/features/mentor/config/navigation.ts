/**
 * Mentor portal navigation.
 *
 * Consumed by `MentorLayout` → `AppShellLayout` sidebar and by `AppRouter`
 * (`roleRedirects.mentor`). Chat and Progress use demo deep-link ids until
 * API-backed defaults exist.
 *
 * @see ../README.md — full section docs (Dashboard, Students, Sessions, Chat, Progress)
 */
import type { NavLinkItem } from "@/components/shared/Sidebar/SidebarNavLink";
import { navIcon } from "@/utils/navIcon";

/** Post-login and logo home for the mentor role. */
export const mentorDashboardPath = "/mentor/dashboard";

export const mentorNavItems: NavLinkItem[] = [
  { to: "/mentor/dashboard", label: "Dashboard", icon: navIcon("dashboard") },
  { to: "/mentor/my-students", label: "My Students", icon: navIcon("group") },
  { to: "/mentor/my-sessions", label: "My Sessions", icon: navIcon("video_chat") },
  { to: "/mentor/chat/8", label: "Chat", icon: navIcon("chat") },
  { to: "/mentor/progress/1", label: "Progress", icon: navIcon("trending_up") },
];
