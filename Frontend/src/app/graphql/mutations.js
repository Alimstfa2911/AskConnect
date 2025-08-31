import { gql } from "@apollo/client";

export const ADD_ANSWER = gql`
  mutation AddAnswer($questionId: ID!, $text: String!) {
    addAnswer(questionId: $questionId, text: $text) {
      id
      text
      author {
        name
      }
      votes {
        value
      }
    }
  }
`;

export const REGISTER = gql`
  mutation Register(
    $name: String!
    $email: String!
    $password: String!
    $avatar: String
  ) {
    registerUser(
      name: $name
      email: $email
      password: $password
      avatar: $avatar
    ) {
      token
      user {
        id
        name
        email
        avatar
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

export const UPVOTE_QUESTION = gql`
  mutation upvoteQuestion($questionId: ID!) {
    upvoteQuestion(questionId: $questionId) {
      id
      votes {
        value
      }
    }
  }
`;

export const DOWNVOTE_QUESTION = gql`
  mutation downvoteQuestion($questionId: ID!) {
    downvoteQuestion(questionId: $questionId) {
      id
      votes {
        value
      }
    }
  }
`;

export const UPVOTE_ANSWER = gql`
  mutation upvoteAnswer($answerId: ID!) {
    upvoteAnswer(answerId: $answerId) {
      id
      text
      author {
        id
        name
      }
      question {
        id
      }
      votes {
        user {
          id
        }
        value
      }
    }
  }
`;

export const DOWNVOTE_ANSWER = gql`
  mutation downvoteAnswer($answerId: ID!) {
    downvoteAnswer(answerId: $answerId) {
      id
      text
      author {
        id
        name
      }
      question {
        id
      }
      votes {
        user {
          id
        }
        value
      }
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation CreateQuestion($title: String!, $description: String!) {
    createQuestion(title: $title, description: $description) {
      id
      title
      description
      author {
        name
      }
      votes {
        value
      }
      createdAt
      answers {
        id
        text
        author {
          name
        }
      }
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword) {
      message
    }
  }
`;

export const UPDATE_USER_ROLE = gql`
  mutation UpdateUserRole($userId: ID!, $role: String!) {
    updateUserRole(userId: $userId, role: $role) {
      id
      name
      email
      role
    }
  }
`;

export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($id: ID!) {
    deleteQuestion(id: $id) {
      id
    }
  }
`;

export const CHANGE_USER_ROLE = gql`
  mutation ChangeUserRole($id: ID!, $role: String!) {
    changeUserRole(id: $id, role: $role) {
      id
      name
      email
      role
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      message
    }
  }
`;
