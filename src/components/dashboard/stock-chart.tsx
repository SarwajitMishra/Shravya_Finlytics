
"use client";

import { useState, useEffect } from 'react';
import {
  BarChart as BarChartIcon,
  CandlestickChart as CandlestickChartIcon,
  LineChart as LineChartIcon,
  Sparkles,
  PieChart,
  TrendingUp,
  TrendingDown,
  Minus,
  MessageCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { autoTriggerFeedback } from "@/ai/flows/auto-trigger-feedback";
import type { StockChartData } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { useStock } from '@/hooks/use-stock';

function useStockData(ticker: string | null) {
    const [data, setData] = useState<StockChartData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!ticker) {
            setData(null);
            setLoading(false);
            return;
        }

        async function fetchStockData() {
            setLoading(true);
            setError(null);
            setData(null);

            const to = Math.floor(Date.now() / 1000);
            const from = to - (30 * 24 * 60 * 60); // 30 days ago

            try {
                const response = await fetch(`/api/stock?ticker=${ticker}&from=${from}&to=${to}`);
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || `Failed to fetch stock data for ${ticker}`);
                }
                const stockData = await response.json();
                setData(stockData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An unknown error occurred');
            } finally {
                setLoading(false);
            }
        }
        fetchStockData();
    }, [ticker]);

    return { data, loading, error };
}

export default function StockChart() {
  const { selectedStock } = useStock();
  
  return (
    <Card className="h-full flex flex-col">
        <CardHeader className="flex flex-col md:flex-row md:items-start md:justify-between">
            <StockHeader ticker={selectedStock} />
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <AIInsight ticker={selectedStock} />

          <div className="mt-4">
            <ChartViews ticker={selectedStock} />
          </div>

          <div className="mt-4 pt-4 border-t flex flex-wrap gap-2 justify-center">
            <Button variant="outline"><MessageCircle /> Ask AI About This Stock</Button>
            <Button variant="outline"><PieChart /> Compare with Industry</Button>
          </div>
        </CardContent>
    </Card>
  );
}

function StockHeader({ ticker }: { ticker: string | null }) {
    const { data, loading, error } = useStockData(ticker);

    const sentimentIcons = {
        positive: <TrendingUp className="text-green-500" />,
        negative: <TrendingDown className="text-red-500" />,
        neutral: <Minus className="text-gray-500" />
    };
    
    const getSentiment = (changeType: "positive" | "negative") => {
        return changeType === 'positive' ? sentimentIcons.positive : sentimentIcons.negative;
    }

    if (loading) return <StockHeaderSkeleton />;
    if (error) return <div className="text-red-500 p-2">{error}</div>;
    if (!data) return (
      <div>
        <CardTitle className="font-headline">Select a Stock</CardTitle>
        <CardDescription>Search for a stock to see its chart and insights.</CardDescription>
      </div>
    );

    return (
        <div className="flex-1">
            <CardTitle className="font-headline">{data.name} ({data.ticker})</CardTitle>
            <div className="flex items-baseline gap-2 pt-2">
                <span className="text-3xl font-bold">{data.price}</span>
                <span
                className={cn("font-semibold flex items-center gap-1",
                    data.changeType === "positive"
                    ? "text-green-600"
                    : "text-red-600"
                )}
                >
                {getSentiment(data.changeType)}
                {data.change}
                </span>
            </div>
        </div>
    );
}

function StockHeaderSkeleton() {
    return (
        <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <div className="flex items-baseline gap-2 pt-2">
                <Skeleton className="h-9 w-32" />
                <Skeleton className="h-6 w-24" />
            </div>
        </div>
    )
}

