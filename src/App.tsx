import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useOnboarding } from "@/hooks/useOnboarding";
import { AuthForm } from "@/components/auth/AuthForm";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import Dashboard from "@/components/dashboard/Dashboard";
import Transactions from "@/pages/Transactions";
import Reports from "@/pages/Reports";
import Forecasts from "@/pages/Forecasts";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, loading: authLoading } = useAuth();
  const { isOnboardingComplete, loading: onboardingLoading } = useOnboarding();

  if (authLoading || onboardingLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  if (!isOnboardingComplete) {
    return <OnboardingFlow />;
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/forecasts" element={<Forecasts />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
