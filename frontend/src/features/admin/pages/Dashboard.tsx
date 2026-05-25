import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AdminStatCard from "@/features/admin/components/shared/AdminStatCard";
import AdminStatusBadge from "@/features/admin/components/shared/AdminStatusBadge";
import { useAdminPortal } from "@/features/admin/context/AdminPortalContext";
import { instructorNavItems } from "@/features/instructor/config/navigation";
import { mentorNavItems } from "@/features/mentor/config/navigation";
import { studentNavItems } from "@/features/student/config/navigation";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { platformName, users, batches, courses, sessions, feedback, activities, getUserById } =
    useAdminPortal();

  const activeUsers = users.filter((user) => user.status === "active").length;
  const pendingUsers = users.filter((user) => user.status === "pending").length;
  const liveCourses = courses.filter((course) => course.status === "live").length;
  const upcomingSessions = sessions.filter((session) => session.status === "scheduled").length;
  const rolePortalSections = [
    {
      id: "student",
      title: "Student portal",
      description: "Open any student-facing page directly while staying logged in as admin.",
      routes: studentNavItems,
    },
    {
      id: "instructor",
      title: "Instructor portal",
      description: "Review courses, grades, students, and live-session attendance tools.",
      routes: instructorNavItems,
    },
    {
      id: "mentor",
      title: "Mentor portal",
      description: "Open mentor follow-up, student support, sessions, and progress analytics.",
      routes: mentorNavItems,
    },
  ];
  const staffActionSections = [
    {
      id: "instructor-actions",
      title: "Instructor controls",
      description: "Use the same tools instructors use for attendance, grades, and student tracking.",
      actions: [
        { label: "Take attendance", to: "/instructor/live-session" },
        { label: "Open grades", to: "/instructor/grades" },
        { label: "Open students", to: "/instructor/students" },
      ],
    },
    {
      id: "mentor-actions",
      title: "Mentor controls",
      description: "Use mentor workflows for student follow-up, sessions, and progress review.",
      actions: [
        { label: "Open my students", to: "/mentor/my-students" },
        { label: "Open my sessions", to: "/mentor/my-sessions" },
        { label: "Open progress", to: "/mentor/progress/1" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-[28px] border border-slate-200 bg-[radial-gradient(circle_at_top_left,_rgba(19,91,236,0.16),_transparent_38%),linear-gradient(135deg,_rgba(15,23,42,0.98),_rgba(30,41,59,0.94))] p-6 text-white shadow-xl md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-200/80">
              {platformName}
            </p>
            <h1 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">
              Admin can manage users, roles, batches, courses, sessions, and staff workflows from one place.
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
              Everything here is wired together. Add people, assign roles, approve staff, schedule
              sessions, and jump directly into instructor or mentor tools when you need attendance,
              grades, or student follow-up.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant="primary"
              onClick={() => navigate("/admin/users?action=create")}
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              Add user
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white"
              onClick={() => navigate("/instructor/live-session")}
            >
              <span className="material-symbols-outlined text-[18px]">fact_check</span>
              Take attendance
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Total Accounts"
          value={users.length}
          hint={`${activeUsers} active accounts across all roles`}
          icon="group"
        />
        <AdminStatCard
          title="Pending Approvals"
          value={pendingUsers}
          hint="Mentors or staff waiting for admin approval"
          icon="pending_actions"
        />
        <AdminStatCard
          title="Live Courses"
          value={liveCourses}
          hint={`${courses.length} total course records managed by admin`}
          icon="menu_book"
        />
        <AdminStatCard
          title="Upcoming Sessions"
          value={upcomingSessions}
          hint={`${sessions.length} total scheduled or archived sessions`}
          icon="calendar_month"
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.3fr_0.9fr]">
        <Card className="rounded-2xl border-slate-200 bg-white/95 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">Role coverage</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Quick count for every access level in the platform.
              </p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => navigate("/admin/users")}>
              Manage roles
            </Button>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {(["admin", "instructor", "mentor", "student"] as const).map((role) => {
              const count = users.filter((user) => user.role === role).length;
              return (
                <div
                  key={role}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/60"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    {role}
                  </p>
                  <p className="mt-3 text-2xl font-black text-slate-950 dark:text-white">{count}</p>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="rounded-2xl border-slate-200 bg-white/95 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">Feedback queue</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                What still needs admin attention.
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => navigate("/admin/feedback")}
            >
              Open queue
            </Button>
          </div>
          <div className="mt-5 space-y-3">
            {feedback.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {item.authorName}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {item.message}
                    </p>
                  </div>
                  <AdminStatusBadge value={item.status} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_1fr]">
        <Card className="rounded-2xl border-slate-200 bg-white/95 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">Recent activity</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Last changes made in the admin workspace.
              </p>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            {activities.slice(0, 6).map((activity) => (
              <div
                key={activity.id}
                className="flex gap-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-800"
              >
                <div className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <span className="material-symbols-outlined text-[18px]">history</span>
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-slate-100">{activity.message}</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {new Date(activity.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="rounded-2xl border-slate-200 bg-white/95 p-6 dark:border-slate-800 dark:bg-slate-900/70">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-slate-950 dark:text-white">Batch snapshot</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Keep an eye on ownership and capacity.
              </p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => navigate("/admin/batches")}>
              Open batches
            </Button>
          </div>
          <div className="mt-5 space-y-3">
            {batches.map((batch) => {
              const mentor = getUserById(batch.mentorId);
              return (
                <div key={batch.id} className="rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {batch.code} - {batch.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {batch.studentIds.length}/{batch.capacity} students, mentor:{" "}
                        {mentor?.name ?? "Unassigned"}
                      </p>
                    </div>
                    <AdminStatusBadge value={batch.status} />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        {staffActionSections.map((section) => (
          <Card
            key={section.id}
            className="rounded-2xl border-slate-200 bg-white/95 p-6 dark:border-slate-800 dark:bg-slate-900/70"
          >
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">{section.title}</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {section.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {section.actions.map((action) => (
                <Button
                  key={action.to}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(action.to)}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Role portal explorer</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Open student, instructor, and mentor pages directly without changing the logged-in admin account.
          </p>
        </div>
        <div className="grid gap-4 xl:grid-cols-3">
          {rolePortalSections.map((section) => (
            <Card
              key={section.id}
              className="rounded-2xl border-slate-200 bg-white/95 p-6 dark:border-slate-800 dark:bg-slate-900/70"
            >
              <h3 className="text-lg font-bold text-slate-950 dark:text-white">{section.title}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                {section.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {section.routes.map((route) => (
                  <Button
                    key={route.to}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(route.to)}
                  >
                    {route.label}
                  </Button>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
