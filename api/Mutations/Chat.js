import gql from "graphql-tag";

const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($authorId: ID, $chatId: ID, $content: String!) {
    createMessage(authorId: $authorId, chatId: $chatId, content: $content) {
      id
    }
  }
`;

const CREATE_CHAT_MUTATION = gql`
mutation createChat($name: String!, $usersIds: [User], $authorId:ID, $isGroup:boolean) {
  createChat(name: "chat n", usersIds: [$usersIds], authorId: $authorId, isGroup: $isGroup) {
    id
    isGroup
  }
}
`;

export { CREATE_MESSAGE_MUTATION, CREATE_CHAT_MUTATION };
