import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
  // Run on localhost:8080 as requested
  host: "localhost",
  port: 8080,
    strictPort: true,
    proxy: {
      "/api": {
        target: "http://localhost:5050",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));