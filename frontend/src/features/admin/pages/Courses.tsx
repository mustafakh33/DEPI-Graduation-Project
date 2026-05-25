import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/dialog";
import AdminStatCard from "@/features/admin/components/shared/AdminStatCard";
import AdminStatusBadge from "@/features/admin/components/shared/AdminStatusBadge";
import { useAdminPortal } from "@/features/admin/context/AdminPortalContext";
import type { AdminCourseDraft } from "@/features/admin/types/admin.types";

const emptyCourseForm: AdminCourseDraft = {
  title: "",
  track: "",
  description: "",
  status: "draft",
  instructorId: null,
  batchIds: [],
};

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

const Courses: React.FC = () => {
  const { courses, batches, users, sessions, saveCourse, deleteCourse, getUserById } =
    useAdminPortal();
  const instructors = users.filter((user) => user.role === "instructor");
  const [searchParams, setSearchParams] = useSearchParams();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<AdminCourseDraft>(emptyCourseForm);

  const liveCourses = courses.filter((course) => course.status === "live").length;
  const draftCourses = courses.filter((course) => course.status === "draft").length;
  const archivedCourses = courses.filter((course) => course.status === "archived").length;

  useEffect(() => {
    if (searchParams.get("action") !== "create") {
      return;
    }

    setForm(emptyCourseForm);
    setDialogOpen(true);
    setSearchParams({});
  }, [searchParams, setSearchParams]);

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            Course management
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-500 dark:text-slate-400">
            Create course records, assign instructors, and publish them to one or more batches.
          </p>
        </div>
        <Button
          type="button"
          variant="primary"
          onClick={() => {
            setForm(emptyCourseForm);
            setDialogOpen(true);
          }}
        >
          <span className="material-symbols-outlined text-[18px]">library_add</span>
          Add course
        </Button>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Total Courses"
          value={courses.length}
          hint="Every stored course inside admin storage"
          icon="menu_book"
        />
        <AdminStatCard
          title="Live"
          value={liveCourses}
          hint="Visible and ready for active batches"
          icon="play_circle"
        />
        <AdminStatCard
          title="Draft"
          value={draftCourses}
          hint="Waiting for admin review or scheduling"
          icon="edit_note"
        />
        <AdminStatCard
          title="Archived"
          value={archivedCourses}
          hint="Preserved for reports and references"
          icon="inventory_2"
        />
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        {courses.map((course) => {
          const assignedBatches = batches.filter((batch) => course.batchIds.includes(batch.id));
          const instructor = getUserById(course.instructorId);
          const relatedSessions = sessions.filter((session) => session.courseId === course.id);

          return (
            <Card
              key={course.id}
              className="rounded-2xl border-slate-200 bg-white/95 p-5 dark:border-slate-800 dark:bg-slate-900/70"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                        {course.title}
                      </h2>
                      <AdminStatusBadge value={course.status} />
                    </div>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      {course.track}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setForm({
                          ...course,
                          instructorId: course.instructorId ?? null,
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
                      onClick={() => deleteCourse(course.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{course.description}</p>
                <div className="grid gap-3 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-2">
                  <p>
                    <span className="font-semibold">Instructor:</span>{" "}
                    {instructor?.name ?? "Unassigned"}
                  </p>
                  <p>
                    <span className="font-semibold">Sessions:</span> {relatedSessions.length}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {assignedBatches.length > 0 ? (
                    assignedBatches.map((batch) => (
                      <span
                        key={batch.id}
                        className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      >
                        {batch.code}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400">No batches linked yet</span>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Modal
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={form.id ? "Edit course" : "Create course"}
        description="Set the instructor and decide which batches should receive this course."
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
                if (!form.title.trim() || !form.track.trim()) {
                  return;
                }
                saveCourse(form);
                setDialogOpen(false);
                setForm(emptyCourseForm);
              }}
            >
              {form.id ? "Save course" : "Create course"}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Title
            <Input
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              placeholder="Course title"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Track
            <Input
              value={form.track}
              onChange={(event) => setForm({ ...form, track: event.target.value })}
              placeholder="Frontend / Backend / UI"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200 md:col-span-2">
            Description
            <textarea
              value={form.description}
              onChange={(event) => setForm({ ...form, description: event.target.value })}
              rows={3}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
              placeholder="Course summary"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Status
            <select
              value={form.status}
              onChange={(event) =>
                setForm({ ...form, status: event.target.value as AdminCourseDraft["status"] })
              }
              className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <option value="draft">Draft</option>
              <option value="live">Live</option>
              <option value="archived">Archived</option>
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
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Visible for batches</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Link the course to all relevant cohorts.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {batches.map((batch) => (
              <label
                key={batch.id}
                className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-800"
              >
                <input
                  type="checkbox"
                  checked={form.batchIds.includes(batch.id)}
                  onChange={() =>
                    setForm({ ...form, batchIds: toggleValue(form.batchIds, batch.id) })
                  }
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{batch.code}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{batch.title}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Courses;
