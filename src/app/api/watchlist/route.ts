import { NextResponse } from 'next/server';
import type { Stock } from "@/lib/types";

const watchlistData: Stock[] = [
  {
    ticker: "TCS",
    name: "Tata Consultancy",
    price: "₹3,850.10",
    change: "+45.50 (1.20%)",
    changeType: "positive",
    sentiment: "positive",
  },
  {
    ticker: "HDFCBANK",
    name: "HDFC Bank Ltd.",
    price: "₹1,520.75",
    change: "-12.30 (0.80%)",
    changeType: "negative",
    sentiment: "neutral",
  },
  {
    ticker: "INFY",
    name: "Infosys Ltd.",
    price: "₹1,525.30",
    change: "+20.10 (1.34%)",
    changeType: "positive",
    sentiment: "positive",
  },
  {
    ticker: "RELIANCE",
    name: "Reliance Industries",
    price: "₹2,340.50",
    change: "-5.20 (0.22%)",
    changeType: "negative",
    sentiment: "negative",
  },
  {
    ticker: "SBIN",
    name: "State Bank of India",
    price: "₹650.00",
    change: "+2.50 (0.39%)",
    changeType: "positive",
    sentiment: "neutral",
  },
];

export async function GET() {
  // In a real application, you would fetch this data from a database
  // or a third-party financial API.
  // We add a small delay to simulate network latency.
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json(watchlistData);
}
