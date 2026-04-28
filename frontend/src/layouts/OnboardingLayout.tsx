import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router';
import { GraduationCap } from 'lucide-react';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep?: number;
  totalSteps?: number;
  title?: string;
  subtitle?: string;
  hideProgress?: boolean;
}

const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({ 
  children, 
  currentStep, 
  totalSteps = 6, 
  title, 
  subtitle,
  hideProgress = false
}) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col font-sans">
      {/* Header */}
      <header className="w-full border-b border-white/5 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-500/10 group-hover:border-blue-500/50 transition-colors">
              <GraduationCap className="w-4 h-4 text-gray-300 group-hover:text-blue-400 transition-colors" />
            </div>
            <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              UniHub
            </span>
          </Link>
          
          {!hideProgress && currentStep && totalSteps && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-400 hidden sm:block">
                Step {currentStep} of {totalSteps}
              </span>
              <div className="w-24 sm:w-32 h-2 rounded-full bg-white/10 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="flex-1 flex flex-col p-6 relative z-10 w-full max-w-4xl mx-auto">
          {(title || subtitle) && (
            <div className="text-center mt-8 mb-10 w-full max-w-2xl mx-auto">
              {title && (
                <motion.h1 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight"
                >
                  {title}
                </motion.h1>
              )}
              {subtitle && (
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-gray-400 text-lg leading-relaxed"
                >
                  {subtitle}
                </motion.p>
              )}
            </div>
          )}

          <div className="flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full flex-1 flex flex-col"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OnboardingLayout;
