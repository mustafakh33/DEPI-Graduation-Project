import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto px-6 md:px-12">
        <h2 className="font-h2 text-h2 text-white text-center mb-20">Your Journey to Mastery</h2>
        <div className="relative grid md:grid-cols-4 gap-8">
          <div className="absolute top-12 left-0 w-full h-0.5 border-t-2 border-dashed border-outline-variant hidden md:block"></div>
          <div className="relative flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-surface-container-high border-4 border-background flex items-center justify-center text-primary-container z-10 group hover:border-primary-container transition-all">
              <span className="material-symbols-outlined text-3xl">assignment_ind</span>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-primary-container text-on-primary-container text-[10px] font-bold px-2 py-1 rounded">01</div>
            <h4 className="font-h3 text-h3 text-white text-lg">Placement Test</h4>
            <p className="text-on-surface-variant font-body-sm text-body-sm">Assess your current skills to find the right entry point.</p>
          </div>
          <div className="relative flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-surface-container-high border-4 border-background flex items-center justify-center text-primary-container z-10 group hover:border-primary-container transition-all">
              <span className="material-symbols-outlined text-3xl">group_add</span>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-primary-container text-on-primary-container text-[10px] font-bold px-2 py-1 rounded">02</div>
            <h4 className="font-h3 text-h3 text-white text-lg">Join Batch</h4>
            <p className="text-on-surface-variant font-body-sm text-body-sm">Get matched with 15 peers starting their journey together.</p>
          </div>
          <div className="relative flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-surface-container-high border-4 border-background flex items-center justify-center text-primary-container z-10 group hover:border-primary-container transition-all">
              <span className="material-symbols-outlined text-3xl">school</span>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-primary-container text-on-primary-container text-[10px] font-bold px-2 py-1 rounded">03</div>
            <h4 className="font-h3 text-h3 text-white text-lg">Study &amp; Attend</h4>
            <p className="text-on-surface-variant font-body-sm text-body-sm">Attend live labs and complete structured track modules.</p>
          </div>
          <div className="relative flex flex-col items-center text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-surface-container-high border-4 border-background flex items-center justify-center text-primary-container z-10 group hover:border-primary-container transition-all">
              <span className="material-symbols-outlined text-3xl">analytics</span>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 bg-primary-container text-on-primary-container text-[10px] font-bold px-2 py-1 rounded">04</div>
            <h4 className="font-h3 text-h3 text-white text-lg">Evaluate</h4>
            <p className="text-on-surface-variant font-body-sm text-body-sm">Submit projects for grading and earn your track certificate.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
