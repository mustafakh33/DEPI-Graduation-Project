import React from 'react';

const ProblemSolution: React.FC = () => {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-container-max mx-auto px-6 md:px-12">
        <div className="text-center mb-16 space-y-4">
          <p className="text-error font-label-md text-label-md uppercase tracking-widest">The Problem</p>
          <h2 className="font-h2 text-h2 text-white">Tutorial Hell is Real</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-8xl text-error">trending_down</span>
            </div>
            <h4 className="text-error font-h3 text-h3 mb-6">The Old Way</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-error mt-1">cancel</span>
                <p className="text-on-surface-variant font-body-md text-body-md">Learning in isolation without peer feedback.</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-error mt-1">cancel</span>
                <p className="text-on-surface-variant font-body-md text-body-md">Unstructured curriculum with no clear roadmap.</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-error mt-1">cancel</span>
                <p className="text-on-surface-variant font-body-md text-body-md">Zero accountability leads to 95% dropout rates.</p>
              </li>
            </ul>
          </div>
          <div className="bg-primary-container/5 p-8 rounded-2xl border border-primary-container/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <span className="material-symbols-outlined text-8xl text-primary-container">trending_up</span>
            </div>
            <h4 className="text-primary-container font-h3 text-h3 mb-6">The UniHub Way</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary-container mt-1">check_circle</span>
                <p className="text-on-background font-body-md text-body-md">Cohort-based learning with dedicated study groups.</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary-container mt-1">check_circle</span>
                <p className="text-on-background font-body-md text-body-md">Industry-aligned tracks with milestone grading.</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary-container mt-1">check_circle</span>
                <p className="text-on-background font-body-md text-body-md">Semester schedules that keep you moving forward.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
