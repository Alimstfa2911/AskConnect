import {
  answerMutation,
  answerVoteMutation,
  mailMutation,
  questionMutation,
  questionVoteMutation,
  userMutation,
} from "./mutation.js";
import { answerQuery, questionQuery, userQuery } from "./query.js";
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

// export const userSubscriptionModule = {
//     Subscription : {
//         ...userSubscription
//     }
// }

export const mailMutationModule = {
  Mutation: {
    ...mailMutation,
  },
};
