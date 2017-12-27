import gql from "graphql-tag";
//Fragments
import { BASIC_USER_FIELDS_FRAGMENT } from "../Fragments/User";

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

export default {
  SIGNIN_USER_MUTATION,
  CREATE_USER_MUTATION
};
