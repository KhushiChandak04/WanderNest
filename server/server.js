// server.js
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
// DB and auth temporarily disabled to avoid Mongo dependency
// import { connectDB, dbHealth } from "./config/db.js";
// import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/ai.js";
import "./polyfills/fetch.js";

// Ensure we load server/.env even if process is started from project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = express();
// Debug (boolean only) to ensure key is detected; does not print secrets
console.log("XAI key present:", Boolean(process.env.XAI_API_KEY || process.env.GROK_API_KEY));

// Core middleware
app.use(cors({
  origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
  credentials: true,
}{
  origin: [
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
  ],
  credentials: false,
}));
app.use(express.json());

// Health check route (no DB info for now)
app.get("/healthz", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

// Root route
app.get("/", (_req, res) => {
  res.send("WanderNest API is running…");
});

// Auth routes disabled until DB is re-enabled
// app.use("/api/auth", authRoutes);
// AI proxy routes
app.use("/api/ai", aiRoutes);

// Start server without DB (prefer 5050 to avoid conflicts with other dev services)
let desiredPort = Number(process.env.PORT) || 5050;
if (Number(process.env.PORT) === 5000) {
  console.warn("⚠️ PORT=5000 is busy in your environment. Starting on 5050 instead.");
  desiredPort = 5050;
}

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
