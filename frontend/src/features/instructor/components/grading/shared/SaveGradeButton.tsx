import { Check } from "lucide-react";

interface Props {
  saved: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function SaveGradeButton({
  saved,
  onClick,
  disabled = false,
}: Props) {
  if (saved) {
    return (
      <span className="grade-saved">
        <Check size={16} aria-hidden />
        Saved
      </span>
    );
  }

  return (
    <button
      type="button"
      className="confirm-grade-btn"
      onClick={onClick}
      disabled={disabled}
    >
      Confirm Grade
    </button>
  );
}
