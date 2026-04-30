import { ArrowRight, Flag } from "lucide-react";

import { Button } from "@/components/ui/button";

type ActiveTestFooterProps = {
  canGoNext: boolean;
  isLastQuestion: boolean;
  onFlag: () => void;
  onNext: () => void;
  onSkip: () => void;
};

export function ActiveTestFooter({
  canGoNext,
  isLastQuestion,
  onFlag,
  onNext,
  onSkip,
}: ActiveTestFooterProps) {
  return (
    <footer className="fixed bottom-0 z-40 w-full border-t border-[#434655]/30 bg-[#0c0e16] px-gutter py-stack-md backdrop-blur-sm md:px-margin">
      <div className="mx-auto flex max-w-container-max items-center justify-between gap-stack-md">
        <Button
          className="flex items-center gap-2 rounded-lg border border-[#434655] bg-transparent px-gutter py-stack-sm text-[#e1e2ed] transition-colors hover:bg-[#282a32] active:scale-95"
          onClick={onFlag}
          type="button"
          variant="ghost"
        >
          <Flag className="size-4" />
          <span className="font-label-md text-label-md">Flag Question</span>
        </Button>

        <div className="flex items-center gap-stack-md">
          <Button
            className="rounded-lg px-gutter py-stack-sm font-label-md text-label-md text-[#c3c6d7] transition-colors hover:text-white"
            onClick={onSkip}
            type="button"
            variant="ghost"
          >
            Skip for now
          </Button>
          <Button
            className="flex items-center gap-2 rounded-lg bg-[#2563eb] px-stack-lg py-stack-sm font-label-md text-label-md text-white shadow-lg shadow-[#2563eb]/20 transition-all hover:bg-[#0053db] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!canGoNext}
            onClick={onNext}
          >
            {isLastQuestion ? "Submit Test" : "Next Question"}
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
