import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, ShieldCheck } from 'lucide-react';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 bg-[#09090b] relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-container-max mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-blue-900/40 via-[#18181b] to-purple-900/40 rounded-[40px] p-12 md:p-24 text-center border border-white/10 relative shadow-[0_0_50px_rgba(59,130,246,0.1)] overflow-hidden"
        >
          {/* Decorative Icons */}
          <motion.div 
            animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-10 opacity-20 hidden md:block"
          >
            <GraduationCap className="w-32 h-32 text-blue-400" />
          </motion.div>
          <motion.div 
            animate={{ y: [10, -10, 10], rotate: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 right-10 opacity-20 hidden md:block"
          >
            <ShieldCheck className="w-32 h-32 text-purple-400" />
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 relative z-10 tracking-tight">
            Ready to Graduate from <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Tutorial Hell?</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 relative z-10">
            Join 500+ students and start your next semester today. First week is on us.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <button className="bg-white text-black px-10 py-5 rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-105 hover:bg-gray-100 active:scale-95 transition-all duration-300">
              Apply for Next Intake
            </button>
            <button className="bg-white/5 text-white px-10 py-5 rounded-2xl font-bold text-lg border border-white/10 hover:bg-white/10 hover:border-white/20 active:scale-95 transition-all duration-300 backdrop-blur-sm">
              Browse All Tracks
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
