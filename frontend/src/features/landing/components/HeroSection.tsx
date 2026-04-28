import React from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
    <header className="relative min-h-screen pt-32 pb-20 overflow-hidden dot-grid">
      <div className="absolute inset-0 hero-glow"></div>
      <div className="relative max-w-container-max mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary-container/10 border border-primary-container/20 text-primary-fixed text-label-sm font-label-sm">
            <span
              className="material-symbols-outlined text-sm mr-2"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            Structured Learning. Real Results.
          </span>
          <h1 className="font-h1 text-h1 text-white leading-tight">
            The Online University
            <br />
            <span className="text-primary-container">
              That Keeps You Accountable
            </span>
            <br />
            And Gets You Hired
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            UniHub transforms self-learning into a real academic experience with
            semesters, batches, mentors, and project-based evaluation. Join a
            system built to make you graduate.{" "}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button variant="heroPrimary" size="hero" asChild>
              <Link to="/register">Start Learning Free</Link>
            </Button>
            <Button variant="heroOutline" size="hero">
              See How It Works
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </Button>
          </div>
        </div>
        <div className="relative lg:block hidden">
          <div className="glass-card rounded-2xl p-6 shadow-2xl relative z-10">
            <img
              alt="Student Dashboard"
              className="rounded-lg w-full"
              data-alt="clean minimal student dashboard ui showing progress charts and course modules in a dark tech aesthetic"
              src="./landing_hero.png"
            />
            <div className="absolute -top-6 -right-6 glass-card p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce shadow-primary-container/10">
              <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined">grade</span>
              </div>
              <div>
                <p className="text-white font-label-md text-label-md">
                  Grade Received
                </p>
                <p className="text-secondary text-label-sm font-label-sm">
                  A+ on Project Build
                </p>
              </div>
            </div>
            <div className="absolute -bottom-10 -left-10 glass-card p-4 rounded-xl shadow-xl flex items-center gap-4 border-l-4 border-primary-container">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-surface-dim"></div>
                <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-surface-dim"></div>
                <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-surface-dim"></div>
              </div>
              <p className="text-white font-label-sm text-label-sm">
                34 students active now
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
