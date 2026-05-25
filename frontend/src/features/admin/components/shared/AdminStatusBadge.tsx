import React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/utils/cn";

const toneClasses: Record<string, string> = {
  active: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  inactive: "border-slate-500/30 bg-slate-500/10 text-slate-600 dark:text-slate-300",
  pending: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  approved: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  rejected: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
  not_required: "border-slate-500/30 bg-slate-500/10 text-slate-600 dark:text-slate-300",
  live: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  completed: "border-primary/30 bg-primary/10 text-primary",
  scheduled: "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400",
  cancelled: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
  draft: "border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-400",
  planning: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  archived: "border-slate-500/30 bg-slate-500/10 text-slate-600 dark:text-slate-300",
  reviewed: "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400",
  resolved: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  bug: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
  feature: "border-primary/30 bg-primary/10 text-primary",
  support: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  admin: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400",
  instructor: "border-primary/30 bg-primary/10 text-primary",
  mentor: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  student: "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400",
};

function toLabel(value: string) {
  return value
    .split(/[-_]/g)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

interface AdminStatusBadgeProps {
  value: string;
  label?: string;
  className?: string;
}

const AdminStatusBadge: React.FC<AdminStatusBadgeProps> = ({ value, label, className }) => {
  return (
    <Badge
      variant="outline"
      className={cn("font-semibold capitalize", toneClasses[value] ?? toneClasses.active, className)}
    >
      {label ?? toLabel(value)}
    </Badge>
  );
};

export default AdminStatusBadge;
