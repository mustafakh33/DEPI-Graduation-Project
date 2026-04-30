import { PartyPopper } from "lucide-react";

export function ResultHero() {
  return (
    <div className="relative flex h-32 items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/20 to-[#32343d]" />
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-2 flex size-16 items-center justify-center rounded-full bg-[#2563eb] shadow-lg">
          <PartyPopper className="size-8 text-white" />
        </div>
      </div>
    </div>
  );
}
