'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Newspaper } from "lucide-react";
import type { NewsArticle } from "@/lib/types";
import { Skeleton } from '../ui/skeleton';
import { Button } from '../ui/button';

export default function MarketNews() {
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      try {
        const response = await fetch('/api/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news data');
        }
        const data = await response.json();
        setNewsData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        // Set sample data on error to prevent empty state
        setNewsData([
            { title: "Sensex, Nifty hit fresh record highs", summary: "Indian benchmark indices soared to new peaks...", category: "Economy", link: "#"},
            { title: "IT majors report mixed Q2 earnings", summary: "While some IT giants beat estimates, others faced margin pressures...", category: "Earnings", link: "#"},
        ]);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Newspaper />
          <span>Financial News Summary</span>
        </CardTitle>
        <CardDescription>
          The latest headlines from top business sources, powered by NewsAPI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="p-3">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6 mt-1" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {newsData.map((article, index) => (
              <div key={index} className="p-3 rounded-lg hover:bg-muted/50 transition-colors">
                 <div className="flex items-start justify-between mb-1 gap-2">
                    <h4 className="font-semibold flex-1">{article.title}</h4>
                    <Badge variant="outline" className="capitalize hidden sm:inline-flex whitespace-nowrap">{article.category}</Badge>
                 </div>
                 <p className="text-sm text-muted-foreground line-clamp-2">{article.summary}</p>
                 <a href={article.link} target="_blank" rel="noopener noreferrer">
                    <Button variant="link" className="p-0 h-auto mt-1 text-xs">Read more</Button>
                 </a>
              </div>
            ))}
          </div>
        )}
         {error && <p className="text-xs text-red-500 text-center pt-4">{error}. Displaying sample data.</p>}
      </CardContent>
    </Card>
  );
}
