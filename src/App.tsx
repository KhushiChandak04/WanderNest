import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PlanTrip from "./pages/PlanTrip";
import Itinerary from "./pages/Itinerary";
import NotFound from "./pages/NotFound";
import VisaGuide from "./pages/VisaGuide";
import FoodFinder from "./pages/FoodFinder";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";

const queryClient = new QueryClient();

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const bypass = (import.meta as any).env?.VITE_BYPASS_AUTH === 'true';
  if (bypass) return children;
  const token = typeof window !== 'undefined' ? localStorage.getItem('wandernest_token') : null;
  return token ? children : <Navigate to="/login" replace />;
};

const RedirectIfAuthed = ({ children }: { children: JSX.Element }) => {
  const bypass = (import.meta as any).env?.VITE_BYPASS_AUTH === 'true';
  if (bypass) return children;
  const token = typeof window !== 'undefined' ? localStorage.getItem('wandernest_token') : null;
  return token ? <Navigate to="/" replace /> : children;
};

// Scroll to top on route changes
const ScrollToTop: React.FC = () => {
  const location = useLocation();
  React.useEffect(() => {
    // Smoothly scroll to top whenever pathname changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  return null;
};

function App(): JSX.Element {
  return (
  <div className="map-parchment text-foreground min-h-screen font-sans">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Navbar />
            <Routes>
              {/* Public routes */}
              <Route path="/login" element={<RedirectIfAuthed><Login /></RedirectIfAuthed>} />
              <Route path="/register" element={<RedirectIfAuthed><Register /></RedirectIfAuthed>} />

              {/* Protected routes */}
              <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
              <Route path="/plan" element={<RequireAuth><PlanTrip /></RequireAuth>} />
              <Route path="/visa-guide" element={<RequireAuth><VisaGuide /></RequireAuth>} />
              <Route path="/itinerary" element={<RequireAuth><Itinerary /></RequireAuth>} />
              {/* Food Finder removed as requested */}

              {/* Catch-all -> if authed, show 404; else redirect to login */}
              <Route path="*" element={
                typeof window !== 'undefined' && localStorage.getItem('wandernest_token')
                  ? <NotFound />
                  : <Navigate to="/login" replace />
              } />
            </Routes>
            <Footer />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
