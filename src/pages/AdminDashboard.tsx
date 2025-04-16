
import { useState } from "react";
import { Header } from "@/components/common/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Truck, AlertTriangle, Clock, Trash2, Filter } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock orders data
const initialOrders = [
  {
    id: "ORD-001",
    type: "Standard",
    date: "2023-05-22",
    time: "09:00 AM",
    notes: "Left at the curb",
    surcharge: 0,
    status: "Completed",
    createdAt: "2023-05-15"
  },
  {
    id: "ORD-002",
    type: "Urgent",
    date: "2023-05-15",
    time: "02:30 PM",
    notes: "Extra recycling bags",
    surcharge: 20,
    status: "Completed",
    createdAt: "2023-05-15"
  },
  {
    id: "ORD-003",
    type: "Standard",
    date: "2023-05-29",
    time: "10:00 AM",
    notes: "",
    surcharge: 0,
    status: "Scheduled",
    createdAt: "2023-05-20"
  },
  {
    id: "ORD-004",
    type: "Urgent",
    date: "2023-05-25",
    time: "04:15 PM",
    notes: "Construction debris",
    surcharge: 20,
    status: "In Progress",
    createdAt: "2023-05-25"
  },
  {
    id: "ORD-005",
    type: "Standard",
    date: "2023-06-05",
    time: "08:30 AM",
    notes: "",
    surcharge: 0,
    status: "Scheduled",
    createdAt: "2023-05-23"
  }
];

const AdminDashboard = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const handleComplete = (id: string) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: "Completed" } : order
    ));
    
    toast({
      title: "Order Updated",
      description: `Order ${id} has been marked as completed`,
    });
  };

  const handleReset = (id: string) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: "Scheduled" } : order
    ));
    
    toast({
      title: "Order Reset",
      description: `Order ${id} has been reset to scheduled status`,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this order?")) {
      setOrders(orders.filter(order => order.id !== id));
      
      toast({
        title: "Order Deleted",
        description: `Order ${id} has been removed from the system`,
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "bg-success text-success-foreground";
      case "in progress": return "bg-primary text-primary-foreground";
      case "scheduled": return "bg-warning text-warning-foreground";
      case "cancelled": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return <CheckCircle className="h-4 w-4 mr-1" />;
      case "in progress": return <Truck className="h-4 w-4 mr-1" />;
      case "scheduled": return <Clock className="h-4 w-4 mr-1" />;
      case "cancelled": return <AlertTriangle className="h-4 w-4 mr-1" />;
      default: return null;
    }
  };

  // Filter orders based on search and filters
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         order.notes.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesType = typeFilter === "all" || order.type.toLowerCase() === typeFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage waste collection requests</p>
            </div>
            
            <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
              <Input
                placeholder="Search by ID or notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64"
              />
              
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => {
                  setSearchQuery("");
                  setStatusFilter("all");
                  setTypeFilter("all");
                }}
              >
                <Filter className="h-4 w-4" />
                Clear Filters
              </Button>
            </div>
          </div>
          
          <Card className="glass-card overflow-hidden">
            <CardHeader className="pb-0">
              <CardTitle>Pickup Requests</CardTitle>
              <CardDescription>View and manage customer orders</CardDescription>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <div className="bg-secondary/30 rounded-lg p-2 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-transparent border-none text-sm font-medium focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                
                <div className="bg-secondary/30 rounded-lg p-2 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Type:</span>
                  <select 
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="bg-transparent border-none text-sm font-medium focus:outline-none"
                  >
                    <option value="all">All Types</option>
                    <option value="standard">Standard</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto mt-4">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-border">
                      <th className="py-3 px-4">Order ID</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Pickup Date</th>
                      <th className="py-3 px-4">Time</th>
                      <th className="py-3 px-4">Notes</th>
                      <th className="py-3 px-4">Surcharge</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Created</th>
                      <th className="py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b border-border hover:bg-secondary/20">
                        <td className="py-3 px-4 font-medium">{order.id}</td>
                        <td className="py-3 px-4">
                          <Badge variant={order.type === "Urgent" ? "default" : "secondary"}>
                            {order.type}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{order.date}</td>
                        <td className="py-3 px-4">{order.time}</td>
                        <td className="py-3 px-4">{order.notes || "-"}</td>
                        <td className="py-3 px-4">
                          {order.surcharge > 0 ? `$${order.surcharge.toFixed(2)}` : "-"}
                        </td>
                        <td className="py-3 px-4">
                          <Badge 
                            className={`flex items-center ${getStatusColor(order.status)}`}
                          >
                            {getStatusIcon(order.status)}
                            {order.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">{order.createdAt}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            {order.status !== "Completed" && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleComplete(order.id)}
                                className="h-8"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Complete
                              </Button>
                            )}
                            
                            {order.status === "Completed" && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleReset(order.id)}
                                className="h-8"
                              >
                                <Clock className="h-4 w-4 mr-1" />
                                Reset
                              </Button>
                            )}
                            
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDelete(order.id)}
                              className="h-8"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    
                    {filteredOrders.length === 0 && (
                      <tr>
                        <td colSpan={9} className="py-8 text-center text-muted-foreground">
                          No orders found matching your filters
                        </td>
                      </tr>
                    )}
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

export default AdminDashboard;
