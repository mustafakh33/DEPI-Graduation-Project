import type { StudyHourDay } from "../../types/student.types";

interface WeeklyStudyHoursCardProps {
  studyHours: StudyHourDay[];
}

const WeeklyStudyHoursCard = ({ studyHours }: WeeklyStudyHoursCardProps) => {
  const maxHours = Math.max(...studyHours.map((item) => item.hours), 1);

  return (
    <section className="rounded-2xl border border-slate-800 bg-[#111827] p-6 shadow-sm">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
          This Week
        </p>

        <h2 className="mt-2 text-2xl font-bold text-white">
          Study Hours
        </h2>
      </div>

      <div className="mt-6 space-y-4">
        {studyHours.map((item) => {
          const width = Math.round((item.hours / maxHours) * 100);

          return (
            <div key={item.day} className="grid grid-cols-[48px_1fr_48px] items-center gap-3">
              <span className="text-sm font-semibold text-slate-400">
                {item.day}
              </span>

              <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-500"
                  style={{ width: `${width}%` }}
                />
              </div>

              <span className="text-right text-sm font-semibold text-white">
                {item.hours}h
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WeeklyStudyHoursCard;