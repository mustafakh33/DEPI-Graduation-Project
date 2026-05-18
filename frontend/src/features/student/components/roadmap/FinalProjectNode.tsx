const FinalProjectNode = () => {
  return (
    <div className="relative flex justify-center pt-4">
      <div className="w-full max-w-[240px] rounded-2xl border border-slate-700 bg-slate-900/60 px-4 py-5 text-center opacity-80">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 text-2xl text-slate-300">
          🔒
        </div>

        <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Locked
        </p>

        <h3 className="mt-2 text-sm font-semibold text-slate-200">
          Final Project
        </h3>

        <p className="mt-2 text-xs leading-5 text-slate-400">
          Unlocks at the end of the term after all roadmap lessons are
          completed.
        </p>
      </div>
    </div>
  );
};

export default FinalProjectNode;