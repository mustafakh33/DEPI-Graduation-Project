interface CourseProgressBarProps {
  progress: number;
}

const CourseProgressBar = ({ progress }: CourseProgressBarProps) => {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="mt-3 flex items-center gap-3">
      <div className="h-2 w-48 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${safeProgress}%` }}
        />
      </div>

      <span className="text-xs font-semibold text-muted-foreground">
        {safeProgress}%
      </span>
    </div>
  );
};

export default CourseProgressBar;