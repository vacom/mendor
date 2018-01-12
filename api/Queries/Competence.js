import gql from "graphql-tag";

/**
 * INTERESTS QUERIES
 */

//collects all the notifications for the user
const ALL_INTERESTS_QUERY = gql`
  query allInterests($query: String!) {
    allInterests(first: 10, filter: { category: { title_contains: $query } }) {
      id
      title
    }
  }
`;

export { ALL_INTERESTS_QUERY };
