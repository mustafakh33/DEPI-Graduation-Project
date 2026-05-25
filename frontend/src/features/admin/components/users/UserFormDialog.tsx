import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/dialog";
import type {
  AdminBatch,
  AdminCourse,
  InstructorCvStatus,
  ManagedUser,
  ManagedUserDraft,
} from "@/features/admin/types/admin.types";
import type { Role } from "@/types/global.types";

const roles: Role[] = ["admin", "instructor", "mentor", "student"];
const statuses: ManagedUserDraft["status"][] = ["active", "pending", "inactive"];

const cvReviewLabels: Record<InstructorCvStatus, string> = {
  not_required: "Not required",
  pending: "Pending review",
  approved: "Approved",
  rejected: "Rejected",
};

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: ManagedUserDraft;
  onChange: (next: ManagedUserDraft) => void;
  onSubmit: () => void;
  users: ManagedUser[];
  batches: AdminBatch[];
  courses: AdminCourse[];
  title: string;
  submitLabel: string;
}

const UserFormDialog: React.FC<UserFormDialogProps> = ({
  open,
  onOpenChange,
  form,
  onChange,
  onSubmit,
  users,
  batches,
  courses,
  title,
  submitLabel,
}) => {
  const mentorOptions = users.filter((user) => user.role === "mentor" && user.id !== form.id);
  const instructorOptions = users.filter(
    (user) => user.role === "instructor" && user.id !== form.id,
  );

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description="Create or edit a platform account, then assign its scope from here."
      contentClassName="max-w-3xl"
      footer={
        <>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="button" variant="primary" onClick={onSubmit}>
            {submitLabel}
          </Button>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          Full name
          <Input
            value={form.name}
            onChange={(event) => onChange({ ...form, name: event.target.value })}
            placeholder="Enter full name"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          Email
          <Input
            type="email"
            value={form.email}
            onChange={(event) => onChange({ ...form, email: event.target.value })}
            placeholder="name@unihub.edu"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          Phone
          <Input
            value={form.phone}
            onChange={(event) => onChange({ ...form, phone: event.target.value })}
            placeholder="+20 1xx xxx xxxx"
          />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          Role
          <select
            value={form.role}
            onChange={(event) =>
              onChange({
                ...form,
                role: event.target.value as Role,
                courseIds: event.target.value === "instructor" ? form.courseIds : [],
                cvFileName: event.target.value === "instructor" ? form.cvFileName : "",
                cvUploadedAt: event.target.value === "instructor" ? form.cvUploadedAt : null,
                cvReviewStatus:
                  event.target.value === "instructor" ? form.cvReviewStatus : "not_required",
              })
            }
            className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            {roles.map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200 md:col-span-2">
          Status
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => onChange({ ...form, status })}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  form.status === status
                    ? "border-primary bg-primary text-white"
                    : "border-slate-200 bg-white text-slate-600 hover:border-primary/40 hover:text-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200 md:col-span-2">
          Notes
          <textarea
            value={form.notes}
            onChange={(event) => onChange({ ...form, notes: event.target.value })}
            placeholder="Add any admin note here"
            rows={3}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>
      </div>

      {(form.role === "student" || form.role === "mentor" || form.role === "instructor") && (
        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Batch access</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Choose the batches this account should control or belong to.
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
                    onChange({ ...form, batchIds: toggleValue(form.batchIds, batch.id) })
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
      )}

      {form.role === "instructor" && (
        <div className="space-y-3">
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              Instructor CV
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Upload the instructor CV first. Admin can approve or reject it later from the users table.
            </p>
            <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto]">
              <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
                Upload CV
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) {
                      return;
                    }

                    onChange({
                      ...form,
                      cvFileName: file.name,
                      cvUploadedAt: new Date().toISOString(),
                      cvReviewStatus: "pending",
                      status: "pending",
                    });
                  }}
                />
              </label>
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900">
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  {form.cvFileName || "No CV uploaded yet"}
                </p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {cvReviewLabels[form.cvReviewStatus]}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Course ownership</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Assign live or draft courses to this instructor.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {courses.map((course) => (
              <label
                key={course.id}
                className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-800"
              >
                <input
                  type="checkbox"
                  checked={form.courseIds.includes(course.id)}
                  onChange={() =>
                    onChange({ ...form, courseIds: toggleValue(form.courseIds, course.id) })
                  }
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{course.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{course.track}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {form.role === "admin" && (
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm text-slate-700 dark:text-slate-200">
          This role gets full platform access. Batch and course assignments are not required.
        </div>
      )}

      {mentorOptions.length === 0 && instructorOptions.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-300">
          Add more mentors and instructors from this screen to expand assignments.
        </div>
      )}
    </Modal>
  );
};

export default UserFormDialog;
