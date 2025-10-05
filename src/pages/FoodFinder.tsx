import React, { useState } from "react";
import Navigation from "@/components/Navigation";

const foods = [
  { name: "Sushi", type: "Pure Veg", city: "Tokyo", image: "/assets/food1.jpg", link: "#" },
  { name: "Pasta", type: "Vegan", city: "Rome", image: "/assets/food2.jpg", link: "#" },
  { name: "Dosa", type: "Veg", city: "Bangalore", image: "/assets/food3.jpg", link: "#" },
];

const FoodFinder = () => {
  const [search, setSearch] = useState("");

  const filtered = foods.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <div className="min-h-screen bg-background text-foreground font-sans transition-all duration-500">
      <Navigation />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold mb-6 drop-shadow-lg text-center">Food Finder</h1>
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search by city or food..."
            className="w-full p-3 rounded-lg bg-[#232526] text-white border border-[#e94560]/40"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtered.map((food, idx) => (
            <div
              key={food.name}
              className="bg-[#232526]/80 rounded-2xl overflow-hidden shadow-xl glassmorphism border border-[#e94560]/30 flex flex-col items-center group transition-all duration-300 hover:scale-105"
            >
              <div className="overflow-hidden w-full h-40">
                <img src={food.image} alt={food.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-4 w-full text-center">
                <span className="font-bold text-lg">{food.name}</span>
                <span className="block text-gray-300 mb-2">{food.type} - {food.city}</span>
                <a href={food.link} className="text-primary underline">View Restaurant</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodFinder;
