import gql from "graphql-tag";

/**
 * COMPETENCES MUTATIONS
 */

//collects all the notifications for the user
const CREATE_USER_COMPETENCE_MUTATION = gql`
  mutation($interestId: ID!, $userId: ID!) {
    createCompetence(interestId: $interestId, userId: $userId) {
      id
    }
  }
`;

export { CREATE_USER_COMPETENCE_MUTATION };
