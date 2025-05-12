"use client";
import type { ReactNode } from 'react';
import { useState, useEffect, createContext, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Loader2 } from 'lucide-react'; // Import Loader2

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string) => void; // Simplified login, email as mock token
  logout: () => void;
  isLoading: boolean;
  userEmail: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check localStorage only on the client side after mount
    try {
      const storedEmail = localStorage.getItem('hotelZenithUserEmail');
      if (storedEmail) {
        setUserEmail(storedEmail);
        setIsAuthenticated(true);
      }
    } catch (error) {
      // Handle cases where localStorage might not be available (e.g., SSR initial render, security settings)
      console.error("Failed to access localStorage on mount:", error);
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array ensures this runs once on mount client-side

  const login = (email: string) => {
    try {
      localStorage.setItem('hotelZenithUserEmail', email);
      setUserEmail(email);
      setIsAuthenticated(true);
      router.replace('/dashboard'); // Use replace to avoid login page in history
    } catch (error) {
      console.error("Failed to write to localStorage during login:", error);
      // Optionally, inform the user about the issue
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('hotelZenithUserEmail');
    } catch (error) {
      console.error("Failed to remove from localStorage during logout:", error);
    }
    setUserEmail(null);
    setIsAuthenticated(false);
    router.replace('/login'); // Use replace to avoid authenticated pages in history
  };

  useEffect(() => {
    // This effect handles redirection based on auth state
    // It should only run after the initial loading is complete
    if (!isLoading) {
       if (!isAuthenticated && pathname !== '/login') {
        // If not authenticated and not already on the login page, redirect to login
         router.replace('/login');
       } else if (isAuthenticated && pathname === '/login') {
         // If authenticated and somehow on the login page, redirect to dashboard
         router.replace('/dashboard');
       }
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  // Prepare the context value object
  const authContextValue: AuthContextType = {
    isAuthenticated,
    login,
    logout,
    isLoading,
    userEmail
  };

  // Render loading state or children wrapped in provider
  // Avoid rendering children potentially relying on auth state while loading
  if (isLoading) {
     // Render a loading indicator or null while checking auth status
     return (
       <div className="flex h-screen items-center justify-center bg-background">
         {/* Use Loader2 for consistency */}
         <Loader2 className="h-12 w-12 animate-spin text-primary" />
       </div>
     );
  }


  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};