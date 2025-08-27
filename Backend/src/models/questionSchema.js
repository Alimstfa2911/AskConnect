import mongoose, { Schema } from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    votes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        value: {
          type: Number,
          enum: [1, -1],
          default: 0
        },
      },
    ],
    answers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Answer",
      },
    ],
  },
  { timestamps: true }
);

export const Question = mongoose.model("Question", QuestionSchema);
