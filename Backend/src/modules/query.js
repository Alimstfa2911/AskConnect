import { Question } from "../models/questionSchema.js";
import { User } from "../models/userSchema.js";
import { authCheck } from "../utils/authUtils.js";

export const userQuery = {
  users: async (_, __, context) => {
    authCheck(context);
    const users = await User.find();
    return users;
  },

  getAllUsers: async (_, __, context) => {
    if (!context.user || context.user.role !== "admin") {
      return new Error("Not authorized");
    }
    return await User.find();
  },

  profile: async (_, __, context) => {
    console.log("Profile in query");
    console.log("Context in query profile :", context);
    authCheck(context);
    console.log("After authChcek");
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
    const questions = await Question.find()
      .populate("author")
      .populate("votes.user");
    return questions;
  },

  questionsPagination: async (_, { limit, offset }) => {
    const totalCount = await Question.countDocuments();

    const questions = await Question.find()
      .populate("author")
      .populate("votes.user")
      .sort({ createdAt: -1 }) 
      .skip(offset) 
      .limit(limit); 

    return {
      items: questions,
      totalCount,
    };
  },

  question: async (_, { id }) => {
    const question = await Question.findById(id)
      .populate("author")
      .populate({
        path: "answers",
        populate: { path: "author" },
      })
      .populate({
        path: "votes.user",
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
