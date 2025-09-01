import { gql } from "@apollo/client";

export const NEW_NOTIFICATION = gql`
  subscription NewNotification($userId: ID!) {
    newNotification(userId: $userId) {
      id
      message
      createdAt
    }
  }
`;

