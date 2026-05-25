interface Props {
  score: number;
}

function scoreTier(score: number): "high" | "mid" | "low" {
  if (score >= 80) return "high";
  if (score >= 50) return "mid";
  return "low";
}

export default function ScoreBar({ score }: Props) {
  const tier = scoreTier(score);

  return (
    <div className="score-wrapper">
      <div className="score-track">
        <div
          className={`score-fill score-fill--${tier}`}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className="score-value">{score}%</span>
    </div>
  );
}
