
'use client';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Palette,
  Bell,
  ShieldCheck,
  Info,
  ChevronRight,
  Download,
  Trash2,
  Filter,
  ArrowLeft,
  Moon,
  Sun,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export default function SettingsPage() {
    const router = useRouter();
    const { theme, setTheme } = useTheme();

    const handleThemeChange = (newTheme: string) => {
      const currentMode = theme?.includes('dark') ? 'dark' : 'light';
      if (newTheme === 'light' || newTheme === 'dark') {
          setTheme(newTheme);
      } else {
          setTheme(`${newTheme}-${currentMode}`);
      }
    };

    const handleModeToggle = (isDark: boolean) => {
        const currentThemeName = theme?.replace('-dark', '').replace('-light', '') || 'stone';
        setTheme(isDark ? `${currentThemeName}-dark` : currentThemeName);
    }

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
             <Button variant="outline" size="icon" onClick={() => router.back()}>
                <ArrowLeft />
                <span className="sr-only">Back</span>
            </Button>
            <h1 className="text-2xl font-bold">Settings</h1>
        </div>

      {/* General Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 font-headline">
            <Palette />
            <span>Appearance</span>
          </CardTitle>
          <CardDescription>Customize the look and feel of your interface.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
                <Label htmlFor="theme-mode" className="flex flex-col gap-1">
                    <span>Mode</span>
                    <span className="text-xs font-normal text-muted-foreground">Toggle between light and dark themes.</span>
                </Label>
                <div className="flex items-center gap-2">
                    <Sun className="h-5 w-5" />
                    <Switch
                        id="theme-mode"
                        checked={theme?.includes('dark')}
                        onCheckedChange={handleModeToggle}
                    />
                    <Moon className="h-5 w-5" />
                </div>
            </div>
            <Separator />
            <div className="space-y-3">
                <Label htmlFor="theme-color" className="flex flex-col gap-1">
                    <span>Color</span>
                    <span className="text-xs font-normal text-muted-foreground">Select your preferred accent color.</span>
                </Label>
                <RadioGroup 
                    defaultValue={theme?.replace('-dark', '').replace('-light', '') || 'stone'}
                    onValueChange={(value) => handleThemeChange(value)}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                >
                    <Label className="flex flex-col items-center gap-2 -m-2 p-2 rounded-lg cursor-pointer hover:bg-accent">
                         <RadioGroupItem value="stone" id="theme-stone" className="sr-only"/>
                         <div className="rounded-full w-10 h-10 bg-stone-500 border-2 border-muted" />
                         <span className="font-normal">Stone</span>
                    </Label>
                     <Label className="flex flex-col items-center gap-2 -m-2 p-2 rounded-lg cursor-pointer hover:bg-accent">
                         <RadioGroupItem value="emerald" id="theme-emerald" className="sr-only"/>
                         <div className="rounded-full w-10 h-10 bg-emerald-500 border-2 border-muted" />
                         <span className="font-normal">Emerald</span>
                    </Label>
                    <Label className="flex flex-col items-center gap-2 -m-2 p-2 rounded-lg cursor-pointer hover:bg-accent">
                         <RadioGroupItem value="rose" id="theme-rose" className="sr-only"/>
                         <div className="rounded-full w-10 h-10 bg-rose-500 border-2 border-muted" />
                         <span className="font-normal">Rose</span>
                    </Label>
                    <Label className="flex flex-col items-center gap-2 -m-2 p-2 rounded-lg cursor-pointer hover:bg-accent">
                         <RadioGroupItem value="blue" id="theme-blue" className="sr-only"/>
                         <div className="rounded-full w-10 h-10 bg-blue-500 border-2 border-muted" />
                         <span className="font-normal">Blue</span>
                    </Label>
                </RadioGroup>
            </div>
        </CardContent>
      </Card>
      
      {/* Watchlist & News Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2 font-headline">
            <Filter />
            <span>Watchlist &amp; News Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="default-sector" className="flex flex-col gap-1">
              <span>Default Watchlist Sector</span>
              <span className="text-xs font-normal text-muted-foreground">Select a default sector to focus on</span>
            </Label>
            <Select defaultValue="it">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="it">IT</SelectItem>
                <SelectItem value="pharma">Pharma</SelectItem>
                <SelectItem value="banking">Banking</SelectItem>
                <SelectItem value="auto">Automobile</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="ai-suggestions" className="flex flex-col gap-1">
              <span>Auto-Add from AI Suggestions</span>
              <span className="text-xs font-normal text-muted-foreground">Automatically add AI-recommended stocks to your watchlist</span>
            </Label>
            <Switch id="ai-suggestions" />
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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm"><Trash2 className="mr-2"/>Delete</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action is irreversible and will permanently delete your account, watchlist, and all associated data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Yes, delete my account</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
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

    