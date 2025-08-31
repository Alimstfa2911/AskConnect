import mongoose from "mongoose";
import { Answer } from "./src/models/answerSchema.js"; 

const run = async () => {
  await mongoose.connect("mongodb://localhost:27017/your-db-name"); 

  const result = await Answer.updateMany(
    { votes: { $exists: false } },
    { $set: { votes: [] } }
  );

  await mongoose.disconnect();
};

run().catch(console.error);
