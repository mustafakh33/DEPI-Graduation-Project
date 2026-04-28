import React from 'react';
import { GraduationCap, Globe, Terminal, MessageCircle } from 'lucide-react';

const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-[#09090b] border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-2 md:col-span-1 space-y-6">
          <div className="text-2xl font-bold text-white flex items-center gap-2 group">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-1.5 rounded-lg">
              <GraduationCap className="w-6 h-6 text-white" strokeWidth={2.5} />
            </div>
            <span className="tracking-tight">UniHub</span>
          </div>
          <p className="text-gray-400 font-medium text-sm max-w-xs leading-relaxed">
            High-performance academic environment for the next generation of technical masters.
          </p>
        </div>
        <div className="space-y-6">
          <h5 className="text-white font-semibold tracking-wide">Platform</h5>
          <ul className="space-y-4">
            <li><a className="text-gray-400 hover:text-white transition-colors text-sm font-medium" href="#">How It Works</a></li>
            <li><a className="text-gray-400 hover:text-white transition-colors text-sm font-medium" href="#">Features</a></li>
            <li><a className="text-gray-400 hover:text-white transition-colors text-sm font-medium" href="#">Tracks</a></li>
            <li><a className="text-gray-400 hover:text-white transition-colors text-sm font-medium" href="#">Pricing</a></li>
          </ul>
        </div>
        <div className="space-y-6">
          <h5 className="text-white font-semibold tracking-wide">Support</h5>
          <ul className="space-y-4">
            <li><a className="text-gray-400 hover:text-white transition-colors text-sm font-medium" href="#">Help Center</a></li>
            <li><a className="text-gray-400 hover:text-white transition-colors text-sm font-medium" href="#">Community Forum</a></li>
            <li><a className="text-gray-400 hover:text-white transition-colors text-sm font-medium" href="#">Contact Support</a></li>
            <li><a className="text-gray-400 hover:text-white transition-colors text-sm font-medium" href="#">Status</a></li>
          </ul>
        </div>
        <div className="space-y-6">
          <h5 className="text-white font-semibold tracking-wide">Company</h5>
          <ul className="space-y-4">
            <li><a className="text-gray-400 hover:text-white transition-colors text-sm font-medium" href="#">Careers</a></li>
            <li><a className="text-gray-400 hover:text-white transition-colors text-sm font-medium" href="#">Privacy Policy</a></li>
            <li><a className="text-gray-400 hover:text-white transition-colors text-sm font-medium" href="#">Terms of Service</a></li>
            <li><a className="text-gray-400 hover:text-white transition-colors text-sm font-medium" href="#">Security</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-sm text-gray-500 font-medium">© {new Date().getFullYear()} UniHub Academic Systems. All rights reserved.</p>
        <div className="flex gap-6">
          <a className="text-gray-500 hover:text-white transition-colors hover:scale-110 active:scale-95" href="#"><Globe className="w-5 h-5" /></a>
          <a className="text-gray-500 hover:text-white transition-colors hover:scale-110 active:scale-95" href="#"><Terminal className="w-5 h-5" /></a>
          <a className="text-gray-500 hover:text-white transition-colors hover:scale-110 active:scale-95" href="#"><MessageCircle className="w-5 h-5" /></a>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
