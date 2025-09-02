import { Notification } from "../models/notification.js";

export const notificationResolvers = {
  Query: {
    getNotifications: async (_, { userId }) => {
      return Notification.find({ user: userId }).sort({ createdAt: -1 });
    },
  },
  Subscription: {
    newNotification: {
      subscribe: (_, { userId }, { pubsub }) =>
        pubsub.asyncIterableIterator(["NEW_NOTIFICATION"]),
    },
  },
};
