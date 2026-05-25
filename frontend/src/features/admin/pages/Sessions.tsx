import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/dialog";
import AdminStatCard from "@/features/admin/components/shared/AdminStatCard";
import AdminStatusBadge from "@/features/admin/components/shared/AdminStatusBadge";
import { useAdminPortal } from "@/features/admin/context/AdminPortalContext";
import type { AdminSessionDraft } from "@/features/admin/types/admin.types";

const emptySessionForm: AdminSessionDraft = {
  title: "",
  room: "",
  scheduledAt: "",
  status: "scheduled",
  notes: "",
  batchId: "",
  courseId: null,
  instructorId: null,
  mentorId: null,
};

const Sessions: React.FC = () => {
  const {
    sessions,
    batches,
    courses,
    users,
    saveSession,
    deleteSession,
    getBatchById,
    getCourseById,
    getUserById,
  } = useAdminPortal();
  const instructors = users.filter((user) => user.role === "instructor");
  const mentors = users.filter((user) => user.role === "mentor");
  const [searchParams, setSearchParams] = useSearchParams();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<AdminSessionDraft>(emptySessionForm);

  const scheduledCount = sessions.filter((session) => session.status === "scheduled").length;
  const liveCount = sessions.filter((session) => session.status === "live").length;
  const completedCount = sessions.filter((session) => session.status === "completed").length;

  const openCreate = () => {
    setForm({
      ...emptySessionForm,
      batchId: batches[0]?.id ?? "",
      courseId: courses[0]?.id ?? null,
      instructorId: instructors[0]?.id ?? null,
      mentorId: mentors[0]?.id ?? null,
    });
    setDialogOpen(true);
  };

  useEffect(() => {
    if (searchParams.get("action") !== "create") {
      return;
    }

    openCreate();
    setSearchParams({});
  }, [searchParams, setSearchParams]);

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            Session operations
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-500 dark:text-slate-400">
            Control who teaches what, when it starts, and which batch gets access.
          </p>
        </div>
        <Button type="button" variant="primary" onClick={openCreate}>
          <span className="material-symbols-outlined text-[18px]">event_available</span>
          Schedule session
        </Button>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Total Sessions"
          value={sessions.length}
          hint="Every session stored for admin operations"
          icon="calendar_month"
        />
        <AdminStatCard
          title="Scheduled"
          value={scheduledCount}
          hint="Upcoming sessions still waiting to start"
          icon="schedule"
        />
        <AdminStatCard
          title="Live Now"
          value={liveCount}
          hint="Sessions currently running"
          icon="live_tv"
        />
        <AdminStatCard
          title="Completed"
          value={completedCount}
          hint="Historical sessions kept for reporting"
          icon="task_alt"
        />
      </section>

      <div className="grid gap-4">
        {sessions.map((session) => {
          const batch = getBatchById(session.batchId);
          const course = getCourseById(session.courseId);
          const instructor = getUserById(session.instructorId);
          const mentor = getUserById(session.mentorId);

          return (
            <Card
              key={session.id}
              className="rounded-2xl border-slate-200 bg-white/95 p-5 dark:border-slate-800 dark:bg-slate-900/70"
            >
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                      {session.title}
                    </h2>
                    <AdminStatusBadge value={session.status} />
                  </div>
                  <div className="grid gap-2 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-2">
                    <p>
                      <span className="font-semibold">Batch:</span> {batch?.code ?? "Unknown"}
                    </p>
                    <p>
                      <span className="font-semibold">Course:</span> {course?.title ?? "Not linked"}
                    </p>
                    <p>
                      <span className="font-semibold">Instructor:</span>{" "}
                      {instructor?.name ?? "Unassigned"}
                    </p>
                    <p>
                      <span className="font-semibold">Mentor:</span> {mentor?.name ?? "Unassigned"}
                    </p>
                    <p>
                      <span className="font-semibold">Room:</span> {session.room}
                    </p>
                    <p>
                      <span className="font-semibold">Date:</span>{" "}
                      {new Date(session.scheduledAt).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{session.notes}</p>
                </div>
                <div className="flex flex-wrap gap-2 xl:justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setForm({
                        ...session,
                        courseId: session.courseId ?? null,
                        instructorId: session.instructorId ?? null,
                        mentorId: session.mentorId ?? null,
                      });
                      setDialogOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteSession(session.id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Modal
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={form.id ? "Edit session" : "Schedule session"}
        description="Assign batch ownership and teaching staff from the same modal."
        contentClassName="max-w-3xl"
        footer={
          <>
            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                if (!form.title.trim() || !form.batchId || !form.scheduledAt) {
                  return;
                }
                saveSession(form);
                setDialogOpen(false);
                setForm(emptySessionForm);
              }}
            >
              {form.id ? "Save session" : "Create session"}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Session title
            <Input
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              placeholder="Session title"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Room
            <Input
              value={form.room}
              onChange={(event) => setForm({ ...form, room: event.target.value })}
              placeholder="Zoom A / Lab 2 / Teams"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Date and time
            <Input
              type="datetime-local"
              value={form.scheduledAt ? form.scheduledAt.slice(0, 16) : ""}
              onChange={(event) =>
                setForm({ ...form, scheduledAt: new Date(event.target.value).toISOString() })
              }
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Status
            <select
              value={form.status}
              onChange={(event) =>
                setForm({
                  ...form,
                  status: event.target.value as AdminSessionDraft["status"],
                })
              }
              className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <option value="scheduled">Scheduled</option>
              <option value="live">Live</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Batch
            <select
              value={form.batchId}
              onChange={(event) => setForm({ ...form, batchId: event.target.value })}
              className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              {batches.map((batch) => (
                <option key={batch.id} value={batch.id}>
                  {batch.code} - {batch.title}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Course
            <select
              value={form.courseId ?? ""}
              onChange={(event) =>
                setForm({ ...form, courseId: event.target.value || null })
              }
              className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <option value="">No linked course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Instructor
            <select
              value={form.instructorId ?? ""}
              onChange={(event) =>
                setForm({ ...form, instructorId: event.target.value || null })
              }
              className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <option value="">No instructor</option>
              {instructors.map((instructor) => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Mentor
            <select
              value={form.mentorId ?? ""}
              onChange={(event) => setForm({ ...form, mentorId: event.target.value || null })}
              className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <option value="">No mentor</option>
              {mentors.map((mentor) => (
                <option key={mentor.id} value={mentor.id}>
                  {mentor.name}
                </option>
              ))}
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200 md:col-span-2">
            Notes
            <textarea
              value={form.notes}
              onChange={(event) => setForm({ ...form, notes: event.target.value })}
              rows={3}
              placeholder="Add session notes, goals, or admin reminders"
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </label>
        </div>
      </Modal>
    </div>
  );
};

export default Sessions;
