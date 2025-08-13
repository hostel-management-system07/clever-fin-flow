import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, User, Building, Bell, CreditCard, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('profileData');
    return saved ? JSON.parse(saved) : {
      name: '',
      email: '',
      phone: '',
      currency: 'USD'
    };
  });

  const [companyData, setCompanyData] = useState(() => {
    const saved = localStorage.getItem('companyData');
    return saved ? JSON.parse(saved) : {
      companyName: '',
      address: '',
      gstNumber: '',
      logoUrl: ''
    };
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    pushNotifications: false,
    weeklyReports: true,
    largeTransactions: true
  });

  const [alertThresholds, setAlertThresholds] = useState({
    largePaymentAmount: 5000,
    lowCashFlowThreshold: 1000
  });

  const handleProfileSave = () => {
    localStorage.setItem('profileData', JSON.stringify(profileData));
    toast({
      title: "Profile Updated",
      description: "Your profile settings have been saved successfully."
    });
  };

  const handleCompanySave = () => {
    localStorage.setItem('companyData', JSON.stringify(companyData));
    toast({
      title: "Company Updated",
      description: "Your company settings have been saved successfully."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-bold">Settings</h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="p-4 pb-20">
        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              Company
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-1">
              <Bell className="h-4 w-4" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-1">
              <CreditCard className="h-4 w-4" />
              Banks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={profileData.currency} onValueChange={(value) => setProfileData({ ...profileData, currency: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="INR">INR - Indian Rupee</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleProfileSave}>Save Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="company">
            <Card>
              <CardHeader>
                <CardTitle>Company Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    value={companyData.companyName}
                    onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    value={companyData.address}
                    onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gstNumber">GST/VAT Number</Label>
                    <Input
                      id="gstNumber"
                      value={companyData.gstNumber}
                      onChange={(e) => setCompanyData({ ...companyData, gstNumber: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="logoUrl">Logo URL</Label>
                    <Input
                      id="logoUrl"
                      value={companyData.logoUrl}
                      onChange={(e) => setCompanyData({ ...companyData, logoUrl: e.target.value })}
                    />
                  </div>
                </div>
                <Button onClick={handleCompanySave}>Save Company</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle>Alert Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Notification Preferences</h3>
                  <div className="space-y-3">
                    {Object.entries(notifications).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <Label htmlFor={key} className="capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </Label>
                        <Switch
                          id={key}
                          checked={value}
                          onCheckedChange={(checked) =>
                            setNotifications({ ...notifications, [key]: checked })
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Alert Thresholds</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="largePaymentAmount">Large Payment Alert ($)</Label>
                      <Input
                        id="largePaymentAmount"
                        type="number"
                        value={alertThresholds.largePaymentAmount}
                        onChange={(e) => setAlertThresholds({
                          ...alertThresholds,
                          largePaymentAmount: Number(e.target.value)
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lowCashFlowThreshold">Low Cash Flow Alert ($)</Label>
                      <Input
                        id="lowCashFlowThreshold"
                        type="number"
                        value={alertThresholds.lowCashFlowThreshold}
                        onChange={(e) => setAlertThresholds({
                          ...alertThresholds,
                          lowCashFlowThreshold: Number(e.target.value)
                        })}
                      />
                    </div>
                  </div>
                </div>

                <Button>Save Alert Settings</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations">
            <Card>
              <CardHeader>
                <CardTitle>Bank Integrations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="font-semibold mb-2">Secure Bank Connections</h3>
                  <p className="text-muted-foreground mb-4">
                    Connect your bank accounts and payment processors for automatic transaction sync.
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full" disabled>
                      Connect Bank Account (Coming Soon)
                    </Button>
                    <Button variant="outline" className="w-full" disabled>
                      Connect Payment Gateway (Coming Soon)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;