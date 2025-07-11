
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { TrophyIcon } from "@/components/icons";
import {
  User,
  Activity,
  Coins,
  Shield,
  Star,
  Eye,
  FileText,
  GitCompare,
  Calendar,
  Briefcase,
  TrendingUp,
  DollarSign,
  AlertTriangle,
  Copy,
  Share2,
} from "lucide-react";
import type { Achievement, ScoinHistory } from "@/lib/types";
import { cn } from "@/lib/utils";

const achievements: Achievement[] = [
    { icon: <Star className="w-5 h-5 text-yellow-500" />, title: "Stock Watcher", description: "5 stocks in watchlist", achieved: true },
    { icon: <User className="w-5 h-5 text-blue-500" />, title: "AI Explorer", description: "Asked 10+ queries", achieved: true },
    { icon: <Calendar className="w-5 h-5 text-green-500" />, title: "Streak Master", description: "Logged in 7+ days", achieved: false },
]

const scoinHistory: ScoinHistory[] = [
    { date: "2024-08-15", description: "Daily Login", amount: "+10 S-Coins" },
    { date: "2024-08-14", description: "Read 5 News Summaries", amount: "+5 S-Coins" },
    { date: "2024-08-13", description: "AI Query", amount: "+2 S-Coins" },
]

export default function ProfilePage() {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* User Info Header */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 border-2 border-primary">
              <AvatarImage src="https://i.pravatar.cc/150?u=shravya" alt="Shravya" data-ai-hint="woman smiling" />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-3xl font-headline">Shravya</CardTitle>
              <CardDescription className="text-base text-muted-foreground">shravya@example.com</CardDescription>
              <p className="text-xs text-muted-foreground mt-1">Member since: Aug 1, 2024</p>
            </div>
          </div>
          <Badge variant="outline" className="text-lg py-1 px-4 border-green-500 text-green-600">
            Pro Investor
          </Badge>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activity Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Activity />
                <span>Activity Overview</span>
              </CardTitle>
              <CardDescription>Your engagement highlights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <Star className="mx-auto mb-2 h-6 w-6 text-primary" />
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Stocks Tracked</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <Eye className="mx-auto mb-2 h-6 w-6 text-primary" />
                  <p className="text-2xl font-bold">48</p>
                  <p className="text-sm text-muted-foreground">AI Insights Viewed</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <FileText className="mx-auto mb-2 h-6 w-6 text-primary" />
                  <p className="text-2xl font-bold">102</p>
                  <p className="text-sm text-muted-foreground">News Summaries</p>
                </div>
                 <div className="p-4 bg-muted/50 rounded-lg">
                  <Calendar className="mx-auto mb-2 h-6 w-6 text-primary" />
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Portfolio Snapshot */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Briefcase />
                <span>Portfolio Snapshot</span>
              </CardTitle>
              <CardDescription>A quick look at your simulated portfolio</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div className="flex justify-between items-baseline">
                        <span className="text-muted-foreground">Total Stocks</span>
                        <span className="font-bold text-lg">25</span>
                    </div>
                     <div className="flex justify-between items-baseline">
                        <span className="text-muted-foreground">Best Performing Sector</span>
                        <Badge>IT</Badge>
                    </div>
                    <div className="flex justify-between items-baseline">
                        <span className="text-muted-foreground">Total Simulated Returns</span>
                        <span className="font-bold text-lg text-green-600">+12.5%</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                        <span className="text-muted-foreground">Risk Exposure</span>
                        <Badge variant="destructive" className="bg-orange-500">Medium</Badge>
                    </div>
                </div>
                <div className="flex items-center justify-center p-4 bg-muted/50 rounded-lg">
                    <p className="text-center text-muted-foreground">Portfolio chart will be here</p>
                </div>
            </CardContent>
          </Card>

          {/* Referral Section */}
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Share2 />
                    <span>Refer a Friend</span>
                </CardTitle>
                <CardDescription>Earn S-Coins for every friend who joins!</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 w-full p-2 border rounded-md bg-muted/50 text-center text-sm text-muted-foreground font-mono">
                    https://finlytics.ai/ref/shravya123
                </div>
                <Button><Copy className="mr-2"/>Copy Link</Button>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
           {/* S-Coins Wallet */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Coins />
                <span>S-Coins Wallet</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-4">
                <p className="text-4xl font-bold">1,250</p>
                <p className="text-muted-foreground">Current Balance</p>
              </div>
              <Separator />
              <h4 className="my-3 font-semibold text-sm">Recent History</h4>
              <div className="space-y-2">
                {scoinHistory.map(item => (
                    <div key={item.date} className="flex justify-between text-xs">
                        <p>{item.description}</p>
                        <p className="text-green-600 font-semibold">{item.amount}</p>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <TrophyIcon className="h-6 w-6" />
                <span>Achievements</span>
              </CardTitle>
              <CardDescription>Your unlocked badges</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {achievements.map((ach, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={cn("p-2 rounded-full bg-muted", !ach.achieved && "opacity-50")}>
                    {ach.icon}
                  </div>
                  <div>
                    <p className={cn("font-semibold", !ach.achieved && "text-muted-foreground")}>{ach.title}</p>
                    <p className="text-sm text-muted-foreground">{ach.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
