
import { Truck, Calendar, Clock, BarChart3 } from "lucide-react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { UserProfile } from "@/components/dashboard/user-profile";
import { PickupCard } from "@/components/dashboard/pickup-card";
import { StatsCard } from "@/components/dashboard/stats-card";

const Index = () => {
  // Mock user data - in a real app, this would come from authentication/API
  const user = {
    name: "Alex Johnson",
    accountType: "vip" as const,
    email: "alex.johnson@example.com"
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Manage your waste collection services</p>
              </div>
              <UserProfile 
                name={user.name} 
                accountType={user.accountType} 
                email={user.email}
                className="glass-card rounded-xl p-4" 
              />
            </div>
          </header>
          
          <div className="grid gap-6 md:grid-cols-4 mb-8">
            <StatsCard 
              title="Next Pickup" 
              value="May 22" 
              description="Scheduled for 9:00 AM" 
              icon={<Calendar className="h-4 w-4" />} 
            />
            <StatsCard 
              title="Total Pickups" 
              value="24" 
              description="This month" 
              icon={<Truck className="h-4 w-4" />} 
            />
            <StatsCard 
              title="Urgent Pickups" 
              value="3" 
              description="This month" 
              icon={<Clock className="h-4 w-4" />} 
            />
            <StatsCard 
              title="Waste Reduction" 
              value="12%" 
              description="From last month" 
              icon={<BarChart3 className="h-4 w-4" />} 
            />
          </div>
          
          <h2 className="text-xl font-semibold mb-4">Service Options</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <PickupCard 
              title="Standard Weekly Pickup" 
              description="Schedule your regular weekly trash collection service. Our team will pick up your waste on a consistent day each week."
              type="standard"
              price="$29.99/month"
            />
            <PickupCard 
              title="Urgent Pickup Service" 
              description="Need immediate waste removal? Our urgent pickup service is available within 2 hours of your request."
              type="urgent"
              price="$49.99"
              surcharge="$20.00"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
