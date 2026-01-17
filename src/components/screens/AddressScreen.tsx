import { useState } from "react";
import { ArrowLeft, MapPin, Check } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "@/hooks/use-toast";

interface AddressScreenProps {
  onBack: () => void;
}

const AddressScreen = ({ onBack }: AddressScreenProps) => {
  const [address, setAddress] = useState({
    line1: "123 Sisterhood Lane",
    line2: "Apt 4B",
    city: "San Francisco",
    state: "CA",
    zip: "94102",
    country: "United States",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Address saved 📍",
      description: "Your sisters can send you gifts now!",
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
          <h1 className="font-serif text-xl font-bold text-foreground">My Address</h1>
          <p className="text-sm text-muted-foreground">For receiving care packages</p>
        </div>
      </div>

      {/* Address Card */}
      <div className="bg-card rounded-2xl p-5 shadow-card mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-blush-light rounded-xl">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Shipping Address</h3>
            <p className="text-xs text-muted-foreground">Where sisters send gifts</p>
          </div>
        </div>

        {isEditing ? (
          <div className="space-y-3">
            <Input
              placeholder="Address Line 1"
              value={address.line1}
              onChange={(e) => setAddress({ ...address, line1: e.target.value })}
              className="rounded-xl"
            />
            <Input
              placeholder="Address Line 2 (optional)"
              value={address.line2}
              onChange={(e) => setAddress({ ...address, line2: e.target.value })}
              className="rounded-xl"
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="City"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="rounded-xl"
              />
              <Input
                placeholder="State"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="ZIP Code"
                value={address.zip}
                onChange={(e) => setAddress({ ...address, zip: e.target.value })}
                className="rounded-xl"
              />
              <Input
                placeholder="Country"
                value={address.country}
                onChange={(e) => setAddress({ ...address, country: e.target.value })}
                className="rounded-xl"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="ghost" className="flex-1" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleSave}>
                <Check className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <p className="text-foreground">{address.line1}</p>
            {address.line2 && <p className="text-foreground">{address.line2}</p>}
            <p className="text-foreground">{address.city}, {address.state} {address.zip}</p>
            <p className="text-muted-foreground">{address.country}</p>
            <Button 
              variant="soft" 
              className="w-full mt-4"
              onClick={() => setIsEditing(true)}
            >
              Edit Address
            </Button>
          </div>
        )}
      </div>

      {/* Privacy Notice */}
      <div className="bg-lavender/30 rounded-2xl p-4">
        <p className="text-sm text-muted-foreground">
          🔒 Your address is only shared with sisters in your circle who want to send you a care package.
        </p>
      </div>
    </div>
  );
};

export default AddressScreen;
