import gql from "graphql-tag";
import { USER_ITEMS_FRAGMENT } from "../Fragments/User";

const SEARCH_USERS = gql`
  query SEARCH_USERS($query: String!) {
    allUsers(filter: { name_contains: $query }, orderBy: name_ASC) {
      ...userItems
    }
  }
  ${USER_ITEMS_FRAGMENT}
`;

export { SEARCH_USERS };
