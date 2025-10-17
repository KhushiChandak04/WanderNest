import axios, { AxiosHeaders } from "axios";


// Decide if we are in demo (stub) mode or real backend mode
const isVercelHost = typeof window !== 'undefined' && /\.vercel\.app$/.test(window.location.hostname);
const VITE_API_URL = (import.meta as any).env?.VITE_API_URL as string | undefined;
const VITE_USE_BACKEND = (import.meta as any).env?.VITE_USE_BACKEND as string | undefined;
const VITE_DEMO_MODE = (import.meta as any).env?.VITE_DEMO_MODE as string | undefined;

// Runtime overrides from localStorage (so you can enable Live AI without redeploying)
let LS_API_URL: string | undefined;
let LS_USE_BACKEND: string | undefined;
try {
  if (typeof window !== 'undefined') {
    LS_API_URL = localStorage.getItem('wandernest_api_url') || undefined;
    LS_USE_BACKEND = localStorage.getItem('wandernest_use_backend') || undefined;
  }
} catch {}

const useBackend = (VITE_USE_BACKEND === 'true') || (LS_USE_BACKEND === 'true');
const API_BASE = (LS_API_URL || VITE_API_URL);

// Demo if: on Vercel AND not explicitly disabled AND no runtime backend override AND not forced to use backend
export const IS_DEMO_API = Boolean(
  isVercelHost &&
  VITE_DEMO_MODE !== 'false' &&
  !(useBackend && API_BASE)
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
    // Prefer runtime override, else env URL, else relative /api
    baseURL: API_BASE ? `${API_BASE.replace(/\/$/, '')}/api` : "/api",
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
