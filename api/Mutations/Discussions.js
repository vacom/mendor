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
        avatar {
          id
          secret
          name
        }
        id
      }
    }
  }
`;

const CREATE_DISCUSSION_MUTATION = gql`
  mutation createDiscussion(
    $title: String!
    $description: String!
    $coverId: ID
    $userId: ID
    $categoryId: ID
  ) {
    createDiscussion(
      title: $title
      description: $description
      coverId: $coverId
      userId: $userId
      categoryId: $categoryId
    ) {
      id
      title
      description
      responses {
        id
        author {
          avatar {
            id
            secret
            name
          }
        }
      }
    }
  }
`;

export { CREATE_RESPONSE_MUTATION, CREATE_DISCUSSION_MUTATION };
