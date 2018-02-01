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
      avatar {
        id
        secret
        name
      }
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
      configuration {
        id
        type
        distance
        interests
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

/**
 * DISCOVERY QUERIES
 */

//Collects all the users for discovery
const ALL_USERS_DISCOVERY_QUERY = interests => {
  const competences =
    interests === "COMMON"
      ? "competences_some: { interest: { id_in: $competencesIds } }"
      : "";
  return gql`
    query allUsers(
      $userId: ID!
      $type: UserType!
      $contactsIds: [ID!]
      $userRequestIds: [ID!]
      ${interests === "COMMON" ? "$competencesIds: [ID!]" : ""}
    ) {
      allUsers(
        filter: {
          id_not: $userId
          type: $type
          contacts_every: { user: { id_not_in: $contactsIds } }
          notifications_every: {
            userRequest: {id: $userId}
            user: {id_not_in: $userRequestIds}
          }
          ${competences}
        }
      ) {
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
          profession
          location
          coordinates
          distance
        }
        competences(first: 10) {
          interest {
            id
            title
          }
        }
      }
    }
  `;
};

/**
 * PROJECTS CARDS QUERIES
 */

const ALL_PROJECTS_OF_USER = gql`
  query allProjects($id: ID) {
    allProjects(filter: { user: { id: $id } }) {
      id
      title
      description
      technologies {
        id
        name
      }
    }
  }
`;

export {
  BASIC_USER_QUERY,
  USER_PROFILE_QUERY,
  ALL_USERS_DISCOVERY_QUERY,
  ALL_PROJECTS_OF_USER
};
