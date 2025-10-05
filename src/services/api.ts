import axios, { AxiosHeaders } from "axios";

const API = axios.create({
  baseURL: "/api", // use Vite dev proxy
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

export default API;
