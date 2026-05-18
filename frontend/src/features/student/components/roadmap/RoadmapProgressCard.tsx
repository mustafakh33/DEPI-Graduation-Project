interface RoadmapProgressCardProps {
  progressPercentage: number;
}

const RoadmapProgressCard = ({
  progressPercentage,
}: RoadmapProgressCardProps) => {
  return (
    <div className="w-full max-w-xs rounded-2xl border border-slate-800 bg-[#111827] p-4">
      <div className="flex items-center justify-between text-xs text-slate-400">
        <span>Current Progress</span>
        <span>{progressPercentage}%</span>
      </div>

      <div className="mt-3 h-2 rounded-full bg-slate-800">
        <div
          className="h-2 rounded-full bg-blue-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default RoadmapProgressCard;