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
  mutation Register($name: String!, $email: String!, $password: String!, $avatar: String) {
    registerUser(name: $name, email: $email, password: $password, avatar: $avatar) {
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
      votes {
        value
      }
    }
  }
`;

export const DOWNVOTE_ANSWER = gql`
  mutation downvoteAnswer($answerId: ID!) {
    downvoteAnswer(answerId: $answerId) {
      id
      votes {
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
