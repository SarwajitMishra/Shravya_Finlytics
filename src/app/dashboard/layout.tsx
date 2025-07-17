
'use client';
import { AuthGuard } from '@/hooks/use-auth';
import { StockProvider } from '@/hooks/use-stock';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <StockProvider>{children}</StockProvider>
    </AuthGuard>
  );
}
