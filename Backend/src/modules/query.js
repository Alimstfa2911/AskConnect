import { Question } from "../models/questionSchema.js";
import { User } from "../models/userSchema.js";
import { authCheck } from "../utils/authUtils.js";

export const userQuery = {
  users: async (_, __, context) => {
    console.log("Before authCheck");
    authCheck(context);
    const users = await User.find();
    return users;
  },

  profile: async (_, __, context) => {
    authCheck(context);
    return User.findById(context.user.id)
      .populate("questions")
      .populate({
        path: "answers",
        populate: { path: "question" },
      });
  },
};


export const questionQuery = {
  searchQuestions: async (_, { keyword, authorId, fromDate, toDate }) => {
    const filters = {};

    if (keyword) {
      const regex = new RegExp(keyword, "i");
      filters.$or = [{ title: regex }, { description: regex }];
    }

    if (authorId) filters.author = authorId;
    if (fromDate || toDate) {
      filters.createdAt = {};
      if (fromDate) filters.createdAt.$gte = new Date(fromDate);
      if (toDate) filters.createdAt.$lte = new Date(toDate);
    }
    return Question.find(filters).populate("author").populate("answers");
  },

  questions: async () => {
    console.log("Questions:");
    const questions = await Question.find()
      .populate("author")
      .populate("votes.user");
    console.log("Questions :", questions);
    return questions;
  },

  question: async (_, { id }) => {
    console.log("Typeof id:", typeof id);

    // Populate author, votes.user, answers.author
    const question = await Question.findById(id)
      .populate("author")
      .populate({
        path: "answers",
        populate: { path: "author" }, // populate each answer's author
      })
      .populate({
        path: "votes.user", // populate users in votes
      });

    if (!question) return null;

    return {
      id: question._id.toString(),
      title: question.title,
      description: question.description,
      createdAt: question.createdAt.toISOString(),
      updatedAt: question.updatedAt.toISOString(),
      author: question.author
        ? {
            id: question.author._id.toString(),
            name: question.author.name,
            email: question.author.email,
          }
        : null,
      votes: question.votes.map((v) => ({
        value: v.value,
        user: v.user
          ? {
              id: v.user._id.toString(),
              name: v.user.name,
            }
          : null,
      })),
      answers: question.answers
        ? question.answers.map((a) => ({
            id: a._id.toString(),
            text: a.text || "",
            createdAt: a.createdAt.toISOString(),
            updatedAt: a.updatedAt.toISOString(),
            author: a.author
              ? {
                  id: a.author._id.toString(),
                  name: a.author.name,
                  email: a.author.email || null,
                }
              : { name: "Anonymous" },
            question: {
              id: question._id.toString(),
              title: question.title,
            },
            votes: a.votes
              ? a.votes.map((v) => ({
                  value: v.value,
                  user: v.user
                    ? { id: v.user._id.toString(), name: v.user.name }
                    : null,
                }))
              : [],
          }))
        : [],
    };
  },
};

export const answerQuery = {
  answers: async (parent) => {
    return Answer.find({ question: parent.id });
  },
};
