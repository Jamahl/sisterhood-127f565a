import { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

export interface Notification {
  id: string;
  type: "comment" | "love" | "mood_update";
  fromUser: string;
  fromAvatar: string;
  targetPostId?: string;
  targetUser?: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "time" | "read">) => void;
  markAllRead: () => void;
  markAsRead: (id: string) => void;
  showNotificationPanel: boolean;
  setShowNotificationPanel: (show: boolean) => void;
  selectedPostId: string | null;
  setSelectedPostId: (id: string | null) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "love",
      fromUser: "Sarah",
      fromAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      targetPostId: "1",
      targetUser: "you",
      message: "sent you love 💕",
      time: "5 min ago",
      read: false,
    },
    {
      id: "2",
      type: "comment",
      fromUser: "Emma",
      fromAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      targetPostId: "2",
      targetUser: "you",
      message: "commented: \"You've got this! 💪\"",
      time: "15 min ago",
      read: false,
    },
    {
      id: "3",
      type: "mood_update",
      fromUser: "Maya",
      fromAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
      targetPostId: "3",
      message: "updated their mood to 😔 Feeling low today",
      time: "1h ago",
      read: true,
    },
    {
      id: "4",
      type: "comment",
      fromUser: "Lily",
      fromAvatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop",
      targetPostId: "4",
      message: "commented on Sarah's post: \"We're here for you! 🫶\"",
      time: "2h ago",
      read: true,
    },
  ]);
  
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  const addNotification = (notification: Omit<Notification, "id" | "time" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      time: "Just now",
      read: false,
    };
    
    setNotifications(prev => [newNotification, ...prev]);

    // Show toast notification
    const toastMessage = notification.type === "love" 
      ? `${notification.fromUser} sent love 💕`
      : notification.type === "comment"
      ? `${notification.fromUser} commented 💬`
      : `${notification.fromUser} ${notification.message}`;

    toast({
      title: toastMessage,
      description: notification.type === "comment" ? notification.message.replace("commented: ", "") : undefined,
    });
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      unreadCount, 
      addNotification, 
      markAllRead,
      markAsRead,
      showNotificationPanel,
      setShowNotificationPanel,
      selectedPostId,
      setSelectedPostId,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return context;
};
