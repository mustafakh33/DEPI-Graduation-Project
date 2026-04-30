import { cn } from "@/utils/cn";

const placements = [
  {
    label: "Beginner",
    modules: "Modules 1-4",
    dot: "bg-[#c3c6d7]",
    border: "border-[#434655]/30",
  },
  {
    label: "Intermediate",
    modules: "Modules 5-9",
    dot: "bg-[#2563eb]",
    border: "border-[#2563eb]/30",
  },
  {
    label: "Advanced",
    modules: "Modules 10+",
    dot: "bg-[#ffb596]",
    border: "border-[#ffb596]/30",
  },
];

export function PlacementPreview() {
  return (
    <div className="col-span-12 flex flex-col gap-4 lg:col-span-5">
      <h3 className="font-label-md text-label-md uppercase tracking-wider text-[#8d90a0]">
        Potential Placement
      </h3>

      <div className="grid flex-1 grid-cols-1 gap-3">
        {placements.map(({ border, dot, label, modules }) => (
          <div
            className={cn(
              "flex items-center justify-between rounded-lg bg-[#191b23] p-4",
              "border",
              border,
            )}
            key={label}
          >
            <div className="flex items-center gap-3">
              <div className={cn("size-2 rounded-full", dot)} />
              <span className="font-label-md text-label-md text-[#e1e2ed]">
                {label}
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-[#8d90a0]">
              {modules}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
