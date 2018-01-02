import gql from "graphql-tag";

const CREATE_RESPONSE_MUTATION = gql`
  mutation createResponse($content: String!, $userId: ID, $discussionId: ID) {
    createResponse(
      content: $content
      userId: $userId
      discussionId: $discussionId
    ) {
      content
      id
      user {
        avatar
        id
      }
    }
  }
`;

export { CREATE_RESPONSE_MUTATION };
