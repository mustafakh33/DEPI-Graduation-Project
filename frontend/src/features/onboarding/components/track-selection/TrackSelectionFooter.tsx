import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/cn";

type TrackSelectionFooterProps = {
  canContinue: boolean;
  onContinue: () => void;
};

export function TrackSelectionFooter({
  canContinue,
  onContinue,
}: TrackSelectionFooterProps) {
  return (
    <footer className="fixed bottom-0 z-50 w-full border-t border-[#434655] bg-[#191b23] p-gutter shadow-2xl">
      <div className="mx-auto flex w-full max-w-container-max justify-end">
        <Button
          className={cn(
            "w-full rounded-lg !bg-[#2563eb] px-stack-lg py-stack-sm font-label-md text-label-md !text-[#eeefff] transition-all disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto",
            canContinue && "hover:brightness-110 active:scale-95",
          )}
          disabled={!canContinue}
          onClick={onContinue}
          size="lg"
        >
          Continue
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </footer>
  );
}
