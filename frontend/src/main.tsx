import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/auth/AuthProvider.tsx";
import AppRouter from "./router/AppRouter.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>,
);
