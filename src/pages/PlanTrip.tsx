import Navigation from '@/components/Navigation';
import { useState } from "react";
import { Calendar, MapPin, Users, DollarSign } from 'lucide-react';

const steps = [
  { label: "Dates", icon: <Calendar /> },
  { label: "Destination", icon: <MapPin /> },
  { label: "Budget", icon: <DollarSign /> },
  { label: "Notes", icon: <Users /> },
];

const PlanTrip = () => {
  const [step, setStep] = useState(0);
  const [budget, setBudget] = useState(2000);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white font-sans">
      <Navigation />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold mb-6 drop-shadow-lg text-center">Plan Your Trip</h1>
        <div className="flex justify-center gap-4 mb-8">
          {steps.map((s, idx) => (
            <div key={s.label} className={`flex flex-col items-center ${step === idx ? "text-primary" : "text-gray-400"}`}>
              {s.icon}
              <span className="mt-2">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="max-w-lg mx-auto bg-[#232526]/80 rounded-2xl p-8 glassmorphism shadow-xl">
          {step === 0 && (
            <div>
              <label className="block mb-2 font-semibold">Select Dates</label>
              <input type="date" className="w-full p-3 rounded-lg bg-[#232526] text-white border border-[#e94560]/40 mb-4" />
              <button className="cta-button w-full" onClick={() => setStep(1)}>Next</button>
            </div>
          )}
          {step === 1 && (
            <div>
              <label className="block mb-2 font-semibold">Destination</label>
              <input type="text" placeholder="Enter destination" className="w-full p-3 rounded-lg bg-[#232526] text-white border border-[#e94560]/40 mb-4" />
              <div className="bg-[#1fd1f9]/10 rounded-lg h-40 flex items-center justify-center mb-4">
                {/* Map Placeholder */}
                <span className="text-primary">[Map will appear here]</span>
              </div>
              <button className="cta-button w-full" onClick={() => setStep(2)}>Next</button>
            </div>
          )}
          {step === 2 && (
            <div>
              <label className="block mb-2 font-semibold">Budget</label>
              <input
                type="range"
                min={500}
                max={10000}
                value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-center mt-2 text-lg font-bold text-primary">${budget}</div>
              <button className="cta-button w-full mt-4" onClick={() => setStep(3)}>Next</button>
            </div>
          )}
          {step === 3 && (
            <div>
              <label className="block mb-2 font-semibold">Notes</label>
              <textarea className="w-full p-3 rounded-lg bg-[#232526] text-white border border-[#e94560]/40 mb-4" rows={4} placeholder="Add notes..." />
              <button className="cta-button w-full" onClick={() => setStep(0)}>Finish & Start Over</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanTrip;