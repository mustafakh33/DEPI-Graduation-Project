import React from 'react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-background" id="testimonials">
      <div className="max-w-container-max mx-auto px-6 md:px-12">
        <h2 className="font-h2 text-h2 text-white text-center mb-16">Stories from Our Graduates</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex text-secondary mb-4">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="text-on-surface font-body-md text-body-md italic mb-8">"The cohort system was a game-changer. Having 15 other people struggling with the same problems kept me from quitting."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-highest"></div>
              <div>
                <p className="text-white font-label-md text-label-md">Sarah J.</p>
                <p className="text-on-surface-variant font-label-sm text-label-sm">Web Dev Track '23</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-8 rounded-2xl border-t-4 border-primary-container">
            <div className="flex text-secondary mb-4">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="text-on-surface font-body-md text-body-md italic mb-8">"The project grading was brutal but fair. It prepared me for real engineering PR reviews more than any university ever did."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-highest"></div>
              <div>
                <p className="text-white font-label-md text-label-md">Michael Chen</p>
                <p className="text-on-surface-variant font-label-sm text-label-sm">AI Engineer @ TechCorp</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-8 rounded-2xl">
            <div className="flex text-secondary mb-4">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="text-on-surface font-body-md text-body-md italic mb-8">"From zero code to building my own SaaS in 6 months. UniHub isn't just a platform; it's a launchpad."</p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-surface-container-highest"></div>
              <div>
                <p className="text-white font-label-md text-label-md">David Miller</p>
                <p className="text-on-surface-variant font-label-sm text-label-sm">Indie Hacker</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
