import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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

const shellCard = "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800/50";

export interface PortalDashboardOverviewProps {
  welcomeName: string;
}

/**
 * Same layout, colors, and blocks as the Uni Hub admin dashboard reference (dark + cards + charts).
 */
const PortalDashboardOverview: React.FC<PortalDashboardOverviewProps> = ({ welcomeName }) => {
  return (
    <div className="space-y-6 md:space-y-8">
      <header className="mb-6 md:mb-8">
        <h2 className="text-2xl font-black tracking-tight text-slate-900 text-white sm:text-3xl">Dashboard Overview</h2>
        <p className="mt-1 text-slate-500 dark:text-slate-400">
          Welcome back, {welcomeName}. Here is an overview of the university&apos;s performance today.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
        <Card className={shellCard}>
          <CardContent className="p-4 sm:p-6">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Students</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">12,450</span>
              <Badge variant="outline" className="border-emerald-500/30 bg-transparent px-1.5 py-0 text-xs font-bold text-emerald-500">
                +2.4%
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card className={shellCard}>
          <CardContent className="p-4 sm:p-6">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Instructors</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">452</span>
              <Badge variant="outline" className="border-emerald-500/30 bg-transparent px-1.5 py-0 text-xs font-bold text-emerald-500">
                +12
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card className={shellCard}>
          <CardContent className="p-4 sm:p-6">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Mentors</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">120</span>
              <Badge variant="outline" className="border-slate-400/40 bg-transparent px-1.5 py-0 text-xs font-bold text-slate-500">
                Stable
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card className={shellCard}>
          <CardContent className="p-4 sm:p-6">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Batches</p>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900 dark:text-white sm:text-3xl">85</span>
              <Badge variant="outline" className="border-primary/40 bg-transparent px-1.5 py-0 text-xs font-bold text-primary">
                In 12 Departments
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
        <Card className={`relative lg:col-span-2 ${shellCard}`}>
          <CardHeader className="flex flex-col gap-4 space-y-0 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle className="text-lg text-slate-900 dark:text-white">Total Sessions Progress</CardTitle>
              <CardDescription>Academic Year 2024 - Semester 1</CardDescription>
            </div>
            <Badge
              variant="outline"
              className="w-fit shrink-0 border-primary/30 bg-primary/10 px-3 py-1 font-bold text-primary"
            >
              On Schedule
            </Badge>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
              <div className="relative h-32 w-32 shrink-0 sm:h-40 sm:w-40">
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
                  <span className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">75%</span>
                  <span className="text-[10px] uppercase text-slate-500 dark:text-slate-500">Done</span>
                </div>
              </div>

              <div className="w-full flex-1 space-y-4 sm:space-y-6">
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-700 dark:text-slate-300">Finished Sessions</span>
                    <span className="font-bold text-slate-900 dark:text-white">450</span>
                  </div>
                  <Progress
                    value={75}
                    className="h-2.5 bg-slate-200 dark:bg-slate-700 **:data-[slot=progress-indicator]:bg-primary"
                  />
                </div>
                <div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="text-slate-700 dark:text-slate-300">Remaining Sessions</span>
                    <span className="font-bold text-slate-900 dark:text-white">150</span>
                  </div>
                  <Progress
                    value={25}
                    className="h-2.5 bg-slate-200 dark:bg-slate-700 **:data-[slot=progress-indicator]:bg-slate-400 dark:**:data-[slot=progress-indicator]:bg-slate-500"
                  />
                </div>
                <p className="text-xs italic text-slate-500 dark:text-slate-400">Expected completion: December 15th, 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className={`flex flex-col items-center justify-center text-center ${shellCard}`}>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">Student Attendance %</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center px-4 pb-4 sm:pb-6">
            <div className="relative h-40 w-40 sm:h-48 sm:w-48">
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
                <span className="text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">92%</span>
                <span className="text-xs text-emerald-500">+3.1% this week</span>
              </div>
            </div>
            <p className="mt-4 max-w-[200px] text-xs text-slate-500 dark:text-slate-400">
              Average daily presence across all active batches
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        <Card className={shellCard}>
          <CardContent className="flex items-center gap-4 p-4 sm:gap-6 sm:p-6">
            <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24">
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
                <span className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">68%</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium leading-tight text-slate-500 dark:text-slate-400">Quiz Pass Rate %</h4>
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">Target: 75%</p>
            </div>
          </CardContent>
        </Card>

        <Card className={shellCard}>
          <CardContent className="flex items-center gap-4 p-4 sm:gap-6 sm:p-6">
            <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24">
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
                <span className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">84%</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium leading-tight text-slate-500 dark:text-slate-400">Assignment Submission %</h4>
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">4,200/5,000 pending</p>
            </div>
          </CardContent>
        </Card>

        <Card className={shellCard}>
          <CardContent className="flex items-center gap-4 p-4 sm:gap-6 sm:p-6">
            <div className="relative h-20 w-20 shrink-0 sm:h-24 sm:w-24">
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
                <span className="text-base font-bold text-slate-900 dark:text-white sm:text-lg">45%</span>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium leading-tight text-slate-500 dark:text-slate-400">Student Chat Participation</h4>
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">High engagement in STEM</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className={`overflow-hidden p-0 ${shellCard}`}>
        <CardHeader className="flex flex-col items-start justify-between gap-2 border-b border-slate-200 sm:flex-row sm:items-center dark:border-slate-700">
          <CardTitle className="text-base text-slate-900 dark:text-white">Total Courses Summary</CardTitle>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">12 Active Departments</span>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex size-14 items-center justify-center rounded-xl bg-primary/20 text-primary sm:size-16">
                <span className="material-symbols-outlined text-3xl sm:text-4xl">inventory_2</span>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900 dark:text-white sm:text-4xl">142</div>
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
          <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-8 sm:gap-4 md:grid-cols-4">
            <Progress value={100} className="h-1.5 bg-slate-200 dark:bg-slate-700 **:data-[slot=progress-indicator]:bg-primary" />
            <Progress value={100} className="h-1.5 bg-slate-200 dark:bg-slate-700 **:data-[slot=progress-indicator]:bg-emerald-500" />
            <Progress value={100} className="h-1.5 bg-slate-200 dark:bg-slate-700 **:data-[slot=progress-indicator]:bg-amber-500" />
            <Progress value={100} className="h-1.5 bg-slate-200 dark:bg-slate-700 **:data-[slot=progress-indicator]:bg-indigo-400" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortalDashboardOverview;
