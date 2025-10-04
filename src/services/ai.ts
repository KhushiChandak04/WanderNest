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
