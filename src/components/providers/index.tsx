import { type ReactNode } from "react";
import { Toaster } from "sonner";
import { AuthProvider } from "./auth-provider";
import { ModalProvider } from "./modal-provider";
import { ThemeProvider } from "./theme-provider";
import { GlobalExperience } from "./global-experience";
import { BetSlipProvider } from "./betslip-provider";
import { SessionGuard } from "./session-guard";
import { PWAInstallPrompt } from "./pwa-install-prompt";
import { KeyboardShortcuts } from "./keyboard-shortcuts";
import { ProductionTelemetry } from "./production-telemetry";
import { ServiceWorkerRegister } from "./service-worker-register";
import type { AuthUser } from "@/lib/auth";

export function Providers({ initialUser, children }: { initialUser: AuthUser | null; children: ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider initialUser={initialUser}>
        <ModalProvider>
          <BetSlipProvider>
            {children}
          </BetSlipProvider>
          <SessionGuard />
          <PWAInstallPrompt />
          <KeyboardShortcuts />
          <ProductionTelemetry />
          <ServiceWorkerRegister />
          <GlobalExperience />
          <Toaster
            position="top-center"
            theme="dark"
            richColors
            toastOptions={{
              style: {
                background: "#1b1c1e",
                border: "1px solid #2a2c30",
                color: "#f0f0f0",
              },
            }}
          />
        </ModalProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
