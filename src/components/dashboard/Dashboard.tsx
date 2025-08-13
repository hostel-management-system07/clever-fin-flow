import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Home, List, Presentation, TrendingUp, Settings, Plus, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Dashboard = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [companyData, setCompanyData] = useState<any>(null);

  useEffect(() => {
    // Load saved data from localStorage
    const savedProfile = localStorage.getItem('profileData');
    const savedCompany = localStorage.getItem('companyData');
    
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile));
    }
    if (savedCompany) {
      setCompanyData(JSON.parse(savedCompany));
    }
  }, []);

  const metrics = [
    { label: "Revenue", value: "$120,000", change: "+10%", positive: true },
    { label: "Expenses", value: "$80,000", change: "-5%", positive: false },
    { label: "Profit", value: "$40,000", change: "+15%", positive: true },
    { label: "Cash Flow", value: "$25,000", change: "+8%", positive: true },
    { label: "Debts/Liabilities", value: "$15,000", change: "-3%", positive: false },
    { label: "Assets Value", value: "$100,000", change: "+12%", positive: true },
  ];

  const alerts = [
    { title: "Large Payment Received", description: "Unusual transaction detected", type: "info" },
    { title: "Low Cash Flow", description: "Risk warning", type: "warning" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={companyData?.logoUrl || profileData?.avatar_url} />
              <AvatarFallback>
                {companyData?.companyName?.charAt(0) || 'C'}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-xl font-bold">
              {companyData?.companyName || "Your Company"}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={profileData?.avatar_url} />
                    <AvatarFallback>
                      {profileData?.name?.split(' ').map((n: string) => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium">{profileData?.name || 'User'}</p>
                  <p className="text-xs text-muted-foreground">{profileData?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 pb-20">
        {/* Financial Metrics */}
        <section className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((metric, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className={`text-sm font-medium ${
                        metric.positive ? 'text-success' : 'text-destructive'
                      }`}>
                        {metric.change}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Action Buttons */}
        <section className="mb-6">
          <div className="flex flex-wrap gap-3">
            <Link to="/transactions">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Transaction
              </Button>
            </Link>
            <Button variant="outline">Generate Report</Button>
            <Button variant="outline">Run Forecast</Button>
          </div>
        </section>

        {/* Charts Section */}
        <section className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Income vs. Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-3xl font-bold">$120K vs $80K</p>
                  <p className="text-sm text-muted-foreground">This Year</p>
                </div>
                <Badge variant="outline" className="text-success">+10%</Badge>
              </div>
              <div className="h-48 bg-muted/50 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Chart visualization coming soon</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* AI Alerts */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-4">AI Alerts</h2>
          <div className="space-y-3">
            {alerts.map((alert, index) => (
              <Card key={index} className="border-l-4 border-l-warning">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-warning flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium">{alert.title}</p>
                      <p className="text-sm text-muted-foreground">{alert.description}</p>
                    </div>
                    <Button variant="ghost" size="sm">Mark as Resolved</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t backdrop-blur-sm">
        <div className="flex justify-around p-2">
          <Link to="/dashboard" className="flex flex-col items-center p-2 text-primary">
            <Home className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Dashboard</span>
          </Link>
          <Link to="/transactions" className="flex flex-col items-center p-2 text-muted-foreground hover:text-foreground">
            <List className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Transactions</span>
          </Link>
          <Link to="/reports" className="flex flex-col items-center p-2 text-muted-foreground hover:text-foreground">
            <Presentation className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Reports</span>
          </Link>
          <Link to="/forecasts" className="flex flex-col items-center p-2 text-muted-foreground hover:text-foreground">
            <TrendingUp className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Forecasts</span>
          </Link>
          <Link to="/settings" className="flex flex-col items-center p-2 text-muted-foreground hover:text-foreground">
            <Settings className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium">Settings</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;