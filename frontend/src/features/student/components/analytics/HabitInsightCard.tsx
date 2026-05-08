interface HabitInsightCardProps {
  studyDays: string[];
}

const HabitInsightCard = ({ studyDays }: HabitInsightCardProps) => {
  const formattedDays =
    studyDays.length > 0 ? studyDays.join(", ") : "your selected study days";

  const dayLabel = studyDays.length === 1 ? "this day" : "these days";

  return (
    <section className="rounded-2xl border border-slate-800 bg-[#111827] p-6 shadow-sm">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Habit Insight
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Build a stronger study routine
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            You chose to study on{" "}
            <span className="font-semibold text-white">{formattedDays}</span>.
            I can help you use {dayLabel} better with tips for memorizing,
            understanding, reviewing, and splitting your study time.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
        >
          Get Study Tips
        </button>
      </div>
    </section>
  );
};

export default HabitInsightCard;