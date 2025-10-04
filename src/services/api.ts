import axios from "axios";

const API = axios.create({
  baseURL: "/api", // use Vite dev proxy
  withCredentials: false,
});

export default API;
