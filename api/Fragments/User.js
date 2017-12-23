import gql from "graphql-tag";

//USER FRAGMENTS

//collects the essencial information from the user
const BASIC_USER_FIELDS_FRAGMENT = gql`
  fragment basicUserFields on User {
    id
    email
    name
    avatar
  }
`;

export { BASIC_USER_FIELDS_FRAGMENT };
