import gql from "graphql-tag";

const CREATE_RESPONSE_MUTATION = gql`
  mutation createResponse($content: String!, $authorId: ID, $discussionId: ID) {
    createResponse(
      content: $content
      authorId: $authorId
      discussionId: $discussionId
    ) {
      content
      id
      author {
        avatar
        id
      }
    }
  }
`;

const CREATE_DISCUSSION_MUTATION = gql`
  mutation createDiscussion(
    $title: String!
    $description: String!
    $cover: String!
    $userId: ID
    $categoryId: ID
  ) {
    createDiscussion(
      title: $title
      description: $description
      cover: $cover
      userId: $authorId
      categoryId: $categoryId
    ) {
      id
      title
      cover
      description
      responses {
        id
        author {
          avatar
        }
      }
    }
  }
`;

export { CREATE_RESPONSE_MUTATION, CREATE_DISCUSSION_MUTATION };
