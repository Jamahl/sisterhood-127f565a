import NotificationCard from "../NotificationCard";

const NotificationsScreen = () => {
  const notifications = [
    { type: "love" as const, title: "Sarah sent you love", message: "Thinking of you today! 💕 Hope you're taking care of yourself.", time: "2 min ago", isNew: true },
    { type: "gift" as const, title: "Care Package Received!", message: "Emma sent you a Cozy Heating Pad. Check your Amazon orders.", time: "1 hour ago", isNew: true },
    { type: "alert" as const, title: "Maya needs support", message: "Day 1 of her cycle. Consider sending her some love.", time: "3 hours ago", isNew: false },
    { type: "circle" as const, title: "Olivia joined your circle", message: "Your sister Olivia is now in your Sisterhood!", time: "Yesterday", isNew: false },
    { type: "love" as const, title: "Mom is thinking of you", message: "Hope you're having a wonderful day, sweetie! 🌸", time: "Yesterday", isNew: false },
    { type: "alert" as const, title: "Cycle reminder", message: "Your period is expected in 3 days. Time for some self-care prep!", time: "2 days ago", isNew: false },
  ];

  return (
    <div className="px-5 pb-24">
      {/* Header */}
      <div className="pt-4 pb-6">
        <h1 className="font-serif text-2xl font-bold text-foreground">
          Notifications
        </h1>
        <p className="text-muted-foreground mt-1">Stay connected with your sisters</p>
      </div>

      {/* Auto Notifications Info */}
      <div className="bg-blush-light/50 p-4 rounded-2xl mb-6 border border-primary/20">
        <h4 className="font-semibold text-foreground text-sm">🔔 Auto Notifications Active</h4>
        <p className="text-xs text-muted-foreground mt-1">
          Your circle gets notified when you update your mood or cycle status
        </p>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <NotificationCard key={index} {...notification} />
        ))}
      </div>
    </div>
  );
};

export default NotificationsScreen;
