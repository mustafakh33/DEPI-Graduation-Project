import React from "react";

const Sessions: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Lecture Sessions Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-black text-slate-100 tracking-tight">Lecture Sessions</h3>
            <p className="text-slate-400 text-sm">Overview of current week's academic lectures</p>
          </div>
          <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-all">
            <span className="material-symbols-outlined text-sm">add</span>
            Add Session
          </button>
        </div>

        <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
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
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    Finished
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:underline text-xs font-bold flex items-center justify-end gap-1 ml-auto">
                    <span className="material-symbols-outlined text-sm">videocam</span> Record
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-300">Lec 05 / Week 3</td>
                <td className="px-6 py-4 text-sm text-slate-400">B-2023-CS</td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-100">Algorithms</td>
                <td className="px-6 py-4 text-sm text-slate-400">Prof. Alan Jones</td>
                <td className="px-6 py-4 text-sm text-slate-400">Oct 26, 02:00 PM</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    Not Finished
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-100 bg-primary/20 hover:bg-primary/30 px-3 py-1 rounded text-xs font-bold transition-colors inline-flex items-center gap-1 ml-auto">
                    <span className="material-symbols-outlined text-sm">sensors</span> Join Live
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-300">Lec 01 / Week 1</td>
                <td className="px-6 py-4 text-sm text-slate-400">B-2024-DS</td>
                <td className="px-6 py-4 text-sm font-semibold text-slate-100">Intro to UI Design</td>
                <td className="px-6 py-4 text-sm text-slate-400">Sarah Lee</td>
                <td className="px-6 py-4 text-sm text-slate-400">Oct 27, 09:00 AM</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    Not Finished
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-100 bg-primary/20 hover:bg-primary/30 px-3 py-1 rounded text-xs font-bold transition-colors inline-flex items-center gap-1 ml-auto">
                    <span className="material-symbols-outlined text-sm">sensors</span> Join Live
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Mentor Sessions Section */}
      <section>
        <div className="mb-6">
          <h3 className="text-2xl font-black text-slate-100 tracking-tight">Mentor Sessions</h3>
          <p className="text-slate-400 text-sm">Upcoming and past mentorship appointments</p>
        </div>
        <div className="bg-slate-900/50 rounded-xl border border-slate-800 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
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
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">MK</div>
                  <span className="text-sm font-semibold text-slate-100">Marcus King</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">B-2023-CS</td>
                <td className="px-6 py-4 text-sm text-slate-300">Project Review</td>
                <td className="px-6 py-4 text-sm text-slate-400">Today, 4:00 PM</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    Upcoming
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-xs font-bold bg-primary text-white px-3 py-1.5 rounded hover:bg-primary/90 transition-all">
                    Join Meeting
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="size-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold text-xs">JR</div>
                  <span className="text-sm font-semibold text-slate-100">Jessica Reed</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">B-2024-DS</td>
                <td className="px-6 py-4 text-sm text-slate-300">Career Guidance</td>
                <td className="px-6 py-4 text-sm text-slate-400">Oct 23, 11:30 AM</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:underline text-xs font-bold flex items-center justify-end gap-1 ml-auto">
                    <span className="material-symbols-outlined text-sm">link</span> Session Note
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="size-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 font-bold text-xs">DM</div>
                  <span className="text-sm font-semibold text-slate-100">David Miller</span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-400">B-2023-CS</td>
                <td className="px-6 py-4 text-sm text-slate-300">Technical Doubt</td>
                <td className="px-6 py-4 text-sm text-slate-400">Oct 22, 01:00 PM</td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    Completed
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:underline text-xs font-bold flex items-center justify-end gap-1 ml-auto">
                    <span className="material-symbols-outlined text-sm">videocam</span> Watch
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Sessions;
