import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Users, BookOpen, CheckSquare } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: "Placement Test",
    desc: "Assess your current skills to find the right entry point."
  },
  {
    icon: Users,
    title: "Join Batch",
    desc: "Get matched with 15 peers starting their journey together."
  },
  {
    icon: BookOpen,
    title: "Study & Attend",
    desc: "Attend live labs and complete structured track modules."
  },
  {
    icon: CheckSquare,
    title: "Evaluate",
    desc: "Submit projects for grading and earn your track certificate."
  }
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-[#09090b] relative">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]"></div>
      <div className="max-w-container-max mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Your Journey to Mastery</h2>
        </motion.div>

        <div className="relative grid md:grid-cols-4 gap-12 md:gap-8">
          {/* Connecting Line */}
          <div className="absolute top-12 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-purple-500/0 hidden md:block"></div>
          
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="relative flex flex-col items-center text-center space-y-6 group"
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="w-24 h-24 rounded-2xl bg-[#18181b] border border-white/10 flex items-center justify-center text-white z-10 relative group-hover:border-blue-500/50 group-hover:-translate-y-2 transition-all duration-300 shadow-xl group-hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)]">
                  <step.icon className="w-10 h-10 text-gray-400 group-hover:text-blue-400 transition-colors duration-300" />
                </div>
                
                <div className="absolute -top-3 -right-3 bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#09090b] shadow-lg z-20">
                  {idx + 1}
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{step.title}</h4>
                <p className="text-gray-400 text-sm leading-relaxed max-w-[200px] mx-auto">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
