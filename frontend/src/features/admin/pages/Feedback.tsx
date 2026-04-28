import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Feedback: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Header Stats Section */}
      <div className="mb-8">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-black text-slate-100 sm:text-3xl">Compliments & Complaints</h1>
            <p className="text-slate-400 text-sm">Monitor campus sentiment and resolve student concerns in real-time.</p>
          </div>
          <div className="flex w-full gap-2 rounded-lg bg-slate-800 p-1 sm:w-auto">
            <Button variant="primary" size="sm" className="flex-1 sm:flex-none">All Time</Button>
            <Button variant="ghost" size="sm" className="flex-1 text-slate-400 hover:text-slate-100 sm:flex-none">
              Last 30 Days
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          <Card className="rounded-xl border-slate-800 bg-slate-800/40 p-4 text-slate-100 sm:p-6">
            <p className="text-slate-400 text-sm font-medium mb-1">Total Reports</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-100 sm:text-3xl">1,240</span>
              <span className="text-xs font-bold text-emerald-500 flex items-center">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> 12%
              </span>
            </div>
          </Card>
          <Card className="rounded-xl border-slate-800 bg-slate-800/40 p-4 text-slate-100 sm:p-6">
            <p className="text-slate-400 text-sm font-medium mb-1">Open Issues</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-100 sm:text-3xl">84</span>
              <span className="text-xs font-bold text-rose-500 flex items-center">
                <span className="material-symbols-outlined text-[14px]">trending_down</span> 5%
              </span>
            </div>
          </Card>
          <Card className="rounded-xl border-slate-800 bg-slate-800/40 p-4 text-slate-100 sm:p-6">
            <p className="text-slate-400 text-sm font-medium mb-1">Resolution Rate</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-100 sm:text-3xl">93.2%</span>
              <span className="text-xs font-bold text-emerald-500 flex items-center">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> 18%
              </span>
            </div>
          </Card>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-0">
        <TabsList
          variant="line"
          className="mb-6 w-full justify-start gap-6 overflow-x-auto border-b border-slate-800 bg-transparent p-0 pb-1 text-slate-400 custom-scrollbar sm:gap-8"
        >
          <TabsTrigger value="all" className="px-0 pb-4 text-sm font-bold text-slate-400 data-[state=active]:text-primary">
            All Feedback
          </TabsTrigger>
          <TabsTrigger
            value="complaints"
            className="px-0 pb-4 text-sm font-bold text-slate-400 data-[state=active]:text-primary"
          >
            Complaints
          </TabsTrigger>
          <TabsTrigger
            value="compliments"
            className="px-0 pb-4 text-sm font-bold text-slate-400 data-[state=active]:text-primary"
          >
            Compliments
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="m-0">
          <Card className="overflow-hidden rounded-xl border-slate-800 bg-slate-800/20 p-0">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full min-w-[860px] border-collapse text-left xl:min-w-[980px]">
          <thead>
            <tr className="bg-slate-800/50">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Complainant</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Batch</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">Description</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            <tr className="hover:bg-slate-800/30 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrRC2tc4jPhGq7F1Cqeocg7GHRmhviev0RLT70rWDkP8I5-sPEaNolmZ8uJnZqgOsn-PYLCQ2ofnoHKuOQcjr3AN97vK0HPWEn4v_bgnQfqJ582kh0YqaeHL7lempbp_9jGlfCV_vQhR37zuRzgMv0qOnopNQX_3E4cJg5acCy9JBDI5L1Yf6DvNpnJmAO3TbzCIkiyUc22AZUBK3zZDDqchDeU-ycQhi_BwHJ89jnFvKhowxdkZrz5Pf50cWYjIorz0KthvYZGs2X" alt="Sarah Jenkins" />
                  </div>
                  <span className="text-sm font-medium text-slate-100">Sarah Jenkins</span>
                </div>
              </td>
              <td className="px-6 py-4"><span className="text-sm text-slate-300">Computer Science - 2024</span></td>
              <td className="px-6 py-4"><p className="text-sm text-slate-400 line-clamp-1 max-w-md">The lab machines in Block C are frequently crashing during peak project hours.</p></td>
              <td className="px-6 py-4 text-right">
                <div className="inline-flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Pending</span>
                  <div className="w-10 h-5 bg-slate-700 rounded-full relative cursor-pointer border border-slate-600">
                    <div className="absolute left-0.5 top-0.5 w-3.5 h-3.5 bg-slate-400 rounded-full"></div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <button className="text-slate-500 hover:text-white"><span className="material-symbols-outlined">more_horiz</span></button>
              </td>
            </tr>
            <tr className="hover:bg-slate-800/30 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjsZKuwXa-iyZQibvUNUKecifnYazI-Kt8UiDOURvRHmm7_SpecvSdFuYLITTcQ9nk6uFjy4ZV2uGd9-rTzAGWldKFQLr2XZ5hGWO-fpkx8Y9tr-H1R2pOGhogu4i8lbMLOig7MLMxge0ylm40KQVpHsS65ks0k-Yz5oiyXZ2yuuSW9dnNojLInyhIobs-Kge2xb52xqYlKu8iwK-SoMUp3wK6YBoiE-jceyUnPcsbR3oLzTDgg-O8o7352ueyOY9oTSFrPNudIP-R" alt="David Chen" />
                  </div>
                  <span className="text-sm font-medium text-slate-100">David Chen</span>
                </div>
              </td>
              <td className="px-6 py-4"><span className="text-sm text-slate-300">Business Admin - 2023</span></td>
              <td className="px-6 py-4"><p className="text-sm text-slate-400 line-clamp-1 max-w-md">Requesting more vegetarian options in the main cafeteria area.</p></td>
              <td className="px-6 py-4 text-right">
                <div className="inline-flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-500 uppercase">Solved</span>
                  <div className="w-10 h-5 bg-emerald-500/20 rounded-full relative cursor-pointer border border-emerald-500/30">
                    <div className="absolute right-0.5 top-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <button className="text-slate-500 hover:text-white"><span className="material-symbols-outlined">more_horiz</span></button>
              </td>
            </tr>
            <tr className="hover:bg-slate-800/30 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuABFMbMLE8knIWT70rtMUwq37sUgk8S2J1hwE-KqsG8F4xdUSsHj5cIWN1jOrHdcRBalfLKRyZTaYjVpHI9QAoN5k2M1rRkIvkr_MNPIwAy97Rjo82iZCmzpbDbLtkSNQHD_1UEsof0EPesNKzvzgfIe3eADIvgXQ5P0-j-DCWiu9Q_mnM1lDT1L-S6LaIH1v67JPzxeTHunPOtJQu4Pv2a88KUnoYQ8_1_CqNGt4LLY65qsTei8VSqGVWmjpFoQKpi_prkoWxBBKlR" alt="Elena Rodriguez" />
                  </div>
                  <span className="text-sm font-medium text-slate-100">Elena Rodriguez</span>
                </div>
              </td>
              <td className="px-6 py-4"><span className="text-sm text-slate-300">Mechanical Eng - 2025</span></td>
              <td className="px-6 py-4"><p className="text-sm text-slate-400 line-clamp-1 max-w-md">Library heating is too high on the 3rd floor, difficult to concentrate.</p></td>
              <td className="px-6 py-4 text-right">
                <div className="inline-flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-500 uppercase">Solved</span>
                  <div className="w-10 h-5 bg-emerald-500/20 rounded-full relative cursor-pointer border border-emerald-500/30">
                    <div className="absolute right-0.5 top-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full"></div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <button className="text-slate-500 hover:text-white"><span className="material-symbols-outlined">more_horiz</span></button>
              </td>
            </tr>
            <tr className="hover:bg-slate-800/30 transition-colors group">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden">
                    <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADEmnqSQ0YwKygd9l6Q-b4hHWYiVty0Qbo-7pcXG3UMiPbIE72vP840qpihJ0ucu3NL12kkU944gAcu8yGwghRyGWO6-GG26wDOH_YXOFFGhxYEk6afMB_JOqRsVaqwCM5aNf88ZW6YSGO37Lrq8ay8EtPCZSXDo7p9N05HmroyNUIctMLf8duS8MBkpSpyq34kmUqo3FqjDDAy4ZIlNR7vZtX7jEHCRhcu-PPLTac1VJLhI1L0v1-0NXm2tZY4fij6gBapMg1vXDb" alt="Marcus Thorne" />
                  </div>
                  <span className="text-sm font-medium text-slate-100">Marcus Thorne</span>
                </div>
              </td>
              <td className="px-6 py-4"><span className="text-sm text-slate-300">Fine Arts - 2024</span></td>
              <td className="px-6 py-4"><p className="text-sm text-slate-400 line-clamp-1 max-w-md">Elevator in the dormitories (Building A) has been out of service for 3 days.</p></td>
              <td className="px-6 py-4 text-right">
                <div className="inline-flex items-center gap-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Pending</span>
                  <div className="w-10 h-5 bg-slate-700 rounded-full relative cursor-pointer border border-slate-600">
                    <div className="absolute left-0.5 top-0.5 w-3.5 h-3.5 bg-slate-400 rounded-full"></div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-center">
                <button className="text-slate-500 hover:text-white"><span className="material-symbols-outlined">more_horiz</span></button>
              </td>
            </tr>
          </tbody>
              </table>
            </div>
            <div className="flex flex-col gap-3 border-t border-slate-800 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-xs text-slate-500">Showing 1 to 4 of 1,240 entries</p>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" size="sm" className="bg-slate-800 text-slate-400 hover:text-white">Previous</Button>
            <Button variant="primary" size="sm">1</Button>
            <Button variant="secondary" size="sm" className="bg-slate-800 text-slate-400 hover:text-white">2</Button>
            <Button variant="secondary" size="sm" className="bg-slate-800 text-slate-400 hover:text-white">Next</Button>
          </div>
        </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Feedback;
