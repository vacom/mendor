import gql from "graphql-tag";
//Fragments
import { BASIC_USER_FIELDS_FRAGMENT } from "../Fragments/User";

/**
 * USER MUTATIONS
 */

const SIGNIN_USER_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        ...basicUserFields
      }
    }
  }
  ${BASIC_USER_FIELDS_FRAGMENT}
`;

const CREATE_USER_MUTATION = gql`
  mutation(
    $email: String!
    $password: String!
    $name: String!
    $type: UserType!
  ) {
    createUser(
      authProvider: { email: { email: $email, password: $password } }
      name: $name
      type: $type
    ) {
      id
    }
  }
`;

/**
 * PROFILE MUTATIONS
 */

const CREATE_USER_PROFILE_MUTATION = gql`
  mutation(
    $userId: ID!
    $about: String!
    $company: String!
    $profession: String!
    $role: String!
    $location: String!
  ) {
    createProfile(
      userId: $userId
      about: $about
      company: $company
      profession: $profession
      role: $role
      location: $location
    ) {
      user {
        id
      }
    }
  }
`;

export {
  SIGNIN_USER_MUTATION,
  CREATE_USER_MUTATION,
  CREATE_USER_PROFILE_MUTATION
};
