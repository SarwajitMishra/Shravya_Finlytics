
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ChartsPage() {
  return (
    <div className="p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Charts</CardTitle>
          <CardDescription>Detailed financial charts and visualizations.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Advanced charting tools will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
