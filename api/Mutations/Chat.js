import gql from "graphql-tag";

const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage($authorId: ID, $chatId: ID, $content: String!) {
    createMessage(
      authorId: $authorId
      chatId: $chatId
      content: $content
    ) {
      id
    }
  }
`;

export { CREATE_MESSAGE_MUTATION };
