"use client";

import { useEffect, useState } from "react";
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
import { Skeleton } from "../ui/skeleton";

const POLLING_INTERVAL = 5000; // 5 seconds

export default function Watchlist() {
  const [data, setData] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      // Don't show skeleton on subsequent polls, only on initial load.
      // If data is already present, loading is more of a background task.
      if (data.length === 0) {
        setLoading(true);
      }
      try {
        const response = await fetch('/api/watchlist');
        if (!response.ok) {
          throw new Error('Failed to fetch watchlist data');
        }
        const watchlistData = await response.json();
        setData(watchlistData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        if (data.length === 0) {
          setLoading(false);
        }
      }
    }
    
    fetchData(); // Fetch immediately on mount
    const intervalId = setInterval(fetchData, POLLING_INTERVAL); // Then poll every 5 seconds

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Star />
          <span>My Watchlist</span>
        </CardTitle>
        <CardDescription>Your handpicked stocks to watch. Updates automatically.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
            ))}
          </div>
        ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
        ) : (
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
              {data.map((stock) => (
                <TableRow key={stock.ticker}>
                  <TableCell>
                    <div className="font-medium">{stock.ticker}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-[120px]">{stock.name}</div>
                  </TableCell>
                  <TableCell>{stock.price}</TableCell>
                  <TableCell
                    className={`text-right font-semibold transition-colors duration-300 ${
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
                      className={`capitalize transition-colors duration-300 ${
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
        )}
      </CardContent>
    </Card>
  );
}
