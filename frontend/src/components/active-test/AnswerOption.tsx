import { CheckCircle2 } from "lucide-react";

import { cn } from "@/utils/cn";

type AnswerOptionProps = {
  id: string;
  isSelected: boolean;
  label: string;
  onSelect: (id: string) => void;
  value: string;
};

export function AnswerOption({
  id,
  isSelected,
  label,
  onSelect,
  value,
}: AnswerOptionProps) {
  return (
    <button
      aria-pressed={isSelected}
      className={cn(
        "group flex items-center rounded-xl p-stack-md text-left transition-all active:scale-[0.99]",
        isSelected
          ? "border-2 border-[#2563eb] bg-[#2563eb]/10 shadow-[0_0_12px_rgba(37,99,235,0.15)]"
          : "border border-[#434655] bg-[#1d1f27] hover:border-[#2563eb] hover:bg-[#282a32]",
      )}
      onClick={() => onSelect(id)}
      type="button"
    >
      <div
        className={cn(
          "mr-stack-md flex size-10 shrink-0 items-center justify-center rounded-lg font-label-md text-label-md transition-colors",
          isSelected
            ? "bg-[#2563eb] text-white"
            : "border border-[#434655] bg-[#32343d] text-[#c3c6d7] group-hover:bg-[#2563eb] group-hover:text-white",
        )}
      >
        {label}
      </div>

      {isSelected ? (
        <div className="flex flex-1 items-center justify-between">
          <span className="font-body-md text-body-md font-semibold text-[#e1e2ed]">
            {value}
          </span>
          <CheckCircle2 className="size-6 fill-[#2563eb] text-[#2563eb]" />
        </div>
      ) : (
        <span className="font-body-md text-body-md text-[#e1e2ed]">{value}</span>
      )}
    </button>
  );
}
