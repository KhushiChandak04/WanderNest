import API, { IS_DEMO_API } from "./api";

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type TripContext = {
  startDate?: string;
  endDate?: string;
  destination?: string;
  notes?: string;
  currency?: string; // should be 'INR'
  budgetINR?: number;
};


export async function aiChat(messages: ChatMessage[], trip?: TripContext) {
  // Demo bypass: return canned AI response if we are in client demo mode
  if (IS_DEMO_API) {
    return {
      choices: [{ message: { role: "assistant", content: "(Demo) Here is a sample AI-generated itinerary. Please imagine your trip details here!" } }],
      demo: true
    };
  }
  const { data } = await API.post("/ai/chat", { messages, trip }, { withCredentials: false });
  return data;
}

export async function aiChatWithRetry(messages: ChatMessage[], trip?: TripContext, retries = 2, delayMs = 400) {
  let lastErr: any;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await aiChat(messages, trip);
    } catch (e: any) {
      lastErr = e;
      const isNetwork = e?.code === 'ERR_NETWORK' || !e?.response;
      if (!isNetwork || attempt === retries) break;
      // small backoff before retry
      await new Promise(res => setTimeout(res, delayMs));
    }
  }
  throw lastErr;
}
