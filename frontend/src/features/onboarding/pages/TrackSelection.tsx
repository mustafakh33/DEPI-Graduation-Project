import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BrainCircuit,
  Code2,
  ShieldCheck,
  Smartphone,
  Check,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

import OnboardingLayout from "@/layouts/OnboardingLayout";
import { Button } from "@/components/ui/button";
import {
  useOnboarding,
  type TrackId,
} from "@/features/onboarding/context/OnboardingContext";

const tracks = [
  {
    id: "web-development",
    icon: Code2,
    title: "Web Development",
    description:
      "Build full-stack web applications from scratch using modern technologies.",
    modules: "HTML/CSS → JavaScript → React → Node.js",
    duration: "16 Weeks",
    isNew: false,
    color: "from-blue-500 to-cyan-400",
    bgLight: "bg-blue-500/10",
    borderLight: "border-blue-500/20",
    textLight: "text-blue-400",
  },
  {
    id: "ai-data-science",
    icon: BrainCircuit,
    title: "AI & Data Science",
    description:
      "Master machine learning, data analysis, and AI model building.",
    modules: "Python → Statistics → ML → Deep Learning",
    duration: "16 Weeks",
    isNew: false,
    color: "from-purple-500 to-pink-400",
    bgLight: "bg-purple-500/10",
    borderLight: "border-purple-500/20",
    textLight: "text-purple-400",
  },
  {
    id: "mobile-development",
    icon: Smartphone,
    title: "Mobile Development",
    description: "Build cross-platform mobile apps for iOS and Android.",
    modules: "Flutter → Dart → APIs → Deployment",
    duration: "16 Weeks",
    isNew: false,
    color: "from-emerald-500 to-teal-400",
    bgLight: "bg-emerald-500/10",
    borderLight: "border-emerald-500/20",
    textLight: "text-emerald-400",
  },
  {
    id: "cybersecurity",
    icon: ShieldCheck,
    title: "Cybersecurity",
    description:
      "Learn ethical hacking, network security, and prepare for industry certifications.",
    modules: "Networking → Linux → Ethical Hacking",
    duration: "16 Weeks",
    isNew: true,
    color: "from-rose-500 to-orange-400",
    bgLight: "bg-rose-500/10",
    borderLight: "border-rose-500/20",
    textLight: "text-rose-400",
  },
] as const;

export default function TrackSelection() {
  const navigate = useNavigate();
  const { selectTrack, selectedTrack: storedTrack } = useOnboarding();
  const [selectedTrack, setSelectedTrack] = useState<string | null>(
    storedTrack?.id ?? null,
  );
  const activeTrack = selectedTrack;

  const handleContinue = () => {
    const track = tracks.find((item) => item.id === activeTrack);
    if (!track) return;

    selectTrack({ id: track.id as TrackId, title: track.title });
    navigate("/schedule");
  };

  return (
    <OnboardingLayout
      currentStep={1}
      totalSteps={6}
      title="Choose your learning track"
      subtitle="Select a path that aligns with your career goals. You can always change this later."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">
        {tracks.map((track, idx) => {
          const Icon = track.icon;
          const isSelected = activeTrack === track.id;

          return (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              onClick={() => setSelectedTrack(track.id)}
              className={`relative cursor-pointer rounded-2xl p-6 transition-all duration-300 border backdrop-blur-sm group overflow-hidden ${
                isSelected
                  ? `bg-white/10 ${track.borderLight} ring-1 ring-${track.textLight.replace("text-", "")}`
                  : "bg-black/40 border-white/5 hover:bg-white/5 hover:border-white/20"
              }`}
            >
              {isSelected && (
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-[0.03] pointer-events-none`}
                />
              )}

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected ? track.bgLight : "bg-white/5"
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${isSelected ? track.textLight : "text-gray-400 group-hover:text-gray-300"}`}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    {track.isNew && (
                      <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-300 bg-blue-500/20 rounded-full">
                        New
                      </span>
                    )}
                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-transparent bg-white text-black"
                          : "border-gray-600"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {track.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {track.description}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-gray-500">{track.modules}</span>
                  <span className="text-xs font-medium text-gray-300 bg-white/5 px-2 py-1 rounded-md">
                    {track.duration}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-12 flex justify-end w-full max-w-4xl mx-auto border-t border-white/10 pt-6">
        <Button
          onClick={handleContinue}
          disabled={!activeTrack}
          className="bg-white text-black hover:bg-gray-200 py-6 px-8 rounded-xl font-semibold text-base group transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-[1.02] active:scale-[0.98]"
        >
          Continue
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </OnboardingLayout>
  );
}
