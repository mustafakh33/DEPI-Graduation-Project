import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AdminStatCard from "@/features/admin/components/shared/AdminStatCard";
import AdminStatusBadge from "@/features/admin/components/shared/AdminStatusBadge";
import { useAdminPortal } from "@/features/admin/context/AdminPortalContext";

const Feedback: React.FC = () => {
  const { feedback, updateFeedbackStatus } = useAdminPortal();
  const [typeFilter, setTypeFilter] = useState("all");

  const visibleFeedback = feedback.filter((item) => typeFilter === "all" || item.type === typeFilter);
  const newCount = feedback.filter((item) => item.status === "new").length;
  const resolvedCount = feedback.filter((item) => item.status === "resolved").length;

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            Feedback queue
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-500 dark:text-slate-400">
            Review bug reports, feature requests, and support notes from every role.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {["all", "bug", "feature", "support"].map((item) => (
            <Button
              key={item}
              type="button"
              variant={typeFilter === item ? "primary" : "outline"}
              size="sm"
              onClick={() => setTypeFilter(item)}
            >
              {item === "all" ? "All feedback" : item}
            </Button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Feedback Items"
          value={feedback.length}
          hint="Everything submitted by the platform roles"
          icon="feedback"
        />
        <AdminStatCard
          title="New"
          value={newCount}
          hint="Still waiting for admin action"
          icon="mark_chat_unread"
        />
        <AdminStatCard
          title="Resolved"
          value={resolvedCount}
          hint="Closed successfully by the team"
          icon="check_circle"
        />
        <AdminStatCard
          title="Open"
          value={feedback.length - resolvedCount}
          hint="Items still moving through the queue"
          icon="pending_actions"
        />
      </section>

      <div className="grid gap-4">
        {visibleFeedback.map((item) => (
          <Card
            key={item.id}
            className="rounded-2xl border-slate-200 bg-white/95 p-5 dark:border-slate-800 dark:bg-slate-900/70"
          >
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-lg font-bold text-slate-950 dark:text-white">
                    {item.authorName}
                  </h2>
                  <AdminStatusBadge value={item.type} />
                  <AdminStatusBadge value={item.status} />
                </div>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {item.role} · {new Date(item.createdAt).toLocaleString()}
                </p>
                <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{item.message}</p>
              </div>

              <div className="flex flex-wrap gap-2 xl:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => updateFeedbackStatus(item.id, "reviewed")}
                >
                  Mark reviewed
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => updateFeedbackStatus(item.id, "resolved")}
                >
                  Resolve
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
