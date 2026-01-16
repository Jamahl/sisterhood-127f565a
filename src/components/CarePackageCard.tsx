import { ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

interface CarePackageCardProps {
  title: string;
  image: string;
  price: number;
  category: string;
}

const CarePackageCard = ({ title, image, price, category }: CarePackageCardProps) => {
  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/30 animate-scale-in">
      <div className="relative h-28 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-lg">
          <span className="text-xs font-bold text-primary">${price}</span>
        </div>
      </div>
      
      <div className="p-3">
        <span className="text-[10px] font-medium text-lavender-dark bg-lavender/50 px-2 py-0.5 rounded-full">
          {category}
        </span>
        <h4 className="font-semibold text-sm text-foreground mt-2 line-clamp-2">
          {title}
        </h4>
        
        <Button variant="gradient" size="sm" className="w-full mt-3 gap-2">
          Send Gift
          <ExternalLink className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default CarePackageCard;
