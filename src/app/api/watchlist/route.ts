
import { NextResponse } from 'next/server';
import type { Stock } from "@/lib/types";

const initialWatchlistData: Omit<Stock, 'price' | 'change' | 'changeType' | 'sentiment'>[] = [
  { ticker: "TCS", name: "Tata Consultancy" },
  { ticker: "HDFCBANK", name: "HDFC Bank Ltd." },
  { ticker: "INFY", name: "Infosys Ltd." },
  { ticker: "RELIANCE", name: "Reliance Industries" },
  { ticker: "SBIN", name: "State Bank of India" },
  { ticker: "ICICIBANK", name: "ICICI Bank Ltd." },
  { ticker: "BHARTIARTL", name: "Bharti Airtel Ltd." },
  { ticker: "HINDUNILVR", name: "Hindustan Unilever" },
  { ticker: "LT", name: "Larsen & Toubro" },
  { ticker: "WIPRO", name: "Wipro Ltd." },
];

// Helper to generate a random number within a range
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

// Function to generate dynamic stock data
const generateDynamicStockData = (): Stock[] => {
  return initialWatchlistData.map(stock => {
    const basePrice = stock.ticker === 'INFY' ? 1500 : stock.ticker === 'RELIANCE' ? 2300 : getRandom(100, 4000);
    const priceFluctuation = getRandom(-50, 50);
    const newPrice = basePrice + priceFluctuation;
    
    const change = getRandom(-25, 25);
    const percentageChange = (change / newPrice) * 100;

    let sentiment: "positive" | "negative" | "neutral" = "neutral";
    if (percentageChange > 0.5) sentiment = "positive";
    if (percentageChange < -0.5) sentiment = "negative";

    return {
      ...stock,
      price: `₹${newPrice.toFixed(2)}`,
      change: `${change.toFixed(2)} (${percentageChange.toFixed(2)}%)`,
      changeType: change >= 0 ? "positive" : "negative",
      sentiment: sentiment,
    };
  });
};


export async function GET() {
  // In a real application, you would fetch this data from a database
  // or a third-party financial API. Here we simulate it.
  const dynamicData = generateDynamicStockData();
  
  // We add a small delay to simulate network latency.
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return NextResponse.json(dynamicData);
}
