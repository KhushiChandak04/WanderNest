import Navigation from "@/components/Navigation";

const days = [
  { day: "Day 1", activities: ["Arrive in Tokyo", "Visit Shibuya", "Sushi dinner"] },
  { day: "Day 2", activities: ["Mt. Fuji tour", "Local market", "Onsen spa"] },
  { day: "Day 3", activities: ["Temple visit", "Shopping", "Flight home"] },
];

const Itinerary = () => (
  <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white font-sans">
    <Navigation />
    <div className="container mx-auto px-4 pt-24">
      <h1 className="text-4xl font-bold mb-6 drop-shadow-lg text-center">Itinerary Builder</h1>
      <div className="max-w-2xl mx-auto">
        {days.map((d, idx) => (
          <div key={d.day} className="mb-8">
            <div className="flex items-center gap-4 mb-2">
              <span className="bg-[#e94560] text-white px-4 py-2 rounded-full font-bold">{d.day}</span>
              <span className="text-primary">Drag & drop activities</span>
            </div>
            <ul className="bg-[#232526]/80 rounded-xl p-4 glassmorphism shadow">
              {d.activities.map((a, i) => (
                <li key={a} className="mb-2 p-2 rounded-lg bg-[#16213e]/60 hover:bg-primary/20 transition">{a}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Itinerary;
