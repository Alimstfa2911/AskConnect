import {
  adminMutationModule,
  answerMutationModule,
  answerQueryModule,
  answerVoteMutationModule,
  mailMutationModule,
  notificationModule,
  questionMutationModule,
  questionQueryModule,
  questionVoteMutationModule,
  userMutationModule,
  userQueryModule,
} from "../modules/index.js";

import { adminMutation, questionMutation } from "../modules/mutation.js";

// 4. Define Resolvers → interact with DB
export const resolvers = {
  Query: {
    ...userQueryModule.Query,
    ...questionQueryModule.Query,
    ...answerQueryModule.Query,
  },

  Mutation: {
    ...userMutationModule.Mutation,
    ...questionMutationModule.Mutation,
    ...questionVoteMutationModule.Mutation,
    ...answerMutationModule.Mutation,
    ...answerVoteMutationModule.Mutation,
    ...mailMutationModule.Mutation,
    ...adminMutationModule.Mutation,
    ...notificationModule.Mutation,
  },
  Subscription: {
    ...notificationModule.Subscription,
  },
  User: {
    id: (parent) => parent?._id?.toString() || parent?.id || null,
  },
  Answer: {
    id: (parent) => parent?._id?.toString() || parent?.id || null,
  },
  Question: {
    id: (parent) => parent?._id?.toString() || parent?.id || null,
  },
};
