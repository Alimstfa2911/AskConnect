import { gql } from "@apollo/client";

export const PROFILE = gql`
  query Profile {
    profile {
      id
      name
      email
      avatar
      questions {
        id
        title
      }
      answers {
        id
        text
        question {
            title
        }
      }
      role
    }
  }
`;

export const GET_ALL_QUESTIONS = gql`
  query GetAllQuestions {
    questions {
      id
      title
      description
      author {
        id
        name
      }
      answers {
        id
      }
      votes {
        user {
          name
        }
        value
      }
       createdAt
    }
  }
`;

export const GET_QUESTION_BY_ID = gql`
  query GetQuestionById($id: ID!) {
    question(id: $id) {
      id
      title
      description
      author {
        id
        name
      }
      votes {
        user {
          id
        }
        value
      }
      answers {
        id
        text
        author {
          id
          name
        }
        question {
          id
        }
      }
    }
  }
`;

export const SEARCH_QUESTIONS = gql`
  query SearchQuestions(
    $keyword: String
    $authorId: ID
    $fromDate: String
    $toDate: String
  ) {
    searchQuestions(
      keyword: $keyword
      authorId: $authorId
      fromDate: $fromDate
      toDate: $toDate
    ) {
      id
      title
      description
      author {
        id
        name
      }
      votes {
        value
      }
      answers {
        id
      }
      createdAt
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
      email
      role
    }
  }
`;

export const GET_NOTIFICATIONS = gql`
  query {
    getNotifications {
      id
      message
      isRead
      createdAt
    }
  }
`;