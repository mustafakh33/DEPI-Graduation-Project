import type { RankedStudent } from "../../types/student.types";

interface RankingTableProps {
  students: RankedStudent[];
}

const RankingTable = ({ students }: RankingTableProps) => {
  return (
    <section className="rounded-2xl border border-slate-800 bg-[#111827] p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Top Contributors
          </p>

          <h2 className="mt-2 text-xl font-bold text-white">
            Student Ranking List
          </h2>
        </div>

        <p className="text-xs text-slate-500">Updated every few hours</p>
      </div>

      <div className="max-h-[360px] overflow-y-auto pr-1">
        <div className="min-w-[640px]">
          <div className="grid grid-cols-[80px_1fr_130px_140px] border-b border-slate-800 px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            <span>Rank</span>
            <span>Student</span>
            <span>Status</span>
            <span className="text-right">Coins</span>
          </div>

          <div className="divide-y divide-slate-800">
            {students.map((student) => {
              const isCurrentStudent = Boolean(student.isCurrentStudent);

              return (
                <div
                  key={student.id}
                  className={`grid grid-cols-[80px_1fr_130px_140px] items-center px-4 py-4 text-sm transition ${
                    isCurrentStudent
                      ? "rounded-xl bg-blue-600/20 text-white"
                      : "text-slate-300 hover:bg-slate-800/40"
                  }`}
                >
                  <span className="font-bold text-blue-400">
                    #{student.rank}
                  </span>

                  <div className="flex items-center gap-3">
                    <img
                      src={student.avatarUrl}
                      alt={student.name}
                      className="h-10 w-10 rounded-full border border-slate-700 object-cover"
                    />

                    <div>
                      <p className="font-semibold text-white">
                        {student.name}
                        {isCurrentStudent ? " (You)" : ""}
                      </p>
                      <p className="text-xs text-slate-500">
                        {student.groupName}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-semibold ${
                      student.status === "rising"
                        ? "text-emerald-400"
                        : "text-slate-400"
                    }`}
                  >
                    {student.status === "rising" ? "↗ Rising" : "— Stable"}
                  </span>

                  <span className="text-right font-semibold text-yellow-400">
                    🟠 {student.coins.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RankingTable;