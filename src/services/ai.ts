import API from "./api";

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
