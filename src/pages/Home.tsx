import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import bgImage from "../assets/bg.jpg";
import { Target, ShieldCheck, Handshake, Mail, Phone, MapPin } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Mock API for demo purposes
const API = {
  get: (url) => Promise.resolve({ data: "Connected successfully!" })
};

// Format currency in INR consistently
const formatINR = (value: number) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

const destinations = [
  { name: "Japan", flag: "🇯🇵", costINR: 150000, icon: "🗻", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop" },
  { name: "Italy", flag: "🇮🇹", costINR: 180000, icon: "🍕", image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop" },
  { name: "India", flag: "🇮🇳", costINR: 100000, icon: "🕌", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&h=600&fit=crop" },
  { name: "France", flag: "🇫🇷", costINR: 170000, icon: "🗼", image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=800&h=600&fit=crop" },
  { name: "Bali", flag: "🇮🇩", costINR: 120000, icon: "🏝️", image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop" },
  { name: "Norway", flag: "🇳🇴", costINR: 200000, icon: "🏔️", image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop" }
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

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [showFAQ, setShowFAQ] = useState(false);
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
      className="min-h-screen text-foreground overflow-x-hidden relative bg-background"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.65), rgba(255,255,255,0.65)), url(${bgImage})`,
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
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }}></div>
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
                    className="h-56 w-full object-cover group-hover:scale-110 transition-transform duration-500 bg-[#0b1220]" 
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      // Fallback to a generic Unsplash search for destination if image fails
                      target.src = `https://source.unsplash.com/800x600/?${encodeURIComponent(d.name)},landmark`;
                      target.onerror = null; // prevent infinite loop
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold">
                    {formatINR(d.costINR)}
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

      {/* About Section */}
      <section id="about" className="relative py-20">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0 opacity-20">
          <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full blur-3xl bg-gradient-to-br from-[#1fd1f9]/40 to-[#e94560]/30" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full blur-3xl bg-gradient-to-tr from-[#f8b400]/30 to-[#1fd1f9]/30" />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-14"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm tracking-wide">
              <MapPin className="w-4 h-4 mr-2 text-[#1fd1f9]" />
              About WanderNest
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Built for <span className="bg-gradient-to-r from-[#1fd1f9] via-[#b621fe] to-[#e94560] bg-clip-text text-transparent">Indian travelers</span>, loved worldwide
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto mt-4">
              We blend intuitive design with practical features—visa guidance, local insights, smart budgeting in INR, and curated stays—to turn your dream trips into reality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              className="glassmorphism bg-[#232526]/70 rounded-2xl p-6 border border-white/10 hover:shadow-2xl hover:shadow-[#1fd1f9]/10 transition"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-[#1fd1f9] to-[#e94560] mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-300">
                Make global travel simple, stress‑free, and personal with thoughtful tools and seamless experiences.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              className="glassmorphism bg-[#232526]/70 rounded-2xl p-6 border border-white/10 hover:shadow-2xl hover:shadow-[#e94560]/10 transition"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-[#e94560] to-[#f8b400] mb-4">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">What We Offer</h3>
              <p className="text-gray-300">
                Trip planning, visa help, food discovery, INR budgets, and tailor‑made itineraries—everything in one place.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              className="glassmorphism bg-[#232526]/70 rounded-2xl p-6 border border-white/10 hover:shadow-2xl hover:shadow-[#f8b400]/10 transition"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-[#b621fe] to-[#1fd1f9] mb-4">
                <Handshake className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">Why Choose Us</h3>
              <p className="text-gray-300">
                India‑first details, clean design, and real‑world convenience that saves your time and money.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20">
        {/* Decorative gradient bar */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#1fd1f9]/40 via-[#b621fe]/40 to-[#e94560]/40" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm tracking-wide">
              <Phone className="w-4 h-4 mr-2 text-[#f8b400]" />
              Contact Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              We’re here to <span className="bg-gradient-to-r from-[#e94560] to-[#f8b400] bg-clip-text text-transparent">help</span>
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mt-4">
              Questions, feedback, or partnerships—reach out and we’ll get back within 24 hours on business days.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glassmorphism bg-[#232526]/70 rounded-2xl p-6 border border-white/10 hover:shadow-2xl hover:shadow-[#1fd1f9]/10 transition">
              <Mail className="w-6 h-6 text-[#1fd1f9] mb-3" />
              <h3 className="text-lg font-semibold mb-1">Support</h3>
              <p className="text-gray-300 text-sm mb-2">Mon–Fri, 9:00 AM – 6:00 PM IST</p>
              <a href="mailto:support@wandernest.com" className="text-[#1fd1f9] hover:text-white underline">
                support@wandernest.com
              </a>
            </div>

            <div className="glassmorphism bg-[#232526]/70 rounded-2xl p-6 border border-white/10 hover:shadow-2xl hover:shadow-[#e94560]/10 transition">
              <Handshake className="w-6 h-6 text-[#e94560] mb-3" />
              <h3 className="text-lg font-semibold mb-1">Partnerships</h3>
              <p className="text-gray-300 text-sm mb-2">Collaborate with WanderNest</p>
              <a href="mailto:partners@wandernest.com" className="text-[#e94560] hover:text-white underline">
                partners@wandernest.com
              </a>
            </div>

            <div className="glassmorphism bg-[#232526]/70 rounded-2xl p-6 border border-white/10 hover:shadow-2xl hover:shadow-[#b621fe]/10 transition">
              <ShieldCheck className="w-6 h-6 text-[#b621fe] mb-3" />
              <h3 className="text-lg font-semibold mb-1">Press</h3>
              <p className="text-gray-300 text-sm mb-2">Media & PR inquiries</p>
              <a href="mailto:press@wandernest.com" className="text-[#b621fe] hover:text-white underline">
                press@wandernest.com
              </a>
            </div>

            <div className="glassmorphism bg-[#232526]/70 rounded-2xl p-6 border border-white/10 hover:shadow-2xl hover:shadow-[#f8b400]/10 transition">
              <MapPin className="w-6 h-6 text-[#f8b400] mb-3" />
              <h3 className="text-lg font-semibold mb-1">Social</h3>
              <p className="text-gray-300 text-sm mb-2">Follow our journey</p>
              <div className="flex gap-3">
                <a className="text-[#f8b400] hover:text-white underline" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
                <span className="text-gray-500">•</span>
                <a className="text-[#1fd1f9] hover:text-white underline" href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
                <span className="text-gray-500">•</span>
                <a className="text-[#b621fe] hover:text-white underline" href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-10 text-center">
            <div className="glassmorphism bg-gradient-to-r from-[#1fd1f9]/10 via-[#b621fe]/10 to-[#e94560]/10 rounded-2xl p-8 max-w-3xl mx-auto border border-white/10">
              <p className="text-gray-300">
                Prefer email? Write to us at{" "}
                <a href="mailto:hello@wandernest.com" className="text-[#1fd1f9] hover:text-white underline">
                  hello@wandernest.com
                </a>{" "}
                and we’ll get back shortly.
              </p>
            </div>
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
      {/* Floating FAQ Toggle and Panel */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.08 }}
        aria-label="Open FAQs"
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 z-[60] ${showFAQ ? "bg-[#0b1220] border border-[#f8b400]/50" : "bg-gradient-to-r from-[#e94560] to-[#f8b400] hover:shadow-[#e94560]/50"}`}
        onClick={() => setShowFAQ((v) => !v)}
      >
        {showFAQ ? "✖" : "💬"}
      </motion.button>

      {showFAQ && (
        <motion.aside
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.98 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="fixed bottom-28 right-8 w-[92vw] sm:w-[480px] max-h-[70vh] overflow-hidden rounded-2xl bg-[#0b1220]/95 backdrop-blur-xl border border-white/10 shadow-2xl z-[55]"
          role="dialog"
          aria-label="Frequently Asked Questions"
        >
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">International Travel FAQs</h3>
              <p className="text-sm text-gray-400">For Indian nationals — visas, funds, and travel basics</p>
            </div>
            <button
              onClick={() => setShowFAQ(false)}
              className="text-gray-300 hover:text-white text-lg"
              aria-label="Close"
            >
              ✖
            </button>
          </div>
          <div className="p-5 overflow-y-auto max-h-[60vh] space-y-4">
            {/* General FAQs (technical and high-value) */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="faq-1">
                <AccordionTrigger className="text-left">Minimum passport validity and blank pages?</AccordionTrigger>
                <AccordionContent>
                  Most countries require 6 months validity from your date of return and at least 2 blank pages. Some accept 3 months (e.g., parts of Europe on arrival), but 6 months is the safest threshold.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-2">
                <AccordionTrigger className="text-left">Proof of funds: how much and what statements?</AccordionTrigger>
                <AccordionContent>
                  Maintain recent bank statements for 6 months with healthy average balance. A practical guideline is airfare + stay + daily expenses (₹7k–₹12k/day) × trip days. Add ITRs (2–3 years), salary slips, or business income proof.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-3">
                <AccordionTrigger className="text-left">Schengen insurance: coverage and validity?</AccordionTrigger>
                <AccordionContent>
                  Travel insurance is mandatory with minimum €30,000 medical coverage, valid for the entire Schengen area and trip duration, with zero or low deductible preferred. Include policy certificate with application.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-4">
                <AccordionTrigger className="text-left">Booking proofs: refundable tickets vs. dummy bookings?</AccordionTrigger>
                <AccordionContent>
                  Visa sections prefer confirmed or refundable bookings. Holding reservations are acceptable but risky if unverifiable. Use refundable fares or verified itinerary services and ensure accommodation can be confirmed by the embassy if needed.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-5">
                <AccordionTrigger className="text-left">Employment/self‑employment documents required?</AccordionTrigger>
                <AccordionContent>
                  Employees: employer letter with designation, salary slips (3–6 months), and leave approval. Self‑employed: GST/UDYAM, MOA/partnership deed, business bank statements, ITRs. Students: enrollment letter and NOC.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-6">
                <AccordionTrigger className="text-left">Schengen “main destination” vs. “first entry” rule?</AccordionTrigger>
                <AccordionContent>
                  Apply at the country of main stay (most nights). If equal nights in multiple countries, apply at the country of first entry. Your first entry should normally match the issuing country on your visa.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-7">
                <AccordionTrigger className="text-left">Biometrics validity and re‑use for visas?</AccordionTrigger>
                <AccordionContent>
                  Schengen biometrics remain valid for 59 months in VIS and may be re‑used if still valid. For UK/US/Japan, biometrics are typically required for each new application. Always follow your VFS/embassy instructions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-8">
                <AccordionTrigger className="text-left">Processing timelines and fastest options?</AccordionTrigger>
                <AccordionContent>
                  Typical timelines: Schengen 15–30 days, Japan 5–10 working days, UK 2–6+ weeks (priority/super priority in some centers), US interview slots may take months—plan far in advance.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faq-9">
                <AccordionTrigger className="text-left">Rejected before—what improves approval odds?</AccordionTrigger>
                <AccordionContent>
                  Address refusal reasons with stronger documentation: clearer itinerary, improved bank balance and consistency, stronger ties to India (employment, property, family), and complete insurance. Avoid mismatches in forms vs. docs.
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Destination-specific snippets */}
            <div className="mt-2 space-y-2">
              <div className="text-sm text-gray-400">Popular destinations quick notes</div>
              <Accordion type="multiple" className="w-full">
                <AccordionItem value="schengen">
                  <AccordionTrigger className="text-left">Schengen (France, Italy, etc.)</AccordionTrigger>
                  <AccordionContent>
                    Type C tourist visa. Include itinerary, proof of stay, insurance of €30,000+, and funds. Biometrics required. Apply where you spend most nights or first entry if equal. Processing ~15–30 days.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="japan">
                  <AccordionTrigger className="text-left">Japan</AccordionTrigger>
                  <AccordionContent>
                    Submit itinerary, stay proof, financials, and employment docs. No on‑arrival visa; apply via VFS/consulate. Processing typically 5–10 working days.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="uk">
                  <AccordionTrigger className="text-left">United Kingdom</AccordionTrigger>
                  <AccordionContent>
                    Online form, biometrics, and supporting docs. Standard visitor visas take ~2–6+ weeks. Priority/super priority services are available in select centers.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="usa">
                  <AccordionTrigger className="text-left">United States</AccordionTrigger>
                  <AccordionContent>
                    B1/B2: DS‑160, fee, VAC + interview. Long wait times common—book months ahead. Strengthen ties to India and ensure document consistency.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="bali">
                  <AccordionTrigger className="text-left">Bali (Indonesia)</AccordionTrigger>
                  <AccordionContent>
                    Visa on Arrival (VoA) available for tourism. Carry return/onward tickets, hotel proof, and sufficient funds. Rules change often—verify latest policies.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="uae">
                  <AccordionTrigger className="text-left">UAE (Dubai, Abu Dhabi)</AccordionTrigger>
                  <AccordionContent>
                    Tourist e‑visas via authorized partners/airlines. Ensure hotel booking, return ticket, and funds. Processing is usually quick (2–5 working days).
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="thailand">
                  <AccordionTrigger className="text-left">Thailand</AccordionTrigger>
                  <AccordionContent>
                    Indians can apply for e‑visa/e‑VOA depending on policy. Keep return tickets, stay proof, and funds. Processing times vary; check official channels.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            <div className="pt-2 text-sm text-gray-400">
              Tip: Rules change often. Always verify on official embassy sites or trusted VFS pages before applying.
            </div>
            <div className="pt-1">
              <button
                className="w-full bg-gradient-to-r from-[#e94560] to-[#f8b400] hover:from-[#f8b400] hover:to-[#e94560] text-white font-semibold py-2.5 rounded-xl shadow-lg transition-all duration-300"
                onClick={() => navigate("/visa-guide")}
              >
                Open Visa Guide
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </div>
  );
};

export default Home;