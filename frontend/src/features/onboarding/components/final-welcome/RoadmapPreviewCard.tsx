import { Map } from "lucide-react";

import { Card } from "@/components/ui/card";

const roadmapImage =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD3j7y5x9g6DCJwszMZijzb11LgmVUJ1FXtLVYQJ3O9L2acpSaS7VMrlXCAo3JqHlavH4GIV6vOxh_AkIcDj_sg7oAzDG8KhRIrtAaOgnhSxYeXwYKUo3bJfRyJMzBYezt-x5jxfhz7pnqhcgwRLzkM3SBURx5L1QAkV-TEAmdsGfW6z5LhNkVGMJFzIs7-U55-eWODYVs2SCrmLbWIlh723Da3HPQ_jUxt02n-cPLYw9PMnkdIyLhNVsVP3ji9sRAQuC8cYR1DhCA";

export function RoadmapPreviewCard() {
  return (
    <Card className="group rounded-xl border border-[#434655]/10 !bg-[#282a32] p-stack-md shadow-md transition-colors hover:border-[#b4c5ff]/40">
      <div className="mb-stack-md flex items-center gap-stack-sm">
        <div className="flex size-10 items-center justify-center rounded-lg bg-[#2563eb]/10 text-[#b4c5ff]">
          <Map className="size-5" />
        </div>
        <h3 className="text-left font-h3 text-h3 text-[#e1e2ed]">Roadmap</h3>
      </div>

      <div className="relative h-32 overflow-hidden rounded-lg bg-[#1d1f27]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#b4c5ff]/10 to-transparent" />
        <img
          alt="Tech Roadmap"
          className="size-full object-cover opacity-40 mix-blend-overlay"
          src={roadmapImage}
        />
        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#434655]">
            <div className="h-full w-1/3 bg-[#b4c5ff]" />
          </div>
          <span className="text-left font-label-sm text-label-sm text-[#8d90a0]">
            32% Phase 1 Complete
          </span>
        </div>
      </div>

      <p className="mt-stack-md text-left font-body-sm text-body-sm text-[#c3c6d7]">
        Your personalized curriculum mapping 48 core modules and 12 elective
        projects.
      </p>
    </Card>
  );
}
