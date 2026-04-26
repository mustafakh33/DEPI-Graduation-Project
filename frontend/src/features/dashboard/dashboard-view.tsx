"use client";

import { DashboardCharts } from "@/components/dashboard/charts";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";
import { DashboardSummary } from "@/lib/types";
import { formatNumber, formatPercent } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Activity, BookOpenCheck, FolderKanban, GraduationCap, MessagesSquare, Tickets } from "lucide-react";

function getToken() {
  if (typeof document === "undefined") return null;
  const cookie = document.cookie
    .split("; ")
    .find((part) => part.startsWith("admin_lms_token="));
  return cookie?.split("=")[1] ?? null;
}

function ProgressRing({
  value,
  label,
  color = "#135bec",
}: {
  value: number;
  label: string;
  color?: string;
}) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const dash = (clamped / 100) * circumference;

  return (
    <div className="relative flex h-32 w-32 items-center justify-center">
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="#1e293b" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={color}
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeLinecap="round"
          strokeWidth="10"
        />
      </svg>
      <div className="text-center">
        <div className="text-2xl font-black text-white">{Math.round(clamped)}%</div>
        <div className="mt-1 text-[10px] font-medium text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function ProgressLine({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-bold text-white">{Math.round(value)}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-800">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

export function DashboardView() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: () => api.get<DashboardSummary>("/dashboard/summary", getToken()),
  });

  if (isLoading) {
    return <div className="rounded-xl border border-border bg-card p-8 shadow-panel">Loading dashboard...</div>;
  }

  if (error || !data) {
    return <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-8 text-rose-200 shadow-panel">Failed to load dashboard data.</div>;
  }

  const attendanceAverage =
    data.attendanceTrend.reduce((sum, item) => sum + item.attendance, 0) / Math.max(data.attendanceTrend.length, 1);
  const submissionAverage =
    data.attendanceTrend.reduce((sum, item) => sum + item.submissions, 0) / Math.max(data.attendanceTrend.length, 1);
  const finishedSessions = Math.max(data.headline.liveSessions * 3, 1);
  const remainingSessions = Math.max(data.headline.activeGroups * 4, 1);
  const sessionProgress = (finishedSessions / (finishedSessions + remainingSessions)) * 100;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-black tracking-tight text-white">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back. Here is an overview of the university performance today.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Students"
          value={formatNumber(data.headline.totalStudents)}
          detail="+2.4% from last month"
          icon={<GraduationCap className="h-5 w-5" />}
          accent="blue"
        />
        <StatCard
          label="Active Batches"
          value={formatNumber(data.headline.activeGroups)}
          detail="Across live departments"
          icon={<FolderKanban className="h-5 w-5" />}
          accent="emerald"
        />
        <StatCard
          label="Live Sessions"
          value={formatNumber(data.headline.liveSessions)}
          detail="Currently monitored"
          icon={<Activity className="h-5 w-5" />}
          accent="amber"
        />
        <StatCard
          label="Open Complaints"
          value={formatNumber(data.headline.openTickets)}
          detail="Waiting for closure"
          icon={<Tickets className="h-5 w-5" />}
          accent="violet"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.45fr,0.85fr]">
        <Card className="p-6">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">Total Sessions Progress</h2>
              <p className="text-xs text-muted-foreground">Academic year 2024 - Semester 1</p>
            </div>
            <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-bold text-primary">On Schedule</span>
          </div>
          <div className="grid gap-6 md:grid-cols-[180px,1fr] md:items-center">
            <div className="flex justify-center">
              <ProgressRing value={sessionProgress} label="done" />
            </div>
            <div className="space-y-5">
              <ProgressLine label="Finished Sessions" value={sessionProgress} color="#135bec" />
              <ProgressLine label="Remaining Sessions" value={100 - sessionProgress} color="#475569" />
              <p className="text-xs italic text-muted-foreground">Expected completion: December 25th, 2024</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-bold text-white">Student Attendance %</h2>
          <div className="mt-5 flex justify-center">
            <ProgressRing value={attendanceAverage} label="+1.7% this week" color="#18d3a2" />
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Average daily presence across all active batches.
          </p>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {data.growth.slice(0, 3).map((item, index) => {
          const colors = ["#f59e0b", "#135bec", "#8b5cf6"];
          const icons = [BookOpenCheck, MessagesSquare, GraduationCap];
          const Icon = icons[index] ?? Activity;
          return (
            <Card key={item.label} className="p-5">
              <div className="flex items-center gap-4">
                <ProgressRing value={item.value} label="target" color={colors[index]} />
                <div className="min-w-0">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-sm font-bold text-white">{item.label}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{formatPercent(item.value)} operational target</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Total Courses Summary</h2>
            <p className="text-xs text-muted-foreground">Published courses, attendance, submissions, and support load.</p>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">12 active departments</span>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1fr,2fr] lg:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <BookOpenCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-3xl font-black text-white">{formatNumber(data.distribution.reduce((sum, item) => sum + item.value, 0))}</p>
              <p className="text-xs text-muted-foreground">Accredited courses published</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <ProgressLine label="Attendance" value={attendanceAverage} color="#135bec" />
            <ProgressLine label="Submissions" value={submissionAverage} color="#10b981" />
            <ProgressLine label="Ticket health" value={Math.max(12, 100 - data.headline.openTickets)} color="#f59e0b" />
          </div>
        </div>
      </Card>

      <DashboardCharts summary={data} />
    </div>
  );
}
