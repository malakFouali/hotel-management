"use client";
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/AppSidebar';
import AppHeader from '@/components/layout/AppHeader';
import { Loader2 } from 'lucide-react';

interface AuthenticatedLayoutProps {
  children: ReactNode;
  pageTitle: string;
}

export default function AuthenticatedLayout({ children, pageTitle }: AuthenticatedLayoutProps) {
  const { isAuthenticated, isLoading, logout, userEmail } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen bg-background text-foreground">
        <AppSidebar userEmail={userEmail || 'User'} onLogout={logout} />
        <SidebarInset>
          <AppHeader pageTitle={pageTitle} userEmail={userEmail || 'User'} onLogout={logout} />
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
