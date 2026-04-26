import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f4f7fb]">
      <Sidebar />
      <div className="min-w-0 flex-1">
        <div className="mx-auto max-w-[1680px] p-4 sm:p-6 xl:p-8">
          <Topbar />
          <main className="mt-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
