"use client";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SidebarTrigger } from "@/components/ui/sidebar"; // For mobile sidebar toggle
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, LogOut, UserCircle, Moon, Sun } from 'lucide-react'; // Added Moon, Sun for theme toggle
import Link from "next/link";
import { useTheme } from "next-themes"; // Assuming next-themes is installed or will be
import { useEffect, useState } from "react";


interface AppHeaderProps {
  pageTitle: string;
  userEmail: string;
  onLogout: () => void;
}

// Placeholder for next-themes if not installed
const useThemeStub = () => {
  const [theme, setThemeState] = useState('light');
  useEffect(() => {
    // In a real scenario, you'd check localStorage or system preference
    const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : 'light';
    if (storedTheme) setThemeState(storedTheme);
  }, []);
  
  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(newTheme);
    }
  };
  return { theme, setTheme };
};


export default function AppHeader({ pageTitle, userEmail, onLogout }: AppHeaderProps) {
  // const { theme, setTheme } = useTheme(); // Use this if next-themes is setup
  const { theme, setTheme } = useThemeStub(); // Using stub for now
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);


  const getInitials = (email: string) => {
    const parts = email.split('@')[0].split('.');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/80 px-4 shadow-sm backdrop-blur-md md:px-6">
      <div className="flex items-center gap-4">
        <div className="md:hidden">
           <SidebarTrigger />
        </div>
        <h1 className="text-xl font-semibold text-foreground">{pageTitle}</h1>
      </div>
      <div className="flex items-center gap-4">
        {mounted && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${userEmail}`} alt={userEmail} />
                <AvatarFallback>{getInitials(userEmail)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Signed in as</p>
                <p className="text-xs leading-none text-muted-foreground truncate">
                  {userEmail}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout} className="cursor-pointer text-destructive focus:text-destructive-foreground focus:bg-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
