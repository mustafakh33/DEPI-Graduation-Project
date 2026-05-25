import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, RefreshCw, LifeBuoy, Info, ArrowLeft, ArrowRight } from "lucide-react";
import AuthLayout from "../../../layouts/AuthLayout";
import { Button } from "@/components/ui/button";

const VerifyCode: React.FC = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(59);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  return (
    <AuthLayout 
      title="Reset link sent!" 
      subtitle="We sent a 6-digit code to your email. Enter it below to continue."
    >
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.15)]">
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
      </div>

      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/forgot-password/reset");
        }}
      >
        <div className="space-y-1.5">
          <label htmlFor="verify-code" className="text-sm font-medium text-gray-400 ml-1">
            Verification Code
          </label>
          <input
            id="verify-code"
            name="verify-code"
            inputMode="numeric"
            maxLength={6}
            placeholder="000000"
            required
            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-center tracking-[0.5em] text-2xl text-white placeholder:text-gray-700 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner font-mono"
          />
        </div>

        <Button 
          type="submit"
          className="w-full bg-white text-black hover:bg-gray-200 py-6 rounded-xl font-semibold text-base group transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          Verify Code
          <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </form>

      <div className="mt-6 space-y-3">
        <Button
          type="button"
          disabled={timeLeft > 0}
          variant="outline"
          className="w-full h-12 bg-transparent border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${timeLeft === 0 ? '' : 'opacity-50'}`} />
          {timeLeft > 0 ? `Resend code (00:${timeLeft.toString().padStart(2, '0')})` : 'Resend code'}
        </Button>

        <Button
          type="button"
          variant="ghost"
          className="w-full h-12 text-gray-400 hover:text-white hover:bg-white/5 transition-all rounded-xl"
        >
          <LifeBuoy className="w-4 h-4 mr-2" />
          Contact support
        </Button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400/80 text-sm">
        <Info className="w-4 h-4" />
        <span>The code will expire in 30 minutes</span>
      </div>

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

export default VerifyCode;

