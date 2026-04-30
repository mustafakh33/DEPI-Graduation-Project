import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "@/context/auth/AuthProvider.tsx";
import AppRouter from "@/router/AppRouter.tsx";
import { Theme } from "@radix-ui/themes/dist/cjs/components/index.js";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { OnboardingProvider } from "@/features/onboarding/context/OnboardingContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <OnboardingProvider>
          <Theme>
            <AppRouter />
          </Theme>
        </OnboardingProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>,
);
