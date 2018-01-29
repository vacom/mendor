import gql from "graphql-tag";
//Fragments
//import { BASIC_USER_FIELDS_FRAGMENT } from "../Fragments/User";

/**
 * USER MUTATIONS
 */

//SignIn the user with email and password
const SIGNIN_USER_MUTATION = gql`
  mutation($email: String!, $password: String!) {
    signinUser(email: { email: $email, password: $password }) {
      token
      user {
        id
      }
    }
  }
`;

//Creates a new user in the DB
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

//Creates a new profile for the user
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

//Updates a new profile for the user
const UPDATE_USER_PROFILE_MUTATION = gql`
  mutation(
    $profileId: ID!
    $about: String!
    $company: String!
    $profession: String!
    $role: String!
    $location: String!
  ) {
    updateProfile(
      id: $profileId
      about: $about
      company: $company
      profession: $profession
      role: $role
      location: $location
    ) {
      id
      about
      role
      company
      profession
      location
    }
  }
`;

//Updates a new profile for the user
const UPDATE_USER_AVATAR_MUTATION = gql`
  mutation($userId: ID!, $fileId: ID!) {
    updateUser(id: $userId, avatarId: $fileId) {
      id
    }
  }
`;

//Updates a new profile for the user
const UPDATE_USER_COORDINATES_MUTATION = gql`
  mutation($profileId: ID!, $coordinates: Json!) {
    updateProfile(id: $profileId, coordinates: $coordinates) {
      id
    }
  }
`;

/**
 * CONFIG MUTATIONS
 */

//creates a new configuration for the user
const CREATE_USER_CONFIG_MUTATION = gql`
  mutation($userId: ID!) {
    createConfiguration(userId: $userId) {
      id
    }
  }
`;

//updates the user configuration
const UPDATE_USER_CONFIG_MUTATION = gql`
  mutation(
    $configId: ID!
    $type: UserType!
    $distance: Float!
    $interests: InterestType!
  ) {
    updateConfiguration(
      id: $configId
      type: $type
      distance: $distance
      interests: $interests
    ) {
      id
    }
  }
`;

export {
  SIGNIN_USER_MUTATION,
  CREATE_USER_MUTATION,
  CREATE_USER_PROFILE_MUTATION,
  UPDATE_USER_PROFILE_MUTATION,
  UPDATE_USER_AVATAR_MUTATION,
  UPDATE_USER_COORDINATES_MUTATION,
  CREATE_USER_CONFIG_MUTATION,
  UPDATE_USER_CONFIG_MUTATION
};
