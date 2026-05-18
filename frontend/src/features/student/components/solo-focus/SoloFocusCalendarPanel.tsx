import { Save } from "lucide-react";

interface SoloFocusCalendarPanelProps {
  selectedDate: string;
  selectedDayPlan: string;
  onSelectedDateChange: (value: string) => void;
  onCalendarPlanChange: (value: string) => void;
}

const SoloFocusCalendarPanel = ({
  selectedDate,
  selectedDayPlan,
  onSelectedDateChange,
  onCalendarPlanChange,
}: SoloFocusCalendarPanelProps) => {
  return (
    <div>
      <label className="text-xs font-semibold text-slate-300">
        Choose date
      </label>

      <input
        type="date"
        value={selectedDate}
        onChange={(event) => onSelectedDateChange(event.target.value)}
        className="mt-2 w-full rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none focus:border-cyan-300"
      />

      <label className="mt-4 block text-xs font-semibold text-slate-300">
        Plan for this day
      </label>

      <textarea
        value={selectedDayPlan}
        onChange={(event) => onCalendarPlanChange(event.target.value)}
        placeholder="Example: Finish HTML lesson, revise CSS, solve quiz..."
        className="mt-2 min-h-[180px] w-full resize-none rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-6 text-white outline-none placeholder:text-slate-400 focus:border-cyan-300"
      />

      <div className="mt-4 flex items-center gap-2 text-xs text-slate-300">
        <Save className="size-4 text-cyan-300" />
        Plan saved automatically for {selectedDate}
      </div>
    </div>
  );
};

export default SoloFocusCalendarPanel;