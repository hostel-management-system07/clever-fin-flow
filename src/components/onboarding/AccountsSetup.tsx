import { useState } from 'react';
import { useOnboarding } from '@/hooks/useOnboarding';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface AccountsSetupProps {
  onComplete: () => void;
}

export const AccountsSetup = ({ onComplete }: AccountsSetupProps) => {
  const { updateOnboardingStep } = useOnboarding();
  const [loading, setLoading] = useState(false);

  const handleSkip = async () => {
    setLoading(true);
    try {
      await updateOnboardingStep('accounts_completed', true);
      toast({
        title: "Setup Complete",
        description: "You can connect accounts later from settings"
      });
      onComplete();
    } catch (error) {
      console.error('Error completing onboarding:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-muted-foreground">
          Connect your accounts to automatically sync transactions and get real-time insights
        </p>
      </div>

      <div className="grid gap-4">
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Bank Accounts
              <Badge variant="outline">Coming Soon</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Connect your bank accounts to automatically import transactions
            </p>
            <Button variant="outline" disabled className="w-full">
              Connect Bank Account
            </Button>
          </CardContent>
        </Card>

        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Payment Gateways
              <Badge variant="outline">Coming Soon</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Connect Stripe, PayPal, or other payment processors
            </p>
            <Button variant="outline" disabled className="w-full">
              Connect Payment Gateway
            </Button>
          </CardContent>
        </Card>

        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>Import from CSV</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Import your existing transaction data from CSV files
            </p>
            <Button variant="outline" disabled className="w-full">
              Import CSV File
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center pt-4">
        <Button onClick={handleSkip} disabled={loading} className="min-w-32">
          {loading ? 'Completing...' : 'Skip for Now'}
        </Button>
      </div>

      <p className="text-xs text-center text-muted-foreground">
        You can set up these integrations later from the Settings page
      </p>
    </div>
  );
};