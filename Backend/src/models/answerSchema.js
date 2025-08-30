import mongoose, { Schema } from "mongoose";

const AnswerSchema = new Schema(
  {
    text: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
    votes: {
      type: [
        {
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          value: { type: Number, enum: [1, -1] }, 
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

export const Answer = mongoose.model("Answer", AnswerSchema);
