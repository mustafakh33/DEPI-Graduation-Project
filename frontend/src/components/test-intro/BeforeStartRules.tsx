import { CheckCircle2, ListChecks } from "lucide-react";

import { GlassCard } from "@/components/test-intro/GlassCard";

const rules = [
  "Ensure a stable internet connection for the duration of the test.",
  "The timer starts as soon as you click the button below.",
  "You cannot pause the test once it has commenced.",
  "The system will auto-submit your answers if time expires.",
];

export function BeforeStartRules() {
  return (
    <GlassCard className="col-span-12 rounded-xl p-stack-lg lg:col-span-7">
      <div className="mb-6 flex items-center gap-3">
        <ListChecks className="size-6 text-[#ffb596]" />
        <h3 className="font-h3 text-h3 text-[#e1e2ed]">Before You Start</h3>
      </div>

      <ul className="space-y-4">
        {rules.map((rule) => (
          <li className="flex gap-4" key={rule}>
            <CheckCircle2 className="size-6 shrink-0 text-[#2563eb]" />
            <span className="font-body-md text-body-md text-[#e1e2ed]">
              {rule}
            </span>
          </li>
        ))}
      </ul>
    </GlassCard>
  );
}
