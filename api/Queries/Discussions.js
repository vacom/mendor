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
      user {
        name
        avatar
      }
      responses {
        id
        content
        author {
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
          author {
            avatar
          }
        }
      }
    }
  }
`;

const ALL_CATEGORIES_QUERY = gql`
  query Categories {
    allCategories {
      id
      title
    }
  }
`;

const CATEGORY_QUERY = gql`
  query Category($id: ID) {
    Category(id: $id) {
      id
      title
      discussions {
        title
        description
        cover
        author {
          id
        }
        responses {
          id
        }
      }
    }
  }
`;

export {
  DISCUSSION,
  DISCUSSIONS_BY_CATEGORIES_QUERY,
  ALL_CATEGORIES_QUERY,
  CATEGORY_QUERY
};
