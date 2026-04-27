import React from "react";
import { Link } from "react-router";

const Register: React.FC = () => {
  return (
    <div className="antialiased font-body-md overflow-x-hidden min-h-screen bg-[#11131b] text-on-background selection:bg-primary-container selection:text-on-primary-container">
      <main className="min-h-screen pt-8 flex items-center justify-center relative">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary-container/10 rounded-full blur-[120px]"></div>
          <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-tertiary-container/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="container-max w-full px-margin grid grid-cols-1 lg:grid-cols-12 gap-stack-lg py-12 relative z-10">
          {/* Left Section: Value Proposition */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-stack-lg">
            <div className="space-y-stack-md">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-secondary-container/20 text-secondary text-label-sm border border-secondary-container/30">
                <span className="material-symbols-outlined text-[14px] mr-1">
                  bolt
                </span>
                Admissions Open for Fall 2024
              </span>
              <h1 className="font-h1 text-h1 text-on-background max-w-lg">
                Master In-Demand Tech Skills with Real Accountability.
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                Join a structured, semester-based learning environment designed
                to help you actually finish what you start.
              </p>
            </div>
            <div className="space-y-stack-md">
              <ul className="space-y-4">
                <li className="flex items-start gap-3 group">
                  <div className="mt-1 bg-primary-container/20 p-1 rounded-lg text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-[18px]">
                      person_check
                    </span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-on-surface">
                      1-on-1 Mentorship
                    </h4>
                    <p className="font-body-sm text-on-surface-variant">
                      Personalized guidance from industry experts weekly.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="mt-1 bg-primary-container/20 p-1 rounded-lg text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-[18px]">
                      terminal
                    </span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-on-surface">
                      Instructor-Graded Projects
                    </h4>
                    <p className="font-body-sm text-on-surface-variant">
                      Build a real portfolio with rigorous code reviews.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="mt-1 bg-primary-container/20 p-1 rounded-lg text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-[18px]">
                      groups
                    </span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-on-surface">
                      Live Study Rooms
                    </h4>
                    <p className="font-body-sm text-on-surface-variant">
                      Peer accountability that keeps you motivated 24/7.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3 group">
                  <div className="mt-1 bg-primary-container/20 p-1 rounded-lg text-primary-container group-hover:bg-primary-container group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-[18px]">
                      work_history
                    </span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-on-surface">
                      Guaranteed Outcomes
                    </h4>
                    <p className="font-body-sm text-on-surface-variant">
                      Career-ready curriculum with direct job placement support.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
   
          </div>

          {/* Right Section: Form */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="w-full max-w-lg p-stack-lg rounded-[16px] bg-surface-container border border-outline-variant shadow-lg">
              <div className="space-y-stack-xs mb-stack-lg">
                <h2 className="font-h2 text-h3 text-on-background">
                  Create Your Account
                </h2>
                <p className="font-body-md text-on-surface-variant">
                  Your journey to mastery starts here. Takes less than 2
                  minutes.
                </p>
              </div>

              <form className="space-y-stack-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                  <div className="space-y-stack-xs">
                    <label
                      htmlFor="name"
                      className="font-label-sm text-on-surface-variant px-1"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      className="w-full bg-surface-container-highest border border-outline-variant text-on-surface rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all outline-none"
                      placeholder="Alan Turing"
                      type="text"
                    />
                  </div>
                  <div className="space-y-stack-xs">
                    <label
                      htmlFor="email"
                      className="font-label-sm text-on-surface-variant px-1"
                    >
                      University Email
                    </label>
                    <input
                      id="email"
                      className="w-full bg-surface-container-highest border border-outline-variant text-on-surface rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all outline-none"
                      placeholder="alan@unihub.edu"
                      type="email"
                    />
                  </div>
                </div>

                <div className="space-y-stack-xs">
                  <label
                    htmlFor="password"
                    className="font-label-sm text-on-surface-variant px-1"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    className="w-full bg-surface-container-highest border border-outline-variant text-on-surface rounded-lg py-3 px-4 focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all outline-none"
                    placeholder="••••••••"
                    type="password"
                  />
                  <p className="font-label-sm text-outline px-1">
                    Min. 8 characters with numbers and symbols
                  </p>
                </div>

                <div className="space-y-stack-xs">
                  <label
                    htmlFor="track"
                    className="font-label-sm text-on-surface-variant px-1"
                  >
                    Select Your Track
                  </label>
                  <div className="relative">
                    <select
                      id="track"
                      className="w-full bg-surface-container-highest border border-outline-variant text-on-surface rounded-lg py-3 px-4 appearance-none focus:ring-2 focus:ring-primary-container focus:border-transparent transition-all outline-none cursor-pointer"
                      defaultValue=""
                    >
                      <option disabled value="">
                        Choose a curriculum
                      </option>
                      <option value="web">Fullstack Web Development</option>
                      <option value="ai">Artificial Intelligence & ML</option>
                      <option value="mobile">Mobile App Engineering</option>
                      <option value="cyber">Cybersecurity & DevOps</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <span className="material-symbols-outlined text-outline">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary-container hover:bg-inverse-primary text-white font-label-md py-4 rounded-lg shadow-sm transition-all transform active:scale-[0.98] mt-4 flex items-center justify-center gap-2"
                >
                  Create My Account
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </button>

                <div className="flex items-center gap-2 justify-center py-2">
                  <span
                    className="material-symbols-outlined text-success text-[16px]"
                    style={{ color: "#10b981" }}
                  >
                    verified_user
                  </span>
                  <p className="font-label-sm text-outline">
                    Secure 256-bit encryption. No spam, ever.
                  </p>
                </div>

                <div className="text-center mt-4">
                  <span className="font-body-sm text-on-surface-variant">
                    Already have an account?{" "}
                  </span>
                  <Link
                    to="/login"
                    className="font-label-md text-primary-container hover:text-primary transition-colors hover:underline"
                  >
                    Log In
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Register;
