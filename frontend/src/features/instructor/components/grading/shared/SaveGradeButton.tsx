interface Props {
    saved: boolean;
  
    onClick: () => void;
  }
  
  export default function SaveGradeButton({
    saved,
  
    onClick,
  }: Props) {
    return (
      <button
        className={
          saved
            ? "saved-btn"
            : "confirm-btn"
        }
        onClick={onClick}
      >
        {saved
          ? "Saved"
          : "Confirm Grade"}
      </button>
    );
  }