import { Navigate, useNavigate } from "react-router";
import { Trophy, Calendar, Target, ArrowRight, BookOpen, Star } from "lucide-react";
import { motion } from "framer-motion";

import OnboardingLayout from "@/layouts/OnboardingLayout";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/store/onboarding/OnboardingContext";

export default function TestResult() {
  const navigate = useNavigate();
  const { result, schedule, selectedTrack } = useOnboarding();

  if (!result || !schedule || !selectedTrack) {
    return <Navigate replace to="/placement-intro" />;
  }

  const getLevelColor = (level: string) => {
    switch(level.toLowerCase()) {
      case 'beginner': return 'from-emerald-500 to-teal-400 text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'intermediate': return 'from-blue-500 to-cyan-400 text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'advanced': return 'from-purple-500 to-pink-400 text-purple-400 bg-purple-500/10 border-purple-500/20';
      default: return 'from-gray-500 to-gray-400 text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const levelStyle = getLevelColor(result.level);

  return (
    <OnboardingLayout
      currentStep={4}
      totalSteps={6}
      title="Test Results"
      subtitle="Here's how you performed. We've used this to tailor your upcoming curriculum."
    >
      <div className="w-full max-w-3xl mx-auto space-y-8">
        
        {/* Main Result Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`relative overflow-hidden rounded-3xl border bg-black/40 backdrop-blur-xl p-8 text-center ${levelStyle.split(' ')[3]} border-t-white/10`}
        >
          <div className="absolute inset-0 bg-gradient-to-br opacity-5 pointer-events-none mix-blend-overlay" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-2xl ${levelStyle.split(' ')[2]} border border-white/10`}>
              <Trophy className={`w-10 h-10 ${levelStyle.split(' ')[1]}`} />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">
              <Star className="w-3.5 h-3.5 fill-current" />
              {result.level} Level
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-6xl font-bold tracking-tight text-white">{result.score}</span>
              <span className="text-xl text-gray-500 font-medium">/ 100</span>
            </div>
            
            <p className="text-gray-400 max-w-md mx-auto mt-4">
              Great job! Your current knowledge places you at the <strong className="text-white">{result.level}</strong> level. We've adjusted your path to skip the basics and focus on more advanced concepts.
            </p>
          </div>
        </motion.div>

        {/* Summary Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-black/40 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <Target className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Selected Track</div>
                <div className="font-semibold text-white">{selectedTrack.title}</div>
              </div>
            </div>
            <div className="text-sm text-gray-400 pt-4 border-t border-white/5">
              Your curriculum is now specialized for {selectedTrack.title} at the {result.level} tier.
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-black/40 border border-white/10 rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                <Calendar className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <div className="text-sm text-gray-500">Commitment</div>
                <div className="font-semibold text-white">{schedule.weeklyCommitment} hrs/wk</div>
              </div>
            </div>
            <div className="text-sm text-gray-400 pt-4 border-t border-white/5">
              Based on {schedule.days.length} days of study, mostly in the {schedule.preferredTime}.
            </div>
          </motion.div>
        </div>

      </div>

      <div className="mt-12 flex justify-between items-center w-full max-w-3xl mx-auto border-t border-white/10 pt-6">
        <div className="text-sm text-gray-500">
          Not happy with your score? <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">Retake in 30 days</a>
        </div>

        <Button
          onClick={() => navigate("/onboarding-complete")}
          className="bg-white text-black hover:bg-gray-200 h-12 px-8 rounded-xl font-semibold group transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Finalize Setup
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </OnboardingLayout>
  );
}
