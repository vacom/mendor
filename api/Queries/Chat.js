import gql from "graphql-tag";
import { USER_ITEMS_FRAGMENT } from "../Fragments/User";

const ALL_CHATS_QUERY = gql`
  query allChats($id: ID) {
    allChats(filter: { users_some: { id: $id } }) {
      id
      name
      messages(last: 1) {
        content
        createdAt
        type
        author {
          id
          name
        }
      }
      users(filter: { id_not: $id }) {
        id
        avatar {
          id
          secret
          name
        }
        name
      }
    }
  }
`;

const ALL_MESSAGES_QUERY = gql`
  query allMessages($id: ID) {
    allMessages(filter: { chat: { id: $id } }, last: 15) {
      id
      content
      createdAt
      type
      project {
        id
        title
        description
        technologies {
          id
          name
        }
      }
      author {
        id
        avatar {
          id
          secret
          name
        }
      }
    }
  }
`;

// Collect all the individual chats of two specific users
const ALL_INDIVIDUAL_CHATS_OF_USERS = gql`
  query allIndividualChatsOfUsers($id1: ID, $id2: ID) {
    allChats(
      filter: {
        AND: [
          { isGroup: false }
          { users_some: { id: $id1 } }
          { users_some: { id: $id2 } }
        ]
      }
    ) {
      id
      name
      users(filter: { id_not: $id1 }) {
        id
        name
        avatar {
          id
          secret
          name
        }
      }
    }
  }
`;

const SEARCH_CHAT_QUERY = gql`
  query SearchChat($id: ID, $query: String!) {
    allChats(
      filter: {
        AND: [
          { users_some: { name_contains: $query } }
          { users_some: { id: $id } }
        ]
      }
    ) {
      id
      name
      messages(last: 1) {
        content
        createdAt
        type
        author {
          id
          name
        }
      }
      users(filter: { id_not: $id }) {
        id
        avatar {
          id
          secret
          name
        }
        name
      }
    }
  }
`;

const SEARCH_CONTACTS_TO_ADD = gql`
  query SearchContacts($id_user: ID, $query: String!, $id_chat: ID) {
    allContacts(
      filter: {
        AND: [
          {
            contactID: { name_contains: $query }
            contactID: { chats_none: { id: $id_chat } }
          }
          { user: { id: $id_user } }
        ]
      }
    ) {
      contactID {
        ...userItems
      }
    }
  }
  ${USER_ITEMS_FRAGMENT}
`;
export {
  ALL_CHATS_QUERY,
  ALL_MESSAGES_QUERY,
  ALL_INDIVIDUAL_CHATS_OF_USERS,
  SEARCH_CHAT_QUERY,
  SEARCH_CONTACTS_TO_ADD
};
