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

  const tripSummary = useMemo(() => {
    const parts = [
      trip.destination ? `Destination: ${trip.destination}` : undefined,
      trip.startDate || trip.endDate ? `Dates: ${trip.startDate || "Not set"} - ${trip.endDate || "Not set"}` : undefined,
      trip.budgetINR ? `Budget: ${formatINR(trip.budgetINR)} (${trip.currency || "INR"})` : undefined,
      trip.notes ? `Notes: ${trip.notes}` : undefined,
    ].filter(Boolean);
    return parts.join(" | ");
  }, [trip]);

  useEffect(() => {
    // seed assistant with a context-aware greeting
    const greet: ChatMessage = {
      role: "assistant",
      content:
        trip.destination
          ? `I’ve loaded your trip context. Let’s plan ${trip.destination}! Ask for a day-by-day plan, budget in INR, food suggestions, or visa tips.`
          : `Tell me your destination and preferences. I’ll build a day-by-day plan, budget in INR, food suggestions, and visa tips.`,
    };
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
  }, []);

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
        // Create a temporary hidden container with clean content
        const temp = document.createElement('div');
        temp.style.position = 'fixed';
        temp.style.left = '-99999px';
        temp.style.top = '0';
        temp.style.width = '794px'; // A4 width at ~96dpi
        temp.style.padding = '24px';
        temp.style.background = '#ffffff';
        temp.style.color = '#111827';
        temp.style.fontFamily = 'ui-sans-serif, system-ui, Segoe UI, Roboto, Helvetica, Arial';
        temp.innerHTML = `
          <h1 style="margin:0 0 8px 0;font-size:22px;">Custom Itinerary${trip.destination ? ` – ${trip.destination}` : ''}</h1>
          <div style="font-size:12px;color:#374151;margin-bottom:12px;">${tripSummary || ''}</div>
          <pre style="white-space:pre-wrap;line-height:1.5;font-size:13px;margin:0;">${lastAssistant.content.replace(/</g, '&lt;')}</pre>
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
        margin: 10,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
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
          await saveItineraryForTrip({ trip_id: tripId, content: ai, summary, model: 'groq' });
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
            <div className="p-4 border-t border-blue-100 flex gap-2">
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
  );
};

export default Itinerary;
