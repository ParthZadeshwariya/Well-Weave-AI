import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Brain } from "lucide-react"; // Added Brain
import HeroSection from "@/components/HeroSection";
import PhaseOverview from "@/components/PhaseOverview";
import VisualizationDemo from "@/components/VisualizationDemo";
import PrivacySection from "@/components/PrivacySection";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import JournalInterface from "@/components/JournalInterface";
import MeditationSpace from "@/components/MeditationSpace"; // Import the new component

const Index = () => {
  const [currentView, setCurrentView] = useState<"landing" | "journal" | "meditation">("landing"); // Add "meditation"

  // Function to go back to landing
  const goBackToLanding = () => setCurrentView("landing");

  if (currentView === "journal") {
    return (
      <div className="min-h-screen bg-gradient-secondary"> {/* Updated background */}
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="glass"
              size="sm"
              onClick={goBackToLanding} // Use reusable function
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <div>
               <h1 className="text-2xl font-bold gradient-text">WellWeave Journal</h1> {/* Apply gradient */}
              <p className="text-muted-foreground">Your personal mind mapping space</p>
            </div>
          </div>
          <JournalInterface />
        </div>
      </div>
    );
  }

  if (currentView === "meditation") { // Add Meditation View
     return (
       <div className="min-h-screen bg-gradient-secondary flex flex-col"> {/* Updated background */}
          <div className="container mx-auto px-6 py-8 flex-grow">
            <div className="flex items-center gap-4 mb-8">
             <Button
               variant="glass"
               size="sm"
               onClick={goBackToLanding} // Use reusable function
               className="flex items-center gap-2"
             >
               <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
             <div>
                <h1 className="text-2xl font-bold gradient-text">Meditation Space</h1> {/* Apply gradient */}
               <p className="text-muted-foreground">Find your calm</p>
              </div>
            </div>
            <MeditationSpace />
          </div>
       </div>
    );
  }

// Landing Page View
  return (
    <div className="min-h-screen">
      <HeroSection
        onStartJourney={() => setCurrentView("journal")}
        onMeditate={() => setCurrentView("meditation")} // Pass the function as a prop
      />
      {/* The standalone button div is removed */}
      <PhaseOverview />
      <VisualizationDemo />
      <PrivacySection />
      <CallToAction
         onGetStarted={() => setCurrentView("journal")}
         // You might want another CTA for meditation here too
      />
      <Footer />
    </div>
  );
};

export default Index;