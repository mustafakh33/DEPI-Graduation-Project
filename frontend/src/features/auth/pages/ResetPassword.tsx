import React, { useState } from "react";
import { Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from "lucide-react";
import AuthLayout from "../../../layouts/AuthLayout";
import { Button } from "@/components/ui/button";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("Medium");

  // Dummy password strength logic
  const getStrength = (password: string) => {
    if (password.length === 0) return "";
    if (password.length >= 12) return "Strong";
    if (password.length >= 8) return "Medium";
    return "Weak";
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    setPasswordStrength(getStrength(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add password update logic
    alert("Password updated!");
  };

  return (
    <AuthLayout
      title="Create new password"
      subtitle="Please enter your new authentication credentials below."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* New Password Field */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-400 ml-1">
            New Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type={showNewPassword ? "text" : "password"}
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-10 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner"
              placeholder="••••••••"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showNewPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <p className="text-xs text-gray-500 ml-1 mt-1">
            At least 8 characters
          </p>
        </div>

        {/* Password Strength Indicator */}
        {passwordStrength && (
          <div className="space-y-1.5 pt-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                Security Strength
              </span>
              <span
                className={`text-[10px] font-bold ${
                  passwordStrength === "Strong"
                    ? "text-emerald-400"
                    : passwordStrength === "Medium"
                      ? "text-blue-400"
                      : "text-rose-400"
                }`}
              >
                {passwordStrength}
              </span>
            </div>
            <div className="flex gap-1.5 h-1.5">
              <div
                className={`flex-1 rounded-full ${passwordStrength !== "Weak" ? "bg-blue-500" : "bg-gray-700"}`}
              ></div>
              <div
                className={`flex-1 rounded-full ${passwordStrength === "Strong" || passwordStrength === "Medium" ? "bg-blue-500" : "bg-gray-700"}`}
              ></div>
              <div
                className={`flex-1 rounded-full ${passwordStrength === "Strong" ? "bg-emerald-500" : "bg-gray-700"}`}
              ></div>
              <div className="flex-1 bg-gray-700 rounded-full"></div>
            </div>
          </div>
        )}

        {/* Confirm Password Field */}
        <div className="space-y-1.5 pt-2">
          <label className="text-sm font-medium text-gray-400 ml-1">
            Confirm Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <ShieldCheck className="h-5 w-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              required
              className="w-full bg-black/40 border border-white/10 rounded-xl pl-11 pr-10 py-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all shadow-inner"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 space-y-3">
          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-gray-200 py-6 rounded-xl font-semibold text-base group transition-all hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
          >
            Update Password
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 bg-transparent border-white/10 text-gray-300 hover:text-white hover:bg-white/5 transition-all rounded-xl"
            onClick={() => {
              setNewPassword("");
              setConfirmPassword("");
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
