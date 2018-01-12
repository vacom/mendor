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
  query User($id: ID!) {
    User(id: $id) {
      id
      type
      name
      avatar
      profile {
        id
        about
        role
        company
        profession
        location
      }
      competences(first: 5) {
        interest {
          id
          title
        }
      }
      technologies(first: 5) {
        id
        name
      }
      projects {
        id
        title
        description
        technologies(first: 5) {
          id
          name
        }
      }
      socials {
        id
        content
        type
      }
      _contactsMeta {
        count
      }
      _competencesMeta {
        count
      }
      _projectsMeta {
        count
      }
      _technologiesMeta {
        count
      }
    }
  }
`;

export { BASIC_USER_QUERY, USER_PROFILE_QUERY };
