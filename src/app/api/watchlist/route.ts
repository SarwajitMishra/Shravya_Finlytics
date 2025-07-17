
import { NextResponse } from 'next/server';
import type { Stock } from "@/lib/types";

const initialWatchlistData: Omit<Stock, 'price' | 'change' | 'changeType' | 'sentiment'>[] = [
  { ticker: "TCS.NS", name: "Tata Consultancy" },
  { ticker: "HDFCBANK.NS", name: "HDFC Bank Ltd." },
  { ticker: "INFY.NS", name: "Infosys Ltd." },
  { ticker: "RELIANCE.NS", name: "Reliance Industries" },
  { ticker: "SBIN.NS", name: "State Bank of India" },
  { ticker: "ICICIBANK.NS", name: "ICICI Bank Ltd." },
  { ticker: "BHARTIARTL.NS", name: "Bharti Airtel Ltd." },
  { ticker: "HINDUNILVR.NS", name: "Hindustan Unilever" },
  { ticker: "LT.NS", name: "Larsen & Toubro" },
  { ticker: "WIPRO.NS", name: "Wipro Ltd." },
];

const finnhubApiKey = process.env.FINNHUB_API_KEY;

// Helper to determine sentiment based on percentage change
const getSentiment = (changePercent: number): "positive" | "negative" | "neutral" => {
  if (changePercent > 0.5) return "positive";
  if (changePercent < -0.5) return "negative";
  return "neutral";
};

// Helper to generate a random number for simulation when API key is missing
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

const generateSimulatedStockData = (stock: Omit<Stock, 'price' | 'change' | 'changeType' | 'sentiment'>): Stock => {
    const basePrice = stock.ticker === 'INFY.NS' ? 1500 : stock.ticker === 'RELIANCE.NS' ? 2300 : getRandom(100, 4000);
    const priceFluctuation = getRandom(-50, 50);
    const newPrice = basePrice + priceFluctuation;
    
    const change = getRandom(-25, 25);
    const percentageChange = (change / newPrice) * 100;

    return {
      ...stock,
      price: `₹${newPrice.toFixed(2)}`,
      change: `${change.toFixed(2)} (${percentageChange.toFixed(2)}%)`,
      changeType: change >= 0 ? "positive" : "negative",
      sentiment: getSentiment(percentageChange),
    };
};

export async function GET() {
  if (!finnhubApiKey || finnhubApiKey === "YOUR_FINNHUB_API_KEY") {
    // API key not provided, return simulated data
    const simulatedData = initialWatchlistData.map(generateSimulatedStockData);
    return NextResponse.json(simulatedData);
  }

  try {
    const promises = initialWatchlistData.map(async (stock) => {
      const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${finnhubApiKey}`);
      if (!response.ok) {
        // If API fails for one stock, return simulated data for it
        console.error(`Failed to fetch data for ${stock.ticker}`);
        return generateSimulatedStockData(stock);
      }
      const data = await response.json();
      
      const price = data.c; // Current price
      const change = data.d; // Change
      const percentageChange = data.dp; // Percent change

      if (price === null || change === null || percentageChange === null) {
        return generateSimulatedStockData(stock);
      }

      return {
        ...stock,
        price: `₹${price.toFixed(2)}`,
        change: `${change.toFixed(2)} (${percentageChange.toFixed(2)}%)`,
        changeType: change >= 0 ? "positive" : "negative",
        sentiment: getSentiment(percentageChange),
      };
    });

    const dynamicData = await Promise.all(promises);
    return NextResponse.json(dynamicData);
  } catch (error) {
    console.error("Error fetching from Finnhub API:", error);
    // Fallback to simulated data in case of a major error
    const simulatedData = initialWatchlistData.map(generateSimulatedStockData);
    return NextResponse.json(simulatedData);
  }
}
