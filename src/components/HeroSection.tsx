import { ArrowRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import heroImage from '@/assets/hero-world-map.jpg';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
  <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="World Map"
          className="w-full h-full object-cover opacity-40"
        />
  <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }}></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center flex flex-col items-center justify-center">
        <span className="inline-block bg-[#e94560] text-white px-5 py-2 rounded-full font-semibold shadow-lg mb-8 text-base tracking-wide animate-pulse">
          Welcome to WanderNest
        </span>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-xl text-center">
          Discover. Plan. Experience.
        </h1>
        <p className="mb-10 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto font-medium">
          Your journey starts here. Find visa guides, plan your trip, and explore food spots worldwide—all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 mb-12 justify-center">
          <button
            className="bg-[#e94560] hover:bg-[#f8b400] text-white font-bold py-4 px-8 rounded-xl shadow-lg transition duration-200 text-lg flex items-center justify-center gap-2"
            onClick={() => navigate("/plan")}
          >
            Plan Your Trip <ArrowRight className="w-5 h-5" />
          </button>
          <button
            className="bg-blue-600 text-white hover:bg-blue-500 font-bold py-4 px-8 rounded-xl shadow-soft transition duration-200 text-lg flex items-center justify-center gap-2"
            onClick={() => navigate("/visa-guide")}
          >
            Visa Guide <ArrowRight className="w-5 h-5" />
          </button>
          <button
            className="bg-pink-500 text-white hover:bg-pink-400 font-bold py-4 px-8 rounded-xl shadow-soft transition duration-200 text-lg flex items-center justify-center gap-2"
            onClick={() => navigate("/food-finder")}
          >
            Food Finder <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-8">
          <span className="inline-block bg-[#e94560] text-white px-6 py-3 rounded-full font-semibold shadow-lg text-lg animate-bounce">
            Start your adventure now!
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;