import { useState } from "react";
import MobileFrame from "@/components/MobileFrame";
import BottomNav from "@/components/BottomNav";
import HomeScreen from "@/components/screens/HomeScreen";
import CircleScreen from "@/components/screens/CircleScreen";
import GiftsScreen from "@/components/screens/GiftsScreen";
import NotificationsScreen from "@/components/screens/NotificationsScreen";
import ProfileScreen from "@/components/screens/ProfileScreen";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <HomeScreen />;
      case "circle":
        return <CircleScreen />;
      case "gifts":
        return <GiftsScreen />;
      case "notifications":
        return <NotificationsScreen />;
      case "profile":
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <MobileFrame>
      {renderScreen()}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </MobileFrame>
  );
};

export default Index;
