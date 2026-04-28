import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';

const TopNavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5 shadow-2xl py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="flex justify-between items-center max-w-container-max mx-auto px-6 md:px-12 w-full">
        <Link to="/" className="text-xl font-bold text-white flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-1.5 rounded-lg group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300">
            <GraduationCap className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <span className="tracking-tight">UniHub</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'Tracks', 'Pricing', 'Testimonials'].map((item) => (
            <a 
              key={item}
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium relative group" 
              href={`#${item.toLowerCase()}`}
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-gray-300 hover:text-white transition-colors text-sm font-medium px-4 py-2 hover:bg-white/5 rounded-lg">
            Login
          </Link>
          <Link to="/register" className="relative group overflow-hidden bg-white text-black px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] active:scale-95">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default TopNavBar;
