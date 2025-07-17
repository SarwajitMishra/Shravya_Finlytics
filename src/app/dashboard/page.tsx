
'use client';

import {
  Bell,
  CandlestickChart,
  Coins,
  History,
  LayoutGrid,
  Newspaper,
  Settings,
  Star,
  User,
  Wallet,
  LogOut,
  BarChart2,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import StockChart from '@/components/dashboard/stock-chart';
import InvestmentAssistant from '@/components/dashboard/investment-assistant';
import Watchlist from '@/components/dashboard/watchlist';
import EconomicEvents from '@/components/dashboard/economic-events';
import MarketNews from '@/components/dashboard/market-news';
import PortfolioOverview from '@/components/dashboard/portfolio-overview';
import { AppLogo } from '@/components/icons';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import StockSearch from '@/components/dashboard/stock-search';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-background">
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
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-col flex-1 overflow-y-auto">
          <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 border-b shrink-0 bg-background/80 backdrop-blur-sm sm:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="md:hidden" />
              <StockSearch />
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
                      <AvatarImage src={user?.photoURL || "https://i.pravatar.cc/100?u=shravya"} alt={user?.displayName || "User"} data-ai-hint="profile" />
                      <AvatarFallback>{user?.displayName?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.displayName || 'Welcome'}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
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
                      <Link href="/dashboard/watchlist">
                        <Star className="mr-2" />
                        <span>Watchlist</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/portfolio">
                        <Wallet className="mr-2" />
                        <span>Portfolio</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard/history">
                        <History className="mr-2" />
                        <span>History</span>
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
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                      <LogOut className="mr-2" />
                      <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="grid gap-6 lg:col-span-2">
                    <StockChart />
                    <MarketNews />
                    <EconomicEvents />
                </div>
                <div className="grid gap-6 lg:col-span-1">
                    <Watchlist />
                    <PortfolioOverview />
                </div>
            </div>
          </main>
        </div>
      </div>
      <InvestmentAssistant />
    </SidebarProvider>
  );
}
