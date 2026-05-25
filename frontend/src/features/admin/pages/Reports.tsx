import React from "react";

import { Card } from "@/components/ui/card";
import AdminStatCard from "@/features/admin/components/shared/AdminStatCard";
import AdminStatusBadge from "@/features/admin/components/shared/AdminStatusBadge";
import { useAdminPortal } from "@/features/admin/context/AdminPortalContext";

const Reports: React.FC = () => {
  const { users, batches, courses, sessions, feedback } = useAdminPortal();

  const roleBreakdown = (["admin", "instructor", "mentor", "student"] as const).map((role) => ({
    role,
    count: users.filter((user) => user.role === role).length,
  }));

  const batchHealth = batches.map((batch) => ({
    id: batch.id,
    code: batch.code,
    load: batch.capacity === 0 ? 0 : Math.round((batch.studentIds.length / batch.capacity) * 100),
    status: batch.status,
  }));

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
          Admin reports
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-500 dark:text-slate-400">
          High-level operational numbers you can show quickly during the discussion.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Users"
          value={users.length}
          hint="All managed accounts"
          icon="group"
        />
        <AdminStatCard
          title="Batches"
          value={batches.length}
          hint="Active and planned cohorts"
          icon="layers"
        />
        <AdminStatCard
          title="Courses"
          value={courses.length}
          hint="Published or draft learning units"
          icon="book_5"
        />
        <AdminStatCard
          title="Feedback"
          value={feedback.length}
          hint="Open and resolved queue items"
          icon="rate_review"
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="rounded-2xl border-slate-200 bg-white/95 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">Role breakdown</h2>
          <div className="mt-5 space-y-3">
            {roleBreakdown.map((item) => (
              <div
                key={item.role}
                className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
              >
                <p className="font-semibold capitalize text-slate-900 dark:text-slate-100">
                  {item.role}
                </p>
                <span className="text-2xl font-black text-slate-950 dark:text-white">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-2xl border-slate-200 bg-white/95 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">Batch load</h2>
          <div className="mt-5 space-y-3">
            {batchHealth.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">{item.code}</p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {item.load}% of total capacity used
                    </p>
                  </div>
                  <AdminStatusBadge value={item.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <Card className="rounded-2xl border-slate-200 bg-white/95 p-6 dark:border-slate-800 dark:bg-slate-900/70">
        <h2 className="text-lg font-bold text-slate-950 dark:text-white">Session summary</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {(["scheduled", "live", "completed"] as const).map((status) => (
            <div
              key={status}
              className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
            >
              <p className="text-sm font-semibold capitalize text-slate-500 dark:text-slate-400">
                {status}
              </p>
              <p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">
                {sessions.filter((session) => session.status === status).length}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Reports;
