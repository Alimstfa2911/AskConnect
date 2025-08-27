import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authCheck } from "../utils/authUtils.js";
import { roleCheck } from "../utils/roleUtils.js";
import { pubsub } from "../schema/pubsub.js";
import { Question } from "../models/questionSchema.js";
import { Answer } from "../models/answerSchema.js";

export const userMutation = {
  registerUser: async (_, args) => {
    const user = await User.findOne({ email: args.email });

    if (user) throw new Error("User already exists ");

    const hashedPassword = await bcrypt.hash(args.password, 10);

    const newUser = await User.create({
      ...args,
      password: hashedPassword,
    });
    console.log("NewUser :", newUser);
    if (!newUser) throw new Error("Failed to create user");

    const token = jwt.sign({ id: newUser._id }, "SECRET_KEY", {
      expiresIn: "7d",
    });
    console.log(token);
    return { token, user: newUser };
  },

  loginUser: async (_, { email, password }) => {
    const user = await User.findOne({ email });

    if (!user) throw new Error("No user exists");

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw new Error("Incorrect password");

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      "SECRET_KEY",
      { expiresIn: "7d" }
    );
    console.log("Token :", token);

    return {
      token,
      user,
    };
  },

  deleteUser: async (_, { id }, context) => {
    authCheck(context);
    console.log("Context:", context);
    roleCheck(context);
    return await User.findByIdAndDelete(id);
  },
};

export const questionMutation = {
  createQuestion: async (_, { title, description }, context) => {
    console.log("Create Question :");
    authCheck(context);

    const question = await Question.create({
      title,
      description,
      author: context.user.id,
    });

    await User.findByIdAndUpdate(context.user.id, {
      $push: { questions: question._id,
      }
    });

    console.log("Question :", question);

    return await question.populate("author");
  },
};

export const questionVoteMutation = {
  upvoteQuestion: async (_, { questionId }, context) => {
    authCheck(context);

    const question = await Question.findById(questionId);
    if (!question) throw new Error("Question not found");

    const existenceVote = question.votes.find(
      (v) => v.context.user.toString() === context.user.id
    );

    if (existenceVote) {
      existenceVote = 1;
    } else {
      question.votes.push({ user: context.user.id, value: 1 });
    }

    await question.save();
    return question.populate("author");
  },

  downvoteQuestion: async (_, { questionId }, context) => {
    authCheck(context);

    const question = await Question.findById(questionId);
    if (!question) throw new Error("Question not found");

    const existingVote = question.votes.find(
      (v) => v.user.toString() === context.user.id
    );

    if (existingVote) {
      existingVote.value = -1; 
    } else {
      question.votes.push({ user: context.user.id, value: -1 }); 
    }

    await question.save();
    return question.populate("author");
  },
};

export const answerMutation = {
  addAnswer: async (_, { questionId, text }, context) => {
    authCheck(context);

    const question = await Question.findById(questionId);
    if (!question) throw new Error("Question not found");

    const answer = await Answer.create({
      text,
      author: context.user.id,
      question: questionId,
    });

    await Question.findByIdAndUpdate(questionId, {
      $push: { answers: answer._id },
    });

    await User.findByIdAndUpdate(context.user.id, {
      $push: { answers: answer._id}
    })

    console.log("Answer :", answer);

    return (await answer.populate("author")).populate("question");
  },
};

export const answerVoteMutation = {
  upvoteAnswer: async (_, { answerId }, context) => {
    authCheck(context);

    const answer = await Answer.findById(answerId);
    if (!answer) throw new Error("Answer not found");

    const existingVote = answer.votes.find(
      (v) => v.context.user.toString() === context.user.id
    );

    if (existingVote) {
      existingVote.value = 1;
    } else {
      answer.votes.push({ user: context.user.id, value: 1 });
    }

    await answer.save();
    return (await answer.populate("author")).populate("question");
  },

  downvoteAnswer: async (_, { answerId }, context) => {
    authCheck(context);

    const answer = await Answer.findById(answerId);
    if (!answer) throw new Error("Answer not found");

    const existingVote = answer.votes.find(
      (v) => v.context.user.toString() === context.user.id
    );

    if (!existingVote) {
      existingVote.value = -1;
    } else {
      answer.votes.push({ user: context.user.id, value: -1 });
    }

    await answer.save();
    return (await answer.populate("author")).populate("question");
  },
};
