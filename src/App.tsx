import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
  const token = typeof window !== 'undefined' ? localStorage.getItem('wandernest_token') : null;
  return token ? children : <Navigate to="/login" replace />;
};

const RedirectIfAuthed = ({ children }: { children: JSX.Element }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('wandernest_token') : null;
  return token ? <Navigate to="/" replace /> : children;
};

function App(): JSX.Element {
  return (
    <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] min-h-screen font-sans">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
              <Route path="/food-finder" element={<RequireAuth><FoodFinder /></RequireAuth>} />

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
