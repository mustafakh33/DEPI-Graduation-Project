import React, { useState } from "react";
import { Link, useNavigate } from "react-router";

import type { Role } from "../../../types/global.types";
import { useAuth } from "../../../hooks/useAuth";

const roles: Role[] = ["student", "instructor", "mentor", "admin"];

const roleRedirects: Record<Role, string> = {
  student: "/student/dashboard",
  instructor: "/instructor/dashboard",
  mentor: "/mentor/dashboard",
  admin: "/admin/dashboard",
};

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState<Role>("student");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    navigate(roleRedirects[role]);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background text-on-background selection:bg-primary-container selection:text-on-primary-container">
      <section className="hidden md:flex md:w-1/2 relative overflow-hidden flex-col justify-end p-margin items-start">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 login-image-overlay z-10"></div>
          <img
            alt="Campus Architecture"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY8tuR_tHQDyM89kD-hYna1qVi3OEm1-fcFxv2nwZfQjzvQZylYfMwBdeqcEu2WbG_t-CL1mGdEmv4_jmrM6vhM4l7L1y0QfZmHcMH1Y75sil6pulYxjGhHUgU7sf2J0nL6T1Z0DENJ2O2yVfMwi424zv7eOa5ZrrrcmkjzDS2RUwEEIkwTit2ofNYuECOvUfqhdXt_HEaz_5Y--AINVws0hb7uUJ4p5pVW0ladmTNGHHL3LVPLhy_40aK0lZJK68ZnNqFJpRvSts"
          />
        </div>
        <div className="relative z-20 max-w-lg">
          <div className="mb-stack-lg">
            <h1 className="font-h1 text-h1 text-on-background tracking-tight mb-stack-xs uppercase">
              WELCOME BACK,
            </h1>
            <span className="font-h1 text-h1 text-primary-container font-extrabold uppercase block mb-stack-md">
              STUDENT
            </span>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Your academic progress is waiting for you.
            </p>
          </div>
          <div className="glass-panel rounded-xl p-stack-md w-full mb-stack-lg">
            <div className="flex justify-between items-center mb-stack-sm">
              <span className="font-label-md text-label-md text-primary">
                FALL 2024 semester
              </span>
              <span className="font-label-md text-label-md text-on-surface">
                37% through your journey
              </span>
            </div>
            <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
              <div className="bg-primary-container h-full w-[37%] rounded-full shadow-[0_0_8px_rgba(37,99,235,0.6)]"></div>
            </div>
          </div>
          <div className="flex flex-col gap-1 opacity-60">
            <div className="flex items-center gap-2 font-label-sm text-label-sm text-outline">
              <span
                className="material-symbols-outlined text-[14px]"
                style={{
                  fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                }}
              >
                terminal
              </span>
              SYSTEM VERSION 4.0.2 // TERMINAL ACCESS RESTRICTED
            </div>
            <div className="flex items-center gap-2 font-label-sm text-label-sm text-primary">
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                sync
              </span>
              ACADEMIC PROGRESS SYNCED
            </div>
          </div>
        </div>
      </section>

      <section className="flex-grow md:w-1/2 bg-surface-container-lowest flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-stack-lg text-center md:text-left">
            <h2 className="font-h2 text-h2 text-on-surface mb-stack-xs uppercase">
              LOG IN TO YOUR ACCOUNT
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Access your digital campus dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-stack-md">
            <div className="space-y-stack-xs">
              <label className="font-label-sm text-label-sm text-on-surface-variant ml-1 uppercase">
                UNIVERSITY EMAIL
              </label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all placeholder:text-outline/50"
                  placeholder="student@unihub.edu"
                  type="email"
                />
              </div>
            </div>

            <div className="space-y-stack-xs">
              <label className="font-label-sm text-label-sm text-on-surface-variant ml-1 uppercase">
                SECURE PASSWORD
              </label>
              <div className="relative">
                <input
                  className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all placeholder:text-outline/50"
                  placeholder="••••••••"
                  type="password"
                />
              </div>
            </div>

            {/* Development Mock Role Selector */}
            <div className="space-y-stack-xs pt-2">
              <label className="font-label-sm text-label-sm text-on-surface-variant ml-1 uppercase">
                DEVELOPMENT: SELECT ROLE TO LOGIN AS
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as Role)}
                className="w-full bg-surface-container border border-outline-variant rounded-lg px-4 py-3 text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between items-center py-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  className="w-4 h-4 rounded border-outline-variant bg-surface-container text-primary-container focus:ring-offset-background"
                  type="checkbox"
                />
                <span className="font-label-sm text-label-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
                className="font-label-sm text-label-sm text-primary-container hover:underline uppercase tracking-tight"
              >
                FORGOT PASSWORD?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-primary-container text-white py-4 rounded-lg font-label-md text-label-md uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-inverse-primary shadow-lg active:scale-[0.98] transition-all"
            >
              LOG IN <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </form>

          <div className="mt-stack-lg text-center space-y-4">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              New to the campus?{" "}
              <Link
                to="/register"
                className="text-primary font-bold hover:underline"
              >
                ENROL NOW
              </Link>
            </p>
            <div className="flex flex-col gap-2 opacity-50">
              <p className="font-label-sm text-label-sm italic tracking-tight">
                Takes less than a minute
              </p>
              <p className="font-label-sm text-label-sm flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-[14px]">
                  verified_user
                </span>
                Secure platform. Your data is protected.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
