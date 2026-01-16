import { useState } from "react";
import { Bell, Heart, MessageCircle, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useNotifications } from "@/hooks/useNotifications";

const NotificationBell = () => {
  const { notifications, unreadCount, markAllRead, markAsRead } = useNotifications();
  const [open, setOpen] = useState(false);

  const handleOpen = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen && unreadCount > 0) {
      // Mark all as read when opening
      setTimeout(() => markAllRead(), 500);
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "love":
        return <Heart className="w-4 h-4 text-primary fill-primary" />;
      case "comment":
        return <MessageCircle className="w-4 h-4 text-lavender-dark" />;
      case "mood_update":
        return <Sparkles className="w-4 h-4 text-peach" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getNotificationBg = (type: string) => {
    switch (type) {
      case "love":
        return "bg-blush-light";
      case "comment":
        return "bg-lavender/50";
      case "mood_update":
        return "bg-peach/30";
      default:
        return "bg-muted";
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative rounded-full h-10 w-10"
        >
          <Bell className="w-5 h-5 text-foreground" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="rounded-b-3xl max-h-[70vh] overflow-hidden">
        <SheetHeader className="pb-4 border-b border-border/50">
          <SheetTitle className="font-serif text-lg">Notifications</SheetTitle>
        </SheetHeader>
        
        <div className="overflow-y-auto max-h-[calc(70vh-80px)] py-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div 
                key={notification.id}
                onClick={() => markAsRead(notification.id)}
                className={`flex items-start gap-3 p-3 rounded-2xl transition-all cursor-pointer
                  ${notification.read ? "bg-transparent" : "bg-muted/50"}
                  hover:bg-muted/70`}
              >
                <div className="relative">
                  <img 
                    src={notification.fromAvatar}
                    alt={notification.fromUser}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 p-1 rounded-full ${getNotificationBg(notification.type)}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">
                    <span className="font-semibold text-foreground">{notification.fromUser}</span>
                    {" "}
                    <span className="text-muted-foreground">{notification.message}</span>
                  </p>
                  <span className="text-xs text-muted-foreground">{notification.time}</span>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                )}
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationBell;
