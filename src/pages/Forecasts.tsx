import { Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Forecasts = () => {
  const forecasts = [
    {
      title: "Next 3 Months Revenue",
      prediction: "$150,000",
      confidence: 85,
      trend: "up",
      description: "Based on current growth trends and seasonal patterns"
    },
    {
      title: "Expense Forecast",
      prediction: "$95,000",
      confidence: 78,
      trend: "up",
      description: "Expected increase due to expansion plans"
    },
    {
      title: "Cash Flow Projection",
      prediction: "$55,000",
      confidence: 82,
      trend: "up",
      description: "Positive cash flow expected to continue"
    }
  ];

  const warnings = [
    {
      title: "Expense Spike Warning",
      description: "Unusual increase in operational expenses detected for next month",
      severity: "medium"
    },
    {
      title: "Revenue Dip Alert",
      description: "Potential 15% decrease in revenue during Q2 based on market trends",
      severity: "high"
    }
  ];

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
            <h1 className="text-xl font-bold">Forecasts</h1>
          </div>
          <Button variant="outline">Refresh Forecasts</Button>
        </div>
      </header>

      {/* Content */}
      <div className="p-4 pb-20 space-y-6">
        {/* AI Forecasts */}
        <section>
          <h2 className="text-lg font-semibold mb-4">AI-Generated Forecasts</h2>
          <div className="grid gap-4">
            {forecasts.map((forecast, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold mb-1">{forecast.title}</h3>
                      <p className="text-2xl font-bold text-primary">{forecast.prediction}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {forecast.trend === "up" ? (
                        <TrendingUp className="h-5 w-5 text-success" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-destructive" />
                      )}
                      <Badge variant="outline">{forecast.confidence}% confident</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{forecast.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Forecast Warnings */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Forecast Warnings</h2>
          <div className="space-y-3">
            {warnings.map((warning, index) => (
              <Card key={index} className={`border-l-4 ${
                warning.severity === 'high' ? 'border-l-destructive' : 'border-l-warning'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className={`h-5 w-5 flex-shrink-0 mt-0.5 ${
                      warning.severity === 'high' ? 'text-destructive' : 'text-warning'
                    }`} />
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{warning.title}</h3>
                      <p className="text-sm text-muted-foreground">{warning.description}</p>
                    </div>
                    <Badge variant={warning.severity === 'high' ? 'destructive' : 'secondary'}>
                      {warning.severity}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Forecast Methodology */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>How Forecasts Work</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm">Historical transaction data analysis using machine learning algorithms</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm">Seasonal pattern recognition and market trend integration</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm">Real-time adjustment based on recent financial performance</p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Forecasts;