import { ArrowRight, MapPin, Globe, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-world-map.jpg';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="World Map"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-80"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 text-primary/30 animate-float">
        <MapPin className="h-8 w-8" />
      </div>
      <div className="absolute top-32 right-20 text-accent/30 animate-bounce-subtle">
        <Globe className="h-12 w-12" />
      </div>
      <div className="absolute bottom-32 left-20 text-primary/40 animate-float" style={{ animationDelay: '1s' }}>
        <Compass className="h-10 w-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full glassmorphism text-sm font-medium text-white mb-8 hover-glow">
            <Globe className="h-4 w-4 mr-2" />
            Your Ultimate Travel Companion
          </div>

          {/* Main Heading */}
          <h1 className="hero-text mb-6 leading-tight">
            Plan Globally,
            <br />
            <span className="text-accent">Travel Smartly</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover the world with confidence. Get visa guidance, find vegetarian food, 
            plan budgets, and create perfect itineraries all in one place.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/plan">
              <Button className="cta-button group">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Link to="/food-finder">
              <Button variant="outline" className="glassmorphism text-white border-white/30 hover:bg-white/20 hover:border-white/50 px-8 py-4 text-lg">
                Explore Food Guide
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="glassmorphism rounded-2xl p-6 hover-glow">
              <div className="text-3xl font-bold text-white mb-2">190+</div>
              <div className="text-white/80">Countries Covered</div>
            </div>
            <div className="glassmorphism rounded-2xl p-6 hover-glow">
              <div className="text-3xl font-bold text-white mb-2">50K+</div>
              <div className="text-white/80">Veg-Friendly Spots</div>
            </div>
            <div className="glassmorphism rounded-2xl p-6 hover-glow">
              <div className="text-3xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/80">Happy Travelers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-subtle">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce-subtle"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;