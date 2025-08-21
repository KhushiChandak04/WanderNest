// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB, dbHealth } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import visaRoutes from "./routes/visa.js"; // <-- our new Visa API

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
    db: dbHealth(),
  });
});

// Root route
app.get("/", (_req, res) => {
  res.send("WanderNest API is running…");
});

// Auth routes
app.use("/api/auth", authRoutes);

// Visa routes
app.use("/api/visa", visaRoutes);

// Example placeholder routes for FoodFinder and PlanTrip (optional, can add later)
// app.use("/api/food", foodRoutes);
// app.use("/api/trips", tripRoutes);

// Start server only after DB connection
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error.message);
    process.exit(1); // stop only if DB connection is critical
  }
};

startServer();
