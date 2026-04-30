import { UserPlus } from "lucide-react";

export function BatchAssignmentNote() {
  return (
    <div className="mb-stack-lg flex w-full items-start gap-4 rounded-xl border border-[#ac6300]/30 bg-[#ac6300]/10 p-stack-md">
      <div className="rounded-lg bg-[#ac6300] p-2">
        <UserPlus className="size-5 text-[#fffbff]" />
      </div>
      <div>
        <h4 className="mb-1 font-label-md text-label-md text-[#e1e2ed]">
          Batch Assignment
        </h4>
        <p className="font-body-sm text-body-sm text-[#c3c6d7]">
          You've been assigned to{" "}
          <span className="font-semibold text-[#ffb873]">Alpha-09</span>{" "}
          starting this Monday. Materials have been added to your vault.
        </p>
      </div>
    </div>
  );
}
