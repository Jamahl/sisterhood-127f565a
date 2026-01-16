import CarePackageCard from "../CarePackageCard";
import { Button } from "../ui/button";
import { Plus, Sparkles } from "lucide-react";

const GiftsScreen = () => {
  const carePackages = [
    { title: "Cozy Heating Pad", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=200&fit=crop", price: 15, category: "Comfort" },
    { title: "Dark Chocolate Set", image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=300&h=200&fit=crop", price: 10, category: "Treats" },
    { title: "Lavender Bath Bombs", image: "https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=300&h=200&fit=crop", price: 15, category: "Self-Care" },
    { title: "Herbal Tea Collection", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=300&h=200&fit=crop", price: 10, category: "Wellness" },
    { title: "Cozy Fuzzy Socks", image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=300&h=200&fit=crop", price: 5, category: "Comfort" },
    { title: "Affirmation Cards", image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=300&h=200&fit=crop", price: 10, category: "Mindfulness" },
  ];

  return (
    <div className="px-5 pb-24">
      {/* Header */}
      <div className="pt-4 pb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-bold text-foreground">
            Care Packages
          </h1>
          <p className="text-muted-foreground mt-1">Send love through gifts</p>
        </div>
        <Button variant="gradient" size="icon">
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Info Card */}
      <div className="bg-gradient-to-r from-lavender to-peach p-4 rounded-2xl mb-6 flex items-center gap-3">
        <div className="p-2 bg-card/50 rounded-xl backdrop-blur-sm">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h4 className="font-semibold text-foreground text-sm">Send a Care Package</h4>
          <p className="text-xs text-muted-foreground">Choose $5, $10, or $15 gifts via Amazon</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {["All", "$5", "$10", "$15", "Comfort", "Treats"].map((filter, index) => (
          <button
            key={filter}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              index === 0
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:bg-blush-light"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {carePackages.map((pkg, index) => (
          <CarePackageCard key={index} {...pkg} />
        ))}
      </div>
    </div>
  );
};

export default GiftsScreen;
