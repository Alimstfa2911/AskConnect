import { withFilter } from "graphql-subscriptions";
import { Notification } from "../models/notification.js";

export const notificationResolvers = {
  Query: {
    getNotifications: async (_, { userId }) => {
      return Notification.find({ user: userId }).sort({ createdAt: -1 });
    },
  },
  Subscription: {
    newNotification: {
      subscribe: withFilter(
        (_, __, { pubsub }) =>
          pubsub.asyncIterableIterator(["NEW_NOTIFICATION"]),
        (payload, variables) => {
          return payload.newNotification.user.toString() === variables.userId;
        }
      ),
    },
  },
};
