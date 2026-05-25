import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AdminStatCard from "@/features/admin/components/shared/AdminStatCard";
import AdminStatusBadge from "@/features/admin/components/shared/AdminStatusBadge";
import UserFormDialog from "@/features/admin/components/users/UserFormDialog";
import { useAdminPortal } from "@/features/admin/context/AdminPortalContext";
import type { ManagedUserDraft } from "@/features/admin/types/admin.types";

const emptyStudentForm: ManagedUserDraft = {
  name: "",
  email: "",
  phone: "",
  role: "student",
  status: "active",
  notes: "",
  batchIds: [],
  courseIds: [],
  cvFileName: "",
  cvUploadedAt: null,
  cvReviewStatus: "not_required",
};

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

const Students: React.FC = () => {
  const { users, batches, courses, sessions, saveUser, toggleUserStatus, getUserAssignments } =
    useAdminPortal();
  const students = users.filter((user) => user.role === "student");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<ManagedUserDraft>(emptyStudentForm);

  const visibleStudents = students.filter((student) => {
    const query = search.trim().toLowerCase();
    return (
      query.length === 0 ||
      student.name.toLowerCase().includes(query) ||
      student.email.toLowerCase().includes(query)
    );
  });

  const activeStudents = students.filter((student) => student.status === "active").length;
  const inactiveStudents = students.filter((student) => student.status === "inactive").length;
  const scheduledSessions = sessions.filter((session) => session.status === "scheduled").length;

  useEffect(() => {
    if (searchParams.get("action") !== "create") {
      return;
    }

    setForm(emptyStudentForm);
    setDialogOpen(true);
    setSearchParams({});
  }, [searchParams, setSearchParams]);

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            Student directory
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-500 dark:text-slate-400">
            View every student, their batch assignment, and their access status without
            leaving the admin module.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="outline" onClick={() => setSearch("")}>
            Clear search
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              setForm(emptyStudentForm);
              setDialogOpen(true);
            }}
          >
            <span className="material-symbols-outlined text-[18px]">school</span>
            Add student
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Students"
          value={students.length}
          hint="Total student accounts inside the portal"
          icon="school"
        />
        <AdminStatCard
          title="Active Students"
          value={activeStudents}
          hint="Ready to attend classes and submit work"
          icon="check_circle"
        />
        <AdminStatCard
          title="Inactive Students"
          value={inactiveStudents}
          hint="Need re-activation or follow-up"
          icon="pause_circle"
        />
        <AdminStatCard
          title="Upcoming Sessions"
          value={scheduledSessions}
          hint="Sessions students should be prepared for"
          icon="event_available"
        />
      </section>

      <Card className="rounded-2xl border-slate-200 bg-white/95 p-5 dark:border-slate-800 dark:bg-slate-900/70">
        <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
          Search students
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name or email"
            className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>
      </Card>

      <Card className="overflow-hidden rounded-2xl border-slate-200 bg-white/95 dark:border-slate-800 dark:bg-slate-900/70">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead className="bg-slate-50/90 text-xs uppercase tracking-[0.22em] text-slate-500 dark:bg-slate-950/60 dark:text-slate-400">
              <tr>
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Batch</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Sessions</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {visibleStudents.map((student) => {
                const assignments = getUserAssignments(student.id);
                const assignedBatches = batches.filter((batch) => assignments.batchIds.includes(batch.id));
                const relatedSessions = sessions.filter((session) => assignments.batchIds.includes(session.batchId));

                return (
                  <tr key={student.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-950/40">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="size-11 bg-primary/10 text-primary">
                          <AvatarFallback className="bg-primary/10 font-bold text-primary">
                            {initials(student.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">
                            {student.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {student.notes || "No admin notes yet"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        {assignedBatches.map((batch) => (
                          <span
                            key={batch.id}
                            className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                          >
                            {batch.code}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                      <p>{student.email}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {student.phone}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900 dark:text-slate-100">
                        {relatedSessions.length}
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        scheduled or completed batch sessions
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <AdminStatusBadge value={student.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setForm({
                              id: student.id,
                              name: student.name,
                              email: student.email,
                              phone: student.phone,
                              role: "student",
                              status: student.status,
                              notes: student.notes,
                              batchIds: assignments.batchIds,
                              courseIds: [],
                              cvFileName: "",
                              cvUploadedAt: null,
                              cvReviewStatus: "not_required",
                            });
                            setDialogOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => navigate("/student/dashboard")}
                        >
                          Portal
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => toggleUserStatus(student.id)}
                        >
                          {student.status === "active" ? "Disable" : "Enable"}
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <UserFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        form={form}
        onChange={(next) => setForm({ ...next, role: "student", courseIds: [] })}
        onSubmit={() => {
          if (!form.name.trim() || !form.email.trim()) {
            return;
          }
          saveUser({ ...form, role: "student", courseIds: [] });
          setDialogOpen(false);
          setForm(emptyStudentForm);
        }}
        users={users}
        batches={batches}
        courses={courses}
        title={form.id ? "Edit student" : "Add student"}
        submitLabel={form.id ? "Save student" : "Create student"}
      />
    </div>
  );
};

export default Students;
