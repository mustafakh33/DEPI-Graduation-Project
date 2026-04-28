import React from 'react';
import { motion } from 'framer-motion';

const StatsBar: React.FC = () => {
  const stats = [
    { value: '500+', label: 'Active Students' },
    { value: '8', label: 'Learning Tracks', color: 'text-blue-400' },
    { value: '84%', label: 'Completion' },
    { value: '12', label: 'Expert Instructors', color: 'text-purple-400' }
  ];

  return (
    <section className="bg-[#09090b] border-y border-white/5 py-16 relative z-20">
      <div className="max-w-container-max mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 text-center">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-2 p-4 rounded-2xl hover:bg-white/[0.02] transition-colors"
            >
              <h3 className={`text-4xl md:text-5xl font-bold ${stat.color || 'text-white'}`}>
                {stat.value}
              </h3>
              <p className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-block relative">
            <span className="absolute -top-4 -left-6 text-4xl text-white/10 font-serif">"</span>
            <p className="italic text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto px-8">
              The structure of UniHub gave me the discipline I couldn't find in random YouTube playlists.
            </p>
            <span className="absolute -bottom-6 -right-2 text-4xl text-white/10 font-serif">"</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsBar;
