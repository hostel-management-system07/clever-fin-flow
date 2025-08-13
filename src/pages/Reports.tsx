import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Reports = () => {
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-01-31');

  const profitLossData = {
    revenue: 120000,
    expenses: 80000,
    profit: 40000,
    profitMargin: 33.33
  };

  const cashFlowData = {
    cashIn: 150000,
    cashOut: 125000,
    netCashFlow: 25000
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
            <h1 className="text-xl font-bold">Reports</h1>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </header>

      {/* Content */}
      <div className="p-4 pb-20">
        {/* Date Range Selector */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Report Period
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reports Tabs */}
        <Tabs defaultValue="profit-loss" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profit-loss">Profit & Loss</TabsTrigger>
            <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
            <TabsTrigger value="tax-ready">Tax Ready</TabsTrigger>
          </TabsList>

          <TabsContent value="profit-loss">
            <Card>
              <CardHeader>
                <CardTitle>Profit & Loss Statement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Total Revenue</span>
                  <span className="text-success font-bold">${profitLossData.revenue.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Total Expenses</span>
                  <span className="text-destructive font-bold">${profitLossData.expenses.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-primary">
                  <span className="font-bold">Net Profit</span>
                  <span className="text-primary font-bold text-lg">${profitLossData.profit.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-medium">Profit Margin</span>
                  <span className="font-bold">{profitLossData.profitMargin}%</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cash-flow">
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Statement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Cash Inflow</span>
                  <span className="text-success font-bold">${cashFlowData.cashIn.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="font-medium">Cash Outflow</span>
                  <span className="text-destructive font-bold">${cashFlowData.cashOut.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-primary">
                  <span className="font-bold">Net Cash Flow</span>
                  <span className="text-primary font-bold text-lg">${cashFlowData.netCashFlow.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tax-ready">
            <Card>
              <CardHeader>
                <CardTitle>Tax Ready Report</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Tax report will be generated based on your transactions and business setup.</p>
                  <Button>Generate Tax Report</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;