
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Trash2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PickupCardProps {
  title: string;
  description: string;
  type: "standard" | "urgent";
  price?: string;
  surcharge?: string;
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function PickupCard({ 
  title, 
  description, 
  type, 
  price, 
  surcharge, 
  icon, 
  className,
  onClick
}: PickupCardProps) {
  return (
    <Card className={cn("overflow-hidden glass-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 border-white/5", className)}>
      <CardHeader className="p-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className={cn(
            "p-2 rounded-full",
            type === "standard" 
              ? "bg-success/20 text-success" 
              : "bg-urgent/20 text-urgent"
          )}>
            {icon || (type === "standard" ? <Calendar className="h-5 w-5" /> : <Clock className="h-5 w-5" />)}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <p className="text-muted-foreground">{description}</p>
        
        {price && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-lg font-bold">{price}</span>
            {surcharge && type === "urgent" && (
              <div className="flex items-center text-urgent/90 gap-1">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-xs">+{surcharge} surcharge</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Button 
          onClick={onClick}
          className={cn(
            "w-full",
            type === "standard" ? "bg-success hover:bg-success/90 text-white" : "bg-urgent hover:bg-urgent/90"
          )}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          {type === "standard" ? "Schedule Pickup" : "Request Urgent Pickup"}
        </Button>
      </CardFooter>
    </Card>
  );
}
