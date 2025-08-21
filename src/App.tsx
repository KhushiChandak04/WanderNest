import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PlanTrip from "./pages/PlanTrip";
import NotFound from "./pages/NotFound";
import VisaGuide from "./pages/VisaGuide";
import FoodFinder from "./pages/FoodFinder";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";


const queryClient = new QueryClient();

const App = () => (
  <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] min-h-screen font-sans">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
      <Navbar/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/plan" element={<PlanTrip />} />
            <Route path="/visa-guide" element={<VisaGuide />} />
            <Route path="/food-finder" element={<FoodFinder />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
    <Footer/>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </div>
);

export default App;
