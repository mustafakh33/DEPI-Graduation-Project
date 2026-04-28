import { Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";

type TestIntroFooterProps = {
  onStart: () => void;
};

export function TestIntroFooter({ onStart }: TestIntroFooterProps) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#1f2937] bg-[#111827]/80 p-6 backdrop-blur-xl">
      <div className="mx-auto flex max-w-container-max items-center justify-between">
        <div className="hidden md:block">
          <p className="font-label-sm text-label-sm text-[#8d90a0]">
            READY TO BEGIN?
          </p>
          <p className="font-body-sm text-body-sm text-[#e1e2ed]">
            Clicking start implies agreement to the rules.
          </p>
        </div>

        <Button
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#2563eb] px-12 py-4 font-h3 text-h3 text-white shadow-lg shadow-blue-900/20 transition-all hover:bg-[#1d4ed8] active:scale-95 md:w-auto"
          onClick={onStart}
        >
          Start Test
          <Rocket className="size-6" />
        </Button>
      </div>
    </footer>
  );
}
