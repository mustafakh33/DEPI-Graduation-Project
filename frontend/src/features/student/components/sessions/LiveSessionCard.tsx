import type { UpcomingSession } from "../../types/student.types";

interface LiveSessionCardProps {
  session: UpcomingSession;
}

const getTimeLeft = (startsAt: string) => {
  const startTime = new Date(startsAt).getTime();
  const now = new Date().getTime();
  const difference = Math.max(startTime - now, 0);

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  const seconds = Math.floor((difference / 1000) % 60);

  return { days, hours, minutes, seconds };
};

const LiveSessionCard = ({ session }: LiveSessionCardProps) => {
  const timeLeft = getTimeLeft(session.startsAt);

  return (
    <section className="rounded-2xl border border-slate-800 bg-[#111827] p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-400">
            Upcoming Live Session
          </p>

          <h2 className="mt-2 text-xl font-bold text-white">
            {session.title}
          </h2>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            {session.description}
          </p>

          <p className="mt-3 text-xs font-medium text-slate-500">
            Duration: {session.durationMinutes} minutes
          </p>
        </div>

        <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-400">
          Live Soon
        </span>
      </div>

      <div className="mt-6 grid grid-cols-4 gap-3">
        {[
          { label: "Days", value: timeLeft.days },
          { label: "Hours", value: timeLeft.hours },
          { label: "Mins", value: timeLeft.minutes },
          { label: "Secs", value: timeLeft.seconds },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-slate-800 bg-slate-950/40 p-3 text-center"
          >
            <p className="text-2xl font-bold text-white">{item.value}</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          window.location.href = session.meetingUrl;
        }}
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-500"
      >
        Join Live
      </button>
    </section>
  );
};

export default LiveSessionCard;