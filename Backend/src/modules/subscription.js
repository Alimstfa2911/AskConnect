import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();

export const notificationResolvers = {
  Subscription: {
    notificationAdded: {
      subscribe: (_, { userId }) => {
        console.log("Subscribing to notifications for userId:", userId);
        const iterator = pubsub.asyncIterator(`NOTIFICATION_${userId}`);
        console.log("AsyncIterator created:", iterator);
        return iterator;
      },
    },
  },
  Mutation: {
    createNotification: async (_, { userId, message }) => {
      const notification = {
        id: new Date().getTime().toString(),
        userId,
        message,
        createdAt: new Date().toISOString(),
      };
      console.log("Notification created", notification);
      pubsub.publish(`NOTIFICATION_${userId}`, {
        notificationAdded: notification,
      });
      return notification;
    },
  },
};
