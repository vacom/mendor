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

const CREATE_DISCUSSION_MUTATION = gql`
  mutation createDiscussion($title:String!, $description: String!, $cover:String!, $authorId:ID, $categoryId:ID ) {
    createDiscussion(
      title: $title
      description: $description
      cover: $cover
      authorId: $authorId
      categoryId: $categoryId
    ) {
      id
      title
      cover
      description
      responses {
        id
        content
        user {
          avatar
        }
      }
    }
  }
`;

export { CREATE_RESPONSE_MUTATION, CREATE_DISCUSSION_MUTATION };
