
import { NextResponse } from 'next/server';

const newsApiKey = process.env.NEWS_API_KEY;

const sampleNews = [
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
    // API key not provided, return sample data
    return NextResponse.json(sampleNews);
  }

  try {
    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&category=business&pageSize=5&apiKey=${newsApiKey}`);
    if (!response.ok) {
        throw new Error(`NewsAPI request failed with status ${response.status}`);
    }
    const data = await response.json();
    
    const articles = data.articles.map((article: any) => ({
      title: article.title,
      summary: article.description || 'No summary available.',
      category: 'Business', // NewsAPI doesn't provide fine-grained categories like 'Earnings'
      link: article.url,
    }));

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching from NewsAPI:", error);
    // Fallback to sample data in case of error
    return NextResponse.json(sampleNews);
  }
}
