import React from 'react';

const StatsBar: React.FC = () => {
  return (
    <section className="bg-surface-container py-12 relative z-20">
      <div className="max-w-container-max mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="font-h2 text-h2 text-white">500+</h3>
            <p className="text-on-surface-variant font-label-md text-label-md uppercase tracking-widest mt-2">Active Students</p>
          </div>
          <div>
            <h3 className="font-h2 text-h2 text-primary-container">8</h3>
            <p className="text-on-surface-variant font-label-md text-label-md uppercase tracking-widest mt-2">Learning Tracks</p>
          </div>
          <div>
            <h3 className="font-h2 text-h2 text-white">84%</h3>
            <p className="text-on-surface-variant font-label-md text-label-md uppercase tracking-widest mt-2">Completion</p>
          </div>
          <div>
            <h3 className="font-h2 text-h2 text-secondary">12</h3>
            <p className="text-on-surface-variant font-label-md text-label-md uppercase tracking-widest mt-2">Expert Instructors</p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="italic text-on-surface-variant text-body-md font-body-md max-w-2xl mx-auto opacity-70">
            "The structure of UniHub gave me the discipline I couldn't find in random YouTube playlists."
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
