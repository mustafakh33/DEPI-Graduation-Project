import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    text: "The cohort system was a game-changer. Having 15 other people struggling with the same problems kept me from quitting.",
    name: "Sarah J.",
    role: "Web Dev Track '23",
    img: "https://i.pravatar.cc/150?img=47"
  },
  {
    text: "The project grading was brutal but fair. It prepared me for real engineering PR reviews more than any university ever did.",
    name: "Michael Chen",
    role: "AI Engineer @ TechCorp",
    img: "https://i.pravatar.cc/150?img=11",
    featured: true
  },
  {
    text: "From zero code to building my own SaaS in 6 months. UniHub isn't just a platform; it's a launchpad.",
    name: "David Miller",
    role: "Indie Hacker",
    img: "https://i.pravatar.cc/150?img=33"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-[#09090b] relative" id="testimonials">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px_32px]"></div>
      
      <div className="max-w-container-max mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Stories from Our Graduates</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className={`p-8 rounded-3xl backdrop-blur-md relative group transition-all duration-300 hover:-translate-y-2 ${
                t.featured 
                ? 'bg-gradient-to-br from-blue-900/40 to-purple-900/20 border border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]' 
                : 'bg-[#18181b]/50 border border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-8 italic">"{t.text}"</p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-blue-500/50 transition-colors">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-white font-bold">{t.name}</p>
                  <p className="text-gray-500 text-sm">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
