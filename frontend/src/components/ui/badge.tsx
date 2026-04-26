import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  active: "bg-emerald-50 text-emerald-700",
  published: "bg-emerald-50 text-emerald-700",
  resolved: "bg-emerald-50 text-emerald-700",
  finished: "bg-emerald-50 text-emerald-700",
  live: "bg-sky-50 text-sky-700",
  scheduled: "bg-sky-50 text-sky-700",
  invited: "bg-amber-50 text-amber-700",
  draft: "bg-slate-100 text-slate-700",
  reopened: "bg-orange-50 text-orange-700",
  in_progress: "bg-orange-50 text-orange-700",
  upcoming: "bg-violet-50 text-violet-700",
  flagged: "bg-rose-50 text-rose-700",
  inactive: "bg-slate-100 text-slate-700",
  closed: "bg-slate-100 text-slate-700",
};

export function Badge({ value }: { value: string }) {
  const key = value.toLowerCase().replace(/\s+/g, "_");
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize",
        tones[key] ?? "bg-secondary text-secondary-foreground",
      )}
    >
      {value.replace(/_/g, " ")}
    </span>
  );
}
