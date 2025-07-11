
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function HistoryPage() {
  return (
    <div className="p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>A log of your past transactions and activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Your transaction history will be displayed here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
