// server.js
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { connectDB, dbHealth } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import aiRoutes from "./routes/ai.js";
import "./polyfills/fetch.js";

// Ensure we load server/.env even if process is started from project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
// Debug (boolean only) to ensure key is detected; does not print secrets
console.log("XAI key present:", Boolean(process.env.XAI_API_KEY || process.env.GROK_API_KEY));

// Global crash diagnostics
process.on("uncaughtException", (err) => {
  console.error("uncaughtException:", err?.stack || err);
});
process.on("unhandledRejection", (reason) => {
  console.error("unhandledRejection:", reason);
});
process.on("SIGTERM", () => {
  console.warn("Received SIGTERM, shutting down gracefully...");
  process.exit(0);
});
process.on("SIGINT", () => {
  console.warn("Received SIGINT, shutting down gracefully...");
  process.exit(0);
});
process.on("exit", (code) => {
  console.warn("Process exiting with code:", code);
});

// Core middleware
app.use(cors({
  origin: [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
  ],
  credentials: true,
}));
app.use(express.json());

// Health check route
app.get("/healthz", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime(), db: dbHealth() });
});

// Root route
app.get("/", (_req, res) => {
  res.send("WanderNest API is running…");
});

// Auth routes
app.use("/api/auth", authRoutes);
// Trip & Itinerary routes
app.use("/api", tripRoutes);
// AI proxy routes
app.use("/api/ai", aiRoutes);

// Start server after Supabase init; default 5000 to match frontend config
const startServer = async () => {
  try {
    await connectDB();
    const PORT = Number(process.env.PORT) || 5000;
    const serverInstance = app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
    serverInstance.on("error", (err) => {
      if (err && (err.code === "EADDRINUSE" || err.code === "EACCES")) {
        const fallback = PORT + 1;
        console.warn(`⚠️ Port ${PORT} unavailable (${err.code}). Retrying on ${fallback}…`);
        app.listen(fallback, () => {
          console.log(`🚀 Server running on http://localhost:${fallback}`);
        });
      } else {
        console.error("Server failed to start:", err);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error?.message || error);
    process.exit(1);
  }
};

startServer();
