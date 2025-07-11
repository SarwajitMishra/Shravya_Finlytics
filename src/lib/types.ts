
export interface Stock {
  ticker: string;
  name: string;
  price: string;
  change: string;
  changeType: "positive" | "negative";
  sentiment: "positive" | "neutral" | "negative";
}

export interface EconomicEvent {
  title: string;
  date: string;
  description: string;
}

export interface NewsArticle {
  title: string;
  summary: string;
  category: "Economy" | "Earnings" | "Policy" | "Global Impact";
  link: string;
}

export interface StockDetails extends Stock {
  id: string;
  ticker: string;
  data: { date: string, close: number, open: number, high: number, low: number }[];
  volume: string;
  peRatio: string;
  eps: string;
}

export interface Achievement {
    icon: React.ReactNode;
    title: string;
    description: string;
    achieved: boolean;
}

export interface ScoinHistory {
    date: string;
    description: string;
    amount: string;
}
