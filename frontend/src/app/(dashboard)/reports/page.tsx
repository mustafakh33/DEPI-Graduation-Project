"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { BarChart3, Download, FileSpreadsheet, ShieldCheck } from "lucide-react";

const exports = [
  {
    title: "Attendance report export",
    description: "Generate CSV exports for finished sessions and cohort attendance matrices.",
    icon: FileSpreadsheet,
  },
  {
    title: "Performance overview",
    description: "Bundle quiz and assessment KPIs for leadership review and trainer calibration.",
    icon: BarChart3,
  },
  {
    title: "Audit log pack",
    description: "Pull file import and export history with timestamps and operational traces.",
    icon: ShieldCheck,
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Reports and exports"
        title="Reporting center"
        description="Centralized exports for attendance, user operations, surveys, quizzes, assessments, and admin audit trails."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {exports.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.title} className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              <button className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-panel shadow-primary/20 transition hover:bg-primary/90">
                <Download className="h-4 w-4" />
                Export now
              </button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
