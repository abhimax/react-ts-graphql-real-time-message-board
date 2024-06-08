import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      id
      content
    }
  }
`;

export const ADD_MESSAGE = gql`
  mutation AddMessage($content: String!) {
    addMessage(content: $content) {
      id
      content
    }
  }
`;

export const UPDATE_MESSAGE = gql`
  mutation UpdateMessage($id: ID!, $content: String!) {
    updateMessage(id: $id, content: $content) {
      id
      content
    }
  }
`;

export const DELETE_MESSAGE = gql`
  mutation DeleteMessage($id: ID!) {
    deleteMessage(id: $id) {
      id
    }
  }
`;

export const MESSAGE_ADDED = gql`
  subscription OnMessageAdded {
    messageAdded {
      id
      content
    }
  }
`;

export const MESSAGE_UPDATED = gql`
  subscription OnMessageUpdated {
    messageUpdated {
      id
      content
    }
  }
`;

export const MESSAGE_DELETED = gql`
  subscription OnMessageDeleted {
    messageDeleted {
      id
    }
  }
`;
