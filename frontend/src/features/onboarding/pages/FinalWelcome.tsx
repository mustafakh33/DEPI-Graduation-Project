import { Navigate, useNavigate } from "react-router";
import {
  CheckCircle2,
  Rocket,
  ArrowRight,
  Target,
  Clock,
  BookOpen,
} from "lucide-react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import OnboardingLayout from "@/layouts/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/features/onboarding/context/OnboardingContext";
import { useAuth } from "@/hooks/useAuth";

export default function FinalWelcome() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const { completeOnboarding, result, schedule, selectedTrack, user } =
    useOnboarding();
  const { login } = useAuth();

  if (!user || !selectedTrack || !schedule || !result) {
    return <Navigate replace to="/signup" />;
  }

  const handleGoToDashboard = () => {
    completeOnboarding();
    login("student");
    navigate("/student/dashboard");
  };

  const name = user.name.split(" ")[0] || user.name;

  return (
    <OnboardingLayout
      currentStep={5}
      totalSteps={6}
      title={`You're all set, ${name}!`}
      subtitle="Your profile is complete and your curriculum has been personalized. It's time to start learning."
    >
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={200}
        colors={["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"]}
      />

      <div className="w-full max-w-4xl mx-auto space-y-8 relative z-10">
        {/* Success Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-8 text-center"
        >
          <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Registration Complete
          </h2>
          <p className="text-emerald-100/70 max-w-md mx-auto">
            Your UniHub account has been successfully configured. We've prepared
            everything you need for day one.
          </p>
        </motion.div>

        {/* Summary Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-black/40 border border-white/10 rounded-2xl p-6"
          >
            <Target className="w-6 h-6 text-blue-400 mb-4" />
            <div className="text-sm text-gray-500 mb-1">Track</div>
            <div className="font-semibold text-white">
              {selectedTrack.title}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-black/40 border border-white/10 rounded-2xl p-6"
          >
            <Clock className="w-6 h-6 text-purple-400 mb-4" />
            <div className="text-sm text-gray-500 mb-1">Schedule</div>
            <div className="font-semibold text-white">
              {schedule.weeklyCommitment} hrs/wk
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-black/40 border border-white/10 rounded-2xl p-6"
          >
            <BookOpen className="w-6 h-6 text-emerald-400 mb-4" />
            <div className="text-sm text-gray-500 mb-1">Level</div>
            <div className="font-semibold text-white">{result.level} Tier</div>
          </motion.div>
        </div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-1"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-emerald-500/10 opacity-30" />
          <div className="relative rounded-xl overflow-hidden bg-black/60 backdrop-blur-sm border border-white/5 aspect-video flex flex-col">
            {/* Fake browser header */}
            <div className="h-8 border-b border-white/10 flex items-center px-4 gap-2 bg-black/40">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
            {/* Fake dashboard content */}
            <div className="flex-1 p-6 flex items-center justify-center opacity-50 grayscale mix-blend-screen bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
              <div className="absolute inset-0 bg-black/80" />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-12 flex justify-center items-center w-full max-w-4xl mx-auto border-t border-white/10 pt-8">
        <Button
          onClick={handleGoToDashboard}
          className="bg-blue-600 text-white hover:bg-blue-500 h-14 px-10 rounded-xl font-bold text-lg shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_40px_rgba(37,99,235,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98] group"
        >
          Go to my Dashboard
          <Rocket className="w-5 h-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </Button>
      </div>
    </OnboardingLayout>
  );
}
