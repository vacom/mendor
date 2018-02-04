import gql from "graphql-tag";

/**
 * NOTIFICATION QUERIES
 */

//collects all the notifications for the user
const ALL_NOTIFICATIONS_QUERY = gql`
  query allNotifications($userId: ID!) {
    allNotifications(
      filter: { hide_not: true, user: { id: $userId } }
      orderBy: createdAt_DESC
    ) {
      id
      type
      createdAt
      discussion {
        id
        title
        cover {
          id
          secret
          name
        }
      }
      userRequest {
        id
        avatar {
          id
          secret
          name
        }
        name
      }
    }
  }
`;

export { ALL_NOTIFICATIONS_QUERY };
