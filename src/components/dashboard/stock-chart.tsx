"use client";

import { useState, useEffect } from 'react';
import {
  BarChart as BarChartIcon,
  CandlestickChart as CandlestickChartIcon,
  LineChart as LineChartIcon,
  Sparkles,
  BrainCircuit,
  PieChart,
  TrendingUp,
  TrendingDown,
  Minus,
  MessageCircle,
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
import type { StockDetails } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';


const infosysData = [
  { date: "Oct 23", close: 1450, open: 1420, high: 1460, low: 1410 },
  { date: "Oct 24", close: 1475, open: 1450, high: 1480, low: 1445 },
  { date: "Oct 25", close: 1460, open: 1475, high: 1485, low: 1455 },
  { date: "Oct 26", close: 1490, open: 1460, high: 1500, low: 1455 },
  { date: "Oct 27", close: 1510, open: 1490, high: 1515, low: 1485 },
  { date: "Oct 30", close: 1505, open: 1510, high: 1520, low: 1500 },
  { date: "Oct 31", close: 1525, open: 1505, high: 1530, low: 1500 },
];

const relianceData = [
  { date: "Oct 23", close: 2250, open: 2230, high: 2260, low: 2225 },
  { date: "Oct 24", close: 2280, open: 2250, high: 2290, low: 2245 },
  { date: "Oct 25", close: 2270, open: 2280, high: 2285, low: 2265 },
  { date: "Oct 26", close: 2300, open: 2270, high: 2310, low: 2265 },
  { date: "Oct 27", close: 2325, open: 2300, high: 2330, low: 2295 },
  { date: "Oct 30", close: 2315, open: 2325, high: 2335, low: 2310 },
  { date: "Oct 31", close: 2340, open: 2315, high: 2345, low: 2310 },
];

const stockConfig: Record<string, StockDetails> = {
  infosys: {
    id: 'infosys',
    ticker: "INFY",
    name: "Infosys (INFY)",
    data: infosysData,
    price: "₹1,525.30",
    change: "+20.10 (1.34%)",
    changeType: "positive",
    sentiment: "positive",
    volume: "5.4M",
    peRatio: "28.5",
    eps: "53.52",
  },
  reliance: {
    id: 'reliance',
    ticker: "RELIANCE",
    name: "Reliance (RELIANCE)",
    data: relianceData,
    price: "₹2,340.50",
    change: "-5.20 (0.22%)",
    changeType: "negative",
    sentiment: "negative",
    volume: "7.8M",
    peRatio: "26.2",
    eps: "89.33",
  },
};

type StockId = keyof typeof stockConfig;

export default function StockChart() {
  const [activeStock, setActiveStock] = useState<StockId>("infosys");
  const [aiInsight, setAiInsight] = useState<string>('');
  const [isLoadingInsight, setIsLoadingInsight] = useState(true);

  useEffect(() => {
    const fetchInsight = async () => {
      if (!activeStock) return;
      setIsLoadingInsight(true);
      try {
        const result = await autoTriggerFeedback({ stockTicker: stockConfig[activeStock].ticker });
        setAiInsight(result.review);
      } catch (error) {
        console.error("Failed to fetch AI insight:", error);
        setAiInsight("Could not load AI insight at the moment.");
      } finally {
        setIsLoadingInsight(false);
      }
    };
    fetchInsight();
  }, [activeStock]);

  return (
    <Card className="h-full flex flex-col">
      <Tabs defaultValue="infosys" onValueChange={(value) => setActiveStock(value as StockId)}>
        <CardHeader className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div>
            <TabsList className="grid w-full grid-cols-2 mb-2">
              <TabsTrigger value="infosys">Infosys</TabsTrigger>
              <TabsTrigger value="reliance">Reliance</TabsTrigger>
            </TabsList>
            <TabsContent value="infosys" className="m-0">
              <StockHeader stockId="infosys" />
            </TabsContent>
            <TabsContent value="reliance" className="m-0">
              <StockHeader stockId="reliance" />
            </TabsContent>
          </div>
          <div className="w-full md:w-auto mt-4 md:mt-0">
            <SparklineChart data={stockConfig[activeStock].data} changeType={stockConfig[activeStock].changeType} />
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          {isLoadingInsight ? (
             <Skeleton className="h-12 w-full" />
          ) : (
            <Alert>
              <Sparkles className="h-4 w-4" />
              <AlertTitle>AI Insight</AlertTitle>
              <AlertDescription>{aiInsight}</AlertDescription>
            </Alert>
          )}

          <div className="mt-4">
            <ChartViews data={stockConfig[activeStock].data} />
          </div>

          <div className="mt-4 pt-4 border-t flex flex-wrap gap-2 justify-center">
            <Button variant="outline"><MessageCircle /> Analyze This Stock</Button>
            <Button variant="outline"><BrainCircuit /> Get Investment Advice</Button>
            <Button variant="outline"><PieChart /> Compare with Industry Avg</Button>
          </div>
        </CardContent>
      </Tabs>
    </Card>
  );
}

function StockHeader({ stockId }: { stockId: StockId }) {
  const stock = stockConfig[stockId];

  const sentimentIcons = {
    positive: <TrendingUp className="text-green-500" />,
    negative: <TrendingDown className="text-red-500" />,
    neutral: <Minus className="text-gray-500" />
  }

  return (
    <>
      <CardTitle className="font-headline">{stock.name}</CardTitle>
      <div className="flex items-baseline gap-2 pt-2">
        <span className="text-3xl font-bold">{stock.price}</span>
        <span
          className={`font-semibold flex items-center gap-1 ${
            stock.changeType === "positive"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {sentimentIcons[stock.sentiment]}
          {stock.change}
        </span>
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground pt-1">
        <span>Vol: {stock.volume}</span>
        <span>P/E: {stock.peRatio}</span>
        <span>EPS: {stock.eps}</span>
      </div>
    </>
  );
}


function ChartViews({ data }: { data: typeof infosysData }) {
  const chartConfig = {
    close: { label: "Close", color: "hsl(var(--chart-1))" },
    open: { label: "Open", color: "hsl(var(--chart-2))" },
    high: { label: "High", color: "hsl(var(--chart-3))" },
    low: { label: "Low", color: "hsl(var(--chart-4))" },
  };

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
              data={data}
              margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis
                domain={["dataMin - 100", "dataMax + 100"]}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `₹${value}`}
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
            <RechartsLineChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
              <Tooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="close" stroke="var(--color-close)" strokeWidth={2} dot={false} />
            </RechartsLineChart>
          </ResponsiveContainer>
        </TabsContent>
        <TabsContent value="bar">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="close" fill="var(--color-close)" />
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
  
  const wickY1 = y + height * ((high - Math.max(open, close)) / (high - low));
  const wickY2 = y + height * ((Math.min(open, close) - low) / (high - low));

  const bodyY = y + height * ((Math.max(open, close) - Math.max(open, close)) / (high-low));
  const bodyHeight = height * (Math.abs(open - close) / (high - low))

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

function SparklineChart({ data, changeType }: { data: typeof infosysData; changeType: 'positive' | 'negative' }) {
  const color = changeType === 'positive' ? 'hsl(var(--chart-2))' : 'hsl(var(--destructive))';
  return (
    <ChartContainer config={{ close: { color } }} className="h-[50px] w-full md:w-[200px]">
      <AreaChart
        accessibilityLayer
        data={data}
        margin={{
          left: 12,
          right: 12,
          top: 5,
          bottom: 5
        }}
      >
        <defs>
          <linearGradient id={`fill-${changeType}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="close"
          type="natural"
          fill={`url(#fill-${changeType})`}
          stroke={color}
          stackId="a"
        />
        <Tooltip content={<></>} />
      </AreaChart>
    </ChartContainer>
  )
}
