import React from "react";

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => (
  <button
    type="button"
    onClick={onLogout}
    className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-200 py-2 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
  >
    <span className="material-symbols-outlined text-sm">logout</span>
    <span>Log Out</span>
  </button>
);

export default LogoutButton;
