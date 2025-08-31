import { User } from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { authCheck } from "../utils/authUtils.js";
import { roleCheck } from "../utils/roleUtils.js";
import { pubsub } from "../schema/pubsub.js";
import { Question } from "../models/questionSchema.js";
import { Answer } from "../models/answerSchema.js";
import { transporter } from "../utils/mailer.js";
import dotenv from "dotenv";

dotenv.config();

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
        role: user.role,
      },
      "SECRET_KEY",
      { expiresIn: "7d" }
    );

    return {
      token,
      user,
    };
  },

  deleteUser: async (_, { id }, context) => {
    authCheck(context);
    roleCheck(context);
    await User.findByIdAndDelete(id);
    return { message: "User deleted successfully" };
  },

  changeUserRole: async (_, { id, role }, context) => {
    authCheck(context);
    roleCheck(context);

    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    user.role = role;
    await user.save();

    return { message: `User role updated to ${role} successfully` };
  },
};

export const questionMutation = {
  createQuestion: async (_, { title, description }, context) => {
 
    authCheck(context);

    const question = await Question.create({
      title,
      description,
      author: context.user.id,
    });

    await User.findByIdAndUpdate(context.user.id, {
      $push: { questions: question._id },
    });

    const admins = await User.find({ role: "ADMIN" }); // assuming your User schema has a role field

    admins.forEach((admin) => {
      const notification = {
        id: new Date().getTime().toString(),
        userId: admin._id.toString(),
        message: `New question posted: ${title}`,
        createdAt: new Date().toISOString(),
      };

      pubsub.publish(`NOTIFICATION_${admin._id}`, {
        notificationAdded: notification,
      });
    });

    return await question.populate("author");
  },

  deleteQuestion: async (_, { id }, context) => {
    if (!context.user || context.user.role !== "admin") {
      throw new Error("Not authorized");
    }

    const question = await Question.findById(id);
    if (!question) {
      throw new Error("Question not found");
    }

    const answerId = question.answers;

    await Answer.deleteMany({ question: id });

    await Question.findByIdAndDelete(id);

    return question;
  },
};

export const questionVoteMutation = {
  upvoteQuestion: async (_, { questionId }, context) => {
    authCheck(context);

    const question = await Question.findById(questionId);
    if (!question) throw new Error("Question not found");

    const existingVote = question.votes.find(
      (v) => v.user.toString() === context.user.id
    );

    if (existingVote) {
      if (existingVote.value === 1) {
        question.votes = question.votes.filter(
          (v) => v.user.toString() !== context.user.id
        );
      } else {
        existingVote.value = 1;
      }
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
      if (existingVote.value === -1) {
        question.votes = question.votes.filter(
          (v) => v.user.toString() !== context.user.id
        );
      } else {
        existingVote.value = -1;
      }
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
      $push: { answers: answer._id },
    });

    const admins = await User.find({ role: "admin" });
    admins.forEach((admin) => {
      pubsub.publish(`NOTIFICATION_${admin.id}`, {
        notificationAdded: {
          id: new Date().getTime().toString(),
          userId: admin.id,
          message: `${context.user.name} added a new answer to "${question.title}"`,
          createdAt: new Date().toISOString(),
        },
      });
    });

    console.log("Answer :", answer);
    return await answer.populate([
      "author",
      "question",
      { path: "votes.user" },
    ]);
  },
};

export const answerVoteMutation = {
  upvoteAnswer: async (_, { answerId }, context) => {
    authCheck(context);

    const answer = await Answer.findById(answerId);
    if (!answer) throw new Error("Answer not found");

    const existingVote = answer.votes.find(
      (v) => v.user.toString() === context.user.id
    );

    if (existingVote) {
      if (existingVote.value === 1) {
        answer.votes = answer.votes.filter(
          (v) => v.user.toString() !== context.user.id
        );
      } else {
        existingVote.value = 1;
      }
    } else {
      answer.votes.push({ user: context.user.id, value: 1 });
    }

    await answer.save();
    return await answer.populate([
      "author",
      "question",
      { path: "votes.user" },
    ]);
  },

  downvoteAnswer: async (_, { answerId }, context) => {
    authCheck(context);

    const answer = await Answer.findById(answerId);
    if (!answer) throw new Error("Answer not found");

    const existingVote = answer.votes.find(
      (v) => v.user.toString() === context.user.id
    );

    if (existingVote) {
      if (existingVote.value === -1) {
        answer.votes = answer.votes.filter(
          (v) => v.user.toString() !== context.user.id
        );
      } else {
        existingVote.value = -1;
      }
    } else {
      answer.votes.push({ user: context.user.id, value: -1 });
    }

    await answer.save();
    return await answer.populate([
      "author",
      "question",
      { path: "votes.user" },
    ]);
  },
};

export const mailMutation = {
  forgotPassword: async (_, { email }, context) => {
    const user = await User.findOne({ email });

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      "SECRET_KEY",
      { expiresIn: "15m" }
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset_password/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password. 
               This link is valid for 15 minutes.</p>`,
    });

    return { message: "Password reset email sent" };
  },

  resetPassword: async (_, { token, newPassword }, context) => {
    try {
      const decoded = jwt.verify(token, "SECRET_KEY");
      const user = await User.findById(decoded.id);
      if (!user) throw new Error("Invalid token");

      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      return { message: "Password updated successfully" };
    } catch (err) {
      throw new Error("Invalid or expired token");
    }
  },
};

export const adminMutation = {
  updateUserRole: async (_, { userId, role }, context) => {
    if (!context.user || context.user.role !== "admin") {
      throw new Error("Not authorized");
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    return updatedUser;
  },
};
