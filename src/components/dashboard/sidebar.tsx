
import { Home, Calendar, Clock, Truck, Settings, LogOut, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export interface SidebarNavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

const sidebarNavItems: SidebarNavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Schedule Pickup",
    href: "/schedule",
    icon: Calendar,
  },
  {
    title: "Urgent Pickup",
    href: "/urgent",
    icon: Clock,
  },
  {
    title: "Pickup History",
    href: "/history",
    icon: Truck,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col h-screen p-4 border-r shadow-sm transition-all duration-300",
        collapsed ? "w-20" : "w-64",
        "border-sidebar-border bg-sidebar-background",
        className
      )}
    >
      <div className="flex justify-between items-center mb-8">
        {!collapsed && (
          <div className="flex items-center">
            <Truck className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-bold ml-2 text-gradient">TrashFlow</h1>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 rounded-md text-sidebar-foreground hover:text-primary hover:bg-sidebar-accent"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 space-y-1">
        <nav className="flex flex-col space-y-1">
          {sidebarNavItems.map((item) => (
            <Button
              key={item.href}
              variant="ghost"
              className={cn(
                "flex items-center justify-start text-sidebar-foreground hover:text-primary hover:bg-sidebar-accent rounded-lg",
                collapsed ? "justify-center px-2" : "justify-start"
              )}
              asChild
            >
              <a href={item.href}>
                <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")} />
                {!collapsed && <span>{item.title}</span>}
              </a>
            </Button>
          ))}
        </nav>
      </div>

      <Button
        variant="ghost"
        className="flex items-center justify-start text-sidebar-foreground hover:text-destructive hover:bg-sidebar-accent rounded-lg mt-auto"
        asChild
      >
        <a href="/logout">
          <LogOut className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")} />
          {!collapsed && <span>Logout</span>}
        </a>
      </Button>
    </div>
  );
}
