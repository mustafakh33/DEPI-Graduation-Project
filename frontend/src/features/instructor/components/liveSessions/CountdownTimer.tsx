import { Fragment } from "react";

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
    { label: "HOURS", value: hours },
    { label: "MINS", value: minutes },
    { label: "SECS", value: seconds },
  ];

  return (
    <div className="countdown">
      {items.map((item, index) => (
        <Fragment key={item.label}>
          <div className="countdown-item">
            <span className="countdown-value">
              {String(item.value).padStart(2, "0")}
            </span>
            <span className="countdown-label">{item.label}</span>
          </div>
          {index < items.length - 1 && (
            <span className="countdown-separator" aria-hidden>
              :
            </span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
