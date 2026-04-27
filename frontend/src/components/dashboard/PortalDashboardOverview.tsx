import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const dataSessions = [
  { name: "Finished", value: 75, color: "#135bec" },
  { name: "Remaining", value: 25, color: "#1e293b" },
];

const dataAttendance = [
  { name: "Present", value: 92, color: "#10b981" },
  { name: "Absent", value: 8, color: "#1e293b" },
];

const dataQuiz = [{ name: "Pass", value: 68, color: "#f59e0b" }, { name: "Fail", value: 32, color: "#1e293b" }];
const dataAssignment = [{ name: "Submitted", value: 84, color: "#135bec" }, { name: "Pending", value: 16, color: "#1e293b" }];
const dataChat = [{ name: "Participated", value: 45, color: "#818cf8" }, { name: "None", value: 55, color: "#1e293b" }];

export interface PortalDashboardOverviewProps {
  welcomeName: string;
}

/**
 * Same layout, colors, and blocks as the Uni Hub admin dashboard reference (dark + cards + charts).
 */
const PortalDashboardOverview: React.FC<PortalDashboardOverviewProps> = ({ welcomeName }) => {
  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Dashboard Overview</h2>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Welcome back, {welcomeName}. Here is an overview of the university&apos;s performance today.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/50">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Students</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">12,450</span>
            <span className="text-xs font-bold text-emerald-500">+2.4%</span>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/50">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Instructors</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">452</span>
            <span className="text-xs font-bold text-emerald-500">+12</span>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/50">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Mentors</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">120</span>
            <span className="text-xs font-bold text-slate-500">Stable</span>
          </div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/50">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Batches</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">85</span>
            <span className="text-xs font-bold text-primary">In 12 Departments</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="relative rounded-xl border border-slate-200 bg-white p-6 lg:col-span-2 dark:border-slate-700 dark:bg-slate-800/50">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Total Sessions Progress</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Academic Year 2024 - Semester 1</p>
            </div>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">On Schedule</span>
          </div>

          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="relative h-40 w-40 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dataSessions}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    stroke="none"
                  >
                    {dataSessions.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">75%</span>
                <span className="text-[10px] uppercase text-slate-500 dark:text-slate-500">Done</span>
              </div>
            </div>

            <div className="w-full flex-1 space-y-6">
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-700 dark:text-slate-300">Finished Sessions</span>
                  <span className="font-bold text-slate-900 dark:text-white">450</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div className="h-2.5 rounded-full bg-primary" style={{ width: "75%" }} />
                </div>
              </div>
              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="text-slate-700 dark:text-slate-300">Remaining Sessions</span>
                  <span className="font-bold text-slate-900 dark:text-white">150</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div className="h-2.5 rounded-full bg-slate-400 dark:bg-slate-500" style={{ width: "25%" }} />
                </div>
              </div>
              <p className="text-xs italic text-slate-500 dark:text-slate-400">Expected completion: December 15th, 2024</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-800/50">
          <h3 className="mb-4 text-sm font-medium text-slate-500 dark:text-slate-400">Student Attendance %</h3>
          <div className="relative h-48 w-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataAttendance}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={90}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  {dataAttendance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-slate-900 dark:text-white">92%</span>
              <span className="text-xs text-emerald-500">+3.1% this week</span>
            </div>
          </div>
          <p className="mt-4 max-w-[200px] text-xs text-slate-500 dark:text-slate-400">
            Average daily presence across all active batches
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="flex items-center gap-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/50">
          <div className="relative h-24 w-24 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataQuiz}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={40}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  {dataQuiz.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-slate-900 dark:text-white">68%</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium leading-tight text-slate-500 dark:text-slate-400">Quiz Pass Rate %</h4>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">Target: 75%</p>
          </div>
        </div>

        <div className="flex items-center gap-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/50">
          <div className="relative h-24 w-24 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataAssignment}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={40}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  {dataAssignment.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-slate-900 dark:text-white">84%</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium leading-tight text-slate-500 dark:text-slate-400">Assignment Submission %</h4>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">4,200/5,000 pending</p>
          </div>
        </div>

        <div className="flex items-center gap-6 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800/50">
          <div className="relative h-24 w-24 shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataChat}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={40}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  stroke="none"
                >
                  {dataChat.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-slate-900 dark:text-white">45%</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium leading-tight text-slate-500 dark:text-slate-400">Student Chat Participation</h4>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">High engagement in STEM</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/50">
        <div className="flex items-center justify-between border-b border-slate-200 p-6 dark:border-slate-700">
          <h3 className="font-bold text-slate-900 dark:text-white">Total Courses Summary</h3>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">12 Active Departments</span>
        </div>
        <div className="p-6">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="flex items-center gap-6">
              <div className="flex size-16 items-center justify-center rounded-xl bg-primary/20 text-primary">
                <span className="material-symbols-outlined text-4xl">inventory_2</span>
              </div>
              <div>
                <div className="text-4xl font-black text-slate-900 dark:text-white">142</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Accredited Courses Published</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                <p className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">Multiple Batches</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">82 Courses</p>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-100 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                <p className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400">Avg. Students/Course</p>
                <p className="text-lg font-bold text-slate-900 dark:text-white">87.6</p>
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="h-1.5 rounded-full bg-primary" />
            <div className="h-1.5 rounded-full bg-emerald-500" />
            <div className="h-1.5 rounded-full bg-amber-500" />
            <div className="h-1.5 rounded-full bg-indigo-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalDashboardOverview;