function AIInsight({ticker}: {ticker: string | null}) {
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: stockData } = useStockData(ticker);

  useEffect(() => {
    if (!ticker) {
      setAiInsight('');
      setIsLoadingInsight(false);
      return;
    }

    const fetchInsight = async () => {
      setIsLoadingInsight(true);
      setAiInsight('');
      setIsExpanded(false);
      try {
        const result = await autoTriggerFeedback({ stockTicker: ticker });
        setAiInsight(result.review);
      } catch (error) {
        console.error("Failed to fetch AI insight:", error);
        setAiInsight("Could not load AI insight at the moment.");
      } finally {
        setIsLoadingInsight(false);
      }
    };
    fetchInsight();
  }, [ticker]);

  const sentimentStyles = {
    positive: {
      label: "Positive Outlook",
      badgeClass: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700",
    },
    negative: {
      label: "Negative Outlook",
      badgeClass: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700",
    },
  };
  
  const currentSentiment = stockData ? sentimentStyles[stockData.changeType] : null;

  if (!ticker) return null;

  if (isLoadingInsight) {
    return (
      <div className="space-y-2 mt-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    );
  }

  return (
    <Alert className="relative mt-4">
      <Sparkles className="h-4 w-4" />
      <AlertTitle className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>AI Insight</span>
          {currentSentiment && <Badge variant="outline" className={cn("text-xs", currentSentiment.badgeClass)}>{currentSentiment.label}</Badge>}
        </div>
      </AlertTitle>
      <AlertDescription className={cn(!isExpanded && "line-clamp-2")}>
        {aiInsight}
      </AlertDescription>
      <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-primary text-xs font-semibold mt-2 flex items-center gap-1"
        >
          {isExpanded ? "Show less" : "Show more"}
          {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>
    </Alert>
  );
}


function ChartViews({ ticker }: { ticker: string | null }) {
    const { data, loading, error } = useStockData(ticker);

  const chartConfig = {
    close: { label: "Close", color: "hsl(var(--chart-1))" },
    open: { label: "Open", color: "hsl(var(--chart-2))" },
    high: { label: "High", color: "hsl(var(--chart-3))" },
    low: { label: "Low", color: "hsl(var(--chart-4))" },
  };
  
  const chartData = data?.chartData || [];
  const changeType = data?.changeType || 'positive';

    if (loading) {
        return <Skeleton className="h-[300px] w-full mt-2" />;
    }

    if (error) {
        return <div className="h-[300px] flex items-center justify-center text-red-500 ">{error}</div>;
    }

    if (!data) {
        return <div className="h-[300px] flex items-center justify-center text-muted-foreground">Search for a stock to view its chart.</div>;
    }

  return (
    <Tabs defaultValue="candle">
      <div className="flex justify-end px-2">
        <TabsList>
          <TabsTrigger value="candle"><CandlestickChartIcon/></TabsTrigger>
          <TabsTrigger value="line"><LineChartIcon/></TabsTrigger>
          <TabsTrigger value="bar"><BarChartIcon/></TabsTrigger>
        </TabsList>
      </div>

      <ChartContainer config={chartConfig} className="h-[250px] w-full px-0">
        <TabsContent value="candle">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={chartData}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{fontSize: 12}} />
              <YAxis
                domain={["dataMin - 20", "dataMax + 20"]}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${value}`}
                tick={{fontSize: 12}}
                width={50}
              />
              <Tooltip
                cursor={{ fill: "hsl(var(--muted))" }}
                content={<ChartTooltipContent />}
              />
              <Bar dataKey="close" shape={<CandlestickShape />} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </TabsContent>
        <TabsContent value="line">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{fontSize: 12}} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} tick={{fontSize: 12}} width={50}/>
              <Tooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="close" stroke={cn(changeType === 'positive' ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))')} strokeWidth={2} dot={false} />
            </RechartsLineChart>
          </ResponsiveContainer>
        </TabsContent>
        <TabsContent value="bar">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{fontSize: 12}}/>
              <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} tick={{fontSize: 12}} width={50}/>
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="close" fill={cn(changeType === 'positive' ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))')} />
            </RechartsBarChart>
          </ResponsiveContainer>
        </TabsContent>
      </ChartContainer>
    </Tabs>
  );
}

const CandlestickShape = (props: any) => {
  const { x, y, width, height, payload } = props;
  const { open, close, high, low } = payload;
  const isBullish = close > open;
  const fill = isBullish ? "hsl(var(--chart-2))" : "hsl(var(--destructive))";
  const stroke = fill;
  
  if (high === undefined || low === undefined || open === undefined || close === undefined) {
    return null;
  }
  
  if (high === low) return null;

  const wickY1 = y + height * ((high - Math.max(open, close)) / (high - low));
  const wickY2 = y + height * ((Math.min(open, close) - low) / (high - low));

  const bodyY = y + height * ((high - Math.max(open, close)) / (high - low));
  const bodyHeight = height * (Math.abs(open - close) / (high - low));

  return (
    <g>
      {/* Wick */}
      <line 
        x1={x + width / 2} 
        y1={y}
        x2={x + width / 2} 
        y2={y + height}
        stroke={stroke} 
        strokeWidth={1} />
      {/* Body */}
      <rect x={x} y={isBullish ? y + height * ((high - close) / (high - low)) : y + height * ((high - open) / (high - low))} width={width} height={Math.max(1, Math.abs(y - (y + bodyHeight)))} fill={fill} />
    </g>
  );
};
