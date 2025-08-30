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
        name
      }
      votes {
        user {
          name
        }
        value
      }
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
