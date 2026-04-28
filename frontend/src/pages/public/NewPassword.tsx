import React, { useState } from "react";

const NewPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("Medium");

  // Dummy password strength logic
  const getStrength = (password: string) => {
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
    <div
      className="min-h-screen flex flex-col font-body-md antialiased"
      style={{ background: "#11131b" }}
    >
      {/* TopAppBar */}

      <main className="flex-grow flex items-center justify-center px-6 pt-24 pb-16 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-container opacity-10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary-container opacity-10 blur-[120px] rounded-full"></div>
        <div className="w-full max-w-md z-10">
          {/* Form Card */}
          <div className="bg-surface-container-low border border-outline-variant shadow-lg rounded-xl p-stack-lg">
            <div className="text-center mb-stack-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-container/10 text-primary-container mb-stack-md">
                <span className="material-symbols-outlined text-[28px]">
                  lock_reset
                </span>
              </div>
              <h1 className="font-h3 text-h3 text-on-surface mb-stack-sm">
                Create a new password
              </h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Please enter your new authentication credentials below.
              </p>
            </div>
            <form className="space-y-stack-md" onSubmit={handleSubmit}>
              {/* New Password Field */}
              <div className="space-y-stack-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant block ml-1">
                  New Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px]">
                    lock
                  </span>
                  <input
                    className="w-full bg-surface-container border border-outline-variant rounded-lg py-3 pl-10 pr-10 text-on-surface focus:ring-1 focus:ring-primary-container focus:border-primary-container transition-all outline-none"
                    placeholder="••••••••"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                    type="button"
                    onClick={() => setShowNewPassword((v) => !v)}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showNewPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
                <p className="text-[11px] font-medium text-on-surface-variant/70 ml-1">
                  At least 8 characters
                </p>
              </div>
              {/* Password Strength Indicator */}
              <div className="space-y-stack-xs pt-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[11px] font-semibold text-on-surface-variant uppercase tracking-wider">
                    Security Strength
                  </span>
                  <span className="text-[11px] font-bold text-secondary">
                    {passwordStrength}
                  </span>
                </div>
                <div className="flex gap-1.5 h-1.5">
                  <div
                    className={`flex-1 ${passwordStrength !== "Weak" ? "bg-secondary" : "bg-outline-variant"} rounded-full`}
                  ></div>
                  <div
                    className={`flex-1 ${passwordStrength === "Strong" || passwordStrength === "Medium" ? "bg-secondary" : "bg-outline-variant"} rounded-full`}
                  ></div>
                  <div
                    className={`flex-1 ${passwordStrength === "Strong" ? "bg-secondary" : "bg-outline-variant"} rounded-full`}
                  ></div>
                  <div className="flex-1 bg-outline-variant rounded-full"></div>
                </div>
              </div>
              {/* Confirm Password Field */}
              <div className="space-y-stack-xs pt-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant block ml-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px]">
                    verified_user
                  </span>
                  <input
                    className="w-full bg-surface-container border border-outline-variant rounded-lg py-3 pl-10 pr-10 text-on-surface focus:ring-1 focus:ring-primary-container focus:border-primary-container transition-all outline-none"
                    placeholder="••••••••"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              {/* Action Buttons */}
              <div className="pt-stack-md space-y-3">
                <button
                  className="w-full bg-[#2563eb] text-[#f9fafb] font-label-md py-3.5 rounded-lg shadow-sm hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  type="submit"
                >
                  Update Password
                  <span className="material-symbols-outlined text-[18px]">
                    arrow_forward
                  </span>
                </button>
                <button
                  className="w-full border border-outline-variant text-on-surface font-label-md py-3 rounded-lg hover:bg-surface-variant/30 active:scale-[0.98] transition-all"
                  type="button"
                  onClick={() => {
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewPasswordPage;
