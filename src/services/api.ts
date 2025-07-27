import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend base URL
  withCredentials: true, // if you're using cookies or auth tokens
});

export default API;
