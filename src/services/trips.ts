import API from "./api";

export type TripPayload = {
  destination: string;
  start_date?: string; // ISO
  return_date?: string; // ISO
  dates?: { start?: string; end?: string; from?: string; to?: string; start_date?: string; return_date?: string };
  preferences?: any;
};

export async function createTrip(trip: TripPayload) {
  const { data } = await API.post("/trips", trip);
  return data?.trip as { id: string };
}

export async function listTrips() {
  const { data } = await API.get("/trips");
  return data?.trips as any[];
}

export async function saveItineraryForTrip(params: { trip_id: string; content: any; summary?: string; model?: string }) {
  const { data } = await API.post("/itineraries", params);
  return data?.itinerary as any;
}

export async function listItineraries() {
  const { data } = await API.get("/itineraries");
  return data?.itineraries as any[];
}
