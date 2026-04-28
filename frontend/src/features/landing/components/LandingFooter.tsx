import React from 'react';

const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-[#111827] border-t border-[#374151] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-2 md:col-span-1 space-y-6">
          <div className="text-lg font-bold text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
            UniHub
          </div>
          <p className="text-gray-500 font-medium text-sm max-w-xs">High-performance academic environment for the next generation of technical masters.</p>
        </div>
        <div className="space-y-4">
          <h5 className="text-white font-label-md text-label-md">Platform</h5>
          <ul className="space-y-2">
            <li><a className="text-gray-500 hover:text-white transition-colors text-sm" href="#">How It Works</a></li>
            <li><a className="text-gray-500 hover:text-white transition-colors text-sm" href="#">Features</a></li>
            <li><a className="text-gray-500 hover:text-white transition-colors text-sm" href="#">Tracks</a></li>
            <li><a className="text-gray-500 hover:text-white transition-colors text-sm" href="#">Pricing</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h5 className="text-white font-label-md text-label-md">Support</h5>
          <ul className="space-y-2">
            <li><a className="text-gray-500 hover:text-white transition-colors text-sm" href="#">Help Center</a></li>
            <li><a className="text-gray-500 hover:text-white transition-colors text-sm" href="#">Community Forum</a></li>
            <li><a className="text-gray-500 hover:text-white transition-colors text-sm" href="#">Contact Support</a></li>
            <li><a className="text-gray-500 hover:text-white transition-colors text-sm" href="#">Status</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h5 className="text-white font-label-md text-label-md">Company</h5>
          <ul className="space-y-2">
            <li><a className="text-gray-500 hover:text-white transition-colors text-sm" href="#">Careers</a></li>
            <li><a className="text-gray-500 hover:text-white transition-colors text-sm" href="#">Privacy Policy</a></li>
            <li><a className="text-gray-500 hover:text-white transition-colors text-sm" href="#">Terms of Service</a></li>
            <li><a className="text-gray-500 hover:text-white transition-colors text-sm" href="#">Security</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-[#374151] flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-500 font-medium">© 2024 UniHub Academic Systems. All rights reserved.</p>
        <div className="flex gap-6">
          <a className="text-gray-500 hover:text-white transition-colors" href="#"><span className="material-symbols-outlined text-lg">public</span></a>
          <a className="text-gray-500 hover:text-white transition-colors" href="#"><span className="material-symbols-outlined text-lg">terminal</span></a>
          <a className="text-gray-500 hover:text-white transition-colors" href="#"><span className="material-symbols-outlined text-lg">chat</span></a>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
