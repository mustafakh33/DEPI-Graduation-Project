import React from "react";
import { Button } from "@/components/ui/button";

interface LogoutButtonProps {
  onLogout: () => void;
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => (
  <Button type="button" variant="secondary" className="w-full" onClick={onLogout}>
    <span className="material-symbols-outlined text-sm">logout</span>
    <span>Log Out</span>
  </Button>
);

export default LogoutButton;
