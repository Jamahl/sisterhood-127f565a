import { cn } from "@/lib/utils";
import { Users } from "lucide-react";

export interface Sisterhood {
  id: string;
  name: string;
  memberCount: number;
  emoji?: string;
}

interface SisterhoodTabsProps {
  sisterhoods: Sisterhood[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const SisterhoodTabs = ({ sisterhoods, activeTab, onTabChange }: SisterhoodTabsProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onTabChange("all")}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
          activeTab === "all"
            ? "bg-primary text-primary-foreground shadow-soft"
            : "bg-card text-muted-foreground hover:bg-muted"
        )}
      >
        <Users className="w-4 h-4" />
        All Sisters
      </button>
      
      {sisterhoods.map((sisterhood) => (
        <button
          key={sisterhood.id}
          onClick={() => onTabChange(sisterhood.id)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
            activeTab === sisterhood.id
              ? "bg-primary text-primary-foreground shadow-soft"
              : "bg-card text-muted-foreground hover:bg-muted"
          )}
        >
          <span>{sisterhood.emoji || "💕"}</span>
          {sisterhood.name}
          <span className="text-xs opacity-70">({sisterhood.memberCount})</span>
        </button>
      ))}
    </div>
  );
};

export default SisterhoodTabs;
