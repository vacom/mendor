import gql from "graphql-tag";

const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage(
    $authorId: ID
    $chatId: ID
    $content: String!
    $type: MessageType
    $projectId: ID
  ) {
    createMessage(
      authorId: $authorId
      chatId: $chatId
      content: $content
      type: $type
      projectId: $projectId
    ) {
      id
    }
  }
`;

const CREATE_CHAT_MUTATION = gql`
  mutation createChat(
    $name: String!
    $usersIds: [ID!]
    $authorId: ID
    $isGroup: Boolean
  ) {
    createChat(
      name: $name
      usersIds: $usersIds
      authorId: $authorId
      isGroup: $isGroup
    ) {
      id
      name
      isGroup
      users(filter: { id_not: $authorId }) {
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

export { CREATE_MESSAGE_MUTATION, CREATE_CHAT_MUTATION };
