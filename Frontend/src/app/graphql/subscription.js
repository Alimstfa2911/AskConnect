import { gql } from "@apollo/client";

export const NOTIFICATION_SUBSCRIPTION = gql`
  subscription OnNotification($userId: ID!) {
    notificationAdded(userId: $userId) {
      id
      message
      createdAt
    }
  }
`;
