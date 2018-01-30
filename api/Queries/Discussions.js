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
        avatar {
          id
          secret
          name
        }
      }
      responses {
        id
        content
        author {
          id
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

//collects all the discussions organized by categories
const DISCUSSIONS_BY_CATEGORIES_QUERY = gql`
  query allCategories($id: ID) {
    allCategories(filter: { discussions_some: { id_not: $id } }) {
      id
      title
      discussions {
        id
        title
        cover {
          id
          secret
          name
        }
        description
        responses {
          id
          author {
            id
            avatar {
              id
              secret
              name
            }
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
        cover {
          id
          secret
          name
        }
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

const SEARCH_DISCUSSIONS_BY_CATEGORIES = gql`
  query allCategories($id: ID, $query: String!) {
    allCategories(
      filter: {
        discussions_some: {
          AND: [{ title_contains: $query }, { description_contains: $query }]
          id_not: $id
        }
      }
    ) {
      id
      title
      discussions {
        id
        title
        cover {
          id
          secret
          name
        }
        description
        responses {
          id
          author {
            id
            avatar {
              id
              secret
              name
            }
          }
        }
      }
    }
  }
`;

export {
  DISCUSSION,
  DISCUSSIONS_BY_CATEGORIES_QUERY,
  ALL_CATEGORIES_QUERY,
  CATEGORY_QUERY,
  SEARCH_DISCUSSIONS_BY_CATEGORIES
};
