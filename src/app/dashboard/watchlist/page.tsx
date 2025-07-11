
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Watchlist from "@/components/dashboard/watchlist";

export default function WatchlistPage() {
  return (
    <div className="p-4 sm:p-6">
        <Watchlist />
    </div>
  );
}
