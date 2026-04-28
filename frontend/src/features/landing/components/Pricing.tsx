import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const Pricing: React.FC = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="py-24 bg-[#09090b] relative border-y border-white/5" id="pricing">
      <div className="max-w-container-max mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Simple, Career-Focused Pricing</h2>
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-7 bg-blue-500/20 border border-blue-500/50 rounded-full relative transition-colors duration-300"
            >
              <div className={`absolute top-1 w-5 h-5 bg-blue-400 rounded-full transition-transform duration-300 ${isAnnual ? 'right-1' : 'left-1'}`}></div>
            </button>
            <span className={`text-sm font-medium flex items-center gap-2 ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Semester <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full uppercase">Save 20%</span>
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Tier */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#18181b] p-8 rounded-3xl border border-white/5 flex flex-col hover:border-white/20 transition-all"
          >
            <h4 className="text-2xl font-bold text-white mb-2">Free</h4>
            <p className="text-gray-400 text-sm mb-6 h-10">Explore the curriculum and start learning basic tracks.</p>
            <div className="mb-8 flex items-baseline gap-1">
              <span className="text-5xl font-extrabold text-white">$0</span>
              <span className="text-gray-500 font-medium">/month</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-start gap-3 text-gray-300"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Entry-level modules</li>
              <li className="flex items-start gap-3 text-gray-300"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Public study rooms</li>
              <li className="flex items-start gap-3 text-gray-600"><X className="w-5 h-5 shrink-0" /> No cohort matching</li>
            </ul>
            <button className="w-full py-4 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/5 transition-all active:scale-95">Get Started</button>
          </motion.div>

          {/* Pro Tier (Popular) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-b from-[#18181b] to-blue-900/20 p-8 rounded-3xl border-2 border-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.15)] relative flex flex-col md:-mt-4 md:mb-4 z-10"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase shadow-lg tracking-widest">
              Most Popular
            </div>
            <h4 className="text-2xl font-bold text-white mb-2">Pro</h4>
            <p className="text-gray-400 text-sm mb-6 h-10">For career switchers ready to master a new craft.</p>
            <div className="mb-8 flex items-baseline gap-1">
              <span className="text-5xl font-extrabold text-white">${isAnnual ? '39' : '49'}</span>
              <span className="text-gray-500 font-medium">/month</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-start gap-3 text-gray-200"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Full Track access</li>
              <li className="flex items-start gap-3 text-gray-200"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Dedicated cohort matching</li>
              <li className="flex items-start gap-3 text-gray-200"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Milestone grading by experts</li>
              <li className="flex items-start gap-3 text-gray-200"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Certificate of Graduation</li>
            </ul>
            <button className="w-full py-4 bg-white text-black rounded-xl font-bold hover:bg-gray-100 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]">Enroll Now</button>
          </motion.div>

          {/* Team Tier */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#18181b] p-8 rounded-3xl border border-white/5 flex flex-col hover:border-white/20 transition-all"
          >
            <h4 className="text-2xl font-bold text-white mb-2">Team</h4>
            <p className="text-gray-400 text-sm mb-6 h-10">Bulk enrollments for companies or universities.</p>
            <div className="mb-8 flex items-baseline gap-1">
              <span className="text-5xl font-extrabold text-white">Custom</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-start gap-3 text-gray-300"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Admin dashboard</li>
              <li className="flex items-start gap-3 text-gray-300"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Private cohorts</li>
              <li className="flex items-start gap-3 text-gray-300"><Check className="w-5 h-5 text-blue-400 shrink-0" /> Custom track paths</li>
            </ul>
            <button className="w-full py-4 border border-white/10 text-white rounded-xl font-semibold hover:bg-white/5 transition-all active:scale-95">Contact Sales</button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
