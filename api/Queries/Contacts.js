import gql from "graphql-tag";
import { USER_ITEMS_FRAGMENT } from "../Fragments/User";

// Collect all contacts of a user
const ALL_CONTACTS_QUERY = gql`
  query allContacts($id: ID) {
    allContacts(filter: { user: { id: $id } }) {
      contactID {
        id
        avatar {
          id
          name
          secret
        }
        name
        type
      }
    }
  }
`;

const ALL_CONTACTS_ENTREPENEURS_MENTORS_QUERY = gql`
  query allContacts($id: ID) {
    mentors: allContactsMentors(filter: { user: { type: MENTOR, id: $id } }) {
      contactID {
        ...userItems
      }
    }
    entrepeneurs: allContactsEntrepeneurs(
      filter: { user: { type: ENTREPRENEUR, id: $id } }
    ) {
      contactID {
        ...userItems
      }
    }
  }
  ${USER_ITEMS_FRAGMENT}
`;

const SEARCH_CONTACTS = gql`
  query searchContacts($id: ID, $query: String!) {
    allContacts(
      filter: {
        AND: [
          { contactID_some: { name_contains: $query } }
          { user: { id: $id } }
        ]
      }
    ) {
      contactID {
        id
        avatar {
          id
          secret
          name
        }
        name
        type
      }
    }
  }
`;

export {
  ALL_CONTACTS_QUERY,
  ALL_CONTACTS_ENTREPENEURS_MENTORS_QUERY,
  SEARCH_CONTACTS
};
