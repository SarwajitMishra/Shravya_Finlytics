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

const newsData: NewsArticle[] = [
  {
    title: "Sensex, Nifty hit fresh record highs",
    summary:
      "Indian benchmark indices soared to new peaks, driven by strong inflows from foreign institutional investors and positive global cues.",
    category: "Economy",
    link: "#",
  },
  {
    title: "IT majors report mixed Q2 earnings",
    summary:
      "While some IT giants beat estimates on strong deal wins, others faced margin pressures due to wage hikes and project ramp-ups.",
    category: "Earnings",
    link: "#",
  },
  {
    title: "SEBI mulls stricter norms for derivatives",
    summary:
      "The market regulator is considering new rules to curb speculative trading in the F&O segment, aiming to protect retail investors.",
    category: "Policy",
    link: "#",
  },
  {
    title: "Global supply chain woes ease",
    summary:
      "Easing of global supply chain disruptions is expected to cool down inflation and boost manufacturing output in the coming quarters.",
    category: "Global Impact",
    link: "#",
  },
];

export default function MarketNews() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Newspaper />
          <span>Financial News Summary</span>
        </CardTitle>
        <CardDescription>
          AI-powered summaries of the latest market news.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsData.map((article, index) => (
            <div key={index} className="p-3 rounded-lg hover:bg-muted/50">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold">{article.title}</h4>
                <Badge
                  variant={
                    article.category === "Economy" ? "default" : "secondary"
                  }
                  className="capitalize"
                >
                  {article.category}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{article.summary}</p>
              <a
                href={article.link}
                className="text-xs text-primary hover:underline mt-1 inline-block"
              >
                Read more
              </a>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
