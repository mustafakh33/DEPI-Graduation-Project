type ScoreSectionProps = {
  score: number;
  total: number;
};

export function ScoreSection({ score, total }: ScoreSectionProps) {
  const percentage = total ? (score / total) * 100 : 0;

  return (
    <div className="mb-stack-lg w-full rounded-lg border border-[#434655]/20 bg-[#191b23] p-stack-md">
      <div className="mb-stack-sm flex items-end justify-between">
        <span className="font-label-md text-label-md text-[#e1e2ed]">
          Test Performance
        </span>
        <span className="font-h3 text-h3 text-[#b4c5ff]">
          {score}{" "}
          <span className="font-body-sm text-body-sm text-[#c3c6d7]">
            out of {total}
          </span>
        </span>
      </div>
      <div className="h-3 w-full overflow-hidden rounded-full bg-[#32343d]">
        <div
          className="h-full rounded-full bg-[#b4c5ff]"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
