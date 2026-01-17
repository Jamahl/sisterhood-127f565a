import { useState } from "react";
import { ArrowLeft, Plus, Trash2, ExternalLink, Gift } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "@/hooks/use-toast";

interface WishlistScreenProps {
  onBack: () => void;
}

interface WishlistItem {
  id: string;
  name: string;
  link?: string;
  notes?: string;
}

const WishlistScreen = ({ onBack }: WishlistScreenProps) => {
  const [items, setItems] = useState<WishlistItem[]>([
    { id: "1", name: "Cozy weighted blanket", notes: "Any neutral color" },
    { id: "2", name: "Lavender bath salts", link: "https://example.com" },
    { id: "3", name: "Self-care journal" },
  ]);
  const [newItemName, setNewItemName] = useState("");
  const [newItemLink, setNewItemLink] = useState("");
  const [newItemNotes, setNewItemNotes] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddItem = () => {
    if (!newItemName.trim()) return;
    
    const newItem: WishlistItem = {
      id: Date.now().toString(),
      name: newItemName.trim(),
      link: newItemLink.trim() || undefined,
      notes: newItemNotes.trim() || undefined,
    };
    
    setItems([...items, newItem]);
    setNewItemName("");
    setNewItemLink("");
    setNewItemNotes("");
    setShowAddForm(false);
    
    toast({
      title: "Item added 🎁",
      description: "Your sisters can now see this on your wishlist",
    });
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Removed from your wishlist",
    });
  };

  return (
    <div className="px-5 pb-24 h-full overflow-y-auto">
      {/* Header */}
      <div className="pt-4 pb-6 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-serif text-xl font-bold text-foreground">My Wishlist</h1>
          <p className="text-sm text-muted-foreground">Things I'd love to receive</p>
        </div>
        <Button variant="soft" size="icon" onClick={() => setShowAddForm(true)}>
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-card rounded-2xl p-4 shadow-card mb-4 space-y-3">
          <Input
            placeholder="Item name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="rounded-xl"
          />
          <Input
            placeholder="Link (optional)"
            value={newItemLink}
            onChange={(e) => setNewItemLink(e.target.value)}
            className="rounded-xl"
          />
          <Input
            placeholder="Notes (optional)"
            value={newItemNotes}
            onChange={(e) => setNewItemNotes(e.target.value)}
            className="rounded-xl"
          />
          <div className="flex gap-2">
            <Button variant="ghost" className="flex-1" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
            <Button className="flex-1" onClick={handleAddItem} disabled={!newItemName.trim()}>
              Add Item
            </Button>
          </div>
        </div>
      )}

      {/* Wishlist Items */}
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="bg-card rounded-2xl p-4 shadow-soft">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blush-light rounded-xl">
                <Gift className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground">{item.name}</h3>
                {item.notes && (
                  <p className="text-sm text-muted-foreground mt-1">{item.notes}</p>
                )}
                {item.link && (
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-primary mt-2"
                  >
                    <ExternalLink className="w-3 h-3" />
                    View link
                  </a>
                )}
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-destructive"
                onClick={() => handleDeleteItem(item.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-12">
          <Gift className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Your wishlist is empty</p>
          <p className="text-sm text-muted-foreground">Add items so your sisters know what you'd love!</p>
        </div>
      )}
    </div>
  );
};

export default WishlistScreen;
