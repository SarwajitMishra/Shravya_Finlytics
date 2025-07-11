
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
import { Newspaper, Rss } from "lucide-react";
import type { NewsArticle } from "@/lib/types";
import { Skeleton } from '../ui/skeleton';

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
          The latest headlines from top business sources.
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
        ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="space-y-4">
            {newsData.map((article, index) => (
              <a 
                key={index} 
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold">{article.title}</h4>
                  <Badge
                    variant="secondary"
                    className="capitalize hidden sm:inline-flex"
                  >
                    {article.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{article.summary}</p>
              </a>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
