import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import bgImage from "../assets/bg.jpg";

// Mock API for demo purposes
const API = {
  get: (url) => Promise.resolve({ data: "Connected successfully!" })
};

const destinations = [
  { name: "Japan", flag: "🇯🇵", cost: "$1800", icon: "🗻", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop" },
  { name: "Italy", flag: "🇮🇹", cost: "$2200", icon: "🍕", image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=300&fit=crop" },
  { name: "India", flag: "🇮🇳", cost: "$1200", icon: "🕌", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop" },
  { name: "France", flag: "🇫🇷", cost: "$2000", icon: "🗼", image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop" },
  { name: "Bali", flag: "🇮🇩", cost: "$1500", icon: "🏝️", image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&h=300&fit=crop" },
  { name: "Norway", flag: "🇳🇴", cost: "$2500", icon: "🏔️", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop" }
];

const whyCards = [
  { icon: "🛂", title: "Visa Assistance", desc: "Complete visa guidance with document checklist and application support" },
  { icon: "🥗", title: "Dietary Preferences", desc: "Find restaurants matching your dietary needs - vegan, halal, kosher & more" },
  { icon: "🗺️", title: "Local Insights", desc: "Authentic recommendations from locals and expert travel guides" },
  { icon: "💸", title: "Smart Budgeting", desc: "AI-powered budget planner with real-time expense tracking" },
  { icon: "🏨", title: "Curated Stays", desc: "Hand-picked accommodations from luxury resorts to cozy homestays" },
  { icon: "🎯", title: "Custom Itineraries", desc: "Personalized travel plans based on your interests and preferences" }
];

const testimonials = [
  { 
    name: "Amit Sharma", 
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    text: "WanderNest transformed my chaotic Europe trip into a seamless adventure. The visa guidance alone saved me weeks of stress!",
    location: "Mumbai, India",
    rating: 5
  },
  { 
    name: "Sara Johnson", 
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c96729e4?w=100&h=100&fit=crop&crop=face",
    text: "As a vegan traveler, finding good food was always a challenge. WanderNest's food finder is a game-changer!",
    location: "New York, USA",
    rating: 5
  },
  { 
    name: "Luca Rossi", 
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    text: "The local insights feature helped me discover hidden gems in Tokyo that no guidebook mentioned. Incredible experience!",
    location: "Milan, Italy",
    rating: 5
  },
  { 
    name: "Priya Patel", 
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    text: "Budget planning was so easy with WanderNest. I saved 30% on my Southeast Asia trip compared to traditional planning!",
    location: "London, UK",
    rating: 5
  }
];

const stats = [
  { number: "50K+", label: "Happy Travelers", icon: "✈️" },
  { number: "120+", label: "Countries Covered", icon: "🌍" },
  { number: "1M+", label: "Trips Planned", icon: "📋" },
  { number: "98%", label: "Success Rate", icon: "⭐" }
];

const features = [
  {
    icon: "🤖",
    title: "AI-Powered Planning",
    description: "Our advanced AI analyzes millions of data points to create the perfect itinerary tailored to your preferences, budget, and travel style."
  },
  {
    icon: "🌐",
    title: "Real-Time Updates",
    description: "Stay informed with live updates on weather, local events, flight changes, and safety alerts throughout your journey."
  },
  {
    icon: "💎",
    title: "Premium Partnerships",
    description: "Exclusive deals with top airlines, hotels, and local experiences. Get VIP treatment and insider access to unique adventures."
  },
  {
    icon: "🔒",
    title: "Secure & Private",
    description: "Your data is protected with bank-level encryption. We never share your personal information with third parties."
  }
];

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/test/ping")
      .then((res) => console.log(res.data))
      .catch((err) => console.error("Error:", err));

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen text-white overflow-x-hidden relative"
      style={{
        backgroundImage: `linear-gradient(rgba(26,26,46,0.85), rgba(26,26,46,0.85)), url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        fontFamily: `'Poppins', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`
      }}
    >
      <Navbar />
      <div style={{ height: "30px" }} />
      {/* Hero Section */}
      <section id="home" className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <motion.div 
          style={{ y }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/90 via-[#16213e]/85 to-[#0f3460]/90"></div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-6xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mb-6"
          >
            <br></br>
            <span className="inline-block bg-gradient-to-r from-[#e94560] to-[#f8b400] text-transparent bg-clip-text text-lg font-semibold mb-4">
              ✨ Your Journey Begins Here
            </span>
            <h1 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight">
              Explore the World,<br />
              <span className="bg-gradient-to-r from-[#1fd1f9] via-[#b621fe] to-[#e94560] text-transparent bg-clip-text">
                One Nest at a Time
              </span>
              <span className="ml-4">🌌</span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-4 font-light leading-relaxed"
          >
            Discover extraordinary destinations with intelligent planning, local insights, and seamless experiences. 
            From visa assistance to hidden gems, we make every journey unforgettable.
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg text-gray-400 max-w-2xl mb-10"
          >
            Join thousands of travelers who trust WanderNest to turn their dream destinations into reality.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 mb-16"
          >
            <button
              className="group bg-gradient-to-r from-[#e94560] to-[#f8b400] hover:from-[#f8b400] hover:to-[#e94560] text-white font-bold py-4 px-8 rounded-2xl shadow-2xl transition-all duration-300 text-lg transform hover:scale-105 hover:shadow-[#e94560]/50"
              onClick={() => navigate("/plan")}
            >
              <span className="flex items-center gap-2">
                Start Planning
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </button>
            <button
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white font-bold py-4 px-8 rounded-2xl shadow-xl transition-all duration-300 text-lg transform hover:scale-105"
              onClick={() => navigate("/register")}
            >
              Watch Demo
            </button>
          </motion.div>
        </motion.div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20"
              animate={{
                y: [-20, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: '90%',
              }}
            />
          ))}
        </div>
      </section>

      {/* Why WanderNest */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="text-[#e94560]">WanderNest</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We're not just another travel website. We're your intelligent travel companion, 
              combining cutting-edge technology with human expertise to create extraordinary journeys.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyCards.map((card, idx) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="bg-gradient-to-br from-[#232526]/80 to-[#414345]/60 rounded-3xl p-8 backdrop-blur-sm border border-white/10 shadow-xl hover:shadow-2xl hover:shadow-[#e94560]/20 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{card.icon}</div>
                <h3 className="font-bold text-xl mb-3 text-white">{card.title}</h3>
                <p className="text-gray-300 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Deep Dive */}
      <section className="py-20 bg-gradient-to-r from-[#1a1a2e]/50 to-[#0f3460]/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powered by <span className="text-[#1fd1f9]">Innovation</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of travel planning with our advanced features designed to make every trip perfect.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="flex items-start space-x-6"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-[#e94560] to-[#f8b400] rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Destination Previews */}
      <section id="destinations" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trending <span className="text-[#b621fe]">Destinations</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover the world's most captivating destinations, carefully curated for unforgettable experiences. 
              From bustling cities to serene landscapes, find your perfect escape.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((d, idx) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.03, rotateY: 2 }}
                className="group relative bg-gradient-to-br from-[#232526]/80 to-[#414345]/60 rounded-3xl overflow-hidden shadow-2xl hover:shadow-[#1fd1f9]/30 transition-all duration-500"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={d.image} 
                    alt={d.name} 
                    className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold">
                    {d.cost}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{d.flag}</span>
                      <h3 className="font-bold text-xl">{d.name}</h3>
                    </div>
                    <span className="text-3xl">{d.icon}</span>
                  </div>
                  
                  <p className="text-gray-300 mb-4 text-sm">
                    Discover the magic of {d.name} with carefully crafted experiences that blend culture, adventure, and relaxation.
                  </p>
                  
                  <button
                    className="w-full bg-gradient-to-r from-[#e94560] to-[#f8b400] hover:from-[#f8b400] hover:to-[#e94560] text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
                    onClick={() => navigate("/plan")}
                  >
                    Explore {d.name}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-r from-[#232526]/30 to-[#414345]/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our <span className="text-[#f8b400]">Travelers Say</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Don't just take our word for it. Hear from fellow adventurers who've transformed their travel dreams into reality with WanderNest.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-gradient-to-br from-[#232526]/80 to-[#414345]/60 rounded-3xl p-8 md:p-12 text-center backdrop-blur-sm border border-white/10 shadow-2xl"
            >
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <span key={i} className="text-[#f8b400] text-2xl">⭐</span>
                ))}
              </div>
              
              <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed font-light">
                "{testimonials[currentTestimonial].text}"
              </p>
              
              <div className="flex items-center justify-center gap-4">
                <img 
                  src={testimonials[currentTestimonial].avatar} 
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full border-4 border-[#e94560]/40 object-cover"
                />
                <div className="text-left">
                  <div className="font-bold text-lg">{testimonials[currentTestimonial].name}</div>
                  <div className="text-gray-400">{testimonials[currentTestimonial].location}</div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial Navigation */}
            <div className="flex justify-center mt-8 space-x-3">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    idx === currentTestimonial ? 'bg-[#e94560] scale-125' : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Start Your <span className="bg-gradient-to-r from-[#e94560] to-[#f8b400] text-transparent bg-clip-text">Adventure</span>?
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Join millions of travelers who trust WanderNest to make their journeys extraordinary. 
              Your next adventure is just one click away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                className="group bg-gradient-to-r from-[#e94560] to-[#f8b400] hover:from-[#f8b400] hover:to-[#e94560] text-white font-bold py-4 px-12 rounded-2xl shadow-2xl transition-all duration-300 text-xl transform hover:scale-105 hover:shadow-[#e94560]/50"
                onClick={() => navigate("/plan")}
              >
                <span className="flex items-center gap-3">
                  Start Planning Now
                  <span className="group-hover:translate-x-2 transition-transform">🚀</span>
                </span>
              </button>
              
              <div className="flex items-center gap-4 text-gray-300">
                <span>✓ Free to start</span>
                <span>✓ No credit card required</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* Floating Action Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-[#e94560] to-[#f8b400] rounded-full shadow-2xl flex items-center justify-center text-2xl hover:shadow-[#e94560]/50 transition-all duration-300 z-50"
        onClick={() => navigate("/Chatbot")}
      >
        💬
      </motion.button>
    </div>
  );
};

export default Home;