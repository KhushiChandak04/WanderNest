import { useState } from "react";
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
  const [budget, setBudget] = useState(2000);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    destination: '',
    notes: ''
  });

  const nextStep = () => setStep(Math.min(step + 1, steps.length - 1));
  const prevStep = () => setStep(Math.max(step - 1, 0));

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex flex-col items-center"
      style={{
        marginTop: '80px',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(26,26,46,0.92)",
        backgroundBlendMode: "overlay",
        fontFamily: `'Poppins', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`,
        color: "#f3f4f6"
      }}
    >
      <div className="relative z-10 container mx-auto px-4 pt-16 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-[#1fd1f9] via-[#e94560] to-[#f8b400] bg-clip-text text-transparent drop-shadow-lg tracking-tight">
            Plan Your Dream Trip
          </h1>
          <p className="text-xl md:text-2xl text-[#e0e7ef] max-w-2xl mx-auto font-light">
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
                      ? "bg-gradient-to-r from-[#1fd1f9] to-[#e94560]" 
                      : isActive 
                        ? "bg-gradient-to-r from-[#1fd1f9] to-[#e94560]" 
                        : "bg-[#232526]/80 backdrop-blur-sm"
                  }`}>
                    {isCompleted ? (
                      <Check className="w-7 h-7 text-white" />
                    ) : (
                      <Icon className={`w-7 h-7 ${isActive ? "text-white" : "text-[#b6c2d1]"}`} />
                    )}
                  </div>
                  <span className={`mt-3 text-base font-semibold transition-colors duration-300 ${
                    isActive ? "text-[#f8b400]" : isCompleted ? "text-[#1fd1f9]" : "text-[#b6c2d1]"
                  }`}>
                    {s.label}
                  </span>
                  {isActive && (
                    <div className="absolute -bottom-2 w-2 h-2 bg-[#f8b400] rounded-full animate-ping"></div>
                  )}
                </div>
                {idx < steps.length - 1 && (
                  <div className={`w-20 h-1 mx-4 rounded transition-all duration-500 ${
                    step > idx ? "bg-gradient-to-r from-[#1fd1f9] to-[#e94560]" : "bg-[#232526]/80"
                  }`}></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Main Form Container */}
        <div className="max-w-2xl mx-auto w-full">
          <div className="bg-[#232526]/90 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-[#e94560]/30 transition-all duration-500 hover:shadow-3xl glassmorphism">
            <div className="min-h-[400px] flex flex-col">
              
              {/* Step 0: Dates */}
              {step === 0 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#1fd1f9] to-[#e94560] bg-clip-text text-transparent">
                      When are you traveling?
                    </h2>
                    <p className="text-[#b6c2d1]">Select your departure and return dates</p>
                  </div>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-base font-semibold text-[#f8b400]">Departure Date</label>
                      <input 
                        type="date" 
                        value={formData.startDate}
                        onChange={(e) => updateFormData('startDate', e.target.value)}
                        className="w-full p-4 rounded-xl bg-[#232526]/70 text-white border border-[#e94560]/60 focus:border-[#1fd1f9] focus:ring-2 focus:ring-[#1fd1f9]/50 transition-all duration-300 backdrop-blur-sm outline-none" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-base font-semibold text-[#f8b400]">Return Date</label>
                      <input 
                        type="date" 
                        value={formData.endDate}
                        onChange={(e) => updateFormData('endDate', e.target.value)}
                        className="w-full p-4 rounded-xl bg-[#232526]/70 text-white border border-[#e94560]/60 focus:border-[#1fd1f9] focus:ring-2 focus:ring-[#1fd1f9]/50 transition-all duration-300 backdrop-blur-sm outline-none" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 1: Destination */}
              {step === 1 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#1fd1f9] to-[#e94560] bg-clip-text text-transparent">
                      Where to?
                    </h2>
                    <p className="text-[#b6c2d1]">Choose your dream destination</p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-[#f8b400]">Destination</label>
                    <input 
                      type="text" 
                      placeholder="e.g., Paris, Tokyo, New York..."
                      value={formData.destination}
                      onChange={(e) => updateFormData('destination', e.target.value)}
                      className="w-full p-4 rounded-xl bg-[#232526]/70 text-white border border-[#e94560]/60 focus:border-[#1fd1f9] focus:ring-2 focus:ring-[#1fd1f9]/50 transition-all duration-300 backdrop-blur-sm placeholder-[#b6c2d1] outline-none" 
                    />
                  </div>
                  <div className="bg-gradient-to-br from-[#1fd1f9]/20 to-[#e94560]/20 rounded-2xl h-48 flex items-center justify-center border border-[#e94560]/20 backdrop-blur-sm">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-[#1fd1f9] mx-auto mb-4" />
                      <span className="text-[#1fd1f9] text-lg font-medium">Interactive Map Preview</span>
                      <p className="text-[#b6c2d1] text-sm mt-2">Map integration coming soon</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Budget */}
              {step === 2 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#1fd1f9] to-[#e94560] bg-clip-text text-transparent">
                      What's your budget?
                    </h2>
                    <p className="text-[#b6c2d1]">Set your travel budget range</p>
                  </div>
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-5xl font-extrabold text-[#f8b400] mb-2">${budget.toLocaleString()}</div>
                      <div className="text-[#b6c2d1]">Total Budget</div>
                    </div>
                    <div className="space-y-4">
                      <input
                        type="range"
                        min={500}
                        max={10000}
                        value={budget}
                        onChange={e => setBudget(Number(e.target.value))}
                        className="w-full h-3 bg-[#232526]/50 rounded-lg appearance-none cursor-pointer slider"
                      />
                      <div className="flex justify-between text-base text-[#b6c2d1]">
                        <span>$500</span>
                        <span>$10,000+</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <div className="bg-[#232526]/70 rounded-xl p-4 text-center backdrop-blur-sm">
                        <div className="text-2xl font-bold text-[#1fd1f9]">${Math.round(budget * 0.4).toLocaleString()}</div>
                        <div className="text-[#b6c2d1] text-sm">Accommodation</div>
                      </div>
                      <div className="bg-[#232526]/70 rounded-xl p-4 text-center backdrop-blur-sm">
                        <div className="text-2xl font-bold text-[#e94560]">${Math.round(budget * 0.3).toLocaleString()}</div>
                        <div className="text-[#b6c2d1] text-sm">Activities</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Notes */}
              {step === 3 && (
                <div className="space-y-8 animate-fade-in">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-[#1fd1f9] to-[#e94560] bg-clip-text text-transparent">
                      Any special requests?
                    </h2>
                    <p className="text-[#b6c2d1]">Tell us about your preferences and requirements</p>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-base font-semibold text-[#f8b400]">Additional Notes</label>
                    <textarea 
                      rows={6}
                      placeholder="e.g., Vegetarian restaurants, accessibility needs, adventure activities, cultural experiences..."
                      value={formData.notes}
                      onChange={(e) => updateFormData('notes', e.target.value)}
                      className="w-full p-4 rounded-xl bg-[#232526]/70 text-white border border-[#e94560]/60 focus:border-[#1fd1f9] focus:ring-2 focus:ring-[#1fd1f9]/50 transition-all duration-300 backdrop-blur-sm placeholder-[#b6c2d1] resize-none outline-none"
                    />
                  </div>
                  <div className="bg-gradient-to-br from-[#1fd1f9]/20 to-[#e94560]/20 rounded-2xl p-6 border border-[#e94560]/20 backdrop-blur-sm">
                    <h3 className="font-bold text-[#1fd1f9] mb-3">Trip Summary</h3>
                    <div className="space-y-2 text-base">
                      <div className="flex justify-between">
                        <span className="text-[#b6c2d1]">Dates:</span>
                        <span>{formData.startDate || 'Not set'} - {formData.endDate || 'Not set'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#b6c2d1]">Destination:</span>
                        <span>{formData.destination || 'Not set'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#b6c2d1]">Budget:</span>
                        <span className="text-[#f8b400] font-semibold">${budget.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center mt-10 pt-6 border-t border-[#e94560]/40">
                <button 
                  onClick={prevStep}
                  disabled={step === 0}
                  className={`flex items-center gap-2 px-7 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    step === 0 
                      ? "opacity-0 pointer-events-none" 
                      : "bg-[#232526]/70 hover:bg-[#232526]/90 text-white backdrop-blur-sm hover:scale-105"
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
                        idx === step ? "bg-[#f8b400] w-8" : idx < step ? "bg-[#1fd1f9]" : "bg-white/30"
                      }`}
                    />
                  ))}
                </div>
                
                <button 
                  onClick={step === steps.length - 1 ? () => setStep(0) : nextStep}
                  className="flex items-center gap-2 px-7 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#1fd1f9] to-[#f8b400] hover:from-[#1fd1f9]/80 hover:to-[#f8b400]/80 text-white transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-[#1fd1f9]/25"
                >
                  {step === steps.length - 1 ? "Start Planning!" : "Next"}
                  {step === steps.length - 1 ? <Check className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          background: linear-gradient(45deg, #1fd1f9, #e94560);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(31, 209, 249, 0.4);
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
      `}</style>
    </div>
  );
};

export default PlanTrip;