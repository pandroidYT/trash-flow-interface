
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export type AccountType = "standard" | "vip" | "admin";

interface UserProfileProps {
  name: string;
  accountType: AccountType;
  email?: string;
  avatarUrl?: string;
  className?: string;
}

export function UserProfile({
  name,
  accountType,
  email,
  avatarUrl,
  className,
}: UserProfileProps) {
  const getAccountTypeColor = (type: AccountType) => {
    switch (type) {
      case "standard":
        return "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30";
      case "vip":
        return "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30";
      case "admin":
        return "bg-red-500/20 text-red-400 hover:bg-red-500/30";
      default:
        return "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className={cn("flex items-center gap-3 p-4", className)}>
      <Avatar className="h-12 w-12 border border-border">
        <AvatarImage src={avatarUrl} alt={name} />
        <AvatarFallback className="bg-primary/10 text-primary">
          {getInitials(name)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg">{name}</h3>
          <Badge
            variant="outline"
            className={cn(
              "text-xs font-medium capitalize",
              getAccountTypeColor(accountType)
            )}
          >
            {accountType}
          </Badge>
        </div>
        {email && <p className="text-muted-foreground text-sm">{email}</p>}
      </div>
    </div>
  );
}
