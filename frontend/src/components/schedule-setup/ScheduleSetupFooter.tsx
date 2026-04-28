import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

type ScheduleSetupFooterProps = {
  canContinue: boolean;
  onBack: () => void;
  onContinue: () => void;
};

export function ScheduleSetupFooter({
  canContinue,
  onBack,
  onContinue,
}: ScheduleSetupFooterProps) {
  return (
    <footer className="fixed bottom-0 z-50 w-full border-t border-[#434655]/30 bg-[#0c0e16] px-margin py-stack-md">
      <div className="mx-auto flex max-w-container-max items-center justify-between gap-stack-md">
        <Button
          className="rounded-lg border border-[#434655] bg-transparent px-gutter py-stack-md font-label-md text-label-md text-[#e1e2ed] transition-all hover:bg-[#282a32] active:scale-95"
          onClick={onBack}
          type="button"
          variant="ghost"
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>

        <div className="flex items-center gap-stack-md">
          <span className="hidden text-label-sm text-[#c3c6d7] sm:inline">
            All changes are saved automatically
          </span>
          <Button
            className={cn(
              "rounded-lg bg-[#2563eb] px-stack-lg py-stack-md font-label-md text-label-md text-white shadow-lg shadow-[#2563eb]/20 transition-all disabled:cursor-not-allowed disabled:opacity-50",
              canContinue && "hover:bg-[#0053db] active:scale-95",
            )}
            disabled={!canContinue}
            onClick={onContinue}
            type="button"
          >
            Continue
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
