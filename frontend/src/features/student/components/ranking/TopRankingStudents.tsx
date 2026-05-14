import type { RankedStudent } from "../../types/student.types";

interface TopRankingStudentsProps {
  students: RankedStudent[];
}

const getPodiumStyle = (rank: number) => {
  if (rank === 1) {
    return {
      container: "order-1 md:order-2 md:-mt-8",
      avatar:
        "h-24 w-24 border-yellow-400 shadow-[0_0_35px_rgba(250,204,21,0.35)]",
      podium: "h-28 bg-slate-800",
      medal: "🏆",
    };
  }

  if (rank === 2) {
    return {
      container: "order-2 md:order-1",
      avatar: "h-20 w-20 border-slate-300",
      podium: "h-20 bg-slate-800/80",
      medal: "🥈",
    };
  }

  return {
    container: "order-3 md:order-3",
    avatar: "h-20 w-20 border-orange-400",
    podium: "h-16 bg-slate-800/70",
    medal: "🥉",
  };
};

const TopRankingStudents = ({ students }: TopRankingStudentsProps) => {
  return (
    <section className="rounded-2xl border border-slate-800 bg-[#111827] p-6 shadow-sm">
      <div className="flex flex-col items-end gap-6 md:flex-row md:items-end md:justify-center">
        {students.map((student) => {
          const style = getPodiumStyle(student.rank);

          return (
            <article
              key={student.id}
              className={`flex w-full flex-col items-center text-center md:w-48 ${style.container}`}
            >
              <div className="relative">
                <img
                  src={student.avatarUrl}
                  alt={student.name}
                  className={`rounded-full border-4 object-cover ${style.avatar}`}
                />

                <span className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-sm">
                  {style.medal}
                </span>
              </div>

              <h3 className="mt-3 text-sm font-bold text-white">
                {student.name}
              </h3>

              <p className="mt-1 text-xs font-semibold text-blue-400">
                Rank #{student.rank}
              </p>

              <p className="mt-1 text-xs font-semibold text-yellow-400">
                🟠 {student.coins.toLocaleString()} coins
              </p>

              <div
                className={`mt-4 flex w-full items-center justify-center rounded-t-2xl border border-slate-700 ${style.podium}`}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  #{student.rank}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default TopRankingStudents;