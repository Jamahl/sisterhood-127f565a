import { Bell, Heart, MessageCircle, Sparkles, ChevronLeft } from "lucide-react";
import { Button } from "./ui/button";
import { useNotifications } from "@/hooks/useNotifications";

interface NotificationPanelProps {
  onClose: () => void;
  onNotificationClick: (postId: string) => void;
}

const NotificationPanel = ({ onClose, onNotificationClick }: NotificationPanelProps) => {
  const { notifications, markAllRead, markAsRead } = useNotifications();

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

  const handleNotificationClick = (notification: typeof notifications[0]) => {
    markAsRead(notification.id);
    if (notification.targetPostId) {
      onNotificationClick(notification.targetPostId);
    }
  };

  return (
    <div className="absolute inset-0 bg-background z-50 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-4 pb-4 border-b border-border/50">
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full h-10 w-10"
          onClick={onClose}
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-serif text-xl font-bold text-foreground flex-1">
          Notifications
        </h1>
        {notifications.some(n => !n.read) && (
          <Button 
            variant="ghost" 
            size="sm"
            className="text-primary text-sm"
            onClick={markAllRead}
          >
            Mark all read
          </Button>
        )}
      </div>

      {/* Notifications List */}
      <div className="overflow-y-auto h-[calc(100%-80px)] px-5 py-4 space-y-2">
        {notifications.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium">No notifications yet</p>
            <p className="text-sm mt-1">When your sisters interact with you, you'll see it here</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <button
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`w-full flex items-start gap-3 p-4 rounded-2xl transition-all text-left
                ${notification.read ? "bg-transparent" : "bg-muted/50"}
                hover:bg-muted/70 active:scale-[0.98]`}
            >
              <div className="relative flex-shrink-0">
                <img 
                  src={notification.fromAvatar}
                  alt={notification.fromUser}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className={`absolute -bottom-1 -right-1 p-1.5 rounded-full ${getNotificationBg(notification.type)}`}>
                  {getNotificationIcon(notification.type)}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-relaxed">
                  <span className="font-semibold text-foreground">{notification.fromUser}</span>
                  {" "}
                  <span className="text-muted-foreground">{notification.message}</span>
                </p>
                <span className="text-xs text-muted-foreground mt-1 block">{notification.time}</span>
              </div>
              {!notification.read && (
                <div className="w-2.5 h-2.5 rounded-full bg-primary mt-1 flex-shrink-0" />
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
