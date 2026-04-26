"use client";

import { DashboardCharts } from "@/components/dashboard/charts";
import { StatCard } from "@/components/dashboard/stat-card";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";
import { DashboardSummary } from "@/lib/types";
import { formatNumber, formatPercent } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Activity, FolderKanban, GraduationCap, Tickets } from "lucide-react";

function getToken() {
  if (typeof document === "undefined") return null;
  const cookie = document.cookie
    .split("; ")
    .find((part) => part.startsWith("admin_lms_token="));
  return cookie?.split("=")[1] ?? null;
}

export function DashboardView() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: () => api.get<DashboardSummary>("/dashboard/summary", getToken()),
  });

  if (isLoading) {
    return <div className="rounded-[28px] bg-white p-8 shadow-panel">Loading dashboard...</div>;
  }

  if (error || !data) {
    return <div className="rounded-[28px] bg-rose-50 p-8 text-rose-700 shadow-panel">Failed to load dashboard data.</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Executive snapshot"
        title="Admin dashboard"
        description="Track academic delivery, attendance quality, ticket pressure, and operational health across every cohort."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total students" value={formatNumber(data.headline.totalStudents)} detail="Tracked across active and upcoming cohorts." icon={<GraduationCap className="h-5 w-5" />} />
        <StatCard label="Active groups" value={formatNumber(data.headline.activeGroups)} detail="Cohorts currently receiving delivery or support." icon={<FolderKanban className="h-5 w-5" />} />
        <StatCard label="Live sessions" value={formatNumber(data.headline.liveSessions)} detail="Sessions currently in progress and requiring supervision." icon={<Activity className="h-5 w-5" />} />
        <StatCard label="Open tickets" value={formatNumber(data.headline.openTickets)} detail="Support items still waiting for closure." icon={<Tickets className="h-5 w-5" />} />
      </div>

      <DashboardCharts summary={data} />

      <div className="grid gap-6 xl:grid-cols-3">
        {data.growth.map((item) => (
          <Card key={item.label} className="p-6">
            <p className="text-sm text-muted-foreground">{item.label}</p>
            <p className="mt-3 text-3xl font-semibold">{formatPercent(item.value)}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Monitored trend for weekly quality review and leadership standups.
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
