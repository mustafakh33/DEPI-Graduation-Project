"use client";

import { Card } from "@/components/ui/card";
import { DashboardSummary } from "@/lib/types";
import { Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, BarChart, Bar } from "recharts";

const colors = ["#2563eb", "#0f766e", "#f59e0b", "#7c3aed", "#ef4444"];

export function DashboardCharts({ summary }: { summary: DashboardSummary }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.7fr,1fr]">
      <Card className="p-6">
        <div className="mb-5">
          <h3 className="text-lg font-semibold">Attendance vs submissions</h3>
          <p className="text-sm text-muted-foreground">Weekly academic consistency across tracked cohorts.</p>
        </div>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={summary.attendanceTrend}>
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="attendance" stroke="#2563eb" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="submissions" stroke="#0f766e" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Module distribution</h3>
            <p className="text-sm text-muted-foreground">Surface load by admin-managed entities.</p>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={summary.distribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={82}>
                  {summary.distribution.map((entry, index) => (
                    <Cell key={entry.name} fill={colors[index % colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Ticket pipeline</h3>
            <p className="text-sm text-muted-foreground">Current support queue by resolution state.</p>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary.ticketsBreakdown}>
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}
