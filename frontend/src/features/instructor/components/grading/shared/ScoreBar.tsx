interface Props {
    score: number;
  }
  
  export default function ScoreBar({
    score,
  }: Props) {
    return (
      <div className="score-wrapper">
  
        <div className="score-track">
  
          <div
            className="score-fill"
            style={{
              width: `${score}%`,
            }}
          />
  
        </div>
  
        <span>{score}%</span>
  
      </div>
    );
  }