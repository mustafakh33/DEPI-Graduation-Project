import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface SidebarHeaderProps {
  logo?: React.ReactNode;
  appName?: string;
  portalSubtitle?: string;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  logo,
  appName = "Uni Hub",
  portalSubtitle,
}) => (
  <div className="flex items-center gap-3 p-6">
    {logo ?? (
      <Avatar className="size-10 shrink-0 bg-primary">
        <AvatarFallback className="rounded-full bg-primary text-white">
          <span className="material-symbols-outlined">school</span>
        </AvatarFallback>
      </Avatar>
    )}
    <div className="min-w-0">
      <h1 className="truncate text-lg font-bold leading-none text-slate-900 text-white">{appName}</h1>
      {portalSubtitle ? (
        <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">{portalSubtitle}</p>
      ) : null}
    </div>
  </div>
);

export default SidebarHeader;
