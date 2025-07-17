
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
  Area,
  AreaChart,
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
import type { StockChartData, StockDetails } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';


type StockId = 'infosys' | 'reliance';
const stockTickers: Record<StockId, string> = {
    infosys: 'INFY.NS',
    reliance: 'RELIANCE.NS'
};

export default function StockChart() {
  const [activeStockId, setActiveStockId] = useState<StockId>("infosys");
  
  return (
    <Card className="h-full flex flex-col">
       <Tabs defaultValue="infosys" onValueChange={(value) => setActiveStockId(value as StockId)}>
        <CardHeader className="flex flex-col md:flex-row md:items-start md:justify-between">
            <StockHeaderAndTabs activeStockId={activeStockId} />
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <AIInsight stockId={activeStockId} />

          <div className="mt-4">
            <ChartViews stockId={activeStockId} />
          </div>

          <div className="mt-4 pt-4 border-t flex flex-wrap gap-2 justify-center">
            <Button variant="outline"><MessageCircle /> Ask AI About This Stock</Button>
            <Button variant="outline"><PieChart /> Compare with Industry</Button>
          </div>
        </CardContent>
      </Tabs>
    </Card>
  );
}

function useStockData(stockId: StockId) {
    const [data, setData] = useState<StockChartData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchStockData() {
            setLoading(true);
            setError(null);
            setData(null);

            const ticker = stockTickers[stockId];
            const to = Math.floor(Date.now() / 1000);
            const from = to - (30 * 24 * 60 * 60); // 30 days ago

            try {
                const response = await fetch(`/api/stock?ticker=${ticker}&from=${from}&to=${to}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch stock data for ${ticker}`);
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
    }, [stockId]);

    return { data, loading, error };
}


function StockHeaderAndTabs({ activeStockId }: { activeStockId: StockId }) {
    const { data, loading, error } = useStockData(activeStockId);

    const sentimentIcons = {
        positive: <TrendingUp className="text-green-500" />,
        negative: <TrendingDown className="text-red-500" />,
        neutral: <Minus className="text-gray-500" />
    };
    
    const getSentiment = (changeType: "positive" | "negative") => {
        return changeType === 'positive' ? sentimentIcons.positive : sentimentIcons.negative;
    }

    return (
         <div className="flex-1">
             <TabsList className="grid w-full grid-cols-2 mb-2">
                <TabsTrigger value="infosys">Infosys</TabsTrigger>
                <TabsTrigger value="reliance">Reliance</TabsTrigger>
            </TabsList>
            
            {loading && <StockHeaderSkeleton />}
            {error && <div className="text-red-500 p-2">{error}</div>}
            {data && (
                <>
                <CardTitle className="font-headline">{data.name}</CardTitle>
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
                </>
            )}
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


function AIInsight({stockId}: {stockId: StockId}) {
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isLoadingInsight, setIsLoadingInsight] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const { data: stockData } = useStockData(stockId);

  useEffect(() => {
    const fetchInsight = async () => {
      if (!stockId) return;
      setIsLoadingInsight(true);
      setAiInsight('');
      setIsExpanded(false);
      try {
        const result = await autoTriggerFeedback({ stockTicker: stockTickers[stockId] });
        setAiInsight(result.review);
      } catch (error) {
        console.error("Failed to fetch AI insight:", error);
        setAiInsight("Could not load AI insight at the moment.");
      } finally {
        setIsLoadingInsight(false);
      }
    };
    fetchInsight();
  }, [stockId]);

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


function ChartViews({ stockId }: { stockId: StockId }) {
    const { data, loading, error } = useStockData(stockId);

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
        return <div className="text-red-500 h-[300px] flex items-center justify-center">{error}</div>;
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
      <rect x={x} y={isBullish ? y + height * ((high - close) / (high - low)) : y + height * ((high - open) / (high - low))} width={width} height={Math.abs(y - (y + bodyHeight)) || 1} fill={fill} />
    </g>
  );
};
