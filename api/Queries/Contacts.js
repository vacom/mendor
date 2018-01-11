import gql from "graphql-tag";

// Collect all contacts of a user
const ALL_CONTACTS_QUERY = gql`
  query allContacts($id: ID) {
    allContacts(filter: { user: { id: $id } }) {
      contactID {
        id
        avatar
        name
        type
      }
    }
  }
`;

const ALL_CONTACTS_ENTREPENEURS_QUERY = gql`
  query allContactsEntrepeneurs($id: ID) {
    allContacts(filter: { id: $id, user: { type: ENTREPRENEUR } }) {
      contactID {
        id
        avatar
        name
      }
    }
  }
`;

const ALL_CONTACTS_MENTORS_QUERY = gql`
  query allContactsMentors($id: ID) {
    allContacts(filter: { id: $id, user: { type: MENTOR } }) {
      contactID {
        id
        avatar
        name
      }
    }
  }
`;

const SEARCH_CONTACTS = gql`
  query searchContacts($id: ID, $query: String!) {
    allContacts(
      filter: {
        AND: [{ contactID: { name_contains: $query } }, { user: { id: $id } }]
      }
    ) {
      contactID {
        id
        avatar
        name
        type
      }
    }
  }
`;

export {
  ALL_CONTACTS_QUERY,
  ALL_CONTACTS_ENTREPENEURS_QUERY,
  ALL_CONTACTS_MENTORS_QUERY,
  SEARCH_CONTACTS
};
