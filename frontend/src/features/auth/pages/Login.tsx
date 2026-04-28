import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react";
import AuthLayout from "../../../layouts/AuthLayout";
import { Button } from "@/components/ui/button";

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
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    navigate(roleRedirects[role]);
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Log in to access your digital campus dashboard"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="email"
              placeholder="student@unihub.edu"
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-400 ml-1">Password</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-10 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Development Mock Role Selector */}
        <div className="space-y-1.5 pt-2">
          <label className="text-xs font-medium text-blue-400/80 uppercase tracking-wider ml-1">
            Dev Only: Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
            className="w-full bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3 text-blue-100 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer"
          >
            {roles.map((r) => (
              <option key={r} value={r} className="bg-[#18181b] text-white">
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                className="peer sr-only"
              />
              <div className="w-4 h-4 rounded bg-black/40 border border-white/20 peer-checked:bg-blue-600 peer-checked:border-blue-500 transition-all flex items-center justify-center">
                <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
          </label>
          <Link
            to="/forgot-password"
            className="text-sm text-blue-400 hover:text-blue-300 hover:underline transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <Button 
          type="submit"
          className="w-full bg-white text-black hover:bg-gray-200 py-6 rounded-xl font-semibold text-base group transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] mt-2"
        >
          Sign In
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>

      <div className="mt-8 text-center space-y-4">
        <p className="text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-white font-medium hover:text-blue-400 transition-colors">
            Create an account
          </Link>
        </p>
        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
          <ShieldCheck className="w-4 h-4" />
          <span>Secure, encrypted login</span>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
