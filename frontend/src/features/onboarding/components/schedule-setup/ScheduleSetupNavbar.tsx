import { Bell, CircleHelp, School } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const avatarUrl =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAYhaOW69FtvNYWj4yiOe9chM1ryRY_gTD4M3ziGhZNx-8KCp58hsm5KCKHGQ49kFWpD106PA1g1tpD_KQ1XGNQClf9PFAC8R4AGbQ1_ok_JFmiVgxL1prQ3FKv6qK-NjMA-HbSftscp_I0rdQaG2D55ZSoCiFGhtclY_Meen9b_DwNLMrb18TFhoHUDEvwA57hTYSndNKyKsTM4Zof6Brcf4eOC7TPLw8iKi3cWKkMGBSVjNV-s-hCsbdikMMuqMmliziERAVxFY0";

export function ScheduleSetupNavbar() {
  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-[#1f2937] bg-[#111827]/95 px-6 font-sans text-sm font-medium tracking-tight text-[#2563eb] shadow-lg backdrop-blur-md">
      <div className="flex items-center gap-2 text-xl font-semibold text-white">
        <School className="size-6 fill-[#2563eb] text-[#2563eb]" />
        <span>UniHub</span>
      </div>

      <div className="flex items-center gap-margin">
        <nav className="hidden items-center gap-stack-lg md:flex">
          <a className="text-[#9ca3af] transition-colors duration-200 hover:text-white" href="#">
            Dashboard
          </a>
          <a className="font-semibold text-[#3b82f6] transition-colors duration-200" href="#">
            My Courses
          </a>
          <a className="text-[#9ca3af] transition-colors duration-200 hover:text-white" href="#">
            Schedule
          </a>
        </nav>

        <div className="flex items-center gap-stack-md">
          <Button
            aria-label="Help"
            className="rounded-full p-2 text-[#9ca3af] hover:bg-[#1f2937]/50 hover:text-white"
            size="icon"
            variant="ghost"
          >
            <CircleHelp className="size-5" />
          </Button>
          <Button
            aria-label="Notifications"
            className="rounded-full p-2 text-[#9ca3af] hover:bg-[#1f2937]/50 hover:text-white"
            size="icon"
            variant="ghost"
          >
            <Bell className="size-5" />
          </Button>
          <Avatar className="border border-[#434655] bg-[#32343d]">
            <AvatarImage alt="User profile avatar" src={avatarUrl} />
          </Avatar>
        </div>
      </div>
    </header>
  );
}
