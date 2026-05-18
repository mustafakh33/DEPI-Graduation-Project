import { Music2, Pause, Play } from "lucide-react";
import type { SoloFocusMusicTrackId } from "../../types/student.types";
import SoloFocusGlassCard from "./SoloFocusGlassCard";

interface MusicTrack {
  title: string;
  src: string;
}

interface SoloFocusMusicCardProps {
  musicTracks: Record<SoloFocusMusicTrackId, MusicTrack>;
  activeTrack: SoloFocusMusicTrackId | null;
  onToggleMusic: (trackId: SoloFocusMusicTrackId) => void;
}

const SoloFocusMusicCard = ({
  musicTracks,
  activeTrack,
  onToggleMusic,
}: SoloFocusMusicCardProps) => {
  return (
    <SoloFocusGlassCard>
      <div className="mb-3 flex items-center gap-2">
        <Music2 className="size-4 text-cyan-300" />
        <p className="text-sm font-bold text-white">Ambient Sound</p>
      </div>

      <button
        type="button"
        onClick={() => onToggleMusic("lofi")}
        className="flex w-full items-center justify-between rounded-xl bg-cyan-400/20 px-3 py-2.5 text-xs text-cyan-100 transition hover:bg-cyan-400/30"
      >
        <span>{musicTracks.lofi.title}</span>

        {activeTrack === "lofi" ? (
          <Pause className="size-4" />
        ) : (
          <Play className="size-4" />
        )}
      </button>

      <button
        type="button"
        onClick={() => onToggleMusic("rain")}
        className="mt-2 flex w-full items-center justify-between rounded-xl bg-white/10 px-3 py-2.5 text-xs text-slate-200 transition hover:bg-white/15"
      >
        <span>{musicTracks.rain.title}</span>

        {activeTrack === "rain" ? (
          <Pause className="size-4" />
        ) : (
          <Play className="size-4" />
        )}
      </button>
    </SoloFocusGlassCard>
  );
};

export default SoloFocusMusicCard;