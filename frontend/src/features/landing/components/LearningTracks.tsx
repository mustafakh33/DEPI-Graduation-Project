import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const tracks = [
  {
    title: "Web Development",
    level: "Professional",
    levelColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    desc: "Full-stack React & Node.js mastery with system design.",
    modules: "12 Modules",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "AI & Data Science",
    level: "Expert",
    levelColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    desc: "Python, Machine Learning models, and LLM implementation.",
    modules: "15 Modules",
    img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Mobile Development",
    level: "Foundation",
    levelColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    desc: "Cross-platform development using Flutter and React Native.",
    modules: "10 Modules",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Cybersecurity",
    level: "Hardcore",
    levelColor: "bg-red-500/20 text-red-400 border-red-500/30",
    desc: "Ethical hacking, network security, and forensic analysis.",
    modules: "14 Modules",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800"
  }
];

const LearningTracks: React.FC = () => {
  return (
    <section className="py-24 bg-[#09090b] relative" id="tracks">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent"></div>
      
      <div className="max-w-container-max mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Choose Your Path</h2>
            <p className="text-gray-400 text-lg max-w-xl">Each track is a 4-month intensive curriculum designed to take you from novice to job-ready.</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-3"
          >
            <button className="p-3 border border-white/10 rounded-full text-white hover:bg-white/5 transition-all hover:scale-105 active:scale-95">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-3 border border-white/10 rounded-full text-white hover:bg-white/5 transition-all hover:scale-105 active:scale-95">
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {tracks.map((track, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#18181b] p-2 rounded-3xl border border-white/5 group hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] flex flex-col h-full"
            >
              <div className="h-48 rounded-2xl mb-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img 
                  alt={track.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  src={track.img} 
                />
              </div>
              
              <div className="px-4 pb-4 flex flex-col flex-grow">
                <span className={`inline-block w-fit text-[10px] font-bold px-3 py-1 rounded-full uppercase border mb-4 ${track.levelColor}`}>
                  {track.level}
                </span>
                
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">{track.title}</h4>
                <p className="text-gray-400 text-sm mb-6 flex-grow">{track.desc}</p>
                
                <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto">
                  <span className="text-gray-500 text-sm font-medium">{track.modules}</span>
                  <a className="text-blue-400 text-sm font-semibold hover:text-blue-300 flex items-center gap-1 group/link" href="#">
                    View Track
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningTracks;
