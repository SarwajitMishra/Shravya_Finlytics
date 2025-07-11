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
