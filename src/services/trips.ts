import API from "./api";

export type TripPayload = {
  destination: string;
  start_date?: string; // ISO
  return_date?: string; // ISO
  dates?: { start?: string; end?: string; from?: string; to?: string; start_date?: string; return_date?: string };
  preferences?: any;
};


export async function createTrip(trip: TripPayload) {
  // Demo bypass: return canned trip if API is stubbed
  if ((API.get && API.post && API.put && API.delete) && typeof window !== 'undefined' && (/\.vercel\.app$/.test(window.location.hostname) || (import.meta as any).env?.VITE_BYPASS_AUTH === 'true')) {
    return { id: "demo-trip-id" };
  }
  const { data } = await API.post("/trips", trip);
  return data?.trip as { id: string };
}

export async function listTrips() {
  if ((API.get && API.post && API.put && API.delete) && typeof window !== 'undefined' && (/\.vercel\.app$/.test(window.location.hostname) || (import.meta as any).env?.VITE_BYPASS_AUTH === 'true')) {
    return [{ id: "demo-trip-id", destination: "Demo Destination", start_date: "2025-10-10", return_date: "2025-10-15" }];
  }
  const { data } = await API.get("/trips");
  return data?.trips as any[];
}

export async function saveItineraryForTrip(params: { trip_id: string; content: any; summary?: string; model?: string }) {
  if ((API.get && API.post && API.put && API.delete) && typeof window !== 'undefined' && (/\.vercel\.app$/.test(window.location.hostname) || (import.meta as any).env?.VITE_BYPASS_AUTH === 'true')) {
    return { id: "demo-itinerary-id", summary: "Demo itinerary summary.", content: params.content };
  }
  const { data } = await API.post("/itineraries", params);
  return data?.itinerary as any;
}

export async function listItineraries() {
  if ((API.get && API.post && API.put && API.delete) && typeof window !== 'undefined' && (/\.vercel\.app$/.test(window.location.hostname) || (import.meta as any).env?.VITE_BYPASS_AUTH === 'true')) {
    return [{ id: "demo-itinerary-id", summary: "Demo itinerary summary.", content: "Demo itinerary content." }];
  }
  const { data } = await API.get("/itineraries");
  return data?.itineraries as any[];
}
