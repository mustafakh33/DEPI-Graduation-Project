export default function Chart({ data }: { data: number[] }) {
  return (
    <div className="card" style={{ display: "flex", gap: "10px", height: "200px", alignItems: "flex-end" }}>
      {data.map((value: number, i: number) => (
        <div
          key={i}
          style={{
            height: `${value}%`,
            background: i === 3 ? "#3b82f6" : "#334155",
            flex: 1,
            borderRadius: "6px",
          }}
        />
      ))}
    </div>
  );
}