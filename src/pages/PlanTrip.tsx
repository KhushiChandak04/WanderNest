import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Users, DollarSign, ArrowRight, ArrowLeft, Check } from 'lucide-react';
import bgImage from "../assets/bg.jpg";

const steps = [
  { label: "Dates", icon: Calendar },
  { label: "Destination", icon: MapPin },
  { label: "Budget", icon: DollarSign },
  { label: "Notes", icon: Users },
];

const PlanTrip = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [budget, setBudget] = useState(100000); // INR default
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    destination: '',
    notes: '',
    currency: 'INR', // track currency explicitly
    budgetINR: 100000, // keep in INR for future LLM usage
  });

  const nextStep = () => setStep(Math.min(step + 1, steps.length - 1));
  const prevStep = () => setStep(Math.max(step - 1, 0));

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // INR currency formatter
  const formatINR = (value: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);

  // Keep formData in sync with budget for future LLM use
  useEffect(() => {
    setFormData(prev => ({ ...prev, budgetINR: budget, currency: 'INR' }));
  }, [budget]);

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center bg-background text-foreground" style={{ marginTop: '80px' }}>
      <div className="relative z-10 container mx-auto px-4 pt-16 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-foreground tracking-tight">
            Plan Your Trip
          </h1>
          <p className="text-xl md:text-2xl text-foreground max-w-2xl mx-auto font-light">
            Create unforgettable memories with our intuitive trip planning experience
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center items-center mb-12 max-w-2xl mx-auto">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isActive = step === idx;
            const isCompleted = step > idx;
            return (
              <div key={s.label} className="flex items-center">
                <div className={`relative flex flex-col items-center transition-all duration-500 ${
                  isActive ? "scale-110" : "scale-100"
                }`}>
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${
                    isCompleted 
                      ? "bg-blue-500" 
                      : isActive 
                        ? "bg-blue-400" 
                        : "bg-blue-100"
                  }`}>
                    {isCompleted ? (
                      <Check className="w-7 h-7 text-white" />
                    ) : (
                      <Icon className={`w-7 h-7 ${isActive ? "text-white" : "text-blue-700"}`} />
                    )}
                  </div>
                  <span className={`mt-3 text-base font-semibold transition-colors duration-300 ${
                    isActive ? "text-blue-700" : isCompleted ? "text-blue-600" : "text-foreground/60"
                  }`}>
                    {s.label}
                  </span>
                  {isActive && (
                    <div className="absolute -bottom-2 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                  )}
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-20 h-1 mx-4 rounded transition-all duration-500 ${
                    step > idx ? "bg-blue-400" : "bg-blue-100"
                  }`}></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Main Form Container */}
        <div className="max-w-2xl mx-auto w-full">
          <div className="box-lightblue rounded-3xl p-10 shadow-soft transition-all duration-500 hover:shadow-strong">
            <div className="min-h-[400px] flex flex-col">
              
              {/* Step 0: Dates */}
              {step === 0 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
                      When are you traveling?
                    </h2>
                    <p className="text-foreground/70">Select your departure and return dates</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-base font-semibold text-blue-700">Departure Date</label>
                      <input 
                        type="date" 
                        value={formData.startDate}
                        onChange={(e) => updateFormData('startDate', e.target.value)}
                        className="w-full p-4 rounded-xl bg-white text-foreground border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-base font-semibold text-blue-700">Return Date</label>
                      <input 
                        type="date" 
                        value={formData.endDate}
                        onChange={(e) => updateFormData('endDate', e.target.value)}
                        className="w-full p-4 rounded-xl bg-white text-foreground border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Destination */}
              {step === 1 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
                      Where to?
                    </h2>
                    <p className="text-foreground/70">Choose your dream destination</p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-blue-700">Destination</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Paris, Tokyo, New York..."
                      value={formData.destination}
                      onChange={(e) => updateFormData('destination', e.target.value)}
                      className="w-full p-4 rounded-xl bg-white text-foreground border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder:text-foreground/50 outline-none" 
                    />
                  </div>

                  {/* Dynamic Map Preview */}
                  <div className="rounded-2xl overflow-hidden border border-[#e94560]/20 shadow-lg bg-[#0b1220]">
                    {formData.destination.trim().length > 1 ? (
                      <iframe
                        title="Destination Map"
                        src={`https://www.google.com/maps?q=${encodeURIComponent(formData.destination)}&output=embed`}
                        className="w-full"
                        style={{ height: 320 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    ) : (
                      <div className="h-80 flex items-center justify-center text-center px-6 box-lightblue">
                        <div>
                          <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                          <p className="text-foreground/70">Type a destination to see a live map preview</p>
                        </div>
                      </div>
                    )}
                    {formData.destination.trim().length > 1 && (
                      <div className="p-3 bg-white border-t border-blue-100 flex items-center justify-between">
                        <span className="text-sm text-foreground/70">Preview of: <span className="text-foreground font-semibold">{formData.destination}</span></span>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formData.destination)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-700 hover:text-blue-900 underline"
                        >
                          Open in Maps
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Budget */}
              {step === 2 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
                      What's your budget?
                    </h2>
                    <p className="text-foreground/70">Set your travel budget (INR)</p>
                  </div>

                  {/* Total Budget Display (INR) */}
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-5xl font-extrabold text-blue-600 mb-2">
                        {formatINR(budget)}
                      </div>
                      <div className="text-foreground/70">Total Budget (INR)</div>
                    </div>

                    {/* Manual Budget Input (INR) */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-base font-semibold text-blue-700">Enter Budget (INR)</label>
                        <input
                          type="number"
                          min={10000}
                          max={1000000}
                          step={1000}
                          value={budget}
                          onChange={(e) => {
                            const val = Math.max(10000, Math.min(1000000, Number(e.target.value) || 0));
                            setBudget(val);
                          }}
                          className="w-full p-4 rounded-xl bg-white text-foreground border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none"
                        />
                        <p className="text-xs text-foreground/70">Range: ₹10,000 – ₹10,00,000</p>
                      </div>

                      {/* Slider (INR) */}
                      <div className="space-y-2">
                        <label className="block text-base font-semibold text-blue-700">Adjust with Slider</label>
                        <input
                          type="range"
                          min={10000}
                          max={1000000}
                          step={1000}
                          value={budget}
                          onChange={e => setBudget(Number(e.target.value))}
                          className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-base text-foreground/70">
                          <span>{formatINR(10000)}</span>
                          <span>{formatINR(1000000)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Simple Allocation Preview (INR) */}
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="bg-white rounded-xl p-4 text-center border border-blue-100">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatINR(Math.round(budget * 0.4))}
                        </div>
                        <div className="text-foreground/70 text-sm">Accommodation (40%)</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center border border-blue-100">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatINR(Math.round(budget * 0.3))}
                        </div>
                        <div className="text-foreground/70 text-sm">Activities (30%)</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Notes */}
              {step === 3 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 text-foreground">
                      Any special requests?
                    </h2>
                    <p className="text-foreground/70">Tell us about your preferences and requirements</p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-blue-700">Additional Notes</label>
                    <textarea 
                      rows={6}
                      placeholder="e.g., Vegetarian restaurants, accessibility needs, adventure activities, cultural experiences..."
                      value={formData.notes}
                      onChange={(e) => updateFormData('notes', e.target.value)}
                      className="w-full p-4 rounded-xl bg-white text-foreground border border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-300 placeholder:text-foreground/50 resize-none outline-none"
                    />
                  </div>
                  <div className="box-lightblue rounded-2xl p-6">
                    <h3 className="font-bold text-blue-700 mb-3">Trip Summary</h3>
                    <div className="space-y-2 text-base">
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Dates:</span>
                        <span>{formData.startDate || 'Not set'} - {formData.endDate || 'Not set'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Destination:</span>
                        <span>{formData.destination || 'Not set'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Budget:</span>
                        <span className="text-blue-700 font-semibold">{formatINR(budget)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/70">Currency:</span>
                        <span>INR</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-10 pt-6 border-t border-blue-100">
                <button 
                  onClick={prevStep}
                  disabled={step === 0}
                  className={`flex items-center gap-2 px-7 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    step === 0 
                      ? "opacity-0 pointer-events-none" 
                      : "bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-100 hover:scale-105"
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </button>
                
                <div className="flex gap-2">
                  {steps.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        idx === step ? "bg-blue-500 w-8" : idx < step ? "bg-blue-400" : "bg-blue-100"
                      }`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={step === steps.length - 1 ? () => {
                    const trip = {
                      startDate: formData.startDate,
                      endDate: formData.endDate,
                      destination: formData.destination,
                      notes: formData.notes,
                      currency: 'INR',
                      budgetINR: budget,
                    };
                    navigate('/itinerary', { state: { trip } });
                  } : nextStep}
                  className="flex items-center gap-2 px-7 py-3 rounded-xl font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  {step === steps.length - 1 ? "Start Planning!" : "Next"}
                  {step === steps.length - 1 ? <Check className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        /* Slider track styles for better visibility */
        .slider::-webkit-slider-runnable-track {
          height: 8px;
          background: rgba(255,255,255,0.25);
          border-radius: 9999px;
        }
        .slider:focus::-webkit-slider-runnable-track {
          background: rgba(255,255,255,0.35);
        }
        .slider::-moz-range-track {
          height: 8px;
          background: rgba(255,255,255,0.25);
          border-radius: 9999px;
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          background: linear-gradient(45deg, #1fd1f9, #e94560);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(31, 209, 249, 0.4);
          margin-top: -8px;
        }
        .slider::-moz-range-thumb {
          height: 24px;
          width: 24px;
          background: linear-gradient(45deg, #1fd1f9, #e94560);
          border-radius: 50%;
          cursor: pointer;
          border: none;
          box-shadow: 0 4px 12px rgba(31, 209, 249, 0.4);
        }
        .slider:focus { outline: none; }
      `}</style>
    </div>
  );
};

export default PlanTrip;