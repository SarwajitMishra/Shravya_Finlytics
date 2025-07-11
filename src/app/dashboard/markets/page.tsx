
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MarketsPage() {
  return (
    <div className="p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Markets</CardTitle>
          <CardDescription>A comprehensive overview of the financial markets.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Market data and analysis will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
