import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Plane, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/plan', label: 'Plan Your Trip' },
    { href: '/visa-guide', label: 'Visa Guide' },
    { href: '/food-finder', label: 'Food Finder' },
  ];

  useEffect(() => {
    try {
      const token = localStorage.getItem('wandernest_token');
      setIsAuthed(Boolean(token));
    } catch {}
  }, [location.pathname]);

  const logout = () => {
    try { localStorage.removeItem('wandernest_token'); } catch {}
    setIsAuthed(false);
    // simple client-side redirect
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism backdrop-blur-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300">
            <Plane className="h-8 w-8 text-primary" />
            <span className="font-playfair text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              WanderNest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`nav-link px-3 py-2 text-sm font-medium ${
                  isActive(item.href) ? 'text-primary' : 'text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isAuthed ? (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="cta-button text-sm px-6 py-2">
                    Sign Up
                  </Button>
                </Link>
              </>
            ) : (
              <Button variant="ghost" size="sm" onClick={logout} className="hover:bg-primary/10">
                Logout
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-foreground hover:text-primary hover:bg-primary/10 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                    isActive(item.href)
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground hover:text-primary hover:bg-primary/10'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                {!isAuthed ? (
                  <>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="h-4 w-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full cta-button">
                        Sign Up
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                    Logout
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;