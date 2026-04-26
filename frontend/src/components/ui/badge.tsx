import { cn } from "@/lib/utils";

const tones: Record<string, string> = {
  active: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20",
  published: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20",
  resolved: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20",
  finished: "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/20",
  live: "bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/20",
  scheduled: "bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/20",
  invited: "bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/20",
  draft: "bg-slate-500/15 text-slate-300 ring-1 ring-slate-400/20",
  reopened: "bg-orange-500/15 text-orange-300 ring-1 ring-orange-400/20",
  in_progress: "bg-orange-500/15 text-orange-300 ring-1 ring-orange-400/20",
  upcoming: "bg-violet-500/15 text-violet-300 ring-1 ring-violet-400/20",
  flagged: "bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/20",
  inactive: "bg-slate-500/15 text-slate-300 ring-1 ring-slate-400/20",
  closed: "bg-slate-500/15 text-slate-300 ring-1 ring-slate-400/20",
};

export function Badge({ value }: { value: string }) {
  const key = value.toLowerCase().replace(/\s+/g, "_");
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize",
        tones[key] ?? "bg-secondary text-secondary-foreground ring-1 ring-border",
      )}
    >
      {value.replace(/_/g, " ")}
    </span>
  );
}
