import gql from "graphql-tag";

const ALL_CHATS_QUERY = gql`
  query allChats {
    allChats(filter: { users_some: { id: "cjbjhh0f9lbfz01142sd6tvuv" } }) {
      id
      name
      messages(last: 1) {
        content
        createdAt
      }
      users {
        id
        avatar
        name
      }
    }
  }
`;

const ALL_MESSAGES_QUERY = gql`
  query allMessages($id: ID) {
    allMessages(filter: { chat: { id: $id } }) {
      id
      content
      createdAt
      author {
        id
        avatar
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
    }
  }
`;

export { ALL_CHATS_QUERY, ALL_MESSAGES_QUERY };
