// server.js
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import { connectDB, dbHealth } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/ai.js";
import "./polyfills/fetch.js";

// Ensure we load server/.env, and prefer server/.env.local for local overrides (both gitignored)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env.local") });
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
// Debug (boolean only) to ensure optional keys are detected; does not print secrets
console.log("Groq key present:", Boolean(process.env.GROQ_API_KEY || process.env.GROQ_TOKEN || process.env.GROQ_API_KEY_FILE));

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

// Auth routes (Supabase-backed)
app.use("/api/auth", authRoutes);
// AI proxy routes
app.use("/api/ai", aiRoutes);

// Start server on 5002 by default (aligns with Vite proxy), with fallback on conflict
let desiredPort = Number(process.env.PORT) || 5002;

// Initialize Supabase (non-blocking)
try { connectDB(); } catch {}

const serverInstance = app.listen(desiredPort, () => {
  console.log(`🚀 Server running on http://localhost:${desiredPort}`);
});

serverInstance.on('error', (err) => {
  if (err && (err.code === 'EADDRINUSE' || err.code === 'EACCES')) {
    const fallback = desiredPort + 1;
    console.warn(`⚠️ Port ${desiredPort} unavailable (${err.code}). Retrying on ${fallback}…`);
    app.listen(fallback, () => {
      console.log(`🚀 Server running on http://localhost:${fallback}`);
    });
  } else {
    console.error('Server failed to start:', err);
    process.exit(1);
  }
});
