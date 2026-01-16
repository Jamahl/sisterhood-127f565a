import { useState } from "react";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const moods = [
  { emoji: "😊", label: "Happy", color: "bg-sage" },
  { emoji: "😌", label: "Calm", color: "bg-lavender" },
  { emoji: "😔", label: "Low", color: "bg-secondary" },
  { emoji: "😤", label: "Moody", color: "bg-coral/30" },
  { emoji: "🥱", label: "Tired", color: "bg-muted" },
  { emoji: "🤗", label: "Grateful", color: "bg-peach" },
  { emoji: "😢", label: "Emotional", color: "bg-lavender-dark/30" },
  { emoji: "💪", label: "Strong", color: "bg-blush-light" },
];

interface MoodStatusProps {
  onMoodSelect?: (mood: { emoji: string; label: string }, comment?: string) => void;
}

const MoodStatus = ({ onMoodSelect }: MoodStatusProps) => {
  const [selectedMood, setSelectedMood] = useState<typeof moods[0] | null>(null);
  const [comment, setComment] = useState("");
  const [isShared, setIsShared] = useState(false);

  const handleSelect = (mood: typeof moods[0]) => {
    setSelectedMood(mood);
    setIsShared(false);
  };

  const handleShare = () => {
    if (selectedMood) {
      onMoodSelect?.(selectedMood, comment || undefined);
      setIsShared(true);
    }
  };

  return (
    <div className="bg-card rounded-3xl p-5 shadow-card">
      <h3 className="font-serif text-lg font-semibold text-foreground mb-4">
        How are you feeling today?
      </h3>
      
      <div className="grid grid-cols-4 gap-3">
        {moods.map((mood) => (
          <button
            key={mood.label}
            onClick={() => handleSelect(mood)}
            className={cn(
              "flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all duration-300",
              mood.color,
              selectedMood?.label === mood.label 
                ? "ring-2 ring-primary ring-offset-2 scale-105" 
                : "hover:scale-105"
            )}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className="text-[10px] font-medium text-foreground/80">
              {mood.label}
            </span>
          </button>
        ))}
      </div>

      {/* Comment Section */}
      {selectedMood && !isShared && (
        <div className="mt-4 pt-4 border-t border-border/50 animate-slide-up">
          <p className="text-sm text-muted-foreground mb-2">
            Add a note for your sisters (optional)
          </p>
          <div className="flex gap-2">
            <Input
              placeholder="e.g. Could really use some chocolate 🍫"
              value={comment}
              onChange={(e) => setComment(e.target.value.slice(0, 100))}
              className="flex-1 text-sm rounded-full bg-muted/50 border-0"
            />
            <Button 
              size="icon" 
              variant="default"
              onClick={handleShare}
              className="rounded-full h-10 w-10"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-[10px] text-muted-foreground text-right mt-1">
            {comment.length}/100
          </p>
        </div>
      )}

      {isShared && selectedMood && (
        <div className="mt-4 pt-4 border-t border-border/50 animate-scale-in">
          <div className="flex items-center gap-2 text-sm text-primary font-medium">
            <span>{selectedMood.emoji}</span>
            <span>Shared with your sisters!</span>
            {comment && (
              <span className="text-muted-foreground">"{comment}"</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodStatus;
