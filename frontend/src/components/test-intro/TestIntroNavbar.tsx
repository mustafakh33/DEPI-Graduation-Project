import { Bell, CircleHelp, School } from "lucide-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const avatarUrl =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCPWLXJTFarEvtSC1h6UXqhta8mXuHsHXszusBwykduVf-OLINUkgWPkZZS8gZG9NpPiSyLrCXM0Z_5Kfslb3frQKq6qbtV0lEnqOyfFef4oSz6cZ6bixxFa9trx5T_MIVwVk5fydR91SeFOtff-zZTwMl4ttbbiGf5g_iLGHtP2QzLQDWlp2oee1qZ4K4nIuYt4xbj59OIFVcdZil9IMWtUpJfa05-D-Tsa9cveUU8Yp8m8u0qNIfeHGQ2utEehuws8gw-dzY-DNI";

export function TestIntroNavbar() {
  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-[#1f2937] bg-[#111827]/95 px-6 font-sans text-sm font-medium tracking-tight text-[#9ca3af] shadow-lg backdrop-blur-md">
      <div className="flex items-center gap-2 text-xl font-semibold text-white">
        <School className="size-6 text-[#3b82f6]" />
        <span>UniHub</span>
      </div>

      <div className="hidden items-center gap-8 md:flex">
        <nav className="flex gap-6">
          <a className="text-[#9ca3af] transition-colors duration-200 hover:text-white" href="#">
            Dashboard
          </a>
          <a className="text-[#9ca3af] transition-colors duration-200 hover:text-white" href="#">
            My Courses
          </a>
          <a className="font-semibold text-[#3b82f6]" href="#">
            Placement Test
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-4">
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
        <Avatar className="border border-[#434655]">
          <AvatarImage alt="User profile avatar" src={avatarUrl} />
        </Avatar>
      </div>
    </header>
  );
}
