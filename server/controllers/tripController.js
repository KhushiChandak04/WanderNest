// server/controllers/tripController.js
import { supabase } from "../config/db.js";

const requireSupabase = (res) => {
  if (!supabase) {
    res.status(500).json({ error: "Supabase not configured on server" });
    return false;
  }
  return true;
};

const getUserId = (req, res) => {
  const uid = req.user?.id;
  if (!uid) {
    res.status(401).json({ error: "Not authorized" });
    return null;
  }
  return uid;
};

// POST /api/trips
export const createTripRequest = async (req, res) => {
  try {
    if (!requireSupabase(res)) return;
    const user_id = getUserId(req, res);
    if (!user_id) return;

    const { destination, dates, start_date, return_date, preferences } = req.body || {};

    // Normalize dates field
    const start = start_date || dates?.start || dates?.from || dates?.start_date;
    const end = return_date || dates?.end || dates?.to || dates?.return_date;

    if (!destination || !start || !end) {
      return res.status(400).json({ error: "destination, start_date, return_date are required" });
    }

    const payload = {
      user_id,
      destination,
      start_date: start,
      return_date: end,
      preferences: preferences ?? null,
    };

    const { data, error } = await supabase
      .from("trip_requests")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("trip_requests insert error:", error, "payload=", payload);
      return res.status(500).json({ error: error.message });
    }
    return res.status(201).json({ trip: data });
  } catch (e) {
    return res.status(500).json({ error: e?.message || String(e) });
  }
};

// GET /api/trips
export const getUserTrips = async (req, res) => {
  try {
    if (!requireSupabase(res)) return;
    const user_id = getUserId(req, res);
    if (!user_id) return;

    const { data, error } = await supabase
      .from("trip_requests")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.json({ trips: data || [] });
  } catch (e) {
    return res.status(500).json({ error: e?.message || String(e) });
  }
};

// POST /api/itineraries
export const saveItinerary = async (req, res) => {
  try {
    if (!requireSupabase(res)) return;
    const user_id = getUserId(req, res);
    if (!user_id) return;

    const { trip_id, itinerary, content, summary, model } = req.body || {};
    if (!trip_id) return res.status(400).json({ error: "trip_id is required" });

    // Optional: ensure trip belongs to user
    const { data: tripRow, error: tripErr } = await supabase
      .from("trip_requests")
      .select("id, user_id")
      .eq("id", trip_id)
      .single();
    if (tripErr) return res.status(400).json({ error: `Invalid trip_id: ${tripErr.message}` });
    if (tripRow?.user_id !== user_id) return res.status(403).json({ error: "Forbidden: trip does not belong to user" });

  let payloadContent = content ?? itinerary ?? null;
    // If content is a string that looks like JSON, try to parse
    if (typeof payloadContent === "string") {
      try {
        const maybe = JSON.parse(payloadContent);
        payloadContent = maybe;
      } catch {
        // Ensure jsonb compatibility by wrapping plain text
        payloadContent = { text: payloadContent };
      }
    }

    const insertData = {
      trip_id,
      user_id,
      content: payloadContent,
      summary: summary ?? null,
      model: model ?? "groq",
    };

    const { data, error } = await supabase
      .from("itineraries")
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error("itineraries insert error:", error, "payload=", insertData);
      return res.status(500).json({ error: error.message });
    }
    return res.status(201).json({ itinerary: data });
  } catch (e) {
    return res.status(500).json({ error: e?.message || String(e) });
  }
};

// GET /api/itineraries
export const getUserItineraries = async (req, res) => {
  try {
    if (!requireSupabase(res)) return;
    const user_id = getUserId(req, res);
    if (!user_id) return;

    const { data, error } = await supabase
      .from("itineraries")
      .select("*")
      .eq("user_id", user_id)
      .order("created_at", { ascending: false });

    if (error) return res.status(500).json({ error: error.message });
    return res.json({ itineraries: data || [] });
  } catch (e) {
    return res.status(500).json({ error: e?.message || String(e) });
  }
};
