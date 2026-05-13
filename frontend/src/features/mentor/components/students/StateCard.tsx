type StatCardProps = {
  title: string;
  value: string | number;
  unit?: string;
  trend?: string;
  status?: string;
};

export default function StatCard({ title, value, unit, trend, status }: StatCardProps) {
  return (
    <div className="card">
      <p>{title}</p>
      <h2 className={`stat-${status}`}>
        {value}
        {unit}
      </h2>
      <small>{trend}</small>
    </div>
  );
}