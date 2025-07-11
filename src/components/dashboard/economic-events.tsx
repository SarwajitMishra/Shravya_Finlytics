"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Sparkles, Loader2 } from "lucide-react";
import type { EconomicEvent } from "@/lib/types";
import { summarizeEconomicEvent } from "@/ai/flows/summarize-event-flow";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const events: EconomicEvent[] = [
  {
    title: "RBI Monetary Policy Meeting",
    date: "2024-08-08",
    description: "Review of key interest rates and monetary stance.",
  },
  {
    title: "Q2 Earnings Call - Reliance Industries",
    date: "2024-08-12",
    description: "Discussion of quarterly performance and future outlook.",
  },
  {
    title: "Major Tech IPO Listing",
    date: "2024-08-20",
    description: "Debut of a highly anticipated tech company on NSE.",
  },
  {
    title: "India Inflation Data Release",
    date: "2024-09-12",
    description: "Release of Consumer Price Index (CPI) data for August.",
  },
];

export default function EconomicEvents() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [summary, setSummary] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSummary = async (event: EconomicEvent) => {
    setLoadingStates((prev) => ({ ...prev, [event.title]: true }));
    setSummary(null);
    try {
      const result = await summarizeEconomicEvent({
        title: event.title,
        description: event.description,
      });
      setSummary(result.summary);
      setIsDialogOpen(true);
    } catch (error) {
      console.error("Failed to get AI summary", error);
      toast({
        title: "Error",
        description: "Could not generate AI summary for the event.",
        variant: "destructive",
      });
    } finally {
      setLoadingStates((prev) => ({ ...prev, [event.title]: false }));
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <CalendarDays />
            <span>Economic Events Tracker</span>
          </CardTitle>
          <CardDescription>
            Key events that could impact the market.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={index} className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  <p className="text-xs text-muted-foreground pt-1">{new Date(event.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleSummary(event)}
                  disabled={loadingStates[event.title]}
                >
                  {loadingStates[event.title] ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  AI Summary
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Sparkles />
              <span>AI Summary</span>
            </AlertDialogTitle>
            <AlertDialogDescription>{summary}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
