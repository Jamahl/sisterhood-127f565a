import { useState } from "react";
import { cn } from "@/lib/utils";

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
  onMoodSelect?: (mood: { emoji: string; label: string }) => void;
}

const MoodStatus = ({ onMoodSelect }: MoodStatusProps) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleSelect = (mood: typeof moods[0]) => {
    setSelectedMood(mood.label);
    onMoodSelect?.(mood);
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
              selectedMood === mood.label 
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
    </div>
  );
};

export default MoodStatus;
