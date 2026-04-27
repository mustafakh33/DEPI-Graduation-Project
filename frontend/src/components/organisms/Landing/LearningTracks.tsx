import React from 'react';

const LearningTracks: React.FC = () => {
  return (
    <section className="py-24 bg-surface-container-lowest" id="tracks">
      <div className="max-w-container-max mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="font-h2 text-h2 text-white">Choose Your Path</h2>
            <p className="text-on-surface-variant font-body-lg text-body-lg max-w-xl">Each track is a 4-month intensive curriculum designed to take you from novice to job-ready.</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 border border-outline-variant rounded-full text-white hover:bg-surface-container"><span className="material-symbols-outlined">chevron_left</span></button>
            <button className="p-2 border border-outline-variant rounded-full text-white hover:bg-surface-container"><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/20 group hover:bg-surface-container-high transition-all">
            <div className="h-40 rounded-xl mb-6 overflow-hidden">
              <img alt="Web Dev" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="abstract lines and code representation symbolizing modern web development and high performance architecture" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFiECNHU1HW1J-oblhmz7h3GqDhQ7-HmCzyR9O7tT9lx-612WdGu5xHnDuHRgH038Up-gSXSEE5yDrDsQBnQWyCJQw_QLkkw8gPksqUHtccVLIkMRNhPJyqbEV7_3jTGttcOwbRmdeTeensOnorWzbWESaPLobos6SpXnov6JydMLYBKjBqz4X5dd84bjdEhLn3_GUe-M50Y5RuchZ7fHFvQ7huRUWUQvM42N1xXmkY4SiHyRhXDOOsnI7EatDUMmj8r4IEAeHDPI" />
            </div>
            <span className="bg-primary-container/20 text-primary-fixed text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Professional</span>
            <h4 className="text-white font-h3 text-h3 mt-3">Web Development</h4>
            <p className="text-on-surface-variant font-body-sm text-body-sm mt-2 mb-6">Full-stack React &amp; Node.js mastery with system design.</p>
            <div className="flex items-center justify-between border-t border-outline-variant/30 pt-4">
              <span className="text-on-surface-variant text-label-sm font-label-sm">12 Modules</span>
              <a className="text-primary-container font-label-md text-label-md hover:underline" href="#">View Track</a>
            </div>
          </div>
          <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/20 group hover:bg-surface-container-high transition-all">
            <div className="h-40 rounded-xl mb-6 overflow-hidden">
              <img alt="AI" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="neural network visualization with glowing nodes and connecting lines on a dark background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwFIa1KzpTg4QZ7C8li-lA7OJuDWGfq2gDoDz3vwyQMon4O9iQjL9BH1_vO3t6JrU3XjVAuNNk2Ozc9yBoJdaZ7SJ_2bzLY5J1dIG1cbhVU163DTg2WKCoQnLkQraTsI3ATh_Z5PWB0BvnIwSjL3Y0YwHGa2WFErIqsMzOnKQBVPhfiq9WiMgcGc2DOTz5TEhfqcQo3WOrwbLc9JexNNZ9uoMGi4jhZwiFO-Guml3LYSKhqFmaUopZTDJYUeBHto8vjHgWH3C72ms" />
            </div>
            <span className="bg-secondary-container/20 text-secondary-fixed text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Expert</span>
            <h4 className="text-white font-h3 text-h3 mt-3">AI &amp; Data Science</h4>
            <p className="text-on-surface-variant font-body-sm text-body-sm mt-2 mb-6">Python, Machine Learning models, and LLM implementation.</p>
            <div className="flex items-center justify-between border-t border-outline-variant/30 pt-4">
              <span className="text-on-surface-variant text-label-sm font-label-sm">15 Modules</span>
              <a className="text-primary-container font-label-md text-label-md hover:underline" href="#">View Track</a>
            </div>
          </div>
          <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/20 group hover:bg-surface-container-high transition-all">
            <div className="h-40 rounded-xl mb-6 overflow-hidden">
              <img alt="Mobile" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="minimal smartphone interface showing clean app icons and vibrant UI elements" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAOMU9QRpWcfqCn_WR61ojYdONT1C2qi_ThqpduxOTJbD67VCYjX1zns6a8KUBxnqiPxav1nUrvMnbcGJqOtl1d4qOLdngmU-7TeOaBgnR0Cklb7gYNpbPrbvxdoUS7wrJ5RaMbUHfN58vpRdWpJlEEZH7SebChmJa-PK1WJ3oA2dM4EFA3IT6qq9RdWTmXNCCJNgc7z4Y7nZ_MRZWzldX9OJxVO7UgSuZdM--Y1TDNb-Bf8rN30RTVqFLPvrOglb_q5ROds1Ydwg4" />
            </div>
            <span className="bg-tertiary-container/20 text-tertiary-fixed text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Foundation</span>
            <h4 className="text-white font-h3 text-h3 mt-3">Mobile Development</h4>
            <p className="text-on-surface-variant font-body-sm text-body-sm mt-2 mb-6">Cross-platform development using Flutter and React Native.</p>
            <div className="flex items-center justify-between border-t border-outline-variant/30 pt-4">
              <span className="text-on-surface-variant text-label-sm font-label-sm">10 Modules</span>
              <a className="text-primary-container font-label-md text-label-md hover:underline" href="#">View Track</a>
            </div>
          </div>
          <div className="bg-surface-container p-6 rounded-2xl border border-outline-variant/20 group hover:bg-surface-container-high transition-all">
            <div className="h-40 rounded-xl mb-6 overflow-hidden">
              <img alt="Cybersecurity" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" data-alt="digital lock and secure data stream visualization with green matrix style accents" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhksdz2RzqLw5_HrWChm-NJQ9Ts6SetCqT4L1rxB2kuNolJYK3bzFc1aDJr5TgTfnJG8kUPkYY-k4w1RaKaYwhjOzO6gHlHSzL9tuB8PPeU3dDUT_Oe5hU07nQ6nUJjZnvoX4SR7a0A09J_7kUI6k2ZXgHqYAKRVTs97dPnpG6M0izFbWAK1yWOOV5lQjjuBddAA7yluQdv3TizsGyYUsQhvzxYw9SwSHYEz9bT0De1teoz4ut5j-AkBmc75ymGExL2P-7pIE1VUc" />
            </div>
            <span className="bg-error-container/20 text-error text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Hardcore</span>
            <h4 className="text-white font-h3 text-h3 mt-3">Cybersecurity</h4>
            <p className="text-on-surface-variant font-body-sm text-body-sm mt-2 mb-6">Ethical hacking, network security, and forensic analysis.</p>
            <div className="flex items-center justify-between border-t border-outline-variant/30 pt-4">
              <span className="text-on-surface-variant text-label-sm font-label-sm">14 Modules</span>
              <a className="text-primary-container font-label-md text-label-md hover:underline" href="#">View Track</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearningTracks;
