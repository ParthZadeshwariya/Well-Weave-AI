import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Sparkles } from "lucide-react";
import heroNeural from "@/assets/hero-neural.jpg";

interface HeroSectionProps {
  onStartJourney?: () => void;
}

const HeroSection = ({ onStartJourney }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      <div className="absolute inset-0 bg-gradient-neural opacity-100"></div>
      <img 
        src={heroNeural} 
        alt="Neural network visualization representing mental wellness"
        className="absolute inset-0 w-full h-full object-cover opacity-75 mix-blend-overlay"
      />
      
      {/* Floating neural nodes */}
      <div className="absolute top-20 left-20 w-3 h-3 bg-primary rounded-full neural-pulse"></div>
      <div className="absolute top-40 right-32 w-2 h-2 bg-accent rounded-full neural-float" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-32 w-4 h-4 bg-primary-glow rounded-full neural-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-accent rounded-full neural-float" style={{ animationDelay: '0.5s' }}></div>
      
      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="space-y-8 animate-fade-up">
          {/* Logo/Brand */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="p-3 rounded-full bg-gradient-primary shadow-glow">
              <Brain className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">WellWeave</h1>
          </div>
          
          {/* Main Headline */}
          <h2 className="text-5xl md:text-7xl font-bold leading-tight">
            The Generative Mirror
            <br />
            <span className="gradient-text">to Your Mind</span>
          </h2>
          
          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            WellWeave creates a living, predictive digital twin of your inner world. 
            Observe, understand, and proactively shape your mental and emotional well-being 
            through AI-powered visualization and guided exploration.
          </p>
          
          {/* Key Features */}
          <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base">
            <div className="flex items-center gap-2 bg-card/20 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>AI-Powered Insights</span>
            </div>
            <div className="flex items-center gap-2 bg-card/20 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
              <Brain className="w-4 h-4 text-accent" />
              <span>Neural Visualization</span>
            </div>
            <div className="flex items-center gap-2 bg-card/20 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50">
              <ArrowRight className="w-4 h-4 text-primary-glow" />
              <span>Proactive Wellness</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4" onClick={onStartJourney}>
              Begin Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="glass" size="lg" className="text-lg px-8 py-4">
              Watch Demo
            </Button>
          </div>
          
          {/* Privacy Note */}
          <p className="text-sm text-muted-foreground pt-4 max-w-2xl mx-auto">
            🔒 Your mental model is private and encrypted. We never share your personal data. 
            Learn more about our privacy-first approach.
          </p>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border border-border/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;