import { useEffect } from "react";

/**
 * Ensures `dark` on `<html>` for dashboard shells (matches portal reference).
 * Restores the previous class state on unmount.
 */
export function useForceDashboardTheme() {
  useEffect(() => {
    const root = document.documentElement;
    const hadDark = root.classList.contains("dark");
    if (!hadDark) root.classList.add("dark");
    return () => {
      if (!hadDark) root.classList.remove("dark");
    };
  }, []);
}
