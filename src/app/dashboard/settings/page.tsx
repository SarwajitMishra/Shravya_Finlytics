
'use client';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  Globe,
  Palette,
  Bell,
  SlidersHorizontal,
  ShieldCheck,
  Info,
  ChevronRight,
  Download,
  Trash2,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Settings</CardTitle>
          <CardDescription>
            Manage your account, preferences, and notification settings.
          </CardDescription>
        </CardHeader>
      </Card>

      {/* General Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 font-headline">
            <Palette />
            <span>General Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme" className="flex flex-col gap-1">
              <span>Theme</span>
              <span className="text-xs font-normal text-muted-foreground">Toggle between light and dark mode</span>
            </Label>
            <div className="flex items-center gap-2">
                <span>Light</span>
                <Switch id="theme" />
                <span>Dark</span>
            </div>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="language" className="flex flex-col gap-1">
              <span>Language</span>
               <span className="text-xs font-normal text-muted-foreground">Choose your preferred language</span>
            </Label>
            <Select defaultValue="en">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="bn">Bengali</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notifications & Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 font-headline">
            <Bell />
            <span>Notifications & Alerts</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="price-alerts" className="font-medium">Stock Price Alerts</Label>
            <Switch id="price-alerts" defaultChecked />
          </div>
           <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="event-alerts" className="font-medium">Economic Events</Label>
            <Switch id="event-alerts" defaultChecked />
          </div>
           <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="news-alerts" className="font-medium">Breaking Financial News</Label>
            <Switch id="news-alerts" />
          </div>
           <Separator />
           <div className="flex items-center justify-between">
            <Label htmlFor="sentiment-alerts" className="font-medium">AI Sentiment Changes</Label>
            <Switch id="sentiment-alerts" defaultChecked/>
          </div>
        </CardContent>
      </Card>

      {/* Security & Account */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 font-headline">
            <ShieldCheck />
            <span>Security & Account</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                <Label className="font-medium">Change Password</Label>
                <Button variant="outline" size="sm">Change</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                <Label className="font-medium">Download Your Data</Label>
                <Button variant="outline" size="sm"><Download className="mr-2"/>Export</Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between p-3 rounded-lg bg-red-50 dark:bg-red-900/20">
                <Label className="font-medium text-red-600 dark:text-red-400">Delete Account</Label>
                <Button variant="destructive" size="sm"><Trash2 className="mr-2"/>Delete</Button>
            </div>
        </CardContent>
      </Card>

       {/* About & Legal */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 font-headline">
            <Info />
            <span>About & Legal</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            <a href="#" className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                <span className="font-medium">Terms & Conditions</span>
                <ChevronRight/>
            </a>
            <Separator />
            <a href="#" className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                <span className="font-medium">Privacy Policy</span>
                <ChevronRight/>
            </a>
            <Separator />
            <a href="#" className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                <span className="font-medium">Contact Support</span>
                <ChevronRight/>
            </a>
        </CardContent>
      </Card>
    </div>
  );
}
