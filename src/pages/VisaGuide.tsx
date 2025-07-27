import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Globe, Stamp, Building2 } from "lucide-react";

const countries = [
  { name: "Japan", code: "JP" },
  { name: "Italy", code: "IT" },
  { name: "India", code: "IN" },
  { name: "France", code: "FR" },
];

const visaData: Record<string, any> = {
  JP: {
    requirements: ["Passport", "Visa Application", "Photo", "Flight Tickets"],
    time: "5-10 days",
    embassy: "https://www.jp.embassy.gov/",
  },
  IT: {
    requirements: ["Passport", "Visa Form", "Hotel Booking"],
    time: "7-14 days",
    embassy: "https://www.it.embassy.gov/",
  },
  // ...other countries
};

const VisaGuide = () => {
  const [selected, setSelected] = useState("JP");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] text-white font-sans transition-all duration-500">
      <Navigation />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold mb-6 drop-shadow-lg text-center">Visa Guide</h1>
        <div className="max-w-md mx-auto mb-8">
          <label className="block mb-2 text-lg font-semibold">Select Country</label>
          <select
            className="w-full p-3 rounded-lg bg-[#232526] text-white border border-[#e94560]/40"
            value={selected}
            onChange={e => setSelected(e.target.value)}
          >
            {countries.map(c => (
              <option key={c.code} value={c.code}>{c.name}</option>
            ))}
          </select>
        </div>
        <Accordion type="single" collapsible className="max-w-xl mx-auto">
          <AccordionItem value="requirements">
            <AccordionTrigger>
              <Globe className="inline mr-2" /> Requirements
            </AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-6">
                {visaData[selected]?.requirements.map((req: string) => (
                  <li key={req}>{req}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="time">
            <AccordionTrigger>
              <Stamp className="inline mr-2" /> Estimated Time
            </AccordionTrigger>
            <AccordionContent>
              <span>{visaData[selected]?.time}</span>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="embassy">
            <AccordionTrigger>
              <Building2 className="inline mr-2" /> Embassy Link
            </AccordionTrigger>
            <AccordionContent>
              <a href={visaData[selected]?.embassy} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                Visit Embassy Website
              </a>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default VisaGuide;
