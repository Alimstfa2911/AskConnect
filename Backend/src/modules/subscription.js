import { Notification } from "../models/notification.js";


export const notificationResolvers = {
  Query: {
    getNotifications: async (_, { userId }) => {
      return Notification.find({ user: userId }).sort({ createdAt: -1 });
    },
  },
  Mutation: {
    markNotificationRead: async (_, { id }) => {
      return notification.findByIdAndUpdate(id, { read: true }, { new: true });
    },
    createNotification: async (_, { userId, message }, { pubsub }) => {
      const notification = await Notification.create({ user: userId, message });
      pubsub.publish("NEW_NOTIFICATION", { newNotification: notification });
      return notification;
    },
  },
  Subscription: {
    newNotification: {
      subscribe: (_, { userId }, { pubsub }) =>
        pubsub.asyncIterableIterator(["NEW_NOTIFICATION"]),
    },
  },
};
