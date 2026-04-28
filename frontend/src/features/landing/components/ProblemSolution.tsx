import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle2, TrendingDown, TrendingUp } from 'lucide-react';

const ProblemSolution: React.FC = () => {
  return (
    <section className="py-24 bg-[#09090b] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-container-max mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-red-500/10 text-red-400 font-semibold text-xs tracking-widest uppercase border border-red-500/20">
            The Problem
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Tutorial Hell is Real</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Problem Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-[#18181b]/50 backdrop-blur-md p-10 rounded-3xl border border-red-500/20 relative overflow-hidden group hover:border-red-500/40 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] transition-all duration-300"
          >
            <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:rotate-12">
              <TrendingDown className="w-64 h-64 text-red-500" />
            </div>
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                <TrendingDown className="w-6 h-6 text-red-400" />
              </div>
              <h4 className="text-2xl font-bold text-white">The Old Way</h4>
            </div>
            
            <ul className="space-y-6 relative z-10">
              {[
                "Learning in isolation without peer feedback.",
                "Unstructured curriculum with no clear roadmap.",
                "Zero accountability leads to 95% dropout rates."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  <p className="text-gray-400 text-lg">{item}</p>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Solution Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-blue-900/20 to-purple-900/10 backdrop-blur-md p-10 rounded-3xl border border-blue-500/30 relative overflow-hidden group hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300"
          >
            <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:-rotate-12">
              <TrendingUp className="w-64 h-64 text-blue-500" />
            </div>
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <h4 className="text-2xl font-bold text-white">The UniHub Way</h4>
            </div>
            
            <ul className="space-y-6 relative z-10">
              {[
                "Cohort-based learning with dedicated study groups.",
                "Industry-aligned tracks with milestone grading.",
                "Semester schedules that keep you moving forward."
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <p className="text-gray-200 text-lg font-medium">{item}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
