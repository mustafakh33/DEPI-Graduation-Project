import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router';
import { GraduationCap } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center relative overflow-hidden py-12 px-4 font-sans">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo Header */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform group-hover:border-blue-500/50 group-hover:bg-blue-500/10 shadow-lg">
              <GraduationCap className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              UniHub
            </span>
          </Link>
        </div>

        {/* Content Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-[#18181b]/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/50 relative overflow-hidden"
          >
            {/* Inner top glow */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
            
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-white mb-2 tracking-tight">{title}</h1>
              {subtitle && <p className="text-gray-400 text-sm leading-relaxed">{subtitle}</p>}
            </div>

            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthLayout;
