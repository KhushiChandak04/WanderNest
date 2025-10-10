import axios, { AxiosHeaders } from "axios";


// Demo bypass: stub API for Vercel or VITE_BYPASS_AUTH
const isVercelHost = typeof window !== 'undefined' && /\.vercel\.app$/.test(window.location.hostname);
const bypass = (import.meta as any).env?.VITE_BYPASS_AUTH === 'true' || isVercelHost;

let API: any;
if (bypass) {
  // Stub API: always resolve with empty or demo data
  API = {
    get: async (url: string) => ({ data: {} }),
    post: async (url: string, body?: any) => ({ data: {} }),
    put: async (url: string, body?: any) => ({ data: {} }),
    delete: async (url: string) => ({ data: {} }),
  };
} else {
  API = axios.create({
    baseURL: (import.meta as any).env?.VITE_API_URL ? `${(import.meta as any).env.VITE_API_URL}/api` : "/api",
    withCredentials: false,
  });
  API.interceptors.request.use((config: any) => {
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
  API.interceptors.request.use((config: any) => {
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
}

export default API;
