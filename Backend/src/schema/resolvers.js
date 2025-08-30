import {
  answerMutationModule,
  answerQueryModule,
  answerVoteMutationModule,
  questionMutationModule,
  questionQueryModule,
  questionVoteMutationModule,
  userMutationModule,
  userQueryModule,
} from "../modules/index.js";

import { questionMutation } from "../modules/mutation.js";

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
