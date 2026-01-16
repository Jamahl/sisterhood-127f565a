import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import { useNotifications } from "@/hooks/useNotifications";

interface NotificationBellProps {
  onClick: () => void;
}

const NotificationBell = ({ onClick }: NotificationBellProps) => {
  const { unreadCount } = useNotifications();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative rounded-full h-10 w-10"
      onClick={onClick}
    >
      <Bell className="w-5 h-5 text-foreground" />
      {unreadCount > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </Button>
  );
};

export default NotificationBell;
