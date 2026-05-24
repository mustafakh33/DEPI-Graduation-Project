import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export interface DashboardPageShellProps {
  title: string;
  description?: string;
}

/** Shared shadcn `Card` shell for portal routes — matches dashboard surface colors. */
export const DashboardPageShell: React.FC<DashboardPageShellProps> = ({ title, description }) => (
  <Card className="border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800/50">
    <CardHeader>
      <CardTitle className="text-xl text-slate-800 dark:text-white">{title}</CardTitle>
      <CardDescription>
        {description ?? "This section is under construction."}
      </CardDescription>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-slate-600 dark:text-slate-400">Content will appear here in a future update.</p>
    </CardContent>
  </Card>
);
