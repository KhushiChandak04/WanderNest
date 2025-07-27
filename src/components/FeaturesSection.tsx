import { 
  MapPin, 
  FileText, 
  Utensils, 
  Calculator, 
  Calendar, 
  Bot 
} from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      icon: MapPin,
      title: "Trip Planning Dashboard",
      description: "Create and manage comprehensive travel itineraries with our intuitive drag-and-drop interface. Plan every detail of your journey.",
      gradient: "gradient-sky",
      delay: "0.1s"
    },
    {
      icon: FileText,
      title: "Visa Guidance",
      description: "Get country-specific visa requirements, documentation tips, and step-by-step application guidance for hassle-free travel.",
      gradient: "gradient-sunset",
      delay: "0.2s"
    },
    {
      icon: Utensils,
      title: "Food Finder",
      description: "Discover vegetarian and vegan-friendly restaurants, local cuisines, and dietary options in any destination worldwide.",
      gradient: "gradient-ocean",
      delay: "0.3s"
    },
    {
      icon: Calculator,
      title: "Budget Planner",
      description: "Set realistic travel budgets with AI-powered cost estimates for flights, accommodation, food, and activities.",
      gradient: "gradient-sky",
      delay: "0.4s"
    },
    {
      icon: Calendar,
      title: "Itinerary Creator",
      description: "Build detailed day-by-day schedules with timeline views, activity planning, and exportable PDF itineraries.",
      gradient: "gradient-sunset",
      delay: "0.5s"
    },
    {
      icon: Bot,
      title: "AI Travel Assistant",
      description: "Get instant answers to travel questions, personalized recommendations, and 24/7 support from our smart chatbot.",
      gradient: "gradient-ocean",
      delay: "0.6s"
    }
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full gradient-sky"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full gradient-sunset"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <MapPin className="h-4 w-4 mr-2" />
            Powerful Features
          </div>
          
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
            Everything You Need for
            <br />
            <span className="text-primary">Perfect Travel Planning</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            From visa guidance to budget planning, we've got every aspect of your international travel covered.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: feature.delay }}>
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.7s' }}>
          <div className="glassmorphism bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-playfair font-bold text-foreground mb-4">
              Ready to Start Exploring?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of travelers who plan smarter with WanderNest.
            </p>
            <button className="cta-button">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;