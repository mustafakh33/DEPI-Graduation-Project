import { ArrowRight, Network } from "lucide-react";

import { Card } from "@/components/ui/card";

export function TestStructure() {
  return (
    <Card className="relative col-span-12 overflow-hidden rounded-xl border border-[#434655] bg-[#282a32] p-stack-lg text-[#e1e2ed] shadow-none lg:col-span-8">
      <div className="absolute right-0 top-0 p-8 opacity-10">
        <Network className="size-[120px]" />
      </div>

      <h3 className="mb-6 font-h3 text-h3 text-[#e1e2ed]">Test Structure</h3>

      <div className="relative flex flex-col gap-6 md:flex-row">
        <div className="flex-1 rounded-lg border-l-4 border-[#2563eb] bg-[#32343d] p-6">
          <span className="mb-2 block font-label-sm text-label-sm text-[#2563eb]">
            PHASE 01
          </span>
          <h4 className="mb-3 font-label-md text-h3 text-[#e1e2ed]">
            Fundamentals
          </h4>
          <p className="font-body-sm text-body-sm text-[#c3c6d7]">
            Core syntax, logic puzzles, and basic problem solving architecture.
          </p>
        </div>

        <div className="hidden items-center md:flex">
          <ArrowRight className="size-6 text-[#8d90a0]" />
        </div>

        <div className="flex-1 rounded-lg border-l-4 border-[#ffb596] bg-[#32343d] p-6">
          <span className="mb-2 block font-label-sm text-label-sm text-[#ffb596]">
            PHASE 02
          </span>
          <h4 className="mb-3 font-label-md text-h3 text-[#e1e2ed]">
            Track Fundamentals
          </h4>
          <p className="font-body-sm text-body-sm text-[#c3c6d7]">
            Specific domain knowledge based on your selected learning track.
          </p>
        </div>
      </div>
    </Card>
  );
}
