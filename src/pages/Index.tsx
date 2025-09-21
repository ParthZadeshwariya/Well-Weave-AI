import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import PhaseOverview from "@/components/PhaseOverview";
import VisualizationDemo from "@/components/VisualizationDemo";
import PrivacySection from "@/components/PrivacySection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import JournalInterface from "@/components/JournalInterface";
import MindGraph from "@/components/MindGraph";

const Index = () => {
  const [currentView, setCurrentView] = useState<"landing" | "journal">("landing");

  if (currentView === "journal") {
    return (
      <div className="min-h-screen bg-gradient-primary">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="glass" 
              size="sm"
              onClick={() => setCurrentView("landing")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <div>
              <h1 className="text-2xl font-bold">WellWeave Journal</h1>
              <p className="text-muted-foreground">Your personal mind mapping space</p>
            </div>
          </div>
          
          <JournalInterface />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <HeroSection onStartJourney={() => setCurrentView("journal")} />
      <PhaseOverview />
      {/* <JournalInterface />
      <MindGraph nodes={[]} entries={[]} /> */}
      <VisualizationDemo />
      <PrivacySection />
      <CallToAction onGetStarted={() => setCurrentView("journal")} />
      <Footer />
    </div>
  );
};

export default Index;
