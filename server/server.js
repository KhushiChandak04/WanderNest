// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB, dbHealth } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import aiRoutes from "./routes/ai.js";
import "./polyfills/fetch.js";

dotenv.config();

const app = express();

// Core middleware
app.use(cors());
app.use(express.json());

// Health check routes (available even if DB is down)
app.get("/healthz", (_req, res) => {
  res.json({
    status: "ok",
    uptime: process.uptime(),
    db: dbHealth()
  });
});

// Root route
app.get("/", (_req, res) => {
  res.send("WanderNest API is running…");
});

// Auth routes
app.use("/api/auth", authRoutes);
// AI proxy routes
app.use("/api/ai", aiRoutes);

// Start server (best-effort DB connection for demo)
const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.error("⚠️ DB connection failed, continuing for AI demo:", error.message);
  } finally {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  }
};

startServer();
