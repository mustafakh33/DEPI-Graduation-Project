import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

type FinalWelcomeFooterProps = {
  onGoToDashboard: () => void;
};

export function FinalWelcomeFooter({ onGoToDashboard }: FinalWelcomeFooterProps) {
  return (
    <footer className="w-full pt-stack-lg">
      <Button
        className="mx-auto flex w-full items-center justify-center gap-unit rounded-lg !bg-[#2563eb] px-12 py-4 font-label-md text-body-lg !text-[#eeefff] shadow-sm transition-all hover:brightness-110 active:scale-95 md:w-auto"
        onClick={onGoToDashboard}
      >
        Enter Dashboard
        <ArrowRight className="size-5" />
      </Button>
      <p className="mt-stack-md font-label-sm text-label-sm text-[#8d90a0]">
        Need help?{" "}
        <a className="text-[#b4c5ff] hover:underline" href="#">
          Contact Student Support
        </a>
      </p>
    </footer>
  );
}
