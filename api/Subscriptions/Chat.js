import gql from "graphql-tag";

const ALL_CHATS_SUBSCRIPTION = gql`
  subscription AllChats($id: ID) {
    Chat(
      filter: {
        mutation_in: [CREATED, UPDATED, DELETED]
        node: { users_some: { id: $id } }
      }
    ) {
      node {
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
  }
`;

const ALL_MESSAGES_SUBSCRIPTION = gql`
  subscription Messages($id: ID) {
    Message(
      filter: {
        mutation_in: [CREATED, UPDATED, DELETED]
        node: { chat: { id: $id } }
      }
    ) {
      node {
        id
        content
        createdAt
        author {
          id
          avatar
        }
      }
    }
  }
`;

export { ALL_CHATS_SUBSCRIPTION, ALL_MESSAGES_SUBSCRIPTION };
