import { Bell, CircleHelp, School } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const avatarUrl =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDWNBsqXoc8IEOPaE3K1kvT6TN52rkKyPluy5EjB4iWxbcb7ny1SURDYf3IYcnMhjxa2obT8ncEBLv6C3BW7TlU7ECzfgpRhKvl7acuk14-RJm6OVctnVbRrcvT7JXeOU917y8Kk3o61gD7iB5EeHsA34tjA1G52ZrFra9DnAYkcH14zEw33kghjWof8X9BHnktvQXe_MxVAGAmBbiiw5WSzjPTMBY9zCxTQj-KbpAjHp0QtDW2fIRaBuXFvDbX4y-kpbKNI_LH5ko";

export function TrackSelectionNavbar() {
  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-[#1f2937] bg-[#111827]/95 px-6 shadow-lg backdrop-blur-md">
      <div className="flex items-center gap-2 text-xl font-semibold text-[#ffffff]">
        <School className="size-6 text-[#2563eb]" />
        <span>UniHub</span>
      </div>

      <div className="flex items-center gap-stack-md">
        <Button
          aria-label="Help"
          className="text-[#9ca3af] hover:text-[#ffffff] active:scale-95"
          size="icon"
          variant="ghost"
        >
          <CircleHelp className="size-6" />
        </Button>
        <Button
          aria-label="Notifications"
          className="text-[#9ca3af] hover:text-[#ffffff] active:scale-95"
          size="icon"
          variant="ghost"
        >
          <Bell className="size-6" />
        </Button>
        <Avatar className="border border-[#434655]">
          <AvatarImage
            alt="User profile avatar"
            src={avatarUrl}
          />
        </Avatar>
      </div>
    </header>
  );
}
