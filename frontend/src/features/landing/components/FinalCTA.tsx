import React from 'react';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-container-max mx-auto px-6 md:px-12">
        <div className="bg-gradient-to-br from-primary-container/20 to-surface-container rounded-[40px] p-12 md:p-24 text-center border border-primary-container/10 relative">
          <div className="absolute top-10 left-10 opacity-10"><span className="material-symbols-outlined text-9xl">school</span></div>
          <div className="absolute bottom-10 right-10 opacity-10"><span className="material-symbols-outlined text-9xl">verified_user</span></div>
          <h2 className="font-h2 text-h2 text-white mb-6 relative z-10">Ready to Graduate from Tutorial Hell?</h2>
          <p className="text-on-surface-variant font-body-lg text-body-lg max-w-2xl mx-auto mb-12 relative z-10">Join 500+ students and start your next semester today. First week is on us.</p>
          <div className="flex flex-wrap justify-center gap-6 relative z-10">
            <button className="bg-primary-container text-on-primary-container px-10 py-5 rounded-2xl font-label-md text-label-md shadow-xl hover:scale-105 transition-all">Apply for Next Intake</button>
            <button className="bg-surface-container text-white px-10 py-5 rounded-2xl font-label-md text-label-md border border-outline-variant hover:bg-surface-container-high transition-all">Browse All Tracks</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
