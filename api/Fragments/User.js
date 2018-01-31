import gql from "graphql-tag";

/**
 * USER FRAGMENTS
 */

//collects the essencial information from the user
const BASIC_USER_FIELDS_FRAGMENT = gql`
  fragment basicUserFields on User {
    id
    type
    email
    name
    avatar {
      id
      secret
      name
    }
    profile {
      id
      location
    }
    contacts {
      contactID {
        id
      }
    }
    competences {
      interest {
        id
      }
    }
    configuration {
      id
      type
      distance
      interests
    }
  }
`;

const USER_ITEMS_FRAGMENT = gql`
  fragment userItems on User {
    id
    name
    avatar {
      id
      secret
      name
    }
    profile {
      id
      role
      company
    }
  }
`;

export { BASIC_USER_FIELDS_FRAGMENT, USER_ITEMS_FRAGMENT };
