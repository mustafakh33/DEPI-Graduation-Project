import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, MessageSquare, BrainCircuit, LineChart } from 'lucide-react';

const CoreFeatures: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 bg-[#09090b]" id="features">
      <div className="max-w-container-max mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Built for Serious Learners</h2>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]"
        >
          {/* Feature 1 */}
          <motion.div variants={itemVariants} className="md:col-span-2 bg-[#18181b] rounded-3xl p-10 border border-white/5 flex flex-col justify-between hover:border-blue-500/30 transition-all duration-500 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="p-3 bg-blue-500/10 rounded-xl w-fit mb-6 border border-blue-500/20">
                <CalendarDays className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">Semester System</h4>
              <p className="text-gray-400 text-lg max-w-md">Our academic calendar ensures you stay on track with fixed start dates, mid-terms, and final project submissions.</p>
            </div>
            <img 
              alt="Planning" 
              className="absolute bottom-[-10%] right-[-5%] w-1/2 opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700 rotate-12" 
              src="https://images.unsplash.com/photo-1506784951879-ed8a4a1eb78b?auto=format&fit=crop&q=80&w=800" 
            />
          </motion.div>

          {/* Feature 2 */}
          <motion.div variants={itemVariants} className="bg-[#18181b] p-8 rounded-3xl border border-white/5 hover:border-purple-500/30 transition-all duration-500 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="p-3 bg-purple-500/10 rounded-xl w-fit mb-6 border border-purple-500/20">
                <MessageSquare className="w-8 h-8 text-purple-400" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">Study Rooms</h4>
              <p className="text-gray-400">24/7 virtual rooms to collaborate with your cohort in real-time.</p>
            </div>
          </motion.div>

          {/* Feature 3 */}
          <motion.div variants={itemVariants} className="bg-[#18181b] p-8 rounded-3xl border border-white/5 hover:border-green-500/30 transition-all duration-500 relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="p-3 bg-green-500/10 rounded-xl w-fit mb-6 border border-green-500/20">
                <BrainCircuit className="w-8 h-8 text-green-400" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">AI Quizzes</h4>
              <p className="text-gray-400">Personalized adaptive testing that identifies your weak spots instantly.</p>
            </div>
          </motion.div>

          {/* Feature 4 */}
          <motion.div variants={itemVariants} className="md:col-span-2 bg-[#18181b] rounded-3xl p-10 border border-white/5 flex flex-col md:flex-row items-center justify-between hover:border-blue-500/30 transition-all duration-500 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="max-w-md relative z-10 mb-8 md:mb-0">
              <div className="p-3 bg-blue-500/10 rounded-xl w-fit mb-6 border border-blue-500/20">
                <LineChart className="w-8 h-8 text-blue-400" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-3">Progress Analytics</h4>
              <p className="text-gray-400 text-lg">Detailed breakdown of your learning velocity, consistency, and skill distribution.</p>
            </div>
            <div className="w-full md:w-1/2 flex justify-end relative z-10">
              <div className="flex items-end gap-3 h-40">
                {[40, 60, 80, 50, 90, 70].map((height, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + (i * 0.1), duration: 0.8, type: "spring" }}
                    className="w-6 md:w-8 bg-gradient-to-t from-blue-600 to-purple-500 rounded-t-full opacity-80 group-hover:opacity-100 transition-opacity"
                  ></motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoreFeatures;
