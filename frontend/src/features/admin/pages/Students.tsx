import React, { useState } from "react";

const Students: React.FC = () => {
  const [filter, setFilter] = useState("All Students");

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight">Student Performance Directory</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Comprehensive overview of academic rankings and engagement metrics across all batches.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-lg">download</span>
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined text-lg">add</span>
            Add Student
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-card p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Students</p>
          <h3 className="text-2xl font-bold mt-1">1,284</h3>
          <div className="flex items-center gap-1 text-emerald-500 text-xs mt-2">
            <span className="material-symbols-outlined text-sm">trending_up</span>
            <span>12% from last month</span>
          </div>
        </div>
        <div className="bg-white dark:bg-card p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Avg. Attendance</p>
          <h3 className="text-2xl font-bold mt-1">88.4%</h3>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-3">
            <div className="bg-primary h-full rounded-full" style={{ width: "88.4%" }}></div>
          </div>
        </div>
        <div className="bg-white dark:bg-card p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Pass Rate</p>
          <h3 className="text-2xl font-bold mt-1">92.1%</h3>
          <div className="flex items-center gap-1 text-emerald-500 text-xs mt-2">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <span>Healthy target achieved</span>
          </div>
        </div>
        <div className="bg-white dark:bg-card p-6 rounded-xl border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Total Coins</p>
          <h3 className="text-2xl font-bold mt-1">45.2k</h3>
          <div className="flex items-center gap-1 text-amber-500 text-xs mt-2">
            <span className="material-symbols-outlined text-sm">stars</span>
            <span>Engagement high</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6 overflow-x-auto pb-2 custom-scrollbar">
        {["All Students", "Top Performers", "At Risk", "Graduating Class"].map((f) => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              filter === f 
                ? "bg-primary text-white" 
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {f}
          </button>
        ))}
        
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Sort by:</span>
          <select className="bg-transparent border-none text-sm font-semibold text-primary focus:ring-0 cursor-pointer outline-none">
            <option>Rank (Highest First)</option>
            <option>Name (A-Z)</option>
            <option>Recent Activity</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white dark:bg-card rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">
                <th className="px-6 py-4">Rank</th>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Batches</th>
                <th className="px-6 py-4">Hours</th>
                <th className="px-6 py-4">Coins</th>
                <th className="px-6 py-4">Attendance</th>
                <th className="px-6 py-4">Quiz Pass</th>
                <th className="px-6 py-4">Assignment</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                <td className="px-6 py-4">
                  <div className="size-8 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 flex items-center justify-center font-bold text-sm">1</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqRQdJ6C5TRmAESdW_4ryhtYJmacn-QYDqiFl76RHlQvnqGmXz1vCgGpfVCt3X0QYi5LtWT7044rtul9uoOyxPjnvK1ITPb6KnUXiabydcnTvUDjRfs4n3u7mQ9NI8d2btcf2ZvZdsJKBxDZFnzFhvpHq4NcVQXjznPL2MMiQqV7xKEddxiqvAJiQAFrwBuNkJAyY6jz3eHko114Woa3aUOcUgjCWo5ue-d9DPH0XxZKGaYULXitSs4BwD6Ji-IjJ5qs_qbPME9ysf" alt="John Doe" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Johnathan Doe</p>
                      <p className="text-xs text-slate-500">john.doe@uni.edu</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-bold">B-24</span>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-bold">CS-01</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">1,240h</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm font-semibold text-amber-500">
                    <span className="material-symbols-outlined text-base">stars</span>
                    4,850
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: "98%" }}></div>
                    </div>
                    <span className="text-xs font-semibold">98%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: "95%" }}></div>
                    </div>
                    <span className="text-xs font-semibold">95%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: "100%" }}></div>
                    </div>
                    <span className="text-xs font-semibold">100%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500">Active</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <button className="px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/10 rounded transition-colors opacity-0 group-hover:opacity-100">View Details</button>
                    <button className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                <td className="px-6 py-4">
                  <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center font-bold text-sm">2</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoNk1cPw9xz7uBk8ig78QuLHv5f0uGu_T_wTF1MsJ_eSLa4iiLgqmiquHsZbiJQgBQCAY01jDJHURXYWh7Z1Qx0WkzzEOuRwGOGEV2Tie-z_tr2YIESm_stbwJW0Bd96zXe8sSLYEd3NQHWGEHWDq9fykjabcw1PeoyoYw_zCMdH5r3scvVVVRZrzaQal5OIfAd_GNfhf-1-LihlPG9-rl6hryg6VWczVZUodQSvl6n91Mc-EwZKeGT9mly5-_3KkJ9nK3AHtkGG2D" alt="Alice Smith" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Alice Smith</p>
                      <p className="text-xs text-slate-500">a.smith@uni.edu</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-bold">B-24</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">1,120h</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm font-semibold text-amber-500">
                    <span className="material-symbols-outlined text-base">stars</span>
                    4,210
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: "92%" }}></div>
                    </div>
                    <span className="text-xs font-semibold">92%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: "90%" }}></div>
                    </div>
                    <span className="text-xs font-semibold">90%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: "94%" }}></div>
                    </div>
                    <span className="text-xs font-semibold">94%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-500">Active</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <button className="px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/10 rounded transition-colors opacity-0 group-hover:opacity-100">View Details</button>
                    <button className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </div>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors group">
                <td className="px-6 py-4">
                  <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center font-bold text-sm">45</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 overflow-hidden grayscale">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRM47TvdUx2iQkbMVGK7jd0PSyyx9BLDVhzPKxtDThNuTkpRL1YyuJYurU17hgvGa21huY7IaAIDcDpeBl7BgnGF_nFvZu8xvBaapHzonzwNy4mEykEwOX-94o98QzuKh-owKP7dMD2_yBcw2EtxhEvlmuK6XQCrU4wD6vCN3NLDkSCRTOamIOpq787_-VsNBjDJTzXpd9OQ3aGs-XF8jlU5vB6bDPVvThdBxdjL0U5F1-CjkhTJ2j6nhUL8xQvzlzUCMqwzzItYdf" alt="Robert Brown" className="w-full h-full object-cover opacity-60" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm opacity-60">Robert Brown</p>
                      <p className="text-xs text-slate-500">r.brown@uni.edu</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-bold opacity-60">B-23</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium opacity-60">450h</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-sm font-semibold text-slate-400">
                    <span className="material-symbols-outlined text-base">stars</span>
                    1,150
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full" style={{ width: "45%" }}></div>
                    </div>
                    <span className="text-xs font-semibold opacity-60">45%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-slate-400 h-full" style={{ width: "40%" }}></div>
                    </div>
                    <span className="text-xs font-semibold opacity-60">40%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-100 dark:bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div className="bg-slate-400 h-full" style={{ width: "50%" }}></div>
                    </div>
                    <span className="text-xs font-semibold opacity-60">50%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500">Inactive</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 justify-end">
                    <button className="px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary/10 rounded transition-colors opacity-0 group-hover:opacity-100">View Details</button>
                    <button className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-slate-100">
                      <span className="material-symbols-outlined">more_vert</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showing <span className="font-bold text-slate-900 dark:text-slate-100">1 to 3</span> of <span className="font-bold text-slate-900 dark:text-slate-100">1,284</span> results
          </p>
          <div className="flex gap-2">
            <button className="p-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 transition-colors" disabled>
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <div className="flex items-center px-2 text-xs font-bold">Page 1 of 257</div>
            <button className="p-1 border border-slate-200 dark:border-slate-700 rounded hover:bg-white dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
