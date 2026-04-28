import { useState } from "react";
import { useNavigate } from "react-router";
import { BrainCircuit, Code2, ShieldCheck, Smartphone } from "lucide-react";

import { TrackCard } from "@/components/track-selection/TrackCard";
import { TrackSelectionFooter } from "@/components/track-selection/TrackSelectionFooter";
import { TrackSelectionHeader } from "@/components/track-selection/TrackSelectionHeader";
import { TrackSelectionNavbar } from "@/components/track-selection/TrackSelectionNavbar";
import { useOnboarding, type TrackId } from "@/store/onboarding/OnboardingContext";

const tracks = [
  {
    id: "web-development",
    accent: "primary",
    icon: Code2,
    title: "Web Development",
    description:
      "Build full-stack web applications from scratch using modern technologies.",
    modules: "HTML/CSS → JavaScript → React → Node.js → Final Project",
    duration: "16 Weeks",
  },
  {
    id: "ai-data-science",
    accent: "tertiary",
    icon: BrainCircuit,
    title: "AI & Data Science",
    description:
      "Master machine learning, data analysis, and AI model building.",
    modules: "Python → Statistics → ML → Deep Learning → Final Project",
    duration: "16 Weeks",
  },
  {
    id: "mobile-development",
    accent: "primary",
    icon: Smartphone,
    title: "Mobile Development",
    description: "Build cross-platform mobile apps for iOS and Android.",
    modules: "Flutter → Dart → APIs → Deployment → Final Project",
    duration: "16 Weeks",
  },
  {
    id: "cybersecurity",
    accent: "error",
    icon: ShieldCheck,
    title: "Cybersecurity",
    description:
      "Learn ethical hacking, network security, and prepare for industry certifications.",
    modules: "Networking → Linux → Ethical Hacking → CCNA → Final Project",
    duration: "16 Weeks",
    isNew: true,
  },
] as const;

export default function TrackSelection() {
  const navigate = useNavigate();
  const { selectTrack, selectedTrack: storedTrack } = useOnboarding();
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const activeTrack = selectedTrack ?? storedTrack?.id ?? null;

  const handleContinue = () => {
    const track = tracks.find((item) => item.id === activeTrack);

    if (!track) {
      return;
    }

    selectTrack({ id: track.id as TrackId, title: track.title });
    navigate("/schedule");
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#11131b] font-body-md text-[#e1e2ed] antialiased">
      <TrackSelectionNavbar />

      <main className="mx-auto w-full max-w-container-max flex-grow px-margin pb-32 pt-24">
        <TrackSelectionHeader />

        <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
          {tracks.map((track) => (
            <TrackCard
              key={track.id}
              {...track}
              isSelected={activeTrack === track.id}
              onSelect={() => setSelectedTrack(track.id)}
            />
          ))}
        </div>
      </main>

      <TrackSelectionFooter
        canContinue={Boolean(activeTrack)}
        onContinue={handleContinue}
      />
    </div>
  );
}
