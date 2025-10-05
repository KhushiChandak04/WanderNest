import axios, { AxiosHeaders } from "axios";

const API = axios.create({
  // Prefer absolute backend URL if provided via env; fallback to Vite proxy
  baseURL: (import.meta as any).env?.VITE_API_URL ? `${(import.meta as any).env.VITE_API_URL}/api` : "/api",
  withCredentials: false,
});

// Attach Authorization header from localStorage token if present
API.interceptors.request.use((config) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('wandernest_token') : null;
    if (token) {
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }
      (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
    }
  } catch {}
  return config;
});

// Attach Authorization header from localStorage for protected routes
API.interceptors.request.use((config) => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("wandernest_token") : null;
    if (token) {
      const headers: Record<string, string> = (config.headers as any)?.toJSON ? (config.headers as any).toJSON() : { ...(config.headers as any) };
      if (!headers["Authorization"]) headers["Authorization"] = `Bearer ${token}`;
      config.headers = headers as any;
    }
  } catch {}
  return config;
});

export default API;
