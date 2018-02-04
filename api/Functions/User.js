// @flow
import { AsyncStorage } from "react-native";

/**
 * USER FUNCTIONS
 */

//this functions login in the user
const USER_SIGNIN_FUNC = async (
  email: string,
  password: string,
  queryObject: any
) => {
  try {
    let userId = "";
    await queryObject({
      variables: {
        email,
        password
      },
      update: async (store, { data: { signinUser } }) => {
        try {
          await AsyncStorage.setItem("graphcoolToken", signinUser.token);
          await AsyncStorage.setItem("@mendor:userId", signinUser.user.id);
          userId = signinUser.user.id;
        } catch (e) {
          return e;
        }
      }
    });
    return { status: true, userId };
  } catch (e) {
    return { status: false, error: e };
  }
};

/**
 * CONTACTS FUNCTIONS
 */

//Creates a new Contact
const CREATE_CONTACT_FUNC = async (
  userId: string,
  contactID: string,
  mutationObject: any
) => {
  try {
    let id = "";
    await mutationObject({
      variables: {
        contactID,
        userId
      },
      update: (store, { data: { createContact } }) => {
        try {
          id = createContact.id;
        } catch (e) {
          return e;
        }
      }
    });
    return { status: true, id };
  } catch (e) {
    return { status: false, error: e };
  }
};

//deletes a Contact
const DELETE_CONTACT_FUNC = async (contactId: string, mutationObject: any) => {
  try {
    let id = "";
    await mutationObject({
      variables: {
        contactId
      },
      update: (store, { data: { deleteContact } }) => {
        try {
          id = deleteContact.id;
        } catch (e) {
          return e;
        }
      }
    });
    return { status: true, id };
  } catch (e) {
    return { status: false, error: e };
  }
};

export { USER_SIGNIN_FUNC, CREATE_CONTACT_FUNC, DELETE_CONTACT_FUNC };
