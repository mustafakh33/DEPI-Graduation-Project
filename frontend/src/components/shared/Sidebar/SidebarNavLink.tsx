import React from "react";
import { NavLink } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils/cn";

export interface NavLinkItem {
  to: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarNavLinkProps {
  link: NavLinkItem;
  /** The "home" route of this role — used to apply `end` so it only activates on exact match */
  dashboardPath: string;
  /** e.g. close mobile drawer after navigation */
  onNavigate?: () => void;
}

const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({ link, dashboardPath, onNavigate }) => (
  <NavLink
    to={link.to}
    onClick={() => onNavigate?.()}
    className={({ isActive }) =>
      cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "h-auto w-full justify-start gap-3 rounded-lg px-3 py-2 font-medium",
        isActive
          ? "bg-primary/10 text-primary hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/10 dark:hover:text-primary"
          : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800",
      )
    }
    end={link.to === dashboardPath}
  >
    <span className="flex shrink-0 items-center justify-center [&_.material-symbols-outlined]:text-[20px]">
      {link.icon}
    </span>
    <span>{link.label}</span>
  </NavLink>
);

export default SidebarNavLink;
