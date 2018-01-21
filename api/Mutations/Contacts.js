import gql from "graphql-tag";

/**
 * CONTACT MUTATIONS
 */

//collects all the notifications for the user
const CREATE_CONTACT_MUTATION = gql`
  mutation($contactID: [ID!], $userId: ID!) {
    createContact(contactIDIds: $contactID, userId: $userId) {
      id
    }
  }
`;

export { CREATE_CONTACT_MUTATION };
