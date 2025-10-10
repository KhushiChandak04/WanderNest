import axios, { AxiosHeaders } from "axios";


// Decide if we are in demo (stub) mode or real backend mode
const isVercelHost = typeof window !== 'undefined' && /\.vercel\.app$/.test(window.location.hostname);
const VITE_API_URL = (import.meta as any).env?.VITE_API_URL as string | undefined;
const VITE_USE_BACKEND = (import.meta as any).env?.VITE_USE_BACKEND as string | undefined;
const VITE_DEMO_MODE = (import.meta as any).env?.VITE_DEMO_MODE as string | undefined;

// Demo if: on Vercel AND not explicitly disabled AND not forced to use backend AND no API URL configured
export const IS_DEMO_API = Boolean(
  isVercelHost &&
  VITE_USE_BACKEND !== 'true' &&
  VITE_DEMO_MODE !== 'false' &&
  !VITE_API_URL
);

let API: any;
if (IS_DEMO_API) {
  // Stub API: resolve with empty or demo data to keep UI functional
  API = {
    get: async (_url: string) => ({ data: {} }),
    post: async (_url: string, _body?: any) => ({ data: {} }),
    put: async (_url: string, _body?: any) => ({ data: {} }),
    delete: async (_url: string) => ({ data: {} }),
  };
} else {
  API = axios.create({
    // If VITE_API_URL is set, we assume the backend is deployed at that host
    baseURL: VITE_API_URL ? `${VITE_API_URL.replace(/\/$/, '')}/api` : "/api",
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
