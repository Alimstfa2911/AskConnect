import { Query } from "mongoose";
import {
  answerMutation,
  answerVoteMutation,
  mailMutation,
  questionMutation,
  questionVoteMutation,
  userMutation,
  adminMutation,
} from "./mutation.js";
import { answerQuery, questionQuery, userQuery } from "./query.js";
import { notificationResolvers } from "./subscription.js";
// import { userSubscription } from "./subscription.js";

export const userQueryModule = {
  Query: {
    ...userQuery,
  },
};

export const userMutationModule = {
  Mutation: {
    ...userMutation,
  },
};

export const questionQueryModule = {
  Query: {
    ...questionQuery,
  },
};

export const questionMutationModule = {
  Mutation: {
    ...questionMutation,
  },
};

export const questionVoteMutationModule = {
  Mutation: {
    ...questionVoteMutation,
  },
};

export const answerQueryModule = {
  Query: {
    ...answerQuery,
  },
};

export const answerMutationModule = {
  Mutation: {
    ...answerMutation,
  },
};

export const answerVoteMutationModule = {
  Mutation: {
    ...answerVoteMutation,
  },
};

export const mailMutationModule = {
  Mutation: {
    ...mailMutation,
  },
};

export const adminMutationModule = {
  Mutation: {
    ...adminMutation,
  },
};

export const notificationModule = {
  Query: {
    ...notificationResolvers.Query,
  },
  Mutation: {
    ...notificationResolvers.Mutation,
  },
  Subscription: {
    ...notificationResolvers.Subscription,
  },
};
