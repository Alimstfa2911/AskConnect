// updateVotes.js
import mongoose from "mongoose";
import { Answer } from "./src/models/answerSchema.js"; // make sure path is correct

const run = async () => {
  await mongoose.connect("mongodb://localhost:27017/your-db-name"); // replace with your DB

  // Update all answers where votes field does not exist
  const result = await Answer.updateMany(
    { votes: { $exists: false } },
    { $set: { votes: [] } }
  );

  console.log("Updated answers:", result.modifiedCount);
  await mongoose.disconnect();
};

run().catch(console.error);
