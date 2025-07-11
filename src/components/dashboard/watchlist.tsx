import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight, Star } from "lucide-react";
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

const sentimentIndicator = {
  positive: "bg-green-500",
  neutral: "bg-yellow-500",
  negative: "bg-red-500",
};

export default function Watchlist() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Star />
          <span>My Watchlist</span>
        </CardTitle>
        <CardDescription>Your handpicked stocks to watch.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticker</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Change</TableHead>
              <TableHead className="text-center">Sentiment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {watchlistData.map((stock) => (
              <TableRow key={stock.ticker}>
                <TableCell>
                  <div className="font-medium">{stock.ticker}</div>
                  <div className="text-sm text-muted-foreground truncate max-w-[120px]">{stock.name}</div>
                </TableCell>
                <TableCell>{stock.price}</TableCell>
                <TableCell
                  className={`text-right font-semibold ${
                    stock.changeType === "positive"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <div className="flex items-center justify-end gap-1">
                    {stock.changeType === "positive" ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    <span>{stock.change}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant="outline"
                    className={`capitalize ${
                      stock.sentiment === "positive"
                        ? "border-green-500 text-green-700"
                        : stock.sentiment === "negative"
                        ? "border-red-500 text-red-700"
                        : "border-yellow-500 text-yellow-700"
                    }`}
                  >
                    {stock.sentiment}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
