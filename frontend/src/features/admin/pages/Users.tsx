import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AdminStatCard from "@/features/admin/components/shared/AdminStatCard";
import AdminStatusBadge from "@/features/admin/components/shared/AdminStatusBadge";
import UserFormDialog from "@/features/admin/components/users/UserFormDialog";
import { useAdminPortal } from "@/features/admin/context/AdminPortalContext";
import type { ManagedUser, ManagedUserDraft } from "@/features/admin/types/admin.types";
import { useAuth } from "@/hooks/useAuth";

const emptyUserForm: ManagedUserDraft = {
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

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user: currentUser, switchRole } = useAuth();
  const {
    users,
    batches,
    courses,
    saveUser,
    deleteUser,
    toggleUserStatus,
    reviewInstructorCv,
    getUserAssignments,
  } = useAdminPortal();

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<ManagedUserDraft>(emptyUserForm);

  const filteredUsers = users.filter((managedUser) => {
    const query = search.trim().toLowerCase();
    const matchesQuery =
      query.length === 0 ||
      managedUser.name.toLowerCase().includes(query) ||
      managedUser.email.toLowerCase().includes(query) ||
      managedUser.phone.toLowerCase().includes(query);
    const matchesRole = roleFilter === "all" || managedUser.role === roleFilter;
    const matchesStatus = statusFilter === "all" || managedUser.status === statusFilter;

    return matchesQuery && matchesRole && matchesStatus;
  });

  const openCreateDialog = () => {
    setForm(emptyUserForm);
    setDialogOpen(true);
  };

  useEffect(() => {
    if (searchParams.get("action") !== "create") {
      return;
    }

    openCreateDialog();
    setSearchParams({});
  }, [searchParams, setSearchParams]);

  const openEditDialog = (managedUser: ManagedUser) => {
    const assignments = getUserAssignments(managedUser.id);
    setForm({
      id: managedUser.id,
      name: managedUser.name,
      email: managedUser.email,
      phone: managedUser.phone,
      role: managedUser.role,
      status: managedUser.status,
      notes: managedUser.notes,
      batchIds: assignments.batchIds,
      courseIds: assignments.courseIds,
      cvFileName: managedUser.cvFileName,
      cvUploadedAt: managedUser.cvUploadedAt,
      cvReviewStatus: managedUser.cvReviewStatus,
    });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) {
      return;
    }

    if (form.role === "instructor" && !form.cvFileName.trim()) {
      return;
    }

    saveUser(form);
    setDialogOpen(false);
    setForm(emptyUserForm);
  };

  const activeUsers = users.filter((managedUser) => managedUser.status === "active").length;
  const pendingUsers = users.filter((managedUser) => managedUser.status === "pending").length;
  const adminUsers = users.filter((managedUser) => managedUser.role === "admin").length;
  const pendingInstructorCvReviews = users.filter(
    (managedUser) => managedUser.role === "instructor" && managedUser.cvReviewStatus === "pending",
  ).length;

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 dark:text-white">
            User management
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-500 dark:text-slate-400">
            Add admins, instructors, mentors, and students. Assign batches and courses from
            here, then preview any role when needed.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button type="button" variant="outline" onClick={() => navigate("/admin/batches")}>
            <span className="material-symbols-outlined text-[18px]">hub</span>
            Manage batches
          </Button>
          <Button type="button" variant="primary" onClick={openCreateDialog}>
            <span className="material-symbols-outlined text-[18px]">person_add</span>
            Add account
          </Button>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          title="Accounts"
          value={users.length}
          hint="Every role is managed from this screen"
          icon="groups"
        />
        <AdminStatCard
          title="Active"
          value={activeUsers}
          hint="Users currently enabled to access the platform"
          icon="verified_user"
        />
        <AdminStatCard
          title="Pending"
          value={pendingUsers}
          hint="Accounts waiting for approval or activation"
          icon="hourglass_top"
        />
        <AdminStatCard
          title="Admins"
          value={adminUsers}
          hint="Full-access operators for the portal"
          icon="shield_person"
        />
        <AdminStatCard
          title="CV reviews"
          value={pendingInstructorCvReviews}
          hint="Instructor accounts waiting for CV approval"
          icon="description"
        />
      </section>

      <Card className="rounded-2xl border-slate-200 bg-white/95 p-5 dark:border-slate-800 dark:bg-slate-900/70">
        <div className="grid gap-3 lg:grid-cols-[1.2fr_0.4fr_0.4fr_auto]">
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Search
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, email, or phone"
              className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Role
            <select
              value={roleFilter}
              onChange={(event) => setRoleFilter(event.target.value)}
              className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <option value="all">All roles</option>
              <option value="admin">Admin</option>
              <option value="instructor">Instructor</option>
              <option value="mentor">Mentor</option>
              <option value="student">Student</option>
            </select>
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 dark:text-slate-200">
            Status
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="flex h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            >
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
          <div className="flex items-end">
            <Button type="button" variant="outline" className="w-full" onClick={() => {
              setSearch("");
              setRoleFilter("all");
              setStatusFilter("all");
            }}>
              Reset filters
            </Button>
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden rounded-2xl border-slate-200 bg-white/95 dark:border-slate-800 dark:bg-slate-900/70">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1260px] border-collapse text-left">
            <thead className="bg-slate-50/90 text-xs uppercase tracking-[0.22em] text-slate-500 dark:bg-slate-950/60 dark:text-slate-400">
              <tr>
                <th className="px-5 py-4">User</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Contact</th>
                <th className="px-5 py-4">Batches</th>
                <th className="px-5 py-4">Courses</th>
                <th className="px-5 py-4">CV review</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredUsers.map((managedUser) => {
                const assignments = getUserAssignments(managedUser.id);
                const assignedBatches = batches.filter((batch) => assignments.batchIds.includes(batch.id));
                const assignedCourses = courses.filter((course) => assignments.courseIds.includes(course.id));
                const isCurrentAdmin = currentUser?.id === managedUser.id;

                return (
                  <tr
                    key={managedUser.id}
                    className="align-top transition-colors hover:bg-slate-50/70 dark:hover:bg-slate-950/40"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="size-11 bg-primary/10 text-primary">
                          <AvatarFallback className="bg-primary/10 font-bold text-primary">
                            {initials(managedUser.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-slate-100">
                            {managedUser.name}
                          </p>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            Last active {new Date(managedUser.lastActiveAt).toLocaleString()}
                          </p>
                          {managedUser.notes ? (
                            <p className="mt-2 max-w-sm text-xs text-slate-500 dark:text-slate-400">
                              {managedUser.notes}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <AdminStatusBadge value={managedUser.role} label={managedUser.role} />
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 dark:text-slate-300">
                      <p>{managedUser.email}</p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                        {managedUser.phone}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex max-w-xs flex-wrap gap-2">
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
                          <span className="text-xs text-slate-400">No batch assignment</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex max-w-xs flex-wrap gap-2">
                        {assignedCourses.length > 0 ? (
                          assignedCourses.map((course) => (
                            <span
                              key={course.id}
                              className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
                            >
                              {course.title}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400">No course assignment</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      {managedUser.role === "instructor" ? (
                        <div className="space-y-2">
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {managedUser.cvFileName || "Missing CV"}
                          </p>
                          <div className="flex flex-wrap items-center gap-2">
                            <AdminStatusBadge value={managedUser.cvReviewStatus} />
                            {managedUser.cvUploadedAt ? (
                              <span className="text-xs text-slate-500 dark:text-slate-400">
                                {new Date(managedUser.cvUploadedAt).toLocaleDateString()}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      ) : (
                        <AdminStatusBadge value="not_required" />
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <AdminStatusBadge value={managedUser.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        {managedUser.role === "instructor" ? (
                          <>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              disabled={managedUser.cvReviewStatus === "approved" || !managedUser.cvFileName}
                              onClick={() => reviewInstructorCv(managedUser.id, "approved")}
                            >
                              Accept CV
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              disabled={managedUser.cvReviewStatus === "rejected" || !managedUser.cvFileName}
                              onClick={() => reviewInstructorCv(managedUser.id, "rejected")}
                            >
                              Reject CV
                            </Button>
                          </>
                        ) : null}
                        <Button type="button" variant="outline" size="sm" onClick={() => openEditDialog(managedUser)}>
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => toggleUserStatus(managedUser.id)}
                        >
                          {managedUser.status === "active" ? "Disable" : "Enable"}
                        </Button>
                        {managedUser.role !== "admin" ? (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              if (currentUser?.role !== "admin") {
                                switchRole(managedUser.role);
                              }
                              navigate(`/${managedUser.role}/dashboard`);
                            }}
                          >
                            Preview
                          </Button>
                        ) : null}
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          disabled={isCurrentAdmin}
                          onClick={() => deleteUser(managedUser.id)}
                        >
                          Delete
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
        onChange={setForm}
        onSubmit={handleSave}
        users={users}
        batches={batches}
        courses={courses}
        title={form.id ? "Edit account" : "Create account"}
        submitLabel={form.id ? "Save changes" : "Create account"}
      />
    </div>
  );
};

export default Users;
