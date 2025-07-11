
import { NextResponse } from 'next/server';
import type { NewsArticle } from "@/lib/types";

const newsApiKey = process.env.NEWS_API_KEY;

const sampleNews: NewsArticle[] = [
    {
      title: "Sensex, Nifty hit fresh record highs",
      summary: "Indian benchmark indices soared to new peaks, driven by strong inflows from foreign institutional investors and positive global cues.",
      category: "Economy",
      link: "#",
    },
    {
      title: "IT majors report mixed Q2 earnings",
      summary: "While some IT giants beat estimates on strong deal wins, others faced margin pressures due to wage hikes and project ramp-ups.",
      category: "Earnings",
      link: "#",
    },
];

export async function GET() {
  if (!newsApiKey || newsApiKey === "YOUR_NEWS_API_KEY") {
    return NextResponse.json(sampleNews);
  }

  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=business&pageSize=5&apiKey=${newsApiKey}`);
    if (!response.ok) {
        throw new Error(`NewsAPI request failed with status ${response.status}`);
    }
    const data = await response.json();
    
    const articles = data.articles.map((article: any): NewsArticle => ({
      title: article.title,
      summary: article.description || 'No summary available.',
      // All news from this business endpoint will be categorized as 'Economy' for consistency
      category: 'Economy',
      link: article.url,
    }));

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching from NewsAPI:", error);
    // Fallback to sample data in case of a major error
    return NextResponse.json(sampleNews);
  }
}
