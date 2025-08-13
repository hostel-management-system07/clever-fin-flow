import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useOnboarding } from '@/hooks/useOnboarding';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

interface ProfileSetupProps {
  onComplete: () => void;
}

export const ProfileSetup = ({ onComplete }: ProfileSetupProps) => {
  const { user, profile } = useAuth();
  const { updateOnboardingStep } = useOnboarding();
  const [formData, setFormData] = useState({
    name: profile?.name || user?.user_metadata?.full_name || '',
    email: profile?.email || user?.email || '',
    phone: profile?.phone || '',
    currency: profile?.currency || 'USD',
    avatar_url: profile?.avatar_url || user?.user_metadata?.avatar_url || ''
  });
  const [loading, setLoading] = useState(false);

  const currencies = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'INR', label: 'INR - Indian Rupee' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'AUD', label: 'AUD - Australian Dollar' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast({
        title: "Error",
        description: "Name is required",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Save to localStorage for now
      localStorage.setItem('profileData', JSON.stringify(formData));
      
      await updateOnboardingStep('profile_completed', true);
      toast({
        title: "Success",
        description: "Profile setup completed!"
      });
      onComplete();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-center mb-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={formData.avatar_url} />
          <AvatarFallback className="text-lg">
            {formData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            disabled
            className="bg-muted"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <Label htmlFor="currency">Preferred Currency</Label>
          <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((currency) => (
                <SelectItem key={currency.value} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Saving...' : 'Continue to Company Setup'}
      </Button>
    </form>
  );
};