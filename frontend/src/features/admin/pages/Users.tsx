import React, { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/dialog";

const Users: React.FC = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
      {/* Page Title Area */}
      <div className="flex flex-col gap-4 p-4 sm:p-6 md:flex-row md:items-end md:justify-between md:p-8">
        <div>
          <h2 className="mb-2 text-2xl font-black tracking-tight sm:text-3xl">User Management</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl">
            Manage university instructors, mentors, and their assigned batches. Overview of active faculty and administrative access.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:gap-3">
          <Button variant="outline" className="justify-center gap-2">
            <span className="material-symbols-outlined text-sm">download</span>
            Export Data
          </Button>
          <Button type="button" variant="outline" className="justify-center gap-2" onClick={() => setFilterOpen(true)}>
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Filter
          </Button>
        </div>
      </div>

      {/* Table Container */}
      <div className="px-4 pb-6 sm:px-6 md:px-8 md:pb-8">
        <Card className="overflow-hidden">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full min-w-[900px] border-collapse text-left xl:min-w-[1000px]">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">Name</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">Email</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">Phone Number</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">Role</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">Assigned Batches</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {/* Row 1 */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9 bg-primary/10 text-primary">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">AS</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-slate-900 dark:text-slate-100">Dr. Alice Smith</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">alice.s@unihub.edu</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">+1 555-0101</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
                      Instructor
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">CS101, CS202</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                      <span className="material-symbols-outlined">edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="ml-2 h-8 w-8 text-slate-400 hover:text-red-500">
                      <span className="material-symbols-outlined">delete</span>
                    </Button>
                  </td>
                </tr>
                {/* Row 2 */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9 bg-emerald-500/10 text-emerald-500">
                        <AvatarFallback className="bg-emerald-500/10 text-emerald-500 font-bold">MJ</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-slate-900 dark:text-slate-100">Mark Johnson</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">mark.j@unihub.edu</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">+1 555-0102</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
                      Mentor
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">UX Design A</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                      <span className="material-symbols-outlined">edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="ml-2 h-8 w-8 text-slate-400 hover:text-red-500">
                      <span className="material-symbols-outlined">delete</span>
                    </Button>
                  </td>
                </tr>
                {/* Row 3 */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9 bg-primary/10 text-primary">
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">RC</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-slate-900 dark:text-slate-100">Dr. Robert Chen</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">r.chen@unihub.edu</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">+1 555-0103</td>
                  <td className="px-6 py-4">
                    <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary">
                      Instructor
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Data Science 1</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-primary">
                      <span className="material-symbols-outlined">edit</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="ml-2 h-8 w-8 text-slate-400 hover:text-red-500">
                      <span className="material-symbols-outlined">delete</span>
                    </Button>
                  </td>
                </tr>
                {/* Row 4 */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold">SW</div>
                      <span className="font-medium text-slate-900 dark:text-slate-100">Sarah Williams</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">sarah.w@unihub.edu</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">+1 555-0104</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      Mentor
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">CS101, UX Design B</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="text-slate-400 hover:text-red-500 ml-2 transition-colors">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
                {/* Row 5 */}
                <tr className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">DT</div>
                      <span className="font-medium text-slate-900 dark:text-slate-100">David Thompson</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">d.thompson@unihub.edu</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">+1 555-0105</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                      Instructor
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Algorithms 101</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="text-slate-400 hover:text-red-500 ml-2 transition-colors">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-4 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm text-slate-500 dark:text-slate-400">Showing 1-5 of 124 users</p>
            <div className="flex flex-wrap items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                <span className="material-symbols-outlined">chevron_left</span>
              </Button>
              <Button variant="primary" size="icon" className="h-8 w-8 text-sm font-bold">1</Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-sm text-slate-600 dark:text-slate-400">2</Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-sm text-slate-600 dark:text-slate-400">3</Button>
              <span className="px-2 text-slate-400">...</span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-sm text-slate-600 dark:text-slate-400">25</Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                <span className="material-symbols-outlined">chevron_right</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-1 gap-4 px-4 pb-6 sm:px-6 md:grid-cols-3 md:gap-6 md:px-8 md:pb-8">
        <Card className="rounded-xl border-primary/20 bg-primary/5 p-4 dark:bg-primary/10 sm:p-6">
          <h3 className="text-sm font-semibold text-primary mb-1 uppercase tracking-wider">Total Faculty</h3>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black">124</span>
            <span className="material-symbols-outlined text-primary opacity-50 text-4xl">diversity_3</span>
          </div>
        </Card>
        <Card className="rounded-xl border-emerald-500/20 bg-emerald-500/5 p-4 dark:bg-emerald-500/10 sm:p-6">
          <h3 className="text-sm font-semibold text-emerald-500 mb-1 uppercase tracking-wider">Active Mentors</h3>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black">48</span>
            <span className="material-symbols-outlined text-emerald-500 opacity-50 text-4xl">psychology</span>
          </div>
        </Card>
        <Card className="rounded-xl border-slate-500/20 bg-slate-500/5 p-4 dark:bg-slate-500/10 sm:p-6">
          <h3 className="text-sm font-semibold text-slate-500 mb-1 uppercase tracking-wider">Pending Approvals</h3>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-black">09</span>
            <span className="material-symbols-outlined text-slate-500 opacity-50 text-4xl">pending_actions</span>
          </div>
        </Card>
      </div>

      <Modal
        open={filterOpen}
        onOpenChange={setFilterOpen}
        title="Filter users"
        description="Narrow the list by role, batch, or status. Connect fields to your API when ready."
        footer={
          <Button type="button" variant="primary" onClick={() => setFilterOpen(false)}>
            Done
          </Button>
        }
      >
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Placeholder: filter controls will go here.
        </p>
      </Modal>
    </div>
  );
};

export default Users;
