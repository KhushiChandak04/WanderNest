import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { aiChatWithRetry, type ChatMessage, type TripContext } from "@/services/ai";
import { createTrip, saveItineraryForTrip } from "@/services/trips";

function formatINR(value?: number) {
  if (!value && value !== 0) return "N/A";
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);
}

const starterPrompts = [
  "Create a 5-day itinerary with must-see spots and local food",
  "Budget breakdown in INR for stay, food, transport, and activities",
  "Vegetarian/halal-friendly food list near the main sights",
  "Visa tips and document checklist for this trip",
  "Hidden gems and neighborhoods to explore",
];

const Itinerary = () => {
  const { state } = useLocation();
  const trip: TripContext = state?.trip || {};
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const [tripId, setTripId] = useState<string | null>(null);
  const [originIATA, setOriginIATA] = useState<string>("DEL");
  const [providerLabel, setProviderLabel] = useState<string>("groq");
  const [autoPlanned, setAutoPlanned] = useState<boolean>(false);

  // Calculate number of travel days
  const travelDays = useMemo(() => {
    if (!trip.startDate || !trip.endDate) return 0;
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const diff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff + 1 : 1;
  }, [trip.startDate, trip.endDate]);

  const tripSummary = useMemo(() => {
    const parts = [
      trip.destination ? `Destination: ${trip.destination}` : undefined,
      trip.startDate || trip.endDate ? `Dates: ${trip.startDate || "Not set"} - ${trip.endDate || "Not set"}` : undefined,
      travelDays ? `Travel Days: ${travelDays}` : undefined,
      trip.budgetINR ? `Budget: ${formatINR(trip.budgetINR)} (${trip.currency || "INR"})` : undefined,
      trip.notes ? `Notes: ${trip.notes}` : undefined,
    ].filter(Boolean);
    return parts.join(" | ");
  }, [trip, travelDays]);

  function titleCase(s?: string) {
    if (!s) return s;
    return s
      .split(/\s+/)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  useEffect(() => {
    // seed assistant with a context-aware greeting and auto day-by-day prompt
    let greeting = trip.destination
      ? `I’ve loaded your trip context. Let’s plan ${titleCase(trip.destination)}! You are travelling for ${travelDays} day${travelDays > 1 ? 's' : ''}. Here is a custom day-by-day itinerary, budget in INR, food suggestions, and visa tips.`
      : `Tell me your destination and preferences. I’ll build a day-by-day plan, budget in INR, food suggestions, and visa tips.`;
    // If travelDays > 1, auto-prompt for a day-by-day plan
    if (trip.destination && travelDays > 1) {
      greeting += `\n\nPlease generate a ${travelDays}-day itinerary for ${titleCase(trip.destination)}.`;
    }
    const greet: ChatMessage = { role: "assistant", content: greeting };
  setMessages([greet]);
    // Create a trip request record if we have basic context and a token
    (async () => {
      try {
        if (trip?.destination && (trip?.startDate || trip?.endDate)) {
          const payload = {
            destination: trip.destination,
            start_date: trip.startDate,
            return_date: trip.endDate,
            preferences: { budgetINR: trip.budgetINR, currency: trip.currency, notes: trip.notes },
          } as any;
          const created = await createTrip(payload);
          if (created?.id) setTripId(created.id);
        }
      } catch {}
    })();

    // Auto-send a day-by-day itinerary prompt when we have destination and dates
    if (trip.destination && travelDays > 0 && !autoPlanned) {
      const planPrompt = [
        `Generate a detailed ${travelDays}-day itinerary for ${titleCase(trip.destination)} between ${trip.startDate || 'start'} and ${trip.endDate || 'end'}.`,
        `Include a daily schedule (morning/afternoon/evening), realistic budgets in INR, and transport guidance.`,
        `Highlight vegetarian/halal-friendly food near key sights, and add visa tips for Indian travelers where relevant.`,
        trip.notes ? `Traveler notes: ${trip.notes}` : undefined,
        typeof trip.budgetINR === 'number' ? `Overall budget: ₹${Number(trip.budgetINR).toLocaleString('en-IN')}` : undefined
      ].filter(Boolean).join('\n');
      // Allow state to settle so the greeting renders before AI response
      setAutoPlanned(true);
      setTimeout(() => { send(planPrompt); }, 120);
    }
  }, [travelDays]);

  useEffect(() => {
    // auto-scroll chat to bottom on new message
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function downloadPDF() {
    try {
      // Prefer exporting the latest assistant message as the itinerary
      const lastAssistant = [...messages].reverse().find(m => m.role === 'assistant');
      let node: HTMLElement | null = null;
      if (lastAssistant) {
        // Create a temporary hidden container with beautiful background and color styling
        const temp = document.createElement('div');
        temp.style.position = 'fixed';
        temp.style.left = '-99999px';
        temp.style.top = '0';
        temp.style.width = '794px'; // A4 width at ~96dpi
        temp.style.padding = '32px';
        temp.style.background = 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)';
        temp.style.borderRadius = '24px';
        temp.style.color = '#1e293b';
        temp.style.fontFamily = 'Inter, Playfair Display, ui-sans-serif, system-ui, Segoe UI, Roboto, Helvetica, Arial';
        temp.innerHTML = `
          <div style="background: linear-gradient(120deg, #38bdf8 0%, #818cf8 100%); border-radius: 18px; padding: 18px 24px; color: #fff; margin-bottom: 18px; box-shadow: 0 4px 24px rgba(56,189,248,0.12);">
            <h1 style="margin:0 0 8px 0;font-size:28px;font-family:'Playfair Display',serif;letter-spacing:1px;">Custom Itinerary${trip.destination ? ` – ${titleCase(trip.destination)}` : ''}</h1>
            <div style="font-size:14px;color:#e0e7ff;margin-bottom:8px;">${tripSummary || ''}</div>
          </div>
          <div style="background:rgba(255,255,255,0.95);border-radius:16px;padding:18px 24px;box-shadow:0 2px 12px rgba(56,189,248,0.08);">
            <pre style="white-space:pre-wrap;line-height:1.7;font-size:15px;margin:0;color:#334155;font-family:'Inter',sans-serif;">${lastAssistant.content.replace(/</g, '&lt;')}</pre>
          </div>
        `;
        document.body.appendChild(temp);
        node = temp;
      } else if (exportRef.current) {
        node = exportRef.current;
      }
      if (!node) return;

      // Use the explicit UMD bundle path so Vite can resolve it reliably
      const mod = await import('html2pdf.js/dist/html2pdf.bundle.min.js');
      const html2pdf = (mod as any).default || (mod as any);
      const fileName = `Itinerary${trip.destination ? '-' + trip.destination.replace(/\s+/g,'_') : ''}.pdf`;
      await html2pdf().from(node).set({
        margin: 0,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: null },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      }).save();

      // Save itinerary to backend if we created/know the trip id
      try {
        if (tripId && lastAssistant?.content) {
          const summary = tripSummary || undefined;
          await saveItineraryForTrip({ trip_id: tripId, content: lastAssistant.content, summary, model: 'groq' });
        }
      } catch {}

      if (node && node !== exportRef.current) {
        node.remove();
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setMessages(prev => [...prev, { role: 'assistant', content: `Could not generate PDF: ${msg}` }] as ChatMessage[]);
    }
  }

  async function send(content?: string) {
    const userText = (content ?? input).trim();
    if (!userText) return;
    const newMsgs: ChatMessage[] = [...messages, { role: "user", content: userText }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);
    try {
      const resp = await aiChatWithRetry(newMsgs.filter(m => m.role !== "assistant" || m.content.length < 4000), trip);
      const ai = resp?.choices?.[0]?.message?.content || resp?.choices?.[0]?.delta?.content || "Sorry, I couldn't generate a response.";
      const isFallback = resp?.meta?.demo === true;
      const provider = resp?.meta?.provider || "groq";
      setProviderLabel(isFallback ? "demo" : provider);
      const additions: ChatMessage[] = [{ role: "assistant", content: ai }];
      if (isFallback) {
        additions.push({
          role: "assistant",
          content: "Note: Showing a demo-style reply because the live AI couldn’t be reached. Check the server logs and your XAI_API_KEY."
        } as ChatMessage);
      }
      setMessages(prev => [...prev, ...additions] as ChatMessage[]);
      // Auto-save itinerary when we have tripId and a new assistant response
      try {
        if (tripId && ai) {
          const summary = tripSummary || undefined;
          await saveItineraryForTrip({ trip_id: tripId, content: ai, summary, model: provider });
        }
      } catch {}
    } catch (e: any) {
      const status = e?.response?.status;
      if (status === 401) {
        setMessages(prev => [...prev, { role: "assistant", content: "You’re not logged in or your session expired. Please log in again to use the itinerary assistant." }] as ChatMessage[]);
      } else if (status === 502) {
        const info = typeof e?.response?.data === 'object' ? JSON.stringify(e.response.data) : (e?.response?.data || '');
        setMessages(prev => [...prev, { role: "assistant", content: `The AI upstream returned an error. Please try again in a moment. ${info ? `\n\nDetails: ${info}` : ''}` }] as ChatMessage[]);
      } else if (e?.code === 'ERR_NETWORK') {
        setMessages(prev => [...prev, { role: "assistant", content: "Network issue detected. Ensure the backend is running and reachable from the app." }] as ChatMessage[]);
      } else {
        const errText = typeof e?.response?.data === 'object' ? JSON.stringify(e.response.data) : (e?.response?.data || e?.message || 'Unknown error');
        setMessages(prev => [...prev, { role: "assistant", content: `There was an issue contacting the itinerary assistant. Details: ${errText}` }] as ChatMessage[]);
      }
    } finally {
      setLoading(false);
    }
  }

  // ---- Flights helpers ----
  function toISO(d?: string) {
    if (!d) return undefined;
    const dt = new Date(d);
    if (isNaN(dt.getTime())) return undefined;
    return dt.toISOString().slice(0, 10);
  }

  const iataCityMap: Record<string, string> = {
    // Common city codes
    "new york": "NYC",
    "nyc": "NYC",
    "paris": "PAR",
    "france": "PAR",
    "london": "LON",
    "tokyo": "TYO",
    "japan": "TYO",
    "dubai": "DXB",
    "singapore": "SIN",
    "bangkok": "BKK",
    "sydney": "SYD",
    "san francisco": "SFO",
    "los angeles": "LAX",
    "mumbai": "BOM",
    "delhi": "DEL",
    "bengaluru": "BLR",
    "bengalore": "BLR",
    "chennai": "MAA",
    // Country/region fallbacks
    "italy": "ROM",
    "spain": "MAD",
    "germany": "BER",
    "norway": "OSL",
    "bali": "DPS",
  };

  function guessDestIATA(dest?: string) {
    if (!dest) return undefined;
    const key = dest.toLowerCase();
    for (const k of Object.keys(iataCityMap)) {
      if (key.includes(k)) return iataCityMap[k];
    }
    return undefined;
  }

  function buildGoogleFlightsLink(origin?: string, destination?: string, depart?: string, ret?: string) {
    if (!destination) return undefined;
    const o = (origin || "").toUpperCase().trim();
    const cityCode = guessDestIATA(destination);
    const dISO = toISO(depart);
    const rISO = toISO(ret);
    if (o && cityCode && dISO && rISO) {
      // Deep link using city codes and dates
      // Example: https://www.google.com/travel/flights?hl=en#flt=DEL.PAR.2025-10-22*PAR.DEL.2025-10-29
      const flt = `${o}.${cityCode}.${dISO}*${cityCode}.${o}.${rISO}`;
      return `https://www.google.com/travel/flights?hl=en#flt=${encodeURIComponent(flt)}`;
    }
    if (o && cityCode && dISO) {
      // One-way deep link if return date not provided
      const flt = `${o}.${cityCode}.${dISO}`;
      return `https://www.google.com/travel/flights?hl=en#flt=${encodeURIComponent(flt)}`;
    }
    // Fallback to query-based search
    const q = [o ? `from ${o}` : "", "to", destination, dISO ? `on ${dISO}` : "", rISO ? `return ${rISO}` : ""].filter(Boolean).join(" ");
    return `https://www.google.com/travel/flights?hl=en&q=${encodeURIComponent(q)}`;
  }

  function airlineLinksForDestination(destination?: string) {
    const list: { name: string; url: string }[] = [];
    if (!destination) return list;
    const d = destination.toLowerCase();
    const push = (name: string, url: string) => list.push({ name, url });
    // General international carriers popular from India
    push("Air India", "https://www.airindia.com/");
    push("IndiGo", "https://www.goindigo.in/");
    push("Vistara", "https://www.airvistara.com/");
    push("Emirates", "https://www.emirates.com/");
    push("Qatar Airways", "https://www.qatarairways.com/");
    push("Singapore Airlines", "https://www.singaporeair.com/");

    // Destination-specific majors
    if (d.includes("new york") || d.includes("nyc")) {
      push("United Airlines", "https://www.united.com/");
      push("Delta Air Lines", "https://www.delta.com/");
      push("American Airlines", "https://www.aa.com/");
      push("Air India (Nonstop DEL/EWR)", "https://www.airindia.com/");
    }
    if (d.includes("tokyo")) {
      push("ANA (All Nippon Airways)", "https://www.ana.co.jp/");
      push("Japan Airlines", "https://www.jal.co.jp/");
    }
    if (d.includes("paris")) {
      push("Air France", "https://www.airfrance.com/");
    }
    if (d.includes("london")) {
      push("British Airways", "https://www.britishairways.com/");
      push("Virgin Atlantic", "https://www.virginatlantic.com/");
    }
    if (d.includes("dubai")) {
      push("Emirates", "https://www.emirates.com/");
      push("flydubai", "https://www.flydubai.com/");
    }
    if (d.includes("singapore")) {
      push("Singapore Airlines", "https://www.singaporeair.com/");
      push("Scoot", "https://www.flyscoot.com/");
    }
    return list;
  }

  return (
  <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="container mx-auto px-4 pt-24 pb-10">
        <h1 className="text-4xl font-bold mb-3 text-center">Custom Itinerary</h1>
  <p className="text-center text-foreground mb-6">{tripSummary || "Provide trip details to personalize your plan."}</p>

        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
          {/* Trip summary card */}
          <div className="md:col-span-1 bg-blue-50 rounded-2xl p-5 border border-blue-100 shadow-soft">
            <h2 className="font-semibold mb-3">Trip Summary</h2>
            <div className="space-y-2 text-sm text-foreground">
              <div><span className="text-foreground/70">Destination:</span> <span className="text-foreground">{trip.destination || "Not set"}</span></div>
              <div><span className="text-foreground/70">Dates:</span> <span className="text-foreground">{trip.startDate || "Not set"} - {trip.endDate || "Not set"}</span></div>
              <div><span className="text-gray-500">Budget:</span> <span className="text-blue-700 font-semibold">{formatINR(trip.budgetINR)}</span></div>
              <div><span className="text-foreground/70">Currency:</span> <span className="text-foreground">{trip.currency || "INR"}</span></div>
              {trip.notes && (
                <div className="pt-2"><span className="text-foreground/70">Notes:</span> <span className="text-foreground">{trip.notes}</span></div>
              )}
            </div>

            <div className="mt-5">
              <div className="text-xs text-foreground/70">Quick prompts</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {starterPrompts.map(p => (
                  <button key={p} className="px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs border border-blue-100" onClick={() => send(p)}>{p}</button>
                ))}
              </div>
            </div>

            {/* Flights helper */}
            <div className="mt-6 pt-5 border-t border-blue-100">
              <h3 className="font-semibold mb-2">Flights</h3>
              <label className="block text-xs text-foreground/70 mb-1">Origin (IATA code)</label>
              <input
                value={originIATA}
                onChange={(e) => setOriginIATA(e.target.value.toUpperCase())}
                placeholder="DEL, BOM, BLR…"
                className="w-full bg-white border border-blue-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
              />
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {trip.destination ? (
                  <a
                    href={buildGoogleFlightsLink(originIATA, trip.destination, trip.startDate, trip.endDate)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 text-sm"
                  >Search on Google Flights</a>
                ) : (
                  <div className="text-xs text-foreground/70">Set destination to enable flight search</div>
                )}
              </div>
              {trip.destination && (
                <div className="mt-3">
                  <div className="text-xs text-foreground/70 mb-1">Official airline sites</div>
                  <div className="flex flex-wrap gap-2">
                    {airlineLinksForDestination(trip.destination).map((a) => (
                      <a key={a.name} href={a.url} target="_blank" rel="noreferrer" className="px-2 py-1 rounded-md bg-white border border-blue-100 text-xs hover:bg-blue-50">
                        {a.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chat panel */}
          <div className="md:col-span-2 bg-blue-50 rounded-2xl border border-blue-100 flex flex-col shadow-soft" ref={exportRef}>
            <div ref={containerRef} className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((m, idx) => (
                <div key={idx} className={`max-w-[85%] ${m.role === 'user' ? 'ml-auto text-right' : ''}`}>
                  <div className={`inline-block px-4 py-3 rounded-2xl whitespace-pre-wrap ${m.role === 'user' ? 'bg-blue-100 text-blue-900' : 'bg-white border border-blue-100 text-foreground'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && <div className="text-sm text-foreground/70">Thinking…</div>}
            </div>
            <div className="p-4 border-t border-blue-100 flex flex-col gap-2">
              <div className="text-xs text-foreground/60">AI provider: <span className="font-medium">{providerLabel}</span></div>
              <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Ask for a 5-day plan, budget, food, or visa details…"
                className="flex-1 bg-white border border-blue-200 rounded-xl px-4 py-3 outline-none focus:border-blue-400"
              />
              <button
                onClick={() => send()}
                disabled={loading}
                className="px-5 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-50"
              >Send</button>
              <button
                onClick={downloadPDF}
                className="px-5 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-100"
                title="Download latest itinerary as PDF"
              >Download PDF</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Itinerary;
