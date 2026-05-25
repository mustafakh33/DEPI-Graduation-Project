import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AdminStatusBadge from "@/features/admin/components/shared/AdminStatusBadge";
import { useAdminPortal } from "@/features/admin/context/AdminPortalContext";

const Settings: React.FC = () => {
  const {
    platformName,
    users,
    activities,
    updatePlatformName,
    resetPortalState,
    getFeedbackSummary,
  } = useAdminPortal();
  const [name, setName] = useState(platformName);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
          Admin settings
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-500 dark:text-slate-400">
          Tune the admin workspace, review permission coverage, and reset the demo data if
          you need a clean state before the discussion.
        </p>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-2xl border-slate-200 bg-white/95 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">Workspace identity</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Change the name shown on the admin dashboard hero card.
          </p>
          <div className="mt-5 flex flex-col gap-3 md:flex-row">
            <Input value={name} onChange={(event) => setName(event.target.value)} />
            <Button type="button" variant="primary" onClick={() => updatePlatformName(name)}>
              Save
            </Button>
          </div>
        </Card>

        <Card className="rounded-2xl border-slate-200 bg-white/95 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">Portal reset</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Restore the seeded admin data if you want to start over quickly.
          </p>
          <Button type="button" variant="destructive" className="mt-5" onClick={resetPortalState}>
            Reset admin demo data
          </Button>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <Card className="rounded-2xl border-slate-200 bg-white/95 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">Permission coverage</h2>
          <div className="mt-5 space-y-3">
            {(["admin", "instructor", "mentor", "student"] as const).map((role) => (
              <div
                key={role}
                className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
              >
                <div>
                  <p className="font-semibold capitalize text-slate-900 dark:text-slate-100">
                    {role}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {users.filter((user) => user.role === role).length} assigned users
                  </p>
                </div>
                <AdminStatusBadge
                  value={role === "admin" ? "active" : "reviewed"}
                  label={role === "admin" ? "Full access" : "Managed by admin"}
                />
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-2xl border-slate-200 bg-white/95 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <h2 className="text-lg font-bold text-slate-950 dark:text-white">Feedback health</h2>
          <div className="mt-5 space-y-3">
            {getFeedbackSummary().map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
              >
                <p className="font-semibold capitalize text-slate-900 dark:text-slate-100">
                  {item.label}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-black text-slate-950 dark:text-white">
                    {item.count}
                  </span>
                  <AdminStatusBadge value={item.label} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <Card className="rounded-2xl border-slate-200 bg-white/95 p-6 dark:border-slate-800 dark:bg-slate-900/70">
        <h2 className="text-lg font-bold text-slate-950 dark:text-white">Latest admin actions</h2>
        <div className="mt-5 space-y-3">
          {activities.slice(0, 8).map((activity) => (
            <div
              key={activity.id}
              className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-300"
            >
              <p className="font-medium text-slate-900 dark:text-slate-100">{activity.message}</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {new Date(activity.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Settings;
