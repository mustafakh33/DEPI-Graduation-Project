import React from "react";
import { Link, useNavigate } from "react-router";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";
import AuthLayout from "../../../layouts/AuthLayout";
import { Button } from "@/components/ui/button";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout 
      title="Forgot your password?" 
      subtitle="No worries. Enter your email and we'll send you a recovery link."
    >
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/forgot-password/verify-code");
        }}
      >
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
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
          <p className="text-xs text-gray-500 ml-1 mt-1">
            Use the email associated with your account
          </p>
        </div>

        <Button 
          type="submit"
          className="w-full bg-white text-black hover:bg-gray-200 py-6 rounded-xl font-semibold text-base group transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          Send Reset Link
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>

      <div className="mt-8 text-center">
        <Link
          to="/login"
          className="inline-flex items-center text-sm text-gray-400 hover:text-blue-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Login
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;

