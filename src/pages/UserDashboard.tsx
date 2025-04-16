
import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Truck, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock pickup data
const pickups = [
  { id: 1, type: "Standard", date: "2023-05-22", status: "Completed", notes: "Left at the curb" },
  { id: 2, type: "Urgent", date: "2023-05-15", status: "Completed", notes: "Extra recycling" },
  { id: 3, type: "Standard", date: "2023-05-29", status: "Scheduled", notes: "" },
];

const UserDashboard = () => {
  const [pickupType, setPickupType] = useState("standard");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isUrgent = pickupType === "urgent";
    
    // Validation
    if (!pickupDate || (isUrgent && !pickupTime)) {
      toast({
        title: "Error",
        description: isUrgent 
          ? "Please select both date and time for urgent pickups" 
          : "Please select a date for your pickup",
        variant: "destructive",
      });
      return;
    }
    
    console.log("Pickup requested:", { pickupType, pickupDate, pickupTime, notes });
    
    toast({
      title: "Success",
      description: `Your ${isUrgent ? "urgent" : "standard"} pickup has been scheduled`,
    });
    
    // Reset form
    setPickupDate("");
    setPickupTime("");
    setNotes("");
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "bg-success text-success-foreground";
      case "scheduled": return "bg-warning text-warning-foreground";
      case "cancelled": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Your Dashboard</h1>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Subscription Overview</CardTitle>
                <CardDescription>Your current plan and usage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Plan</span>
                  <Badge variant="secondary" className="font-medium">Premium</Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Pickups Used</span>
                    <span className="font-medium">8 of 12</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-1 bg-secondary/40 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Next Pickup</span>
                    </div>
                    <span className="text-lg font-medium">May 29, 2023</span>
                  </div>
                  
                  <div className="flex-1 bg-secondary/40 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Time Window</span>
                    </div>
                    <span className="text-lg font-medium">8:00 - 12:00 AM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Request a Pickup</CardTitle>
                <CardDescription>Schedule your next waste collection</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupType">Pickup Type</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant={pickupType === "standard" ? "default" : "outline"}
                        className={pickupType === "standard" ? "" : "border-primary/30"}
                        onClick={() => setPickupType("standard")}
                      >
                        <Truck className="mr-2 h-4 w-4" />
                        Standard
                      </Button>
                      <Button
                        type="button"
                        variant={pickupType === "urgent" ? "default" : "outline"}
                        className={pickupType === "urgent" ? "" : "border-primary/30"}
                        onClick={() => setPickupType("urgent")}
                      >
                        <AlertCircle className="mr-2 h-4 w-4" />
                        Urgent
                      </Button>
                    </div>
                    
                    {pickupType === "urgent" && (
                      <p className="text-sm text-warning-foreground mt-1 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Urgent pickups incur a $20 surcharge
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="pickupDate">Pickup Date</Label>
                    <Input
                      id="pickupDate"
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  {pickupType === "urgent" && (
                    <div className="space-y-2">
                      <Label htmlFor="pickupTime">Pickup Time</Label>
                      <Input
                        id="pickupTime"
                        type="time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Special Instructions</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special requests or instructions..."
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Schedule Pickup
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Pickup History</CardTitle>
              <CardDescription>Your recent waste collection requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4">ID</th>
                      <th className="text-left py-3 px-4">Type</th>
                      <th className="text-left py-3 px-4">Date</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pickups.map((pickup) => (
                      <tr key={pickup.id} className="border-b border-border hover:bg-secondary/20">
                        <td className="py-3 px-4">#{pickup.id}</td>
                        <td className="py-3 px-4">{pickup.type}</td>
                        <td className="py-3 px-4">{pickup.date}</td>
                        <td className="py-3 px-4">
                          <Badge 
                            className={getStatusColor(pickup.status)}
                          >
                            {pickup.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{pickup.notes || "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
