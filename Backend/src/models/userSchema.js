import mongoose, { Schema } from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    avatar : { type: String, default: ""},
    role: { type: String, enum: ["user", "admin"], default: "user" },
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    answers: [{ type: Schema.Types.ObjectId, ref: "Answer" }],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
