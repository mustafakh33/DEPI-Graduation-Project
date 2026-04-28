import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Star, Users } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <header className="relative min-h-[100vh] pt-32 pb-20 overflow-hidden bg-[#09090b] flex items-center">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[120px] rounded-full opacity-50 pointer-events-none"></div>
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="relative max-w-container-max mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-16 items-center z-10 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-8"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium backdrop-blur-sm"
          >
            <CheckCircle2 className="w-4 h-4 mr-2 text-blue-500" />
            Structured Learning. Real Results.
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight">
            The Online University
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              That Keeps You Accountable
            </span>
            <br />
            And Gets You Hired
          </h1>
          
          <p className="text-lg md:text-xl text-gray-400 max-w-xl leading-relaxed">
            UniHub transforms self-learning into a real academic experience with
            semesters, batches, mentors, and project-based evaluation. Join a
            system built to make you graduate.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-4">
            <Button className="group relative bg-white text-black hover:bg-gray-100 px-8 py-6 rounded-xl text-base font-semibold shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all hover:scale-105 active:scale-95" asChild>
              <Link to="/register">
                Start Learning Free
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button className="px-8 py-6 rounded-xl text-base font-semibold bg-white/5 text-white border border-white/10 hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
              See How It Works
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="relative lg:block hidden"
        >
          {/* Main Dashboard Mockup */}
          <div className="relative rounded-2xl p-2 bg-gradient-to-b from-white/10 to-white/0 border border-white/10 shadow-2xl shadow-blue-900/20 backdrop-blur-sm transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
            <img
              alt="Student Dashboard"
              className="rounded-xl w-full border border-white/5"
              src="./landing_hero.png"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-2xl pointer-events-none"></div>
          </div>

          {/* Floating UI Elements */}
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-8 -right-8 bg-[#18181b]/90 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-xl flex items-center gap-4 z-20"
          >
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <Star className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Grade Received</p>
              <p className="text-blue-400 text-xs font-medium">A+ on Project Build</p>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-8 bg-[#18181b]/90 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-xl flex items-center gap-4 z-20"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-[#18181b] bg-gray-600 flex items-center justify-center overflow-hidden`}>
                   <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <p className="text-white font-medium text-sm flex items-center gap-1">
                <Users className="w-3 h-3 text-gray-400" />
                34 active
              </p>
              <p className="text-gray-400 text-xs">in your cohort</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default HeroSection;
