import { useRef, useState } from "react";
import { Camera, Crown, UserRound, X } from "lucide-react";
import { useGroupStudyRoom } from "@/features/student/hooks/useGroupStudyRoom";
import type { StudentStats } from "../../types/student.types";

interface StudentTopStatsProps {
  stats: StudentStats;
}

const STUDENT_AVATAR_STORAGE_KEY = "student-profile-avatar";

const StudentTopStats = ({ stats }: StudentTopStatsProps) => {
  const groupRoom = useGroupStudyRoom();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(
    () =>
      localStorage.getItem(STUDENT_AVATAR_STORAGE_KEY) ??
      groupRoom.currentStudent.avatarUrl ??
      "https://i.pravatar.cc/80?img=5"
  );

  const groupLabel = `${groupRoom.trackTitle} - ${groupRoom.groupName}`;

  const handleChoosePhoto = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const imageUrl = URL.createObjectURL(selectedFile);

    setAvatarUrl(imageUrl);
    localStorage.setItem(STUDENT_AVATAR_STORAGE_KEY, imageUrl);

    event.target.value = "";
  };

  return (
    <div className="flex items-center gap-3 text-xs font-medium text-slate-300">
      <div className="flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-2">
        <span className="text-[11px] font-bold uppercase tracking-wide text-blue-400">
          Rank #{stats.rank}
        </span>
      </div>

      <div className="flex items-center gap-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-2">
        <span>🔥</span>
        <span className="font-semibold text-slate-200">
          {stats.streakDays} days
        </span>
      </div>

      <div className="flex items-center gap-1.5 rounded-full border border-purple-500/20 bg-purple-500/10 px-3 py-2">
        <span>⏱</span>
        <span className="font-semibold text-slate-200">
          {stats.studyHours}h
        </span>
      </div>

      <div className="flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-2">
        <span>🟠</span>
        <span className="font-semibold text-slate-200">{stats.coins}</span>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsProfileOpen((prev) => !prev)}
          className="h-10 w-10 overflow-hidden rounded-full border-2 border-blue-500/40 bg-slate-800 transition hover:scale-105 hover:border-blue-400"
          aria-label="Open profile menu"
        >
          <img
            src={avatarUrl}
            alt="Student avatar"
            className="h-full w-full object-cover"
          />
        </button>

        {isProfileOpen ? (
          <div className="absolute right-0 top-12 z-50 w-[280px] rounded-2xl border border-slate-800 bg-[#0f172a] p-4 text-white shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-bold">Student Profile</h2>

              <button
                type="button"
                onClick={() => setIsProfileOpen(false)}
                className="flex size-8 items-center justify-center rounded-xl bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <img
                  src={avatarUrl}
                  alt="Student avatar"
                  className="size-20 rounded-2xl border border-blue-500/30 object-cover"
                />

                <button
                  type="button"
                  onClick={handleChoosePhoto}
                  className="absolute -bottom-2 -right-2 flex size-8 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-500"
                  aria-label="Change profile photo"
                >
                  <Camera className="size-4" />
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </div>

              <h3 className="mt-4 text-sm font-bold text-white">
                {groupRoom.currentStudent.name}
              </h3>

              <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-blue-600/15 px-3 py-1.5 text-[11px] font-semibold text-blue-300">
                <UserRound className="size-3.5" />
                Student
              </div>

              <div className="mt-3 w-full rounded-2xl bg-white/5 p-3 text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">
                  Group
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-200">
                  {groupLabel}
                </p>
              </div>

              {groupRoom.currentStudent.isLeader ? (
                <div className="mt-3 flex w-full items-center gap-2 rounded-2xl bg-yellow-400/10 p-3 text-left">
                  <Crown className="size-4 shrink-0 text-yellow-300" />

                  <p className="text-xs font-semibold text-yellow-200">
                    You are the leader of this group.
                  </p>
                </div>
              ) : null}

              <button
                type="button"
                onClick={handleChoosePhoto}
                className="mt-4 w-full rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-500"
              >
                Change Photo
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StudentTopStats;