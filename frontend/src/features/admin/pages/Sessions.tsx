import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Sessions: React.FC = () => {
  return (
    <div className="space-y-6 p-4 sm:space-y-8 sm:p-6 md:p-8">
      {/* Lecture Sessions Section */}
      <section>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-black tracking-tight text-slate-100 sm:text-2xl">Lecture Sessions</h3>
            <p className="text-slate-400 text-sm">Overview of current week's academic lectures</p>
          </div>
          <Button variant="primary" className="w-full justify-center gap-2 sm:w-auto">
            <span className="material-symbols-outlined text-sm">add</span>
            Add Session
          </Button>
        </div>

        <Card className="overflow-hidden rounded-xl border-slate-800 bg-slate-900/50 shadow-sm">
          <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[860px] border-collapse text-left xl:min-w-[980px]">
            <thead>
              <tr className="bg-slate-800/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Lecture #/Week</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Batch #</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Course</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Instructor</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Date/Time</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Links</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-300">Lec 04 / Week 2</td>
                <td className="px-6 py-4 text-sm text-slate-400">B-2023-CS</td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-100">Data Structures</td>
                <td className="px-6 py-4 text-sm text-slate-400">Dr. Emily Smith</td>
                <td className="px-6 py-4 text-sm text-slate-400">Oct 24, 10:00 AM</td>
                <td className="px-6 py-4 text-center">
                  <Badge
                    variant="outline"
                    className="border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-500"
                  >
                    Finished
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto h-auto justify-end gap-1 px-0 py-0 text-xs font-bold text-primary hover:bg-transparent hover:underline"
                  >
                    <span className="material-symbols-outlined text-sm">videocam</span> Record
                  </Button>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-300">Lec 05 / Week 3</td>
                <td className="px-6 py-4 text-sm text-slate-400">B-2023-CS</td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-100">Algorithms</td>
                <td className="px-6 py-4 text-sm text-slate-400">Prof. Alan Jones</td>
                <td className="px-6 py-4 text-sm text-slate-400">Oct 26, 02:00 PM</td>
                <td className="px-6 py-4 text-center">
                  <Badge
                    variant="outline"
                    className="border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-500"
                  >
                    Not Finished
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="ml-auto h-auto gap-1 bg-primary/20 px-3 py-1 text-xs font-bold text-slate-100 hover:bg-primary/30"
                  >
                    <span className="material-symbols-outlined text-sm">sensors</span> Join Live
                  </Button>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-300">Lec 01 / Week 1</td>
                <td className="px-6 py-4 text-sm text-slate-400">B-2024-DS</td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-100">Intro to UI Design</td>
                <td className="px-6 py-4 text-sm text-slate-400">Sarah Lee</td>
                <td className="px-6 py-4 text-sm text-slate-400">Oct 27, 09:00 AM</td>
                <td className="px-6 py-4 text-center">
                  <Badge
                    variant="outline"
                    className="border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-500"
                  >
                    Not Finished
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="ml-auto h-auto gap-1 bg-primary/20 px-3 py-1 text-xs font-bold text-slate-100 hover:bg-primary/30"
                  >
                    <span className="material-symbols-outlined text-sm">sensors</span> Join Live
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </Card>
      </section>

      {/* Mentor Sessions Section */}
      <section>
        <div className="mb-6">
          <h3 className="text-xl font-black tracking-tight text-slate-100 sm:text-2xl">Mentor Sessions</h3>
          <p className="text-slate-400 text-sm">Upcoming and past mentorship appointments</p>
        </div>
        <Card className="overflow-hidden rounded-xl border-slate-800 bg-slate-900/50 shadow-sm">
          <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[820px] border-collapse text-left xl:min-w-[940px]">
            <thead>
              <tr className="bg-slate-800/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Mentor Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Batch #</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Session Purpose</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="flex items-center gap-3 px-6 py-4">
                  <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">MK</div>
                  <span className="text-sm font-semibold text-slate-100">Marcus King</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">B-2023-CS</td>
                <td className="px-6 py-4 text-sm text-slate-300">Project Review</td>
                <td className="px-6 py-4 text-sm text-slate-400">Today, 4:00 PM</td>
                <td className="px-6 py-4 text-center">
                  <Badge
                    variant="outline"
                    className="border-amber-500/20 bg-amber-500/10 px-2.5 py-1 text-xs font-bold text-amber-500"
                  >
                    Upcoming
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="primary" size="sm" className="h-auto px-3 py-1.5 text-xs font-bold">
                    Join Meeting
                  </Button>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="flex items-center gap-3 px-6 py-4">
                  <div className="size-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold text-xs">JR</div>
                  <span className="text-sm font-semibold text-slate-100">Jessica Reed</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">B-2024-DS</td>
                <td className="px-6 py-4 text-sm text-slate-300">Career Guidance</td>
                <td className="px-6 py-4 text-sm text-slate-400">Oct 23, 11:30 AM</td>
                <td className="px-6 py-4 text-center">
                  <Badge
                    variant="outline"
                    className="border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-500"
                  >
                    Completed
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto h-auto justify-end gap-1 px-0 py-0 text-xs font-bold text-primary hover:bg-transparent hover:underline"
                  >
                    <span className="material-symbols-outlined text-sm">link</span> Session Note
                  </Button>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="flex items-center gap-3 px-6 py-4">
                  <div className="size-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 font-bold text-xs">DM</div>
                  <span className="text-sm font-semibold text-slate-100">David Miller</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">B-2023-CS</td>
                <td className="px-6 py-4 text-sm text-slate-300">Technical Doubt</td>
                <td className="px-6 py-4 text-sm text-slate-400">Oct 22, 01:00 PM</td>
                <td className="px-6 py-4 text-center">
                  <Badge
                    variant="outline"
                    className="border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-500"
                  >
                    Completed
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto h-auto justify-end gap-1 px-0 py-0 text-xs font-bold text-primary hover:bg-transparent hover:underline"
                  >
                    <span className="material-symbols-outlined text-sm">videocam</span> Watch
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </Card>
      </section>
    </div>
  );
};

export default Sessions;
