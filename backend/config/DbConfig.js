import { configDotenv } from "dotenv";
import mongoose from "mongoose";

configDotenv();

export const mongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ MongoDB connected");
    } catch ( error ) {
        console.log("Error in mongoDB connection :", error);
    }
};