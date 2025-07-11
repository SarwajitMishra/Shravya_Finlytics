
import {
  Bell,
  CandlestickChart,
  Coins,
  History,
  LayoutGrid,
  Newspaper,
  Search,
  Settings,
  Star,
  User,
  Wallet,
  LogOut,
  BarChart2,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import StockChart from '@/components/dashboard/stock-chart';
import InvestmentAssistant from '@/components/dashboard/investment-assistant';
import Watchlist from '@/components/dashboard/watchlist';
import EconomicEvents from '@/components/dashboard/economic-events';
import MarketNews from '@/components/dashboard/market-news';
import { AppLogo } from '@/components/icons';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2">
              <AppLogo className="w-8 h-8 text-primary" />
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold font-headline">Shravya Finlytics</h2>
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive>
                  <Link href="/dashboard">
                    <LayoutGrid />
                    <span>Dashboard</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/markets">
                    <CandlestickChart />
                    <span>Markets</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/charts">
                    <BarChart2 />
                    <span>Charts</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/news">
                    <Newspaper />
                    <span>News</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/watchlist">
                    <Star />
                    <span>Watchlist</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/portfolio">
                    <Wallet />
                    <span>Portfolio</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/history">
                    <History />
                    <span>History</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-col flex-1 overflow-y-auto">
          <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 border-b shrink-0 bg-background/80 backdrop-blur-sm sm:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
              <div className="relative flex-1 md:grow-0">
                <Search className="absolute w-4 h-4 text-muted-foreground left-2.5 top-2.5" />
                <Input
                  type="search"
                  placeholder="Search stocks, news..."
                  className="w-full rounded-lg bg-card pl-8 md:w-[200px] lg:w-[320px]"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
                <span className="sr-only">Notifications</span>
              </Button>
               <div className="hidden items-center gap-2 px-3 py-1.5 rounded-full bg-card sm:flex">
                <Coins className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">1,250</span>
                <span className="text-sm text-muted-foreground">S-Coins</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative p-0 rounded-full h-9 w-9">
                    <Avatar className="w-9 h-9">
                      <AvatarImage src="https://i.pravatar.cc/100?u=shravya" alt="User" data-ai-hint="profile" />
                      <AvatarFallback>SF</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Shravya</p>
                      <p className="text-xs leading-none text-muted-foreground">shravya@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/profile">
                        <User className="mr-2" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                       <Link href="/dashboard/settings">
                        <Settings className="mr-2" />
                        <span>Settings</span>
                       </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/login">
                      <LogOut className="mr-2" />
                      <span>Log out</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1">
            <div className="p-4 sm:p-6">
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <StockChart />
                    </div>
                    <div className="lg:col-span-1 lg:row-span-2">
                        <Watchlist />
                    </div>
                    <div className="lg:col-span-2">
                         <MarketNews />
                    </div>
                </div>
                <div className="grid gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
                    <EconomicEvents />
                    <Card>
                        <CardHeader>
                        <CardTitle>Portfolio Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <p className="text-sm text-muted-foreground">Your portfolio insights will be displayed here.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
          </main>
        </div>
      </div>
      <InvestmentAssistant />
    </SidebarProvider>
  );
}
