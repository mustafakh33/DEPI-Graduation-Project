import { CircleHelp, School, Timer } from "lucide-react";

import { Button } from "@/components/ui/button";

type ActiveTestHeaderProps = {
  currentQuestion: number;
  formattedTime: string;
  progressPercent: number;
  totalQuestions: number;
};

export function ActiveTestHeader({
  currentQuestion,
  formattedTime,
  progressPercent,
  totalQuestions,
}: ActiveTestHeaderProps) {
  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-[#1f2937] bg-[#111827]/95 px-6 font-sans text-sm font-medium tracking-tight text-white shadow-lg backdrop-blur-md">
      <div className="flex items-center gap-stack-md">
        <span className="flex items-center gap-2 text-xl font-semibold text-white">
          <School className="size-6 text-[#2563eb]" />
          UniHub
        </span>
        <div className="mx-2 h-6 w-px bg-[#434655]" />
        <span className="font-label-md text-label-md text-[#c3c6d7]">
          Question {currentQuestion} of {totalQuestions}
        </span>
      </div>

      <div className="hidden max-w-md flex-1 px-10 md:block">
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#32343d]">
          <div
            className="h-full rounded-full bg-[#2563eb] shadow-[0_0_8px_rgba(37,99,235,0.5)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-stack-md">
        <div className="flex items-center gap-2 rounded-lg border border-[#434655] bg-[#282a32] px-3 py-1.5">
          <Timer className="size-[18px] text-[#ffb596]" />
          <span className="font-label-md text-label-md text-[#ffb596]">
            {formattedTime}
          </span>
        </div>
        <Button
          aria-label="Help"
          className="rounded-full p-2 text-white hover:bg-[#1f2937]/50 active:scale-95"
          size="icon"
          variant="ghost"
        >
          <CircleHelp className="size-5" />
        </Button>
      </div>
    </header>
  );
}
