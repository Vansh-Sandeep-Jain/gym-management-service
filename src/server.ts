import app from "./app";
import dotenv from "dotenv";
import connectDB from "./config/db";
import mongoose from "mongoose";
import { startSlotScheduler } from "./jobs/schedular";

dotenv.config();

let stopScheduler: () => void;

connectDB()
  .then(() => {
    console.log("MongoDB connected - starting slot scheduler");
    stopScheduler = startSlotScheduler();
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`gym-management-service is running on port ${PORT}`);
});

// Graceful shutdown
const gracefulShutdown = () => {
  console.log("Shutting down gracefully...");
  
  if (stopScheduler) {
    stopScheduler();
    console.log("Slot scheduler stopped");
  }
  
  server.close(async () => {
    console.log("HTTP server closed");
    
    try {
      await mongoose.connection.close();
      console.log("MongoDB connection closed");
      process.exit(0);
    } catch (err) {
      console.error("Error closing MongoDB connection:", err);
      process.exit(1);
    }
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  gracefulShutdown();
});