interface Props {
  timeLeft: number;
}

export default function CountdownTimer({ timeLeft }: Props) {
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const items = [
    { label: "DAYS", value: days },
    { label: "HRS", value: hours },
    { label: "MINS", value: minutes },
    { label: "SECS", value: seconds },
  ];

  return (
    <div className="countdown">
      {items.map((item) => (
        <div className="countdown-item" key={item.label}>
          <h2>{String(item.value).padStart(2, "0")}</h2>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
}