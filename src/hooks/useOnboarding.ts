import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

interface OnboardingStatus {
  profile_completed: boolean;
  company_completed: boolean;
  accounts_completed: boolean;
}

export const useOnboarding = () => {
  const { user } = useAuth();
  const [onboardingStatus, setOnboardingStatus] = useState<OnboardingStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOnboardingStatus();
    }
  }, [user]);

  const fetchOnboardingStatus = async () => {
    try {
      // Check localStorage for onboarding status
      const saved = localStorage.getItem(`onboarding_${user?.id}`);
      if (saved) {
        setOnboardingStatus(JSON.parse(saved));
      } else {
        setOnboardingStatus({
          profile_completed: false,
          company_completed: false,
          accounts_completed: false,
        });
      }
    } catch (error) {
      console.error('Error fetching onboarding status:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOnboardingStep = async (step: keyof OnboardingStatus, completed: boolean) => {
    if (!user || !onboardingStatus) return;

    const updated = { ...onboardingStatus, [step]: completed };
    setOnboardingStatus(updated);
    localStorage.setItem(`onboarding_${user.id}`, JSON.stringify(updated));
  };

  const isOnboardingComplete = onboardingStatus?.profile_completed && 
                              onboardingStatus?.company_completed && 
                              onboardingStatus?.accounts_completed;

  return {
    onboardingStatus,
    loading,
    updateOnboardingStep,
    isOnboardingComplete,
  };
};