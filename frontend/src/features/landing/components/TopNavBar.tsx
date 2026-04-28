import React from 'react';
import { Link } from 'react-router';

const TopNavBar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#111827]/90 backdrop-blur-md border-b border-[#374151] shadow-xl">
      <div className="flex justify-between items-center h-16 px-6 md:px-12 w-full">
        <div className="text-xl font-semibold text-white flex items-center gap-2 font-h3">
          <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
          UniHub
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a className="text-gray-400 hover:text-white transition-colors font-label-md text-label-md" href="#features">Features</a>
          <a className="text-gray-400 hover:text-white transition-colors font-label-md text-label-md" href="#tracks">Tracks</a>
          <a className="text-gray-400 hover:text-white transition-colors font-label-md text-label-md" href="#pricing">Pricing</a>
          <a className="text-gray-400 hover:text-white transition-colors font-label-md text-label-md" href="#testimonials">Testimonials</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-gray-400 hover:text-white transition-colors font-label-md text-label-md px-4 py-2 active:scale-95 duration-150">Login</Link>
          <Link to="/register" className="bg-primary-container text-on-primary-container px-5 py-2.5 rounded-lg font-label-md text-label-md active:scale-95 duration-150 transition-all hover:brightness-110">Get Started</Link>
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
