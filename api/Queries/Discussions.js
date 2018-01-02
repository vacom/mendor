import gql from "graphql-tag";
//Fragments

/**
 * DISCUSSIONS QUERIES
 */
//collect one especific discussion
const DISCUSSION = gql`
  query Discussion($id: ID!) {
    Discussion(id: $id) {
      id
      title
      description
      createdAt
      author {
        name
        avatar
      }
      responses {
        id
        content
        user {
          id
          avatar
        }
      }
    }
  }
`;

//collects all the discussions organized by categories
const DISCUSSIONS_BY_CATEGORIES_QUERY = gql`
  query allCategories($id: ID) {
    allCategories(filter: { discussions_some: { id_not: $id } }) {
      id
      title
      discussions {
        id
        title
        cover
        description
        responses {
          id
          user {
            avatar
          }
        }
      }
    }
  }
`;

export { DISCUSSION, DISCUSSIONS_BY_CATEGORIES_QUERY };
