import gql from "graphql-tag";

/**
 * CONTACT MUTATIONS
 */

//creates a new contact for the user
const CREATE_CONTACT_MUTATION = gql`
  mutation($contactID: ID!, $userId: ID!) {
    createContact(contactIDId: $contactID, userId: $userId) {
      id
    }
  }
`;

//deletes a contact for the user
const DELETE_CONTACT_MUTATION = gql`
  mutation($contactId: ID!) {
    deleteContact(id: $contactId) {
      id
    }
  }
`;

export { CREATE_CONTACT_MUTATION, DELETE_CONTACT_MUTATION };
