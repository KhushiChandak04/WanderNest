import { useState, useEffect } from 'react';
import { Menu, X, Plane, MapPin, Calendar, Users, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home', icon: Plane },
    { href: '#destinations', label: 'Destinations', icon: MapPin },
    { href: '/plan', label: 'Plan Trip', icon: Calendar }, // Use '/plan' for Plan Trip page
    { href: '#about', label: 'About', icon: Users },
    { href: '#contact', label: 'Contact', icon: Phone },
  ];

  const scrollToSection = (href) => {
    if (href.startsWith('/')) {
      // Always allow direct navigation to /plan
      navigate(href);
      setIsMenuOpen(false);
      return;
    }
    // Only scroll if the section exists on the current page
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(href.slice(1));
      setIsMenuOpen(false);
    } else {
      // If section does not exist, navigate to home and scroll after navigation
      if (href === '#home' || href === '#destinations' || href === '#about' || href === '#contact') {
        navigate('/');
        setTimeout(() => {
          const el = document.querySelector(href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#1a1a2e]/95 backdrop-blur-xl border-b border-[#e94560]/20 shadow-2xl' 
          : 'bg-[#1a1a2e]/80' // Fix: always use a dark background when not scrolled
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1fd1f9] to-[#e94560] rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-[#1fd1f9]/50">
                  <Plane className="w-6 h-6 text-white transform group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#e94560] rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#1fd1f9] to-[#e94560] bg-clip-text text-transparent">
                  WanderNest
                </h1>
                <p className="text-xs text-gray-400 -mt-1">Travel Beyond Limits</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.slice(1);
                
                return (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`relative flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 group ${
                      isActive
                        ? 'bg-gradient-to-r from-[#1fd1f9]/20 to-[#e94560]/20 text-[#1fd1f9] shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-all duration-300 ${
                      isActive ? 'text-[#1fd1f9]' : 'group-hover:text-[#1fd1f9]'
                    }`} />
                    <span className="hidden xl:block">{item.label}</span>
                    
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-[#1fd1f9] to-[#e94560] rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* CTA Buttons - replaced Book Now with Login and Sign Up */}
            <div className="hidden sm:flex items-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-3 bg-gradient-to-r from-[#1fd1f9] to-[#e94560] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#1fd1f9]/50"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="px-6 py-3 bg-gradient-to-r from-[#e94560] to-[#f8b400] text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#e94560]/50"
              >
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 rounded-xl bg-[#232526]/80 backdrop-blur-sm border border-[#e94560]/30 transition-all duration-300 hover:bg-[#232526] hover:scale-105"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-[#1fd1f9]" />
              ) : (
                <Menu className="w-6 h-6 text-[#1fd1f9]" />
              )}
            </button>
          </div>
        </div>
        {/* Mobile Menu Overlay */}
        <div className={`lg:hidden fixed inset-0 bg-[#1a1a2e]/95 backdrop-blur-xl transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`} style={{ top: '80px' }}>
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col space-y-4">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeSection === item.href.slice(1);
                
                return (
                  <button
                    key={item.href}
                    onClick={() => scrollToSection(item.href)}
                    className={`flex items-center space-x-4 p-4 rounded-2xl font-medium transition-all duration-300 transform ${
                      isActive
                        ? 'bg-gradient-to-r from-[#1fd1f9]/20 to-[#e94560]/20 text-[#1fd1f9] scale-105 shadow-xl'
                        : 'text-gray-300 hover:text-white hover:bg-white/5 hover:scale-105'
                    }`}
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: isMenuOpen ? 'slideInRight 0.5s ease-out forwards' : 'none'
                    }}
                  >
                    <div className={`p-3 rounded-xl ${
                      isActive 
                        ? 'bg-gradient-to-r from-[#1fd1f9] to-[#e94560] shadow-lg' 
                        : 'bg-[#232526]/50'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-lg">{item.label}</span>
                  </button>
                );
              })}
              
              {/* Mobile CTA - replaced with Login and Sign Up */}
              <div className="pt-8 border-t border-[#e94560]/30 flex flex-col gap-4">
                <button
                  onClick={() => { setIsMenuOpen(false); navigate('/login'); }}
                  className="w-full p-4 bg-gradient-to-r from-[#1fd1f9] to-[#e94560] text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  Login
                </button>
                <button
                  onClick={() => { setIsMenuOpen(false); navigate('/register'); }}
                  className="w-full p-4 bg-gradient-to-r from-[#e94560] to-[#f8b400] text-white font-semibold rounded-2xl transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

  <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;