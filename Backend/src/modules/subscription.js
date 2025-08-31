import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();

export const notificationResolvers = {
  Subscription: {
    notificationAdded: {
      subscribe: (_, { userId }) => pubsub.asyncIterator(`NOTIFICATION_${userId}`)
    }
  },
  Mutation: {
    createNotification: async (_, { userId, message }) => {
      const notification = {
        id: new Date().getTime().toString(),
        userId,
        message,
        createdAt: new Date().toISOString()
      };
      // save in DB if required
      pubsub.publish(`NOTIFICATION_${userId}`, { notificationAdded: notification });
      return notification;
    }
  }
};
