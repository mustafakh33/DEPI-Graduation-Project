import { Button } from "@/components/ui/button";
import type { StudentStats } from "../../types/student.types";
import StudentTopStats from "./StudentTopStats";

interface StudentHeaderProps {
  stats: StudentStats;
}

const StudentHeader = ({ stats }: StudentHeaderProps) => {
  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-end border-b border-border bg-background px-4 md:px-8">
      <div className="flex items-center gap-4">
        <StudentTopStats stats={stats} />

        <Button
          type="button"
          variant="headerIcon"
          size="icon"
          aria-label="Notifications"
          className="relative"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute right-1 top-1 size-2 rounded-full bg-red-500" />
        </Button>
      </div>
    </header>
  );
};

export default StudentHeader;