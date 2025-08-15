// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB, dbHealth } from "./config/db.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
await connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check routes
app.get("/healthz", (_req, res) => {
  res.json({ status: "ok", uptime: process.uptime() });
});

app.get("/dbping", async (_req, res) => {
  const result = await dbHealth();
  if (result.ok) {
    return res.json({ mongo: "ok" });
  }
  return res.status(500).json({ mongo: "down", error: result.error });
});

// Sample API Route
app.get("/", (_req, res) => {
  res.send("WanderNest API is running…");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
