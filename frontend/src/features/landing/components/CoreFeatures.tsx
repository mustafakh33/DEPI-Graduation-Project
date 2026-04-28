import React from 'react';

const CoreFeatures: React.FC = () => {
  return (
    <section className="py-24 bg-background" id="features">
      <div className="max-w-container-max mx-auto px-6 md:px-12">
        <h2 className="font-h2 text-h2 text-white mb-12 text-center">Built for Serious Learners</h2>
        <div className="grid md:grid-cols-3 grid-rows-2 gap-6 h-auto md:h-[600px]">
          <div className="md:col-span-2 bg-surface-container-high rounded-3xl p-8 border border-outline-variant/30 flex flex-col justify-between hover:border-primary-container/40 transition-all overflow-hidden relative group">
            <div>
              <span className="material-symbols-outlined text-primary text-4xl mb-4">calendar_month</span>
              <h4 className="text-white font-h3 text-h3 mb-2">Semester System</h4>
              <p className="text-on-surface-variant font-body-md text-body-md max-w-md">Our academic calendar ensures you stay on track with fixed start dates, mid-terms, and final project submissions.</p>
            </div>
            <img alt="Planning" className="absolute bottom-[-10%] right-[-10%] w-2/3 opacity-20 group-hover:opacity-40 transition-all rotate-12" data-alt="close up of a digital calendar and planning interface with clean typography and modern icons" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHtXjh5Heytujs0yPalf5HfEwcOsva0F0YZwiqYOyYX_KXOyPSMD-bxsZlR10Dyuz6TAYLXzsaN4H_t7zQ6_3FpxpML2x4KKoXRiOJ3IWNFwvEn-ZB1A-BW_XKIoh38qm9LgHbgv_zFzVJyKzkVhOWcZBn5wuovKuKHEXIQUdHfC5yZrkWOj-abmOfA6jHERGpbzh4hT-TD_B4w-q2aSQ7hXgKvCXsayTkDgf5qJYQcjVdyRNEY-wuPe3-ytczLRt1IuhbsaSeHvw" />
          </div>
          <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant/30 hover:border-secondary/40 transition-all">
            <span className="material-symbols-outlined text-secondary text-4xl mb-4">forum</span>
            <h4 className="text-white font-h3 text-h3 mb-2">Study Rooms</h4>
            <p className="text-on-surface-variant font-body-sm text-body-sm">24/7 virtual rooms to collaborate with your cohort in real-time.</p>
          </div>
          <div className="bg-surface-container p-8 rounded-3xl border border-outline-variant/30 hover:border-tertiary/40 transition-all">
            <span className="material-symbols-outlined text-tertiary text-4xl mb-4">psychology</span>
            <h4 className="text-white font-h3 text-h3 mb-2">AI Quizzes</h4>
            <p className="text-on-surface-variant font-body-sm text-body-sm">Personalized adaptive testing that identifies your weak spots instantly.</p>
          </div>
          <div className="md:col-span-2 bg-surface-container-high rounded-3xl p-8 border border-outline-variant/30 flex items-center justify-between hover:border-primary-container/40 transition-all overflow-hidden">
            <div className="max-w-md">
              <span className="material-symbols-outlined text-primary text-4xl mb-4">monitoring</span>
              <h4 className="text-white font-h3 text-h3 mb-2">Progress Analytics</h4>
              <p className="text-on-surface-variant font-body-md text-body-md">Detailed breakdown of your learning velocity, consistency, and skill distribution.</p>
            </div>
            <div className="w-1/2 flex justify-end">
              <div className="flex items-end gap-2 h-32">
                <div className="w-4 bg-primary-container rounded-t-full h-full"></div>
                <div className="w-4 bg-primary-container rounded-t-full h-2/3 opacity-70"></div>
                <div className="w-4 bg-primary-container rounded-t-full h-4/5 opacity-80"></div>
                <div className="w-4 bg-primary-container rounded-t-full h-1/2 opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreFeatures;
