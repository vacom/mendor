import gql from "graphql-tag";

/**
 * NOTIFICATION MUTATIONS
 */

//collects all the notifications for the user
const CREATE_NOTIFICATION_MUTATION = gql`
  mutation(
    $userId: ID!
    $type: NotificationType!
    $discussionId: ID
    $userRequestId: ID
  ) {
    createNotification(
      userId: $userId
      type: $type
      discussionId: $discussionId
      userRequestId: $userRequestId
    ) {
      id
    }
  }
`;

//deletes the notification by hiden with notification ID
const DISABLE_NOTIFICATION_MUTATION = gql`
  mutation($notificationId: ID!) {
    updateNotification(id: $notificationId, hide: true) {
      id
    }
  }
`;

export { CREATE_NOTIFICATION_MUTATION, DISABLE_NOTIFICATION_MUTATION };
