import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";

export function useLogout(loginPath = "/login") {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return useCallback(() => {
    logout();
    navigate(loginPath);
  }, [logout, navigate, loginPath]);
}
