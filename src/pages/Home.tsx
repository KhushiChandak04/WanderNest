import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";

const destinations = [
  { name: "Japan", flag: "🇯🇵", cost: "$1800", icon: "🗻", image: "/assets/destination1.jpg" },
  { name: "Italy", flag: "🇮🇹", cost: "$2200", icon: "🍕", image: "/assets/destination2.jpg" },
  { name: "India", flag: "🇮🇳", cost: "$1200", icon: "🕌", image: "/assets/destination3.jpg" },
  { name: "France", flag: "🇫🇷", cost: "$2000", icon: "🗼", image: "/assets/destination4.jpg" },
];

const whyCards = [
  { icon: "🛂", title: "Visa Help", desc: "Country-wise visa guidance" },
  { icon: "🥗", title: "Veg Food", desc: "Find vegetarian restaurants" },
  { icon: "🗺️", title: "Local Guide", desc: "Explore with local tips" },
  { icon: "💸", title: "Budget Tools", desc: "Smart budget planner" },
];

const testimonials = [
  { name: "Amit", avatar: "/assets/user1.jpg", text: "WanderNest made my Europe trip effortless!" },
  { name: "Sara", avatar: "/assets/user2.jpg", text: "Loved the food finder for vegan options." },
  { name: "Luca", avatar: "/assets/user3.jpg", text: "Visa guide saved me hours of research." },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white font-sans">
      <Navigation />
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] overflow-hidden">
        <img src="/assets/hero-world-map.jpg" alt="World Map" className="absolute inset-0 w-full h-full object-cover opacity-30 z-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/80 via-[#16213e]/80 to-[#0f3460]/80 z-0"></div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col items-center justify-center pt-32"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold mb-6 text-white drop-shadow-xl text-center"
          >
            Explore the World, One Nest at a Time <span role="img" aria-label="galaxy">🌌</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-10 text-xl md:text-2xl text-gray-300 max-w-2xl text-center font-medium"
          >
            Plan, discover, and experience premium travel with futuristic style.
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-6 mb-12 justify-center">
            <button
              className="bg-[#e94560] hover:bg-[#f8b400] text-white font-bold py-4 px-8 rounded-xl shadow-lg transition duration-200 text-lg"
              onClick={() => navigate("/plan")}
            >
              Plan Your Trip
            </button>
            <button
              className="bg-[#0f3460] hover:bg-[#e94560] text-white font-bold py-4 px-8 rounded-xl shadow-lg transition duration-200 text-lg"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </div>
        </motion.div>
      </section>
      {/* Why WanderNest */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Why WanderNest?</h2>
          <div className="flex overflow-x-auto gap-6 justify-center pb-4">
            {whyCards.map((card, idx) => (
              <motion.div
                key={card.title}
                whileHover={{ scale: 1.08, boxShadow: "0 0 24px #e94560" }}
                className="min-w-[220px] bg-[#232526]/80 rounded-2xl p-6 flex flex-col items-center glassmorphism border border-[#e94560]/30 transition-all duration-300"
              >
                <span className="text-4xl mb-2">{card.icon}</span>
                <span className="font-bold text-lg mb-1">{card.title}</span>
                <span className="text-gray-300 text-sm">{card.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Destination Previews */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Popular Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {destinations.map((d, idx) => (
              <motion.div
                key={d.name}
                whileHover={{ scale: 1.04, boxShadow: "0 0 24px #1fd1f9" }}
                className="bg-[#232526]/80 rounded-2xl overflow-hidden shadow-xl glassmorphism border border-[#1fd1f9]/30 flex flex-col"
              >
                <img src={d.image} alt={d.name} className="h-40 w-full object-cover" />
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{d.flag}</span>
                    <span className="font-bold text-lg">{d.name}</span>
                    <span className="ml-auto text-xl">{d.icon}</span>
                  </div>
                  <span className="text-gray-300 mb-2">Avg. Cost: <span className="font-bold">{d.cost}</span></span>
                  <button
                    className="mt-auto bg-[#e94560] hover:bg-[#f8b400] text-white font-semibold py-2 px-6 rounded-lg shadow transition duration-200"
                    onClick={() => navigate("/plan")}
                  >
                    Plan Now
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Carousel */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Happy Travelers</h2>
          <div className="flex gap-8 justify-center overflow-x-auto pb-4">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                whileHover={{ scale: 1.05 }}
                className="bg-[#232526]/80 rounded-2xl p-6 flex flex-col items-center glassmorphism border border-[#b621fe]/30 shadow-xl min-w-[260px]"
              >
                <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mb-3 border-4 border-[#b621fe]/40 object-cover" />
                <span className="font-bold text-lg mb-1">{t.name}</span>
                <span className="text-gray-300 text-center">{t.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-[#232526] py-8 mt-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="flex gap-4 mb-4 md:mb-0">
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#e94560] transition-colors duration-300">
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" className="hover:drop-shadow-glow">
                <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
              </svg>
            </a>
            {/* Twitter */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#1fd1f9] transition-colors duration-300">
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" className="hover:drop-shadow-glow">
                <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.83 1.92 3.61a4.28 4.28 0 0 1-1.94-.54v.05c0 2.09 1.49 3.83 3.47 4.23-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.68 2.12 2.9 3.99 2.93A8.6 8.6 0 0 1 2 19.54a12.13 12.13 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.19 0-.37-.01-.56A8.7 8.7 0 0 0 24 4.59a8.48 8.48 0 0 1-2.54.7z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#b621fe] transition-colors duration-300">
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" className="hover:drop-shadow-glow">
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.25h-3v-5.5c0-1.32-.03-3-1.83-3-1.83 0-2.11 1.43-2.11 2.91v5.59h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#f8b400] transition-colors duration-300">
              <svg width="28" height="28" fill="currentColor" viewBox="0 0 24 24" className="hover:drop-shadow-glow">
                <path d="M22.675 0h-21.35c-.733 0-1.325.592-1.325 1.325v21.351c0 .732.592 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.622h-3.12v9.294h6.116c.732 0 1.324-.592 1.324-1.324v-21.351c0-.733-.592-1.325-1.324-1.325z"/>
              </svg>
            </a>
          </div>
          <div className="flex gap-6 text-gray-400 text-sm">
            <a href="/about" className="hover:text-white">About</a>
            <a href="/privacy" className="hover:text-white">Privacy</a>
            <a href="/blog" className="hover:text-white">Blog</a>
            <a href="/careers" className="hover:text-white">Careers</a>
          </div>
        </div>
        <div className="text-center text-gray-500 mt-4 text-xs">
          &copy; {new Date().getFullYear()} WanderNest. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;