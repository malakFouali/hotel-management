"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Hotel, LayoutDashboard, CalendarCheck, BedDouble, Users, FileText, UserCog, LogOut } from "lucide-react";

interface AppSidebarProps {
  userEmail: string;
  onLogout: () => void;
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/rooms", label: "Rooms", icon: BedDouble },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/invoices", label: "Invoices", icon: FileText },
  { href: "/users", label: "Staff", icon: UserCog },
];

export default function AppSidebar({ userEmail, onLogout }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar side="left" variant="sidebar" collapsible="icon">
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
          <Hotel className="h-8 w-8 text-primary" />
          <span className="text-xl font-semibold group-data-[collapsible=icon]:hidden">HotelZenith</span>
        </Link>
        <div className="md:hidden ml-auto"> {/* Only show trigger on mobile in header */}
          {/* <SidebarTrigger /> This trigger is better placed in AppHeader for mobile */}
        </div>
      </SidebarHeader>
      <Separator className="group-data-[collapsible=icon]:hidden" />
      <SidebarContent className="p-2">
        <ScrollArea className="h-[calc(100vh-180px)]"> {/* Adjust height as needed */}
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))}
                    tooltip={{ children: item.label, className: "bg-card text-card-foreground border-border" }}
                  >
                    <a>
                      <item.icon className="h-5 w-5" />
                      <span className="group-data-[collapsible=icon]:hidden">{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
      <Separator className="group-data-[collapsible=icon]:hidden"/>
      <SidebarFooter className="p-4 flex flex-col gap-2">
         <div className="group-data-[collapsible=icon]:hidden text-center text-xs text-sidebar-foreground/70">
          Logged in as <br/> <span className="font-medium truncate block max-w-full">{userEmail}</span>
        </div>
        <Button variant="ghost" onClick={onLogout} className="w-full justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:aspect-square text-destructive hover:bg-destructive/10 hover:text-destructive">
          <LogOut className="h-5 w-5" />
          <span className="ml-2 group-data-[collapsible=icon]:hidden">Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
