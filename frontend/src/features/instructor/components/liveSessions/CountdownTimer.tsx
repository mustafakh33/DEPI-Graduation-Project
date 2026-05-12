interface Props {
    timeLeft: number;
  }
  
  export default function CountdownTimer({
    timeLeft,
  }: Props) {
    const days = Math.floor(
      timeLeft /
        (1000 * 60 * 60 * 24)
    );
  
    const hours = Math.floor(
      (timeLeft /
        (1000 * 60 * 60)) %
        24
    );
  
    const minutes = Math.floor(
      (timeLeft / (1000 * 60)) %
        60
    );
  
    const seconds = Math.floor(
      (timeLeft / 1000) % 60
    );
  
    return (
      <div className="countdown">
  
        <div>
          <h2>{days}</h2>
          <p>DAYS</p>
        </div>
  
        <div>
          <h2>{hours}</h2>
          <p>HRS</p>
        </div>
  
        <div>
          <h2>{minutes}</h2>
          <p>MINS</p>
        </div>
  
        <div>
          <h2>{seconds}</h2>
          <p>SECS</p>
        </div>
  
      </div>
    );
  }