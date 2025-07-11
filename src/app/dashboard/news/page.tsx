
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewsPage() {
  return (
    <div className="p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Financial News</CardTitle>
          <CardDescription>The latest news and analysis from the world of finance.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>News articles and summaries will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
