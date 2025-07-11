
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PortfolioPage() {
  return (
    <div className="p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle>My Portfolio</CardTitle>
          <CardDescription>An overview of your investment portfolio.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Your portfolio details and performance will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
