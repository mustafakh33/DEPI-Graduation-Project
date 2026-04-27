import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/auth/AuthProvider.tsx";
import AppRouter from "./router/AppRouter.tsx";
import { Theme } from "@radix-ui/themes/dist/cjs/components/index.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      	<Theme>
      <AppRouter />
        </Theme>
    </AuthProvider>
  </StrictMode>,
);
