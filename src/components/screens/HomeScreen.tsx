import MoodStatus from "../MoodStatus";
import MoodCard from "../MoodCard";

const HomeScreen = () => {
  const friends = [
    {
      name: "Sarah",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
      mood: "Feeling low today",
      moodEmoji: "😔",
      cycleDay: "Day 2",
      message: "Could really use some chocolate and a good movie recommendation 🍫",
      time: "2h ago"
    },
    {
      name: "Emma",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
      mood: "Grateful",
      moodEmoji: "🤗",
      cycleDay: "Day 14",
      message: "Thank you all for the love yesterday! You're the best sisters 💕",
      time: "4h ago"
    },
    {
      name: "Maya",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
      mood: "Tired but pushing through",
      moodEmoji: "🥱",
      cycleDay: "Day 1",
      message: "First day is always the hardest. Sending love to everyone going through it 🫶",
      time: "5h ago"
    },
  ];

  return (
    <div className="px-5 pb-24">
      {/* Header */}
      <div className="pt-4 pb-6">
        <h1 className="font-serif text-2xl font-bold text-foreground">
          Good morning, <span className="text-gradient">Bella</span> ✨
        </h1>
        <p className="text-muted-foreground mt-1">Your sisters are thinking of you</p>
      </div>

      {/* Mood Status */}
      <div className="mb-6">
        <MoodStatus />
      </div>

      {/* Feed */}
      <div className="space-y-4">
        <h2 className="font-serif text-lg font-semibold text-foreground">
          Your Circle Updates
        </h2>
        
        {friends.map((friend, index) => (
          <MoodCard key={index} {...friend} />
        ))}
      </div>
    </div>
  );
};

export default HomeScreen;
