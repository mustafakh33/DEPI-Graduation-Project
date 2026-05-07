import type { RecordedSession } from "../../types/student.types";

interface RecordedSessionCardProps {
  recording: RecordedSession;
}

const RecordedSessionCard = ({ recording }: RecordedSessionCardProps) => {
  const recordedDate = new Date(recording.recordedAt).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#111827] shadow-sm">
      <div className="h-32 shrink-0 bg-slate-900">
        <img
          src={recording.thumbnailUrl}
          alt={recording.title}
          className="h-full w-full object-cover opacity-80"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
          {recording.moduleTitle}
        </p>

        <h3 className="mt-2 min-h-[56px] text-lg font-bold leading-7 text-white">
          {recording.title}
        </h3>

        <p className="mt-2 min-h-[72px] text-sm leading-6 text-slate-400">
          {recording.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-500">
          <span>{recording.durationMinutes} min</span>
          <span>•</span>
          <span>{recordedDate}</span>
        </div>

        <button
          type="button"
          onClick={() => {
            window.location.href = recording.materialPath;
          }}
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-blue-500 hover:text-blue-400"
        >
          View Session
        </button>
      </div>
    </article>
  );
};

export default RecordedSessionCard;