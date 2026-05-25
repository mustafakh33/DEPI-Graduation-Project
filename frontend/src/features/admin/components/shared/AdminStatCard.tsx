import React from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/utils/cn";

interface AdminStatCardProps {
  title: string;
  value: string | number;
  hint: string;
  icon: string;
  className?: string;
}

const AdminStatCard: React.FC<AdminStatCardProps> = ({ title, value, hint, icon, className }) => {
  return (
    <Card className={cn("rounded-2xl border-slate-200/80 bg-white/95 p-5 dark:border-slate-800 dark:bg-slate-900/70", className)}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <p className="mt-3 text-3xl font-black tracking-tight text-slate-950 dark:text-white">{value}</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{hint}</p>
        </div>
        <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <span className="material-symbols-outlined text-[24px]">{icon}</span>
        </div>
      </div>
    </Card>
  );
};

export default AdminStatCard;
