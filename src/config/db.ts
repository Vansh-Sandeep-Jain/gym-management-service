import mongoose from "mongoose";
import { MONGODB_DB_NAME, MONGODB_URI } from "./constants";

let isConnected = false;

const connectDB = async (): Promise<void> => {
  if (isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI!, {dbName: MONGODB_DB_NAME!});
    isConnected = true;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
