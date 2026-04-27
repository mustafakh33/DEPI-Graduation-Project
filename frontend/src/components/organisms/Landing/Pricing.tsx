import React from 'react';

const Pricing: React.FC = () => {
  return (
    <section className="py-24 bg-surface-container-low" id="pricing">
      <div className="max-w-container-max mx-auto px-6 md:px-12">
        <div className="text-center mb-16 space-y-6">
          <h2 className="font-h2 text-h2 text-white">Simple, Career-Focused Pricing</h2>
          <div className="flex items-center justify-center gap-4">
            <span className="text-on-surface-variant font-label-md text-label-md">Monthly</span>
            <button className="w-14 h-7 bg-primary-container rounded-full relative transition-colors">
              <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full"></div>
            </button>
            <span className="text-white font-label-md text-label-md">Semester (Save 20%)</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant/30 flex flex-col">
            <h4 className="text-white font-h3 text-h3 mb-2">Free</h4>
            <p className="text-on-surface-variant font-body-sm text-body-sm mb-6">Explore the curriculum and start learning basic tracks.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">$0</span>
              <span className="text-on-surface-variant">/month</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center gap-3 text-on-surface font-body-sm"><span className="material-symbols-outlined text-primary text-lg">check</span> Entry-level modules</li>
              <li className="flex items-center gap-3 text-on-surface font-body-sm"><span className="material-symbols-outlined text-primary text-lg">check</span> Public study rooms</li>
              <li className="flex items-center gap-3 text-on-surface font-body-sm text-gray-500"><span className="material-symbols-outlined text-lg">close</span> No cohort matching</li>
            </ul>
            <button className="w-full py-4 border border-outline-variant text-white rounded-xl font-label-md hover:bg-surface-container-highest transition-all">Get Started</button>
          </div>
          <div className="bg-surface-container-high p-8 rounded-3xl border-2 border-primary-container shadow-2xl relative flex flex-col scale-105 z-10">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-container text-on-primary-container text-[10px] font-bold px-4 py-1 rounded-full uppercase">Most Popular</div>
            <h4 className="text-white font-h3 text-h3 mb-2">Pro</h4>
            <p className="text-on-surface-variant font-body-sm text-body-sm mb-6">For career switchers ready to master a new craft.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">$49</span>
              <span className="text-on-surface-variant">/month</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center gap-3 text-on-surface font-body-sm"><span className="material-symbols-outlined text-primary text-lg">check</span> Full Track access</li>
              <li className="flex items-center gap-3 text-on-surface font-body-sm"><span className="material-symbols-outlined text-primary text-lg">check</span> Dedicated cohort matching</li>
              <li className="flex items-center gap-3 text-on-surface font-body-sm"><span className="material-symbols-outlined text-primary text-lg">check</span> Milestone grading by experts</li>
              <li className="flex items-center gap-3 text-on-surface font-body-sm"><span className="material-symbols-outlined text-primary text-lg">check</span> Certificate of Graduation</li>
            </ul>
            <button className="w-full py-4 bg-primary-container text-on-primary-container rounded-xl font-label-md hover:brightness-110 transition-all">Enroll Now</button>
          </div>
          <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant/30 flex flex-col">
            <h4 className="text-white font-h3 text-h3 mb-2">Team</h4>
            <p className="text-on-surface-variant font-body-sm text-body-sm mb-6">Bulk enrollments for companies or universities.</p>
            <div className="mb-8">
              <span className="text-4xl font-bold text-white">Custom</span>
            </div>
            <ul className="space-y-4 mb-10 flex-grow">
              <li className="flex items-center gap-3 text-on-surface font-body-sm"><span className="material-symbols-outlined text-primary text-lg">check</span> Admin dashboard</li>
              <li className="flex items-center gap-3 text-on-surface font-body-sm"><span className="material-symbols-outlined text-primary text-lg">check</span> Private cohorts</li>
              <li className="flex items-center gap-3 text-on-surface font-body-sm"><span className="material-symbols-outlined text-primary text-lg">check</span> Custom track paths</li>
            </ul>
            <button className="w-full py-4 border border-outline-variant text-white rounded-xl font-label-md hover:bg-surface-container-highest transition-all">Contact Sales</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
