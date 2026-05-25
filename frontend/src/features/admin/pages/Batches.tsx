import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/dialog";
import AdminStatCard from "@/features/admin/components/shared/AdminStatCard";
import AdminStatusBadge from "@/features/admin/components/shared/AdminStatusBadge";
import { useAdminPortal } from "@/features/admin/context/AdminPortalContext";
import type { AdminBatchDraft } from "@/features/admin/types/admin.types";

const emptyBatchForm: AdminBatchDraft = {
  code: "",
  title: "",
  track: "",
  schedule: "",
  capacity: 30,
  status: "planning",
  mentorId: null,
  instructorIds: [],
  studentIds: [],
};

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

const Batches: React.FC = () => {
  const { batches, users, courses, saveBatch, deleteBatch, getUserById, getSessionsForBatch } =
    useAdminPortal();
  const students = users.filter((user) => user.role === "student");
  const mentors = users.filter((user) => user.role === "mentor");
  const instructors = users.filter((user) => user.role === "instructor");
  const [searchParams, setSearchParams] = useSearchParams();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<AdminBatchDraft>(emptyBatchForm);

  const activeBatches = batches.filter((batch) => batch.status === "active").length;
  const planningBatches = batches.filter((batch) => batch.status === "planning").length;
  const totalStudents = batches.reduce((sum, batch) => sum + batch.studentIds.length, 0);

  useEffect(() => {
    if (searchParams.get("action") !== "create") {
      return;
    }

    setForm(emptyBatchForm);
    setDialogOpen(true);
    setSearchParams({});
  }, [searchParams, setSearchParams]);

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            Batch orchestration
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-500 dark:text-slate-400">
            Group students, assign instructors and mentors, and keep each cohort under direct
            admin control.
          </p>
        </div>
        <Button
          type="button"
          variant="primary"
          onClick={() => {
            setForm(emptyBatchForm);
            setDialogOpen(true);
          }}
        >
          <span className="material-symbols-outlined text-[18px]">add_chart</span>
          Create batch
        </Button>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Batches"
          value={batches.length}
          hint="All tracked cohorts in one place"
          icon="layers"
        />
        <AdminStatCard
          title="Active"
          value={activeBatches}
          hint="Currently running groups"
          icon="rocket_launch"
        />
        <AdminStatCard
          title="Planning"
          value={planningBatches}
          hint="Prepared but not fully launched"
          icon="handyman"
        />
        <AdminStatCard
          title="Students Inside"
          value={totalStudents}
          hint="Total student assignments across cohorts"
          icon="school"
        />
      </section>

      <div className="grid gap-4 xl:grid-cols-2">
        {batches.map((batch) => {
          const mentor = getUserById(batch.mentorId);
          const batchCourses = courses.filter((course) => course.batchIds.includes(batch.id));
          const batchSessions = getSessionsForBatch(batch.id);

          return (
            <Card
              key={batch.id}
              className="rounded-2xl border-slate-200 bg-white/95 p-5 dark:border-slate-800 dark:bg-slate-900/70"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-bold text-slate-950 dark:text-white">
                        {batch.code}
                      </h2>
                      <AdminStatusBadge value={batch.status} />
                    </div>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      {batch.title} - {batch.track}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setForm(batch);
                        setDialogOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteBatch(batch.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="grid gap-3 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-2">
                  <p>
                    <span className="font-semibold">Schedule:</span> {batch.schedule}
                  </p>
                  <p>
                    <span className="font-semibold">Capacity:</span> {batch.studentIds.length}/
                    {batch.capacity}
                  </p>
                  <p>
                    <span className="font-semibold">Mentor:</span> {mentor?.name ?? "Unassigned"}
                  </p>
                  <p>
                    <span className="font-semibold">Instructors:</span> {batch.instructorIds.length}
                  </p>
                </div>

                <div className="grid gap-3 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-2">
                  <p>
                    <span className="font-semibold">Courses:</span> {batchCourses.length}
                  </p>
                  <p>
                    <span className="font-semibold">Sessions:</span> {batchSessions.length}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Modal
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={form.id ? "Edit batch" : "Create batch"}
        description="Set ownership and membership for this cohort."
        contentClassName="max-w-4xl"
        footer={
          <>
            <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                if (!form.code.trim() || !form.title.trim()) {
                  return;
                }
                saveBatch(form);
                setDialogOpen(false);
                setForm(emptyBatchForm);
              }}
            >
              {form.id ? "Save batch" : "Create batch"}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Batch code
            <Input
              value={form.code}
              onChange={(event) => setForm({ ...form, code: event.target.value })}
              placeholder="FE-24"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Batch title
            <Input
              value={form.title}
              onChange={(event) => setForm({ ...form, title: event.target.value })}
              placeholder="Frontend React Batch"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Track
            <Input
              value={form.track}
              onChange={(event) => setForm({ ...form, track: event.target.value })}
              placeholder="Frontend / Backend"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Schedule
            <Input
              value={form.schedule}
              onChange={(event) => setForm({ ...form, schedule: event.target.value })}
              placeholder="Sun / Tue 7:00 PM"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Capacity
            <Input
              type="number"
              value={form.capacity}
              onChange={(event) =>
                setForm({ ...form, capacity: Number(event.target.value) || 0 })
              }
              placeholder="30"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Status
            <select
              value={form.status}
              onChange={(event) =>
                setForm({ ...form, status: event.target.value as AdminBatchDraft["status"] })
              }
              className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <option value="planning">Planning</option>
              <option value="active">Active</option>
              <option value="archived">Archived</option>
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200 md:col-span-2">
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
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Instructors</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Pick the teaching team for this batch.
              </p>
            </div>
            <div className="grid gap-3">
              {instructors.map((instructor) => (
                <label
                  key={instructor.id}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-800"
                >
                  <input
                    type="checkbox"
                    checked={form.instructorIds.includes(instructor.id)}
                    onChange={() =>
                      setForm({
                        ...form,
                        instructorIds: toggleValue(form.instructorIds, instructor.id),
                      })
                    }
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {instructor.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{instructor.email}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Students</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Choose all students assigned to this cohort.
              </p>
            </div>
            <div className="grid max-h-64 gap-3 overflow-y-auto pr-1">
              {students.map((student) => (
                <label
                  key={student.id}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-800"
                >
                  <input
                    type="checkbox"
                    checked={form.studentIds.includes(student.id)}
                    onChange={() =>
                      setForm({
                        ...form,
                        studentIds: toggleValue(form.studentIds, student.id),
                      })
                    }
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {student.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{student.email}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Batches;
