import { useState } from 'react';
import { useOnboarding } from '@/hooks/useOnboarding';
import { ProfileSetup } from './ProfileSetup';
import { CompanySetup } from './CompanySetup';
import { AccountsSetup } from './AccountsSetup';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const OnboardingFlow = () => {
  const { onboardingStatus, isOnboardingComplete } = useOnboarding();
  const [currentStep, setCurrentStep] = useState(1);

  if (isOnboardingComplete) {
    return null; // Let the main app render
  }

  const steps = [
    { number: 1, title: 'Profile Setup', completed: onboardingStatus?.profile_completed },
    { number: 2, title: 'Company Details', completed: onboardingStatus?.company_completed },
    { number: 3, title: 'Connect Accounts', completed: onboardingStatus?.accounts_completed }
  ];

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <ProfileSetup onComplete={() => setCurrentStep(2)} />;
      case 2:
        return <CompanySetup onComplete={() => setCurrentStep(3)} />;
      case 3:
        return <AccountsSetup onComplete={() => window.location.reload()} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-subtle to-background p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Welcome to Smart Finance
          </h1>
          <p className="text-muted-foreground mt-2">Let's set up your finance management platform</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4">
            {steps.map((step) => (
              <div key={step.number} className="flex items-center">
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    step.completed 
                      ? 'bg-primary text-primary-foreground shadow-lg' 
                      : currentStep === step.number 
                        ? 'bg-primary/20 text-primary border-2 border-primary'
                        : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step.number}
                </div>
                <span className="ml-2 text-sm font-medium">{step.title}</span>
                {step.completed && <Badge className="ml-2" variant="default">✓</Badge>}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <Card className="max-w-2xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle>Step {currentStep}: {steps[currentStep - 1]?.title}</CardTitle>
          </CardHeader>
          <CardContent>
            {renderCurrentStep()}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};