import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import AuthLayout from "../../../layouts/AuthLayout";
import { Button } from "@/components/ui/button";

import { useOnboarding } from "@/features/onboarding/context/OnboardingContext";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { completeSignup } = useOnboarding();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    completeSignup({
      email: String(formData.get("email") || "student@unihub.edu"),
      name: String(formData.get("name") || "Alex"),
    });
    navigate("/track-selection");
  };

  return (
    <AuthLayout
      title="Create an account"
      subtitle="Master in-demand tech skills with real accountability"
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-1.5">
          <label
            htmlFor="name"
            className="text-sm font-medium text-gray-400 ml-1"
          >
            Full Name
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Alan Turing"
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-400 ml-1"
          >
            University Email
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="student@unihub.edu"
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-400 ml-1"
          >
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              id="password"
              name="password"
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
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 ml-1 mt-1">
            Min. 8 characters with numbers and symbols
          </p>
        </div>

        <Button
          type="submit"
          className="w-full bg-white text-black hover:bg-gray-200 py-6 rounded-xl font-semibold text-base group transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] mt-4"
        >
          Create Account
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>

      <div className="mt-8 text-center space-y-4">
        <p className="text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white font-medium hover:text-blue-400 transition-colors"
          >
            Sign In
          </Link>
        </p>
        <div className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
          <ShieldCheck className="w-4 h-4 text-green-500/70" />
          <span>Secure 256-bit encryption. No spam, ever.</span>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Register;
