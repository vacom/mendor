import gql from "graphql-tag";
//Fragments
import { BASIC_USER_FIELDS_FRAGMENT } from "../Fragments/User";

/**
 * USER QUERIES
 */

//collects the essencial information from the user
const BASIC_USER_QUERY = gql`
  query {
    user {
      ...basicUserFields
    }
  }
  ${BASIC_USER_FIELDS_FRAGMENT}
`;

/**
 * PROFILE QUERIES
 */

//collects the complete information from the user
const USER_PROFILE_QUERY = gql`
  query {
    user {
      ...basicUserFields
    }
  }
  ${BASIC_USER_FIELDS_FRAGMENT}
`;

export { BASIC_USER_QUERY, USER_PROFILE_QUERY };
