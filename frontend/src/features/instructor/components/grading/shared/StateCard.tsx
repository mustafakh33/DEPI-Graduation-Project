interface Props {
    title: string;
  
    value: string;
  
    extra?: string;
  }
  
  export default function StatCard({
    title,
  
    value,
  
    extra,
  }: Props) {
    return (
      <div className="stat-card">
  
        <p>{title}</p>
  
        <h2>{value}</h2>
  
        {extra && (
          <span>{extra}</span>
        )}
  
      </div>
    );
  }