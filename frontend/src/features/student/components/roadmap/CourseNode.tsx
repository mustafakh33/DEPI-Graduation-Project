import type { RoadmapLesson } from "../../types/student.types";

interface CourseNodeProps {
  lesson: RoadmapLesson;
  index: number;
}

const CourseNode = ({ lesson, index }: CourseNodeProps) => {
  const isLeft = index % 2 === 0;
  const isCompleted = lesson.status === "completed";
  const isActive = lesson.status === "active";
  const isLocked = lesson.status === "locked";

  const circleContent = isCompleted ? "✓" : isActive ? "▶" : "🔒";

  const circleClassName = isCompleted
    ? "border-blue-500 bg-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.35)]"
    : isActive
      ? "border-blue-500 bg-blue-500 text-white shadow-[0_0_25px_rgba(59,130,246,0.45)]"
      : "border-slate-700 bg-slate-900 text-slate-400";

  const cardClassName = isLocked
    ? "border-slate-800 bg-slate-900/50 opacity-55"
    : "border-slate-800 bg-[#111827] shadow-sm";

  return (
    <div className="relative grid grid-cols-1 gap-4 md:grid-cols-[1fr_72px_1fr] md:items-center">
      {/* left side */}
      <div className="hidden md:block">
        {isLeft ? (
          <div className={`ml-auto w-[220px] rounded-2xl border px-4 py-3 ${cardClassName}`}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400">
              Lesson {index + 1}
            </p>
            <h3 className="mt-2 text-sm font-semibold text-white">{lesson.title}</h3>
            <p className="mt-1 text-xs leading-5 text-slate-400">{lesson.description}</p>
          </div>
        ) : null}
      </div>

      {/* center circle */}
      <div className="relative flex items-center justify-center">
        <div
          className={`z-10 flex h-14 w-14 items-center justify-center rounded-full border-4 text-lg font-bold transition ${circleClassName}`}
        >
          {circleContent}
        </div>
      </div>

      {/* right side */}
      <div className="hidden md:block">
        {!isLeft ? (
          <div className={`w-[220px] rounded-2xl border px-4 py-3 ${cardClassName}`}>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400">
              Lesson {index + 1}
            </p>
            <h3 className="mt-2 text-sm font-semibold text-white">{lesson.title}</h3>
            <p className="mt-1 text-xs leading-5 text-slate-400">{lesson.description}</p>
          </div>
        ) : null}
      </div>

      {/* mobile card */}
      <div className="md:hidden">
        <div className={`rounded-2xl border px-4 py-3 ${cardClassName}`}>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-400">
            Lesson {index + 1}
          </p>
          <h3 className="mt-2 text-sm font-semibold text-white">{lesson.title}</h3>
          <p className="mt-1 text-xs leading-5 text-slate-400">{lesson.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CourseNode;