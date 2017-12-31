import gql from "graphql-tag";

/**
 * NOTIFICATION QUERIES
 */

//collects all the notifications for the user
const ALL_NOTIFICATIONS_QUERY = gql`
  query {
    allNotifications(filter: { hide_not: true }) {
      id
      type
      createdAt
      discussion {
        id
        title
        cover
      }
      userRequest {
        id
        avatar
        name
      }
    }
  }
`;

export { ALL_NOTIFICATIONS_QUERY };
