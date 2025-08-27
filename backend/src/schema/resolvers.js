import {
  answerMutationModule,
  answerQueryModule,
  answerVoteMutationModule,
  questionMutationModule,
  questionQueryModule,
  questionVoteMutationModule,
  userMutationModule,
  userQueryModule

} from "../modules/index.js";

import { questionMutation } from "../modules/mutation.js";

// 4. Define Resolvers → interact with DB
export const resolvers = {
  Query: {
    ...userQueryModule.Query,
    ...questionQueryModule.Query,
    ...answerQueryModule.Query
  },

  Mutation: {
    ...userMutationModule.Mutation,
    ...questionMutationModule.Mutation,
    ...questionVoteMutationModule.Mutation,
    ...answerMutationModule.Mutation,
    ...answerVoteMutationModule.Mutation
  },

};
