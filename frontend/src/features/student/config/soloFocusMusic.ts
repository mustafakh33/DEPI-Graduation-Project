import type { SoloFocusMusicTrackId } from "../types/student.types";

export const MUSIC_TRACKS: Record<
  SoloFocusMusicTrackId,
  { title: string; src: string }
> = {
  lofi: {
    title: "Lofi Library",
    src: "/music/Lofi.mp3",
  },
  rain: {
    title: "Soft Rain",
    src: "/music/Soft-rain.mp3",
  },
};