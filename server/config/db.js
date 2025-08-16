// config/db.js
import mongoose from "mongoose";

let isConnected = false;

// Connect to MongoDB
export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

// DB Health Check
export const dbHealth = () => {
  const state = mongoose.connection.readyState; // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const states = ["Disconnected", "Connected", "Connecting", "Disconnecting"];
  return { status: states[state] || "Unknown" }; // ✅ inside a function now
};
