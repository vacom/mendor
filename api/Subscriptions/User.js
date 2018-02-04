import gql from "graphql-tag";

/**
 * NOTIFICATIONS SUBSCRIPTIONS
 */

const ALL_NOTIFICATIONS_SUBSCRIPTION = gql`
  subscription AllNotifications($userId: ID) {
    Notification(
      filter: { mutation_in: [CREATED], node: { user: { id: $userId } } }
    ) {
      node {
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
  }
`;

export { ALL_NOTIFICATIONS_SUBSCRIPTION };
