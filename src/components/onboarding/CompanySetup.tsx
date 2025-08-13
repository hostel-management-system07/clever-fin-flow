import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useOnboarding } from '@/hooks/useOnboarding';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface CompanySetupProps {
  onComplete: () => void;
}

export const CompanySetup = ({ onComplete }: CompanySetupProps) => {
  const { user } = useAuth();
  const { updateOnboardingStep } = useOnboarding();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    gst_vat_number: '',
    logo_url: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.address.trim()) {
      toast({
        title: "Error",
        description: "Company name and address are required",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Save to localStorage for now
      localStorage.setItem('companyData', JSON.stringify({
        companyName: formData.name,
        address: formData.address,
        gstNumber: formData.gst_vat_number,
        logoUrl: formData.logo_url
      }));
      
      await updateOnboardingStep('company_completed', true);
      toast({
        title: "Success",
        description: "Company setup completed!"
      });
      onComplete();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create company",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your company name"
            required
          />
        </div>

        <div>
          <Label htmlFor="address">Company Address *</Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Enter your company address"
            required
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="gstVat">GST/VAT Number (Optional)</Label>
          <Input
            id="gstVat"
            value={formData.gst_vat_number}
            onChange={(e) => setFormData({ ...formData, gst_vat_number: e.target.value })}
            placeholder="Enter your GST/VAT number"
          />
        </div>

        <div>
          <Label htmlFor="logo">Company Logo URL (Optional)</Label>
          <Input
            id="logo"
            type="url"
            value={formData.logo_url}
            onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
            placeholder="Enter your company logo URL"
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Creating Company...' : 'Continue to Account Setup'}
      </Button>
    </form>
  );
};